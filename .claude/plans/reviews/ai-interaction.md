# AI Interaction Guide — Comprehensive Accuracy + Effectiveness + Longevity Review

## Executive Summary

- **Overall verdict:** The 25-guide collection is pedagogically well-shaped (Foundations → Prompt Craft → Agentic → Ethics → Practical) and most of the durable content (how transformers work, what tokens are, prompt patterns, agentic loops, MCP, human-in-the-loop) is accurate and well-framed. But three classes of issue need attention before shipping: (1) **one critical demo bug in Guide 9** where the "Direct (no CoT)" example is labeled "(incorrect)" but actually shows the correct answer, undermining the entire pedagogical contrast; (2) a **dense cluster of version-pinned vendor / model claims** (model names, context-window sizes, energy per query, tool lineups) that are already wrong as of 2026-04 — Codeium has rebranded to Windsurf and been acquired, the "10× Google search" energy claim has been revised down ~10× by Epoch AI / OpenAI / Google, GPT-4o / Claude 3.5 Sonnet / Gemini 1.5 Pro / Llama 3 are all 1–2 generations behind frontier; (3) two **important coverage gaps** — there is no dedicated guide on hallucination (the highest-impact AI literacy concept), no guide on RAG (mentioned but never explained), and no guide on training-cutoffs / why models give stale answers. Reasoning models (o1 / extended thinking / adaptive thinking) get only one passing mention and their existence directly contradicts a firm rule stated in Guide 5.
- **Number of accuracy issues found:** 18 total — **5 critical** (the Guide 9 demo bug, a contradicted rule about "hidden thoughts," the stale energy comparison, the Codeium/Windsurf duplication, and the stale model-list table) / **13 minor** (specific imprecisions and dated framings).
- **Number of effectiveness improvements suggested:** 12.
- **Number of coverage gaps flagged:** 6.
- **Number of longevity-flagged claims:** 24 distinct version-pinned claims that should be rewritten in durable form.
- **Recommendation:** **hold-for-revision**. Five lines of code fix the worst issue (the contradiction in Guide 9). After that, a focused pass to (a) replace specific model names with durable categories everywhere, (b) update the energy claim, (c) add a hallucination guide and a RAG/training-cutoff guide (could replace `Guide 5 → How Models "Think"` with two more focused guides, or be added), and (d) reconcile Guide 5's "models don't have hidden thoughts" rule with the existence of reasoning models. The collection is otherwise good.

---

## Critical accuracy issues (must fix before shipping)

### C1. Guide 9 — the "Direct (no CoT)" demo shows the correct answer but is labeled "(incorrect)"
**File/lines:** `guide9.jsx:18–34`.

**What's wrong:** The "Direct (no CoT)" `PromptBox` has `response="56 (incorrect)"`. The CoT version shows the same arithmetic worked out — `23 + 48 − 15 = 56` — and ends with `Remaining: 71 − 15 = 56. ✅`. The footnote at lines 30–32 then says "Both get 56 here, but CoT lets you verify each step." So the page simultaneously claims `56 (incorrect)` and `Both get 56 here` (and the worked answer is in fact correct). The pedagogical demo is showing the *opposite* of what it claims.

**What's correct:** Either:
1. Change the Direct response to a plausible LLM mistake (e.g. `"71"` — forgetting to subtract the sale, or `"50"` — slipping a sign) and then keep the "(incorrect)" label, with the CoT version still arriving at 56 ✅. This is the standard Wei et al. (2022) demonstration: direct answer wrong, CoT answer right.
2. Or remove the "(incorrect)" label and rewrite the footnote to "Direct prompting can hit the answer on simple problems, but on harder ones it often skips a step. CoT lets you verify each step."

**Source:** Wei et al., "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (NeurIPS 2022), https://arxiv.org/abs/2201.11903 — the canonical CoT demonstration uses arithmetic problems where direct prompting fails and CoT succeeds.

**Why this matters:** This is the *single example* introducing CoT. A reader who reads carefully will notice the contradiction and lose trust in the rest of the guide. Fixing it costs five characters.

---

### C2. Guide 5 — "Models don't have hidden thoughts" is now wrong as a categorical rule
**File/lines:** `guide5.jsx:66`.

**What's wrong:** The Tip says: *"Models don't have hidden thoughts. Everything happens in the token sequence. If you want the model to reason, you need to make it 'show its work' in the output."*

This was true for plain transformer LLMs through ~2024. It is **no longer a categorical truth as of 2026-04** because reasoning / "extended thinking" models — OpenAI o1/o3, DeepSeek R1, Gemini Flash Thinking, Claude 3.7 Sonnet (and Opus/Sonnet 4.x with adaptive thinking) — generate large internal chains of thought that the user does not see. Anthropic's docs even describe an "extended thinking" mode where the model uses a "thinking budget" before producing its final answer; OpenAI's o-series hides the chain of thought entirely by default.

The same collection acknowledges this contradictorily in `guide9.jsx:71`: *"Some models now do chain-of-thought internally (extended thinking). You may not see the reasoning, but the model is still 'working through it' behind the scenes."* — which directly contradicts Guide 5.

