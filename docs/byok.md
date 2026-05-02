# BYOK — Bring Your Own Key

How Peliglot's local-first LLM access works. Read this if you're touching anything in `src/byok/`, `src/components/ApiKeysSection.tsx`, `src/components/CostSection.tsx`, or `src/guides/*/conversation/*`.

## Why local-first

Peliglot has no backend. The user's API key never traverses our infrastructure — the browser calls the LLM provider directly. This is the core trust model: every other safety property follows from "Peliglot can't see your key."

Practical consequences:
- All keys live in `localStorage`, scoped per browser/profile.
- "Forget all keys" wipes all BYOK state from `localStorage` synchronously.
- The conversation UI is the only place that triggers chat calls today; future surfaces should reuse `getProvider` (see below) so that every call inherits the safety wrappers.

## Architecture

```
┌─────────────────────────┐
│  Conversation route     │  Spanish conversation surface
│  (or future surface)    │
└─────────┬───────────────┘
          │ getProvider('anthropic') → LlmProvider
          ▼
┌─────────────────────────┐
│  withDailyCap(provider) │  Wraps every chat() with a daily-USD preflight.
│   src/byok/providers/   │  This is the seam that makes the cap universal —
│   index.ts              │  every consumer of getProvider is gated automatically.
└─────────┬───────────────┘
          │ provider.chat(messages, options)
          ▼
┌─────────────────────────┐
│  Provider implementation│  Anthropic / OpenAI / OpenAI-compatible
│  src/byok/providers/    │  Maps the LlmProvider interface to the vendor's HTTP API.
│  {anthropic,openai,...} │
└─────────┬───────────────┘
          │ fetch(api endpoint, headers={Authorization: ..., x-api-key: ...})
          ▼
                       (provider's network)
```

Every code path that talks to an LLM goes through `getProvider()`. There is no `makeAnthropicProvider()` call site outside of the providers barrel. If you find yourself bypassing this, stop and add the wrapping there instead.

## Experimental status

The feature is currently labelled **Experimental** in the UI (Settings → AI keys, conversation page header). This isn't decoration: it backs three concrete safety choices that we'd unwind once the feature has soaked.

- A low default daily cap is enforced for cloud providers — see lever 1.
- Silent token usage on cloud providers is treated as a hard halt — see lever 7.
- The "Clear" action on cloud providers cannot truly disable the cap; it resets to the default.

## Safety levers (and why each exists)

The BYOK feature has had two formal security/cost reviews. The mitigations below map directly to findings from those reviews. If you remove or weaken any of them, please consult the review history first.

### 1. Daily USD cap (with experimental default)

**File**: `src/byok/cost-storage.ts`, `src/byok/providers/index.ts`.

Per-provider USD cap, set in Settings → Daily limits. Enforced as a preflight inside `withDailyCap`: read today's bucketed cost from `cost-storage`; if it's `>=` cap, throw `LlmProviderError(_, 'cap-exceeded')` before any network I/O.

While the feature is experimental, **`getDailyCap` returns `DEFAULT_DAILY_CAP_USD = 0.50` for cloud providers (anthropic, openai) when no entry is stored.** This is a read-side default — the underlying storage entry can still be removed (Forget all keys, Reset to default), but the safety net is always present. openai-compatible is exempt because self-hosted endpoints are typically free and a default cap there would block local development.

Consequences worth keeping in mind when editing this lever:
- A cloud provider's "Clear" button is renamed **Reset to default** in CostSection — there's no truly-cleared state to expose.
- Pre-existing user data is covered automatically: any user who hadn't set a cap before this lever shipped now has one, retroactively.
- Tests must use `DEFAULT_DAILY_CAP_USD` rather than `null` when asserting the post-clear state for cloud providers.

Caveats baked into the design:
- **Overshoot up to one request.** The call that *crosses* the threshold completes; the next one is blocked. UI explicitly discloses this in CostSection.
- **Cross-tab race.** Two tabs preflighting at the same instant can both pass; documented in `withDailyCap` JSDoc, no `BroadcastChannel` overhead.
- **DST-safe day boundary.** Buckets keyed by `toLocalDateString` (same helper as the mastery streak). Pruning uses symbolic local-date arithmetic, not epoch math.
- **30-day rolling retention.** `pruneOldBuckets` runs on every write.
- **Pricing is missing → cap can't enforce.** See "Unpriced model warning" below.
- **Provider reports zero tokens → meter can't move.** See "Silent-usage guard" below.

### 2. Sliding context window

**File**: `src/guides/spanish/conversation/index.tsx`.

A long Spanish-tutor session would otherwise scale per-turn cost as O(turns) and total session cost as O(turns²) because every turn replays the entire history. `MAX_HISTORY_MESSAGES = 40` (20 user + 20 assistant) caps the per-turn input bill.

Older messages remain visible in the UI but are dropped from the model context. A small notice appears once truncation engages.

**Anthropic alternation guard.** Errors are filtered out of model-context history. After a failed turn, the surviving sequence can be odd-length ending in `user`. A subsequent slice may then begin with `assistant`, which Anthropic rejects. The route drops a leading `assistant` from the slice to keep the payload alternation-safe across providers.

### 3. Unpriced-model warning (closes the cap's blind spot)

**File**: `src/byok/cost-storage.ts` (`markUnpricedCall`, `getUnpricedModelIds`), surfaced in CostSection and inline in the conversation route.

The cap is computed from `pricing.ts`. If a provider returns a model not in the table, `addToCost` is a no-op and the cap silently fails to engage. To make this footgun visible:

1. After a successful chat with no pricing entry, `markUnpricedCall(provider, modelId)` records the model.
2. CostSection's daily-limits row shows a yellow callout listing the affected models.
3. The conversation route shows an inline alert above the input ("your daily limit doesn't apply to this model") with a Settings deep-link.
4. `getUnpricedModelIds` filters against current `pricing.ts` on read, so once a previously-unknown model is added to the table, stale warnings disappear automatically.

