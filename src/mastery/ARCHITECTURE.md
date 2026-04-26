# Mastery Layer — Architecture

> **Load-bearing handoff doc for Phase 2d (cloud sync).**
> If you are implementing the remote adapter or the sign-in migration, read this
> file in full before touching any code. If you are writing a new guide's card
> extractor, start at Section 3 (Data Shapes) and Section 4 (ReviewCard Pattern).

---

## 1. Overview

The mastery layer is Peliglot's spaced-repetition engine. It schedules cards for
review, persists learner state across sessions, tracks streaks, and exposes a
single React hook to all UI code.

### Where it lives

```
src/mastery/                          — core engine (adapter-agnostic)
  index.ts                            — public barrel; the only import surface
  adapter.ts                          — MasteryStorageAdapter interface + re-exports
  types.ts                            — all core type definitions
  scheduler.ts                        — FSRS scheduling wrapper (ts-fsrs 5.3.2)
  migrations.ts                       — schema versioning + forward migration
  cards.ts                            — ReviewCard and PromptShape types
  adapters/
    localStorage.ts                   — production adapter (browser localStorage)
    stubRemote.ts                     — in-memory test double (mirrors full contract)

src/hooks/useMastery.ts               — the ONLY React hook that imports the adapter

src/guides/{slug}/mastery/            — per-collection card extractors
  extractors/guide{N}.ts              — one file per guide; exports extract()
  index.ts                            — aggregator: getAllSpanishCards()
```

### What consumes it

The practice route at `/guides/spanish/practice` (lazy-loaded chunk) is the
only current consumer. It imports:

- `useMastery` from `src/hooks/useMastery.ts` — for all state reads and writes.
- `getAllSpanishCards` from `src/guides/spanish/mastery/index.ts` — for the
  card pool.
- `Rating` from `src/mastery` — the four learner-facing rating levels.

No guide component imports the adapter directly. This is a hard rule enforced
by code structure: the adapter is only ever instantiated in `src/mastery/index.ts`
(`defaultMasteryAdapter`) and swapped in via the `useMastery` hook parameter.

---

## 2. Adapter Interface

### `MasteryStorageAdapter` contract

Defined in `src/mastery/adapter.ts`. Every storage backend — localStorage today,
a cloud backend in Phase 2d — must implement this interface exactly.

**All methods are async (return `Promise`).** This is intentional: making the
interface async-from-day-one means the Phase 2d swap is one new file, not a
refactor of every call site.

```ts
interface MasteryStorageAdapter {
  read(cardId: string): Promise<CardState | null>;
  write(cardId: string, state: CardState): Promise<WriteResult>;
  listDue(now: number): Promise<Array<{ cardId: string; state: CardState }>>;
  bulkExport(): Promise<MasteryExport>;
  bulkImport(snapshot: MasteryExport): Promise<MergeReport>;
  writeMeta(meta: {
    streak?: StreakState;
    settings?: { dailyGoal?: number };
    xp?: XpState;           // Phase 2b.1
  }): Promise<void>;
}
```

#### `read(cardId)`
Returns the persisted `CardState` for the given card, or `null` if the card
has never been written. Safe to call before hydration; the hook's in-memory
cache answers synchronously via `getCardState()`.

#### `write(cardId, state)`
Persists a single card's scheduling state with **last-write-wins** conflict
resolution: if the existing record's `updatedAt` is strictly greater than
`state.updatedAt`, the write is silently **dropped** and `{ outcome: 'dropped' }`
is returned. Otherwise the write is applied and `{ outcome: 'accepted' }` is
returned. Equal timestamps are treated as accepted (idempotent re-write).

The LWW rule is enforced inside `write`; callers do not need to check.

#### `listDue(now)`
Returns all cards whose `due` timestamp is ≤ `now` (an epoch ms value). Used
to surface review work. Not currently called by `useMastery` at the hook level
(the hook builds a derived `dueCards` list from its in-memory cache); this
method exists on the interface for Phase 2d backends that may want a
server-side due query.