**Source:** Anthropic, "Building with extended thinking" (https://docs.claude.com/en/docs/build-with-claude/extended-thinking); Anthropic, "Claude's extended thinking" (https://www.anthropic.com/news/visible-extended-thinking); OpenAI o1 system card (https://openai.com/index/openai-o1-system-card/).

**Recommendation:** Rewrite the Tip as: *"Plain LLMs don't have hidden thoughts — everything happens in the token sequence, so making the model 'show its work' helps it reason. Newer 'reasoning models' (o-series, Claude extended thinking, Gemini thinking) do generate hidden internal reasoning before answering — but the underlying mechanism is still tokens, just tokens you don't see."* This is durable: it acknowledges the architectural reality (still tokens) without claiming visibility.

---

### C3. Guide 22 — "One query ≈ 10× a Google search in energy" was revised ~10× downward in 2025
**File/lines:** `guide22.jsx:9` (the `note` field on the Inference row).

**What's wrong:** The "10× a Google search" figure traces to a 2023 estimate (de Vries) of ~3 Wh per ChatGPT query vs. ~0.3 Wh per Google search. **Epoch AI's February 2025 reanalysis** — confirmed by Sam Altman (OpenAI) and corroborated by Google's own disclosures — puts a typical GPT-4o-class ChatGPT query at **~0.3 Wh**, i.e. roughly the same order of magnitude as a Google search, not 10× higher. The original 3 Wh estimate over-counted output tokens and used pre-efficiency-improvement hardware assumptions.

**Source:** Epoch AI, "How much energy does ChatGPT use?" (Feb 2025), https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use ; TechCrunch summary, "ChatGPT may not be as power-hungry as once assumed" (Feb 2025), https://techcrunch.com/2025/02/11/chatgpt-may-not-be-as-power-hungry-as-once-assumed/ ; Hannah Ritchie, "What's the carbon footprint of using ChatGPT or Gemini?" (Aug 2025), https://www.sustainabilitybynumbers.com/p/ai-footprint-august-2025 .

**Recommendation:** Replace the `note` with something durable: *"Recent estimates put a typical text query at the same order of magnitude as a Google search (~0.3 Wh). Multimodal queries, long-context queries, and reasoning-model queries can use substantially more — orders of magnitude vary by request type."* This frames inference cost as a *spectrum that depends on request type* rather than a single multiplier that ages badly.

---

### C4. Guide 18 — Codeium and Windsurf are listed as separate tools; they are the same company (and Windsurf has since been split between Google + Cognition)
**File/lines:** `guide18.jsx:8` (`tools: "Copilot, Codeium, Supermaven"`) and `guide18.jsx:10` (`tools: "Claude Code, Cursor, Windsurf"`).

**What's wrong:** **Codeium rebranded to Windsurf in April 2025**, and the company subsequently went through a high-profile acquisition: in July 2025 Google licensed the founding team and core IP for ~$2.4B, and Cognition AI acquired the remaining Windsurf company, product, and brand. So the guide simultaneously lists "Codeium" (the old brand) and "Windsurf" (the new brand of the same company, now owned by Cognition) as if they were two distinct products — they are the same product line under different names at different times.

Separately, the categories themselves don't quite match the products: Codeium/Windsurf is a full IDE (mode 3, "Agentic Coding"), not a tab-completion tool (mode 1).

**Source:** Neowin, "Codeium is now Windsurf…" (Apr 2025), https://www.neowin.net/news/codeium-is-now-windsurf-launches-windsurf-plugin-for-jetbrains-to-reach-enterprises/ ; HPCwire / DevOps.com, "OpenAI / Google / Cognition Windsurf saga" (May–Jul 2025), https://devops.com/openai-acquires-windsurf-for-3-billion-2/ ; Elephas, "Windsurf split between Google, OpenAI, and Cognition" (Jul 2025), https://elephas.app/blog/windsurf-ai-3-billion-collapse-72-hours .

**Recommendation:** Don't enumerate vendor brand names at all in this list — they age in months, not years. Replace each `tools` field with a *category description*:
- Code completion: "Inline-completion plugins from major editor and AI vendors."
- Chat assistants: "General-purpose chat models from frontier vendors."
- Agentic coding: "Agentic IDEs and CLI tools that can read, edit, and run code in your project."
- Code review: "Bot integrations on GitHub/GitLab; in-IDE inline review tools."

Then add a single line: *"Specific tool names in this space change frequently (acquisitions, rebrands, new entrants). The four modes are stable; the brands are not."*

---

### C5. Guide 24 — the entire model list is a snapshot and is already 1–2 generations stale as of 2026-04
**File/lines:** `guide24.jsx:8–13`.

**What's wrong:** The frontier-tier example list is `"GPT-4o, Claude Opus, Gemini Ultra"`. As of 2026-04:
- **GPT-4o** (May 2024) is two product generations behind; the GPT-5 family is current frontier and crosses 1M context.
- **Claude Opus** is unversioned; the current frontier as of March 2026 is Claude Opus 4.6 / Sonnet 4.6 with 1M context at standard pricing.
- **"Gemini Ultra"** is not a current product name; Google's frontier offerings are Gemini 3.x Pro / Gemini 3 Flash (also 1M context).

The mid-tier list (`GPT-4o-mini, Gemini Flash`) and small-model list (`Llama 3, Mistral, Phi-3`) are similarly out of date — Llama 3 has been superseded by Llama 4, etc.

**Source:** elvex.com, "Context Length Comparison: Leading AI Models in 2026" (https://www.elvex.com/blog/context-length-comparison-ai-models-2026); codingscape.com, "Most powerful LLMs in 2026" (https://codingscape.com/blog/most-powerful-llms-large-language-models); Anthropic 1M-context GA announcement (March 2026, referenced in elvex above).

**Recommendation:** This is the single biggest longevity issue in the collection. The fix is structural, not editorial: **stop naming specific models in this guide entirely**. The guide already nails the right framing in `guide24.jsx:76–82` ("The model landscape moves fast … Today's frontier model is next year's mid-tier … Don't over-optimize for today's pricing"). So the body should match that framing. Replace each `examples` field with a *durable signature*:
- Frontier: "Largest models from the major labs at any given moment — typically the most expensive per token, slowest per request, but highest in reasoning, multimodal, and long-context performance."
- Mid-tier: "Faster, cheaper general-purpose models — usually 5–20× cheaper than frontier with most of the quality on common tasks."
- Small / local: "Open-weight models that run on consumer GPUs or laptops; quality continues to climb each cycle."
- Specialized: "Models fine-tuned for code, medicine, legal, or other domains — best in their lane, narrower outside it."

Then optionally add a footer link: *"For current model names and pricing, check vendor pages directly: Anthropic, OpenAI, Google AI, Meta."*

---

## Verified correct (no fix needed)

These are claims I checked and want to call out as confirmed, so the author doesn't second-guess:

- **Guide 1 — "It doesn't look up stored facts — it reconstructs plausible answers from patterns"** (`guide1.jsx:50`). This is the right framing for hallucination's root cause and ages well. Karpathy's "Let's build GPT" series uses essentially this language.
- **Guide 1 — "A single training run can cost millions of dollars and take months"** (`guide1.jsx:58`). True for frontier models in 2026; durable framing because no specific number is pinned.
- **Guide 2 — Token-counting examples** (`guide2.jsx:7–14`). The specific tokenizations (e.g. `"GPT-4 is great"` → 6 BPE tokens; `"unconstitutional"` splitting into wordpiece chunks) are representative of cl100k_base / o200k_base tokenizers. The "1 token ≈ ¾ of a word in English" rule of thumb (line 65) and the leading-space convention (line 67) are both correct OpenAI / SentencePiece behavior.
- **Guide 4 — Temperature simulator math** (`guide4.jsx:28`). The `Math.exp(-i / Math.max(temp, 0.1))` weighting is a reasonable temperature-style sampling demo (lower temp → sharper distribution). Code is correct.
- **Guide 5 — Transformer layers list** (`guide5.jsx:8–14`). Embedding → Attention → Feed-Forward → Repeat → Output is the right block-level description. The bank/river attention example is the canonical illustration.
- **Guide 7 — Few-shot framing** is accurate; the 3–5 examples sweet-spot rule of thumb is empirically defensible (more examples can hurt because they can dominate format over content).
- **Guide 8 — System prompts: "models pay more attention to the beginning"** (`guide8.jsx:59`). True — this is the well-documented "lost in the middle" / position-bias result (Liu et al. 2024) that holds across major models.
- **Guide 13 — "The model doesn't actually run tools itself … it outputs a structured request … the host system executes it"** (`guide13.jsx:70`). This is exactly the right mental model and the right *safety* framing. Excellent line.
- **Guide 14 — Think → Plan → Act → Observe → Reflect → Repeat** is essentially the ReAct (Yao et al. 2022) loop and is the right durable framing for agentic behavior.
- **Guide 16 — MCP description**. The "USB for AI" analogy, the host/client/server vocabulary, and the N+M vs N×M framing are all accurate as of MCP's late-2024 launch and 2025 broad adoption (OpenAI added official support in March 2025; Google DeepMind / Demis Hassabis confirmed Gemini support in April 2025; Anthropic donated MCP to a Linux Foundation–hosted "Agentic AI Foundation" in late 2025). This guide is one of the strongest pieces in the deck.
- **Guide 17 — autonomy spectrum**. The four-tier framing (Full Human Control → Human Approval → Human Oversight → Full Autonomy) maps cleanly to NIST AI RMF and to safety practice and ages well.
- **Guide 21 — "Hotly debated. Some argue it's fair use … Multiple lawsuits are testing this"** (`guide21.jsx:22`). Accurate as of 2026 — *Bartz v. Anthropic* (Jun 2025) and *Kadrey v. Meta* (Jun 2025) both held training to be fair use, but with split reasoning, and *Bartz* settled with Anthropic paying up to $1.5B over the *pirated-source* aspect (the training itself was held transformative). The guide's "actively deciding these questions" framing is accurate; specific case names need not be added but could.
- **Guide 22 — Training energy "50+ GWh" for a GPT-4-scale run** (`guide22.jsx:8`). This is the consensus estimate (Ludvigsen 2023, MIT Tech Review 2025: 50–62 GWh range). Durable enough.
- **Guide 23 — "AI literacy is becoming as important as computer literacy was in the 2000s"**. Aging well so far.
- **Guide 24 — Decision Framework + "model landscape moves fast" callout** (`guide24.jsx:60–82`). Excellent. This part of Guide 24 is durable; only the example-model lists at the top of the same guide are stale (C5).

---

## Minor accuracy issues (should fix, low priority)

### M1. Guide 1 — "Pre-training vs Fine-tuning" doesn't mention RLHF / RLAIF / DPO
**File/lines:** `guide1.jsx:11`. The current text says fine-tuning "adjusts behavior for specific tasks like following instructions or being helpful." That's not wrong but conflates SFT with preference / RL methods. The instruction-following and helpfulness behavior of frontier chat models comes from a multi-stage pipeline: pre-training → supervised fine-tuning (SFT) → reinforcement learning from human feedback (RLHF) and/or RLAIF / Constitutional AI / DPO. A one-line addition would be more durable: *"Modern chat models are pre-trained, then refined with supervised fine-tuning, then with preference-based methods (RLHF, DPO, Constitutional AI) that align them with human preferences."*

### M2. Guide 1 — "Not a search engine. It doesn't browse the web in real time (unless given tools to do so)"
**File/lines:** `guide1.jsx:51`. Correct, and the parenthetical is good. As of 2026, almost every consumer-facing chat product *does* have a browse/search tool turned on by default, so the *practical* user experience is that "the chatbot can search the web." The framing here is still accurate at the model layer (the LLM itself isn't a search engine), but readers may be confused. Consider rewording: "Not a search engine on its own. Most chat products combine the LLM with a search tool, but the LLM itself is just predicting tokens — it isn't crawling the web."

### M3. Guide 2 — Token examples don't disambiguate which tokenizer
**File/lines:** `guide2.jsx:7–14`. The token splits shown are roughly cl100k_base / o200k_base style. Different tokenizers (SentencePiece / BPE / Llama / Gemini) produce different splits for the same text. Worth one sentence: "These tokens are roughly what OpenAI's tokenizer would produce. Other tokenizers (Llama, Gemini, Claude) split text differently."

### M4. Guide 3 — The numeric context-window table is the most-pinned data in the whole collection
**File/lines:** `guide3.jsx:7–12`. The table says GPT-4o = 128K, Claude 3.5 Sonnet = 200K, Llama 3 8B = 8K, Gemini 1.5 Pro = 1M. As of 2026-04 every row is dated:
- The entire table predates the 1M-token wave that's now standard at the frontier.
- Llama 3 (8B) has been superseded by Llama 4.
- The "200K" row is interesting because Claude 4.6's 1M GA happened on March 13, 2026 (Anthropic announcement) — so the model name and the number are *both* one major release out of date.

This is the same class of issue as C5 but with smaller stakes because at least the table is *internally* coherent (each row pairs a real model with its real-at-launch context). Recommended fix: keep the bar-chart UI but replace specific model names with categories ("Frontier reasoning model — ~1M tokens", "Frontier chat model — ~200K–1M", "Open-weight 8B class — 8K–32K", "Long-context flagship — 1M+"). Then add the line that's already in `guide24.jsx:76`: "Today's frontier number is next year's normal."

### M5. Guide 3 — "200K tokens ≈ roughly 500 pages of text"
**File/lines:** `guide3.jsx:82`. The conversion is roughly right (200K tokens × 0.75 word/token / ~250 words/page ≈ 600 pages). 500 is in the ballpark. Fine; just note that page-density assumptions vary.

### M6. Guide 4 — Temperature `1.5` labeled "Wild — often incoherent"
**File/lines:** `guide4.jsx:11`. Most chat APIs cap user-facing temperature at 1.0 or 2.0, and many backends rescale internally. The `1.5` example will not necessarily produce maximally chaotic output on every API. Minor — the *direction* of the demo is right.

### M7. Guide 5 — "A model with 10B parameters might fail where a 100B model succeeds" (emergent abilities)
**File/lines:** `guide5.jsx:61`. The "emergent abilities" framing is a real research result (Wei et al. 2022) but has been contested (Schaeffer et al. 2023, "Are Emergent Abilities of Large Language Models a Mirage?" — argues many "emergent" jumps are artifacts of discontinuous metrics). Worth softening to: "Some abilities appear sharply at certain scales, though some apparent jumps turn out to be measurement artifacts."

### M8. Guide 8 — "System prompts aren't truly 'secret'. Determined users can sometimes get models to reveal them"
**File/lines:** `guide8.jsx:66`. Correct, but the framing is one degree too soft. As of 2026, prompt-injection / system-prompt-extraction is *routinely possible* on most chat products with sufficient effort — it's not an edge case. Strengthen to: "System prompts should be treated as low-confidentiality. Standard prompt-injection techniques can usually extract them. Never put credentials or sensitive PII there."

### M9. Guide 13 — "Image Generation" listed as a tool with example "Draw a diagram of a microservices architecture"
**File/lines:** `guide13.jsx:12`. Image *generation* is one capability; the bigger and more-used multimodal capability as of 2026 is image *input* (vision) — most frontier chat models accept images, audio, and (increasingly) video as input. Worth either splitting the row into "Multimodal input (vision/audio/video)" + "Image generation," or replacing with the more general "Multimodal — read images/audio, generate images/audio."

### M10. Guide 16 — "Example MCP servers: GitHub, Filesystem, PostgreSQL, Slack, Puppeteer"
**File/lines:** `guide16.jsx:67–80`. Accurate as of late 2024 / early 2025 launch. By 2026-04 the MCP server ecosystem has 10,000+ public servers (per modelcontextprotocol.io's first-anniversary post) and the named-five list is somewhat dated (Puppeteer-MCP exists but Playwright-MCP and Chrome MCP are now more commonly cited). Not wrong; just not representative. Consider replacing with a category description: "Servers exist for source control (GitHub/GitLab), files, databases, browsers, chat platforms, observability tools, calendars — essentially every developer tool has an MCP wrapper."

### M11. Guide 19 — "Codex" listed as a specialized model
**File/lines:** `guide24.jsx:12`. Codex (the name) was retired by OpenAI in 2023. The brand was *revived* in 2025 for OpenAI's coding-agent product, so "Codex" *is* a current name again, but the framing here ("Codex, Med-PaLM, domain fine-tunes") groups Codex with Med-PaLM (also a Google research artefact, not a shipping product). Both items have shifting status. This is a longevity issue; the list is symptomatic of the larger Guide 24 problem (C5).

### M12. Guide 20 — "What counts as 'helpful' or 'harmful' varies across cultures and contexts"
**File/lines:** `guide20.jsx:9`. Accurate. Worth strengthening: "RLHF and similar preference-tuning methods optimize for the preferences of the *raters* doing the labeling — typically a non-representative sample. The result is that the model's notion of 'helpful' or 'harmful' is shaped by that population." This is the Bender et al. 2021 / "Stochastic Parrots" critique applied to alignment, and it ages well.

### M13. Guide 22 — "Video streaming, cryptocurrency mining, and air travel each have larger total carbon footprints globally"
**File/lines:** `guide22.jsx:58`. True today, but as AI inference scales (the Surfshark / BestBrokers numbers project ~5–10 TWh/year just for ChatGPT, and that's one product), the comparison may shift. Durable rephrasing: "AI's energy use is growing fast; even so, the *current* total is still smaller than other large categories like video streaming, crypto mining, and air travel."

---

## Effectiveness improvements

### E1. Guide 9 — once C1 is fixed, add a CoT failure mode
The CoT guide is otherwise excellent. After the corrected demo, add a one-line caveat: *"CoT isn't free — it costs tokens, and on some problems the model 'reasons' itself into a wrong answer it would have gotten right directly. Verify the conclusion, not just the chain."* This is the "CoT can hurt" finding (Sprague et al. 2024 and others).

### E2. Guide 10 — structured output guide should mention JSON Schema / structured-outputs APIs explicitly
The Tip on `guide10.jsx:54` is good. Make the body of the guide reflect the same point: "asking nicely in the prompt" is the *fallback* — the durable correct answer is "use the API's structured-output / function-call / JSON-Schema mode, which constrains decoding and is essentially 100% reliable on schema conformance." The current guide treats this as a footnote when it should be the headline.

### E3. Guide 11 — the "Iterative Refinement" pattern needs a caveat
`guide11.jsx:31`. "Produce, critique, then improve" is a solid pattern, but it can also produce *worse* output if the critique step over-anchors on superficial issues. Recent research (Huang et al. 2024, "Large Language Models Cannot Self-Correct Reasoning Yet") shows self-critique can hurt on reasoning tasks. Worth a one-line nuance: "Works well for style, prose, and persuasion; mixed evidence on whether self-critique helps on reasoning correctness."

### E4. Guide 13 — the tool-use guide should explicitly introduce the *trust boundary*
`guide13.jsx:50–66` describes the request → execute → return loop, and `guide13.jsx:70` correctly notes the host executes. Great. Add one more piece: "Because the model produces tool *requests* — not tool *executions* — the host can refuse, validate, or sandbox any request. This is the only place to enforce safety and authorization. The model cannot be trusted to enforce these for you." This sets up Guide 17 nicely.

### E5. Guide 14 — agentic loop needs a stop-condition section
The Think/Plan/Act/Observe/Reflect/Repeat loop is well-presented, but readers will not learn *when the loop ends*. Add a brief section: "Loops can run forever or burn budget on the wrong path. Practical agents have stop conditions: success criteria met, budget exhausted (token/tool-call cap), maximum iterations, repeated failure pattern detected, human escalation triggered." This is also the right place to warn about cost runaway.

### E6. Guide 15 — "Provide context the model might be missing" is too vague
`guide15.jsx:55`. "Your role as the human" is good, but #3 ("Provide context") could be sharpened with the durable rule: *"Models cannot ask clarifying questions reliably — if a task is ambiguous, write it out unambiguously upfront. The clarification you wish the model would ask is the context you should put in the prompt."* This is the highest-ROI piece of advice for users new to AI.

### E7. Guide 17 — add a fifth row to the autonomy spectrum: "Closed-loop unattended"
`guide17.jsx:7–12`. "Full Autonomy" is a single bucket but in practice it splits into *unattended-with-monitoring* (logs reviewed, anomalies trigger paging) and *unattended-no-monitoring*. The latter is where AI accidents happen. Worth either splitting Full Autonomy or adding a callout.

### E8. Guide 19 — orchestration patterns are good; add evaluation/observability
The "Building Blocks" list is solid. One missing thing: *evals*. Production AI systems are differentiated by their eval harnesses far more than by which orchestration pattern they use. A bullet: "**Evals**: a set of input/expected-output pairs (or a graded rubric) you run on every change. Without evals, you cannot tell if a prompt edit helped or hurt." This is the most-important missing piece in most LLM applications.

### E9. Guide 20 — bias guide needs a worked example, not a generic checklist
The "Test with diverse inputs" advice (`guide20.jsx:42`) is good but abstract. Show one concrete case: send the same résumé to the model twice with name "John Smith" vs "Jamal Washington" and inspect for differential treatment. This is the canonical bias test (Bertrand & Mullainathan applied to LLMs). The pattern *is* the lesson.

### E10. Guide 21 — copyright guide should mention output-side memorization
`guide21.jsx`. The guide focuses on training-side fair use and ownership of output. It does not mention that LLMs sometimes reproduce *verbatim chunks* of copyrighted training data (the Times v. OpenAI evidence; the GitHub Copilot license-laundering complaint; *Bartz* on memorized passages). This is a separate copyright surface from the training-data debate and is what most working developers will actually encounter. One line: "LLMs sometimes reproduce snippets from training data verbatim. If your output looks suspiciously polished, search for it — you may be reading something copyrighted."

### E11. Guide 24 — model selection guide should mention reasoning models as a separate axis
`guide24.jsx`. The four tiers (Frontier / Mid / Small / Specialized) miss the dimension that became important in 2025: *reasoning models*. A reasoning model from any tier (small reasoning model, mid reasoning model, frontier reasoning model) trades latency and cost for accuracy on hard problems. Worth a fifth row or a dimension-axis: "Reasoning vs. non-reasoning — reasoning models think before answering, costing more time and tokens but producing higher accuracy on hard problems. Most major vendors offer both."

### E12. Across all guides — no end-to-end "iteration loop" guide
The Prompt Craft category teaches specificity (G6), few-shot (G7), system prompts (G8), CoT (G9), structure (G10), patterns (G11), and quizzes (G12). It does *not* teach the meta-skill of *iterating on a prompt*: write → run → notice failure mode → adjust → retest. This is arguably the most important prompting skill and would benefit from its own guide (replace G12 quiz with iteration, move quiz to end of category, or add a new G11.5 between Patterns and Quiz). The current `guide6.jsx:63` Tip mentions this in passing — it deserves a full guide.

---

## Coverage gaps

### G1. No dedicated hallucination guide — highest-impact missing topic
Hallucination is mentioned in `guide1.jsx:56` (Tip) but never *taught*. There is no guide on:
- What hallucination is mechanically (next-token sampling without grounding).
- What *causes* it (training data sparsity, distributional shift, "say something" pressure).
- How to *mitigate* it (RAG / retrieval, citations, "say I don't know," verification, lowering temperature on factual tasks).
- What does **not** fix it (more parameters alone, "tell the model not to hallucinate" — empirically very weak; politeness — ineffective).
- How to *detect* it (cross-check, ask twice, look up sources, Brier-score-style confidence calibration).

This is **the** highest-impact AI literacy concept. The collection has 25 guides and skips it. Strong recommendation: add a Hallucination guide, ideally in Foundations (between current G3 and G4) or as the headliner of Practical.

### G2. No RAG guide
`guide3.jsx:75` mentions RAG as an "overflow strategy" without explaining what it is. RAG is the dominant production pattern for grounding LLMs in current/proprietary data and the standard antidote to hallucination. Should have its own guide in Agentic or Practical: retrieve relevant chunks → put them in the prompt → cite the sources → verify.

### G3. No reasoning-models guide
Reasoning models (OpenAI o-series, Claude extended thinking, Gemini thinking, DeepSeek R1) are a distinct category as of 2025–2026 with different cost / latency / accuracy trade-offs and different prompting practice (don't ask them to "think step by step" — they already do). One mention in `guide9.jsx:71`. Deserves a full guide, especially since reasoning models will likely be the default within 12 months.

### G4. No training-cutoff / time-awareness guide
LLMs have training cutoffs and tend to confabulate when asked about post-cutoff events. Not covered. This is daily-relevant — every user hits it. One short guide: "All models have a training cutoff. Ask the model what it knows about. Don't trust it on news, prices, or anything time-sensitive without giving it a tool." Pairs naturally with the hallucination guide.

### G5. No prompt-injection / jailbreak guide
Brief mention in `guide8.jsx:66`. Worth its own short guide given how common prompt-injection attacks are in agentic systems (the attacker puts instructions in a webpage / email / document, and the agent reads them as if from the user). Belongs in Agentic or Ethics.

### G6. Multimodal input is barely covered
`guide13.jsx:12` lists "Image Generation" as one tool. Vision (image input), audio input, and increasingly video input are all standard frontier capabilities by 2026 but get no treatment. A short multimodal guide would round out the Foundations category.

### Borderline / non-gaps
- **No safety/alignment guide** — partially covered by Guide 17 (HITL), Guide 20 (bias), and Guide 23 (society). Probably enough for a "how to use AI" collection; deeper alignment topics (RLHF specifics, mesa-optimization, deceptive alignment) belong in a different audience.
- **No fine-tuning guide** — fine-tuning is mentioned in Guide 1 and Guide 24. For an end-user audience, that's likely sufficient.

### Category structure
The 5-category split (Foundations / Prompt Craft / Agentic / Ethics / Practical) is clean. Practical is a bit thin — it's only Guide 24 (model selection) and Guide 25 (final quiz). Adding a hallucination guide and a RAG guide to Practical would round it out and produce a more even category-size distribution.

---

## Longevity-flagged claims (this is the high-risk lens)

Each row below is a version-pinned or date-pinned claim that should be rewritten in durable form. These are claims I expect to be wrong within 6–12 months from 2026-04, *not* claims that are wrong now (that's the Critical / Minor sections above).

| # | File:line | Pinned claim | Recommended durable rephrasing |
|---|---|---|---|
| L1 | `guide2.jsx:59` | "Every model has a maximum token count (e.g., 200K tokens)" | "Every model has a maximum token count, which has grown from thousands to millions of tokens over a few years and continues to grow." |
| L2 | `guide2.jsx:65` | "1 token ≈ ¾ of a word in English. So 1,000 tokens ≈ 750 words." | Keep — this is a property of BPE/WordPiece on Latin-alphabet text and stays roughly stable. |
| L3 | `guide3.jsx:7–12` | Entire context-window table (`GPT-4o`, `Claude 3.5 Sonnet`, `Llama 3 (8B)`, `Gemini 1.5 Pro`) | Replace named models with category labels; use a footnote saying "specific numbers will rise — the *categories* matter." |
| L4 | `guide3.jsx:82` | "200K tokens ≈ roughly 500 pages of text" | Durable as a rule of thumb; leave as is or genericize: "100K tokens ≈ roughly 250 pages." |
| L5 | `guide4.jsx:7–12` | Temperature presets ("Factual 0.0", "Balanced 0.7", "Creative 1.0", "Wild 1.5") | Durable enough — these are conceptual buckets, not vendor-specific. Note that some APIs use 0–1 scale and others 0–2; the *direction* is universal. |
| L6 | `guide5.jsx:66` | "Models don't have hidden thoughts" | (See C2.) Reframe as: "Plain LLMs reason in visible tokens; reasoning models also reason in tokens, but those tokens may be hidden from the user." |
| L7 | `guide6.jsx` (whole guide) | Specificity, constraints, audience-targeting | Durable. Leave. |
| L8 | `guide7.jsx` (whole guide) | Few-shot framing | Durable. Leave. |
| L9 | `guide8.jsx:66` | "Determined users *can sometimes* get models to reveal them" | (See M8.) "System prompts can usually be extracted by determined users; treat them as low-confidentiality." |
| L10 | `guide9.jsx:71` | "Some models now do chain-of-thought internally (extended thinking)" | Add: "By 2026 this is standard for reasoning models from all major vendors, and is becoming the default for hard tasks." |
| L11 | `guide10.jsx:54` | "Many APIs now support 'structured outputs'" | "Most major APIs (OpenAI, Anthropic, Google, etc.) support a structured-output / function-call / JSON-schema mode that guarantees schema conformance — use it instead of asking nicely." |
| L12 | `guide13.jsx:7–13` | Tool-use examples (Web Search, Code Execution, File System, API Calls, Image Generation) | Durable categories. Leave. |
| L13 | `guide13.jsx:12` | "Image Generation" as the multimodal example | Replace with "Multimodal — image/audio/video input, image/audio output." |
| L14 | `guide14.jsx` (whole guide) | Think → Plan → Act → Observe → Reflect → Repeat | Durable; this is essentially ReAct and ages well. Leave. |
| L15 | `guide16.jsx` (whole guide on MCP) | "MCP is open source and growing fast" | Durable; consider adding "now hosted under the Linux Foundation's Agentic AI Foundation" since that's the durable governance structure as of late 2025. |
| L16 | `guide17.jsx` (autonomy spectrum) | Examples (autocomplete, Claude Code, autoscaling) | Durable framing; the *Claude Code* mention will be fine because it's a class-of-product reference, but consider genericizing to "agentic IDEs" since the specific product name will change. |
| L17 | `guide18.jsx:8–11` | Tool lineups in each mode (Copilot, Codeium, Supermaven; Claude Code, Cursor, Windsurf) | (See C4.) Replace with category descriptions; the brand churn rate in this space is < 12 months. |
| L18 | `guide19.jsx` (whole guide) | Sequential / Parallel / Router / Evaluator-Optimizer | Durable — these are orchestration *patterns*, not vendor features. Leave. |
| L19 | `guide20.jsx:9` | "A model trained mostly on English text may perform poorly on other languages" | Durable. Leave. |
| L20 | `guide21.jsx:50` | "Courts in the US, EU, and elsewhere are actively deciding these questions" | Durable. The *specific* outcome paragraph will need updating as cases settle, but the framing ages well. Consider adding: "As of 2026, US district courts have held training itself to be transformative, while pirated-source acquisition is not (Bartz v. Anthropic, Kadrey v. Meta, both 2025)." Then delete the time-pinned sentence after the next major ruling. |
| L21 | `guide22.jsx:9` | "One query ≈ 10x a Google search in energy" | (See C3.) "A typical text query is roughly comparable to a Google search; multimodal/long-context/reasoning queries can be much more — costs vary by request type." |
| L22 | `guide22.jsx:8` | "GPT-4-scale training: estimated 50+ GWh" | Durable enough; consider genericizing to "Training a frontier model takes tens to hundreds of GWh, comparable to a small city's annual use." |
| L23 | `guide24.jsx:8–13` | Frontier / mid-tier / small example lists (GPT-4o, Claude Opus, Gemini Ultra, etc.) | (See C5.) Strip names entirely — the guide already says "specific model names go out of date quickly," let the body match. |
| L24 | `guide24.jsx:79` | "What costs $10 today may cost $0.10 in two years" | Durable as a *trend* claim. The specific 100× factor is dramatic but defensible (frontier-quality cost has dropped roughly 10× per year for several years). Consider: "Per-token costs have fallen roughly an order of magnitude per year for several years; expect this to continue for at least the near term." |

---

## Per-guide notes (only where issues exist)

### Guide 1 — What Is an LLM?
- Pre-training/fine-tuning description doesn't mention RLHF/DPO (M1).
- "Not a search engine" needs a parenthetical updated for the world where most chat products *do* have search tools by default (M2).

### Guide 2 — Tokens & Tokenization
- Token splits are fine; could note which tokenizer (M3).
- "200K tokens" example has the same generation issue as Guide 3 (L1).

### Guide 3 — Context Windows
- Specific model table is the highest-density longevity issue (M4 / L3). Replace with category labels.

### Guide 5 — How Models "Think"
- The flagship Tip ("Models don't have hidden thoughts") is now wrong as a categorical rule because of reasoning models (C2). Reword.
- Emergent abilities framing has been contested by Schaeffer et al. (M7).

### Guide 8 — System Prompts
- "Sometimes" should be "usually" for system-prompt extractability (M8).

### Guide 9 — Chain of Thought
- The CoT demo claims the direct answer is "(incorrect)" but shows the correct answer (C1). Critical — fix the example or remove the label.
- Add a "CoT can hurt" caveat (E1).

### Guide 10 — Structured Output
- The structured-output API support deserves the headline, not a footnote (E2).

### Guide 11 — Prompt Patterns
- Iterative-Refinement pattern needs a "may not help on reasoning" caveat (E3).

### Guide 13 — Tool Use
- Image Generation row should be expanded to multimodal input + output (M9, L13).
- Add the trust-boundary framing explicitly (E4).

### Guide 14 — Agentic Loops
- Add a stop-condition / budget section (E5).

### Guide 15 — Multi-Step Reasoning
- "Provide context" tip can be sharper (E6).

### Guide 16 — MCP & Protocols
- Strong guide overall (verified correct).
- Example MCP server list is becoming dated; consider category language (M10).
- Optional: mention Linux Foundation governance as durable framing (L15).

### Guide 17 — Human in the Loop
- Strong guide. Optional: split "Full Autonomy" into monitored / unmonitored (E7).

### Guide 18 — AI Coding Assistants
- Tool lists have Codeium AND Windsurf as separate items but they are the same product (C4 / L17). Strip names entirely.

### Guide 19 — Orchestration
- Add evals as a Building Block (E8).

### Guide 20 — Bias & Fairness
- Add a worked diverse-input example (E9).
- Strengthen the "RLHF reflects rater preferences" framing (M12).

### Guide 21 — Copyright & Ownership
- Add memorization / verbatim-reproduction risk on the output side (E10).
- Optionally add the Bartz / Kadrey 2025 ruling framing (L20).

### Guide 22 — Environmental Impact
- "10× Google search" is the most-stale single claim in the collection — needs updating (C3 / L21).
- "Larger total carbon footprints" comparison is durable but worth a "growing fast" caveat (M13).

### Guide 24 — Models & Trade-offs
- Specific model lists are 1–2 generations stale (C5 / L23). Strip names; the framing in the guide's own callout (`guide24.jsx:76–82`) is the right durable text.
- Add reasoning vs. non-reasoning as a fifth dimension (E11).
- "Codex" and "Med-PaLM" as specialized examples — both names are in flux (M11).

---

## Sources cited

### Primary vendor / standards docs (current as of 2026-04)
- Anthropic, "Building with extended thinking": https://docs.claude.com/en/docs/build-with-claude/extended-thinking
- Anthropic, "Claude's extended thinking" (visible CoT decision): https://www.anthropic.com/news/visible-extended-thinking
- Anthropic, "Donating the Model Context Protocol and establishing the Agentic AI Foundation": https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
- Anthropic, "Introducing the Model Context Protocol" (Nov 2024): https://www.anthropic.com/news/model-context-protocol
- Model Context Protocol spec (2025-11-25): https://modelcontextprotocol.io/specification/2025-11-25
- OpenAI o1 system card: https://openai.com/index/openai-o1-system-card/
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework

### Energy / environmental claims (Critical C3)
- Epoch AI, "How much energy does ChatGPT use?" (Feb 2025): https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use
- TechCrunch, "ChatGPT may not be as power-hungry as once assumed" (Feb 2025): https://techcrunch.com/2025/02/11/chatgpt-may-not-be-as-power-hungry-as-once-assumed/
- Hannah Ritchie / Sustainability by Numbers, "What's the carbon footprint of using ChatGPT or Gemini?" (Aug 2025): https://www.sustainabilitybynumbers.com/p/ai-footprint-august-2025
- Kasper Ludvigsen, "The carbon footprint of GPT-4" (TDS): https://towardsdatascience.com/the-carbon-footprint-of-gpt-4-d6c676eb21ae/
- MIT Technology Review, "We did the math on AI's energy footprint" (May 2025): https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/

### Codeium → Windsurf saga (Critical C4)
- Neowin, "Codeium is now Windsurf, launches Windsurf plugin for JetBrains" (Apr 2025): https://www.neowin.net/news/codeium-is-now-windsurf-launches-windsurf-plugin-for-jetbrains-to-reach-enterprises/
- DevOps.com, "OpenAI Acquires Windsurf for $3 Billion" (May 2025): https://devops.com/openai-acquires-windsurf-for-3-billion-2/
- Elephas, "Windsurf AI Drama: How a $3 Billion Coding Startup Got Split Between Google, OpenAI, and Cognition in Just 72 Hours" (Jul 2025): https://elephas.app/blog/windsurf-ai-3-billion-collapse-72-hours

### Frontier model context windows in 2026 (C5, L3)
- elvex, "Context Length Comparison: Leading AI Models in 2026": https://www.elvex.com/blog/context-length-comparison-ai-models-2026
- codingscape.com, "Most powerful LLMs in 2026": https://codingscape.com/blog/most-powerful-llms-large-language-models
- Artificial Analysis LLM leaderboard: https://artificialanalysis.ai/leaderboards/models

### Copyright / fair use (Guide 21, M12, L20)
- IPWatchdog, "Three Key Decisions on AI Training and Copyrighted Content from 2025": https://ipwatchdog.com/2025/12/23/copyright-ai-collide-three-key-decisions-ai-training-copyrighted-content-2025/
- Skadden, "Fair Use and AI Training: Two Recent Decisions" (Jul 2025): https://www.skadden.com/insights/publications/2025/07/fair-use-and-ai-training
- White & Case, "Two California district judges rule that using books to train AI is fair use": https://www.whitecase.com/insight-alert/two-california-district-judges-rule-using-books-train-ai-fair-use

### Foundational / academic references
- Wei et al. (2022), "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models," NeurIPS 2022: https://arxiv.org/abs/2201.11903
- Yao et al. (2022), "ReAct: Synergizing Reasoning and Acting in Language Models": https://arxiv.org/abs/2210.03629
- Schaeffer, Miranda, Koyejo (2023), "Are Emergent Abilities of Large Language Models a Mirage?": https://arxiv.org/abs/2304.15004
- Liu et al. (2024), "Lost in the Middle: How Language Models Use Long Contexts": https://arxiv.org/abs/2307.03172
- Huang et al. (2024), "Large Language Models Cannot Self-Correct Reasoning Yet": https://arxiv.org/abs/2310.01798
- Bender, Gebru, McMillan-Major, Shmitchell (2021), "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?": https://dl.acm.org/doi/10.1145/3442188.3445922
- Karpathy, "Let's build GPT: from scratch, in code, spelled out": https://karpathy.ai/zero-to-hero.html
- Olah et al., "Transformer Circuits Thread": https://transformer-circuits.pub/

### MCP ecosystem
- Wikipedia, Model Context Protocol: https://en.wikipedia.org/wiki/Model_Context_Protocol
- "Why the Model Context Protocol Won," The New Stack: https://thenewstack.io/why-the-model-context-protocol-won/
- "One Year of MCP" (Nov 2025): https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/