When you bump `pricing.ts`, you don't need to migrate user data — the read-side filter catches up automatically.

### 4. Custom-endpoint destination confirm (key-phishing defense)

**File**: `src/byok/trustedHosts.ts`, gated in `ApiKeysSection`'s `confirmDestination`.

The custom OpenAI-compatible endpoint sends the user's API key as a Bearer token to whatever URL they paste. An attacker who convinces the user to paste their *real* OpenAI key plus an attacker-controlled URL would receive the key on the first Test click. To break that flow, both Test and Save run a `window.confirm` when:
- The hostname is *not* in the trusted set (`localhost`, `127.0.0.1`, `::1`, `*.ts.net`, `*.trycloudflare.com`), AND
- The user entered an API key (anonymous local LLMs skip the prompt).

The trusted set was chosen because these are the legitimate local/tunneled paths a Peliglot user would self-host through. A determined user can still confirm and proceed; the goal is to make the attack visible, not impossible.

### 5. Mid-flight abort + StrictMode-safe mounted ref

**File**: `src/guides/spanish/conversation/index.tsx`.

Each chat call uses a fresh `AbortController` whose `signal` is forwarded to `fetch`. On unmount, route change, or new send, the previous controller is aborted — the network call is genuinely cancelled, not just ignored. This means rapid send-cancel-send doesn't accumulate billable in-flight requests.

`mountedRef` is re-initialized to `true` at the top of the cleanup-effect body so React StrictMode's mount → cleanup → remount cycle in dev doesn't leave the ref permanently `false` and silently swallow error renders.

### 6. Retry button gating

**File**: `src/guides/spanish/conversation/index.tsx` (`MessageBubble`).

Disabled while another request is in flight, so a user spam-clicking Retry against a flapping 5xx doesn't fire multiple full-history calls in parallel.

### 7. Silent-usage guard

**File**: `src/byok/providers/index.ts` (`withSilentUsageGuard`), `src/byok/cost-storage.ts` (`markSilentUsage`, `getSilentUsageModelIds`, `clearSilentUsage`), surfaced in CostSection and inline in the conversation route.

The post-call check that addresses the precise risk the director called out: *"error if the user is spending tokens but our usage isn't going up."*

Two mechanisms:

1. **Post-flight detection.** After every successful chat call on a cloud provider (anthropic, openai), if `usage.input === 0 && usage.output === 0`, the wrapper records the model id via `markSilentUsage`. The vendor returned a 200 (so the user was likely billed) but Peliglot's meter cannot move — the cap is now provably useless for that model.
2. **Pre-flight sticky block.** Before every chat call, the wrapper reads `getSilentUsageModelIds`. If non-empty, it throws `LlmProviderError(_, 'silent-usage')` immediately — no network I/O, no further billing — until the user clears the record from Settings.

openai-compatible is exempt because most self-hosted servers (Ollama, llama.cpp, LM Studio) omit the usage field by default and that's not a billing risk. `markSilentUsage` is a no-op for `openai-compatible`.

Wrapping order matters. `getProvider` returns `withSilentUsageGuard(withDailyCap(raw))` — the outer guard runs first. We want the silent-usage check ahead of the cap check because "we can't track at all" is more fundamental than "we've spent the budget."

Compared to the unpriced-model warning (lever 3): unpriced is *we don't have pricing data, so the meter sits at 0*; silent-usage is *the provider claims it spent 0, but it almost certainly didn't*. The first is a Peliglot data gap; the second is a vendor anomaly we have no way to reconcile.

## Adding a new provider

1. Implement `LlmProvider` in `src/byok/providers/<name>.ts`. Follow the pattern in `anthropic.ts`. Apply `extractErrorMessage` from `_scrub.ts` to every error path so keys never leak through error UI.
2. Add a factory function (`makeXProvider`) and re-export it from `src/byok/providers/index.ts`.
3. Add a case to `getProvider()` so the new provider gets wrapped by `withDailyCap` automatically.
4. Add a config shape variant to `ProviderConfig` in `src/byok/types.ts`. Add the provider id to `Provider` union and `getAllProviders()`.
5. Add a UI card to `ApiKeysSection.tsx`. Wire `validate()` for the Test button.
6. If the provider exposes pricing, add the model id(s) to `pricing.ts`. Otherwise the unpriced-model warning will surface on first use.
7. Add tests: provider unit tests (one file per provider), `validate` tests, an `ApiKeysSection` card test, a `getProvider` dispatch test.

## Things explicitly *not* in BYOK

- **No prompt caching yet.** Anthropic's prompt cache requires ≥1024 tokens; the current Spanish system prompt is ~400 tokens. Cross the threshold deliberately — adding tokens for caching's sake costs more on uncached turns.
- **No usage telemetry off-device.** Every cost number lives in `localStorage` only. Don't add Sentry-style reporting that could capture key fragments.
- **No backend proxy.** Users with strict CORS / corporate firewalls can self-host an OpenAI-compatible proxy and use the custom-endpoint flow.

## Testing notes

- Unit tests use a `makeStubProvider` helper from `src/byok/providers/__test_stub.ts`. Don't import this from non-test code.
- `withDailyCap` tests stub `globalThis.fetch` to detect bypass — if the cap preflight is broken, fetch gets called and the test fails.
- Conversation route tests inject `getProviderFn` via prop, so they don't hit the cap wrapper. Cap behavior is tested in `byok/providers/index.test.ts`.
- E2E coverage is in `e2e/settings.spec.ts` (cap UI) and `e2e/spanish-conversation.spec.ts` (cap-exceeded inline error).