#### `bulkExport()`
Returns a **deep copy** of the full snapshot (`MasteryExport`). Callers may
mutate the returned object without affecting the adapter's internal state.
Used at hydration time and as the source for the sign-in migration.

#### `bulkImport(snapshot)`
Merges an incoming `MasteryExport` into the adapter's current state using
per-card last-write-wins semantics. The merge rules mirror `write`:

| Condition | Outcome |
|-----------|---------|
| Card absent locally | Accept (write remote state) |
| Remote `updatedAt` > local | Accept (overwrite) |
| Remote `updatedAt` < local | Reject (discard remote) |
| `updatedAt` equal on both sides | Unchanged (no write) |

Returns a `MergeReport` with counts for each bucket. Re-running the same
import is idempotent: all cards land in `unchanged` on the second pass.

#### `writeMeta(meta)`
Persists metadata (streak and/or settings) without touching card records.
The update is a **partial merge**: only fields present in `meta` are
overwritten; omitted fields leave existing values intact.

- `writeMeta({ streak })` does NOT clobber a previously-written `dailyGoal`.
- `writeMeta({ settings })` does NOT clobber the streak.

Called by `useMastery` on every `rateCard` (streak + XP update, in a single
call) and every `setDailyGoal`. Using a dedicated method avoids the full
`bulkExport → bulkImport` round-trip.

### LWW rule — full statement

> For any card, the write with the greatest `updatedAt` epoch ms value wins.
> When two writes have equal `updatedAt`, the later-arriving write is
> treated as a no-op (idempotent re-write).

This is correct for single-user multi-device sync at Peliglot's scale. A user
who rates a card on two devices within the same millisecond gets a
deterministic result (whichever arrives at the server last). CRDTs would add
implementation complexity with no meaningful benefit for this use case.

### `WriteResult` semantics

```ts
type WriteResult = { outcome: 'accepted' } | { outcome: 'dropped' };
```

- `accepted` — the write was applied. The adapter's state reflects the new value.
- `dropped` — the incoming state was stale. The adapter's state is unchanged.

### `MergeReport` count semantics

```ts
interface MergeReport {
  accepted: number;   // cards where remote was newer (or absent) and was written
  rejected: number;   // cards where local was already newer; remote discarded
  unchanged: number;  // cards where updatedAt matched; no write performed
}
```

Every card in the incoming snapshot lands in exactly one bucket. The sum
`accepted + rejected + unchanged` equals the number of cards in the snapshot.

### `writeMeta` partial-merge semantics

The adapter stores streak and settings as independent fields on the snapshot.
`writeMeta` performs a shallow merge at the field level, and (for `settings`)
a shallow merge at the sub-field level:

```ts
// Incoming: { settings: { dailyGoal: 10 } }
// Before:   { streak: { current: 3, ... }, settings: { dailyGoal: 5 } }
// After:    { streak: { current: 3, ... }, settings: { dailyGoal: 10 } }
```

Future sub-fields added to `settings` (e.g. `notificationsEnabled`) will be
preserved across `writeMeta` calls that do not include them.

---

## 3. Data Shapes

All types are defined in `src/mastery/types.ts` and `src/mastery/cards.ts`.

### `CardState`

The full persisted state for a single mastery card. Extends `SchedulerCard`
with identity and audit fields.

```ts
interface CardState extends SchedulerCard {
  cardId: string;   // stable identifier; format: "{slug}-{guideId}-{descriptor}"
  updatedAt: number; // epoch ms; used for LWW conflict resolution
}
```

`SchedulerCard` fields (all epoch ms or unitless FSRS values):

| Field | Type | Meaning |
|-------|------|---------|
| `due` | `number` | Epoch ms when card is next due for review |
| `stability` | `number` | FSRS stability in days (90% retrievability threshold) |
| `difficulty` | `number` | FSRS difficulty [1, 10]; higher = harder |
| `reps` | `number` | Successful review count |
| `lapses` | `number` | Times the card has lapsed back to relearning |
| `lastReview` | `number \| null` | Epoch ms of last review; null for unseen cards |
| `learningSteps` | `number` | FSRS internal learning step counter |
| `fsrsState` | `0 \| 1 \| 2 \| 3` | FSRS state: New / Learning / Review / Relearning |

### `MasteryExport`

Full snapshot of all mastery state for one user. Used by `bulkExport` and
`bulkImport`.

```ts
interface MasteryExport {
  schemaVersion: number;             // current: 1; bump on incompatible CardState changes
  cards: Record<string, CardState>;  // keyed by cardId
  streak?: StreakState;              // absent if no reviews ever recorded
  settings?: { dailyGoal?: number }; // absent if user hasn't changed defaults
  xp?: XpState;                      // absent in snapshots from before Phase 2b.1
}
```

### `XpState`

```ts
interface XpState {
  allTime: number;       // monotonic total XP; never decreases
  today: number;         // XP earned in the current local day; resets at midnight
  dayKey: string | null; // YYYY-MM-DD local-date string used to detect day rollover;
                         // null before the first ever review
}
```

XP is computed by `computeXp(rating, difficulty)` in `src/mastery/xp.ts`.
Day rollover is detected in two places: at hydration time (user opens app on a
new day) and inside `rateCard` (in-session midnight crossing). Both paths
persist the updated `XpState` via `writeMeta({ xp })`.
`xp` is backward-compatible: existing snapshots that lack the field default to
`{ allTime: 0, today: 0, dayKey: null }` on hydration.

### `StreakState`

```ts
interface StreakState {
  current: number;              // days in the current streak
  longest: number;              // all-time longest streak
  lastReviewDate: string | null; // YYYY-MM-DD local-time date string
}
```

**Why `lastReviewDate` is a `YYYY-MM-DD` string, not epoch ms:**
DST transitions make a calendar day 23 or 25 hours long. If streak arithmetic
were done as `Math.floor(diffMs / 86_400_000)`, a user who reviews at 11pm one
night and 12:30am the next would sometimes appear to have skipped two days.
Using a local-time date string and symbolic date arithmetic (`new Date(y, m, d)
+ setDate(...)`) means "did the user review yesterday?" is always evaluated in
the device's local timezone without ms rounding errors.

### `ReviewCard`

The content-side description of a single flashcard. Separate from `CardState`
(which is the scheduling-side). Defined in `src/mastery/cards.ts`.

```ts
interface ReviewCard {
  cardId: string;              // stable; format: "{guideSlug}-{guideId}-{descriptor}"
  guideId: number;             // matches guidesMeta id
  guideSlug: string;           // e.g. "spanish"
  kind: CardKind;              // discriminator; must match prompt.kind
  prompt: PromptShape;         // narrowed to match kind
  answer: string;              // canonical correct answer string
  acceptableAnswers?: string[]; // alternate forms accepted as correct
  speakText?: string;          // text passed to speakSpanish()
}
```

### `PromptShape`

A discriminated union keyed on `kind`. The practice UI's `PromptRenderer`
switches on `prompt.kind` to render the appropriate widget.

```ts
type PromptShape =
  | { kind: 'letter-sound'; letter: string }
  | { kind: 'word-stress'; word: string }
  | { kind: 'verb-conjugation'; verb: string; pronoun: string; meaning?: string }
  | { kind: 'verb-conjugation-stem-change'; verb: string; pronoun: string; meaning?: string }
  | { kind: 'noun-gender'; noun: string; meaning?: string }
  | { kind: 'noun-plural'; singular: string; meaning?: string }
  | { kind: 'noun-adj-agreement'; noun: string; adjective: string; ... }
  | { kind: 'english-to-pronoun'; english: string }
  | { kind: 'ser-vs-estar'; sentence: string; context?: string };
```

### `MergeReport`

See Section 2 (`bulkImport`). Counts are always non-negative; sum equals the
number of cards in the incoming snapshot.

---

## 4. Sign-in Migration Story

This section describes the exact sequence that Phase 2d must implement when a
user who has been using the app anonymously (localStorage) signs in for the
first time. The sequence is designed to be **safe, idempotent, and
non-destructive**.

### Preconditions

- The user has been using `LocalStorageMasteryAdapter` (Phase 2a–2c).
- User signs in. The app receives a valid auth token and can construct a
  `RemoteMasteryAdapter` backed by the chosen cloud backend.

### Exact sequence

```
1. localAdapter  = new LocalStorageMasteryAdapter()
2. remoteAdapter = new RemoteMasteryAdapter(authToken)         // Phase 2d

3. localSnapshot = await localAdapter.bulkExport()
   // Full deep copy of everything the user has done locally.

4. mergeReport   = await remoteAdapter.bulkImport(localSnapshot)
   // Per-card LWW merge. Cards only on local → accepted.
   // Cards on both sides → newer updatedAt wins.
   // Cards only on remote (e.g. from another device that already synced) → preserved.

5. canonicalSnapshot = await remoteAdapter.bulkExport()
   // Read back the authoritative merged state.

6. await localAdapter.bulkImport(canonicalSnapshot)
   // Write canonical state back to local so offline reads still work.
   // Also idempotent: if remote had nothing, this is a no-op.

7. Hook swaps: useMastery(remoteAdapter)
   // All subsequent reads and writes go through the remote adapter.
   // Local adapter becomes a read cache only (step 6 keeps it current).
```

### Properties of this design

**Per-card LWW is idempotent and deterministic.** If step 4 is interrupted and
re-run, every card's `updatedAt` was already applied to the remote; the second
pass produces `unchanged` for all previously-merged cards. No data duplication.

**Interruption safety.** If the process fails between steps 3 and 7, the user's
local state is intact (step 3 is read-only). On next sign-in, steps 3–7 re-run
cleanly; step 6's merge may produce a mix of `accepted`/`unchanged`/`rejected`
but the net result is correct.

**Sign-out then sign-in again.** After sign-out, the hook reverts to
`localAdapter`. The local adapter's state (from step 6) is still current. On
sign-in again, step 3 reads recent local changes; step 4 merges them into the
remote; step 6 brings local back in sync. The merge is safe regardless of how
many sign-in cycles occur.

**Multiple devices.** If the user signs in on Device B, which has never seen
local data, remote state wins for all cards (all land in `accepted` on Device
B's local adapter after step 6). Device A and Device B are now in sync.

---

## 5. Files Phase 2d Must Touch

This section is the explicit change list for the cloud-sync implementation.
Nothing outside this list should need to change.

### New files to create

**`src/mastery/adapters/remote.ts`**
Implements `MasteryStorageAdapter` against the chosen cloud backend (e.g.
Cloudflare Workers + D1, Supabase, etc.). Must satisfy the full adapter
contract described in Section 2. The `StubRemoteAdapter` in
`src/mastery/adapters/stubRemote.ts` is the reference implementation — Phase
2d's adapter must pass the same behavioral tests (LWW, `bulkImport` counts,
`writeMeta` partial merge).

**`src/mastery/sync.ts`**
Orchestrates the migration sequence from Section 4. Exports a single async
function, e.g.:

```ts
export async function migrateLocalToRemote(
  local: MasteryStorageAdapter,
  remote: MasteryStorageAdapter,
): Promise<MergeReport>
```

Encapsulating the 7-step sequence in one testable function means the migration
can be unit-tested against two `StubRemoteAdapter` instances before any real
backend exists.

### Files to modify

**`src/mastery/index.ts`**
Currently always instantiates `LocalStorageMasteryAdapter`. Phase 2d adds
adapter selection logic: remote if the user is signed in, local otherwise.
Example shape:

```ts
export function getDefaultAdapter(authToken?: string): MasteryStorageAdapter {
  if (authToken) return new RemoteMasteryAdapter(authToken);
  return new LocalStorageMasteryAdapter();
}
```

The singleton `defaultMasteryAdapter` export may become a function or be
removed in favor of passing the adapter explicitly from `useMastery`.

**`src/hooks/useMastery.ts`**
Phase 2d adds an auth-state subscription. When the user signs in, the hook
should:
1. Receive the new `RemoteMasteryAdapter` (passed by the caller or resolved
   from auth state).
2. Trigger the migration sequence (call `sync.ts`).
3. Re-hydrate from the remote adapter.

The hook already handles adapter-reference changes (`useEffect` on `adapter`):
re-hydration on sign-in is free as long as the new adapter is passed in as a
prop or context value.

### Files that do NOT need to change

The following are insulated from the adapter swap by the contract boundary:

- `src/mastery/scheduler.ts` — pure FSRS logic; no I/O
- `src/mastery/cards.ts` — content types; no storage
- `src/mastery/migrations.ts` — schema migration; operates on plain objects
- `src/mastery/adapters/localStorage.ts` — used as the local half of sync
- `src/mastery/adapters/stubRemote.ts` — test double; unchanged
- Any extractor in `src/guides/spanish/mastery/extractors/` — pure content
- The practice UI in `src/guides/spanish/practice/` — reads only via `useMastery`
- Any guide file — no mastery imports

The adapter contract is the bright line. Everything inside `src/mastery/`
that doesn't implement the interface is pure logic or type definitions.

---

## 6. Schema Versioning

### Current version

`CURRENT_SCHEMA_VERSION = 1` (defined in `src/mastery/migrations.ts`).

All `MasteryExport` objects carry a `schemaVersion` field. Every adapter
reads through `migrate()` on load, so stored data is always migrated to the
current schema before any application code sees it.

### How to add a v2 migration

When `CardState` gains or loses a field in an incompatible way:

1. **Bump the constant** in `migrations.ts`:
   ```ts
   export const CURRENT_SCHEMA_VERSION = 2;
   ```

2. **Add the migration function** to the `migrations` dispatch table:
   ```ts
   const migrations: Record<number, (s: unknown) => unknown> = {
     1: (s: unknown): unknown => s,        // v1 → v1 no-op (keep)
     2: (s: unknown): unknown => {          // v1 → v2
       // s is the raw v1 snapshot object
       // Return a new object shaped as v2
       const snap = s as Record<string, unknown>;
       const cards = snap['cards'] as Record<string, unknown> ?? {};
       // Example: add a new required field with a safe default
       const migratedCards: Record<string, unknown> = {};
       for (const [id, card] of Object.entries(cards)) {
         migratedCards[id] = { newField: 'default', ...(card as object) };
       }
       return { ...snap, cards: migratedCards };
     },
   };
   ```

3. **Write a migration test** in `src/mastery/migration.test.ts` (or a new
   test file) that constructs a raw v1 snapshot object, passes it through
   `migrate()`, and asserts the v2 shape.

4. **Update `emptyExport()`** if the empty snapshot shape changes.

### Defensive contract

`migrate()` returns `emptyExport()` (not `null`, not a throw) for any input
that is `null`, `undefined`, missing `schemaVersion`, or unrecognised. Callers
at construction time get a safe empty snapshot rather than a crash. This also
means that a corrupt localStorage value — invalid JSON, truncated write,
manually edited data — always produces a clean slate rather than an exception.

The `loadFromStorage` method in `LocalStorageMasteryAdapter` also emits a
`console.warn('[mastery] localStorage snapshot was unparseable; resetting')`
when `JSON.parse` fails, providing diagnostic signal without breaking the app.
