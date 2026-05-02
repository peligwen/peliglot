/**
 * Vitest tests for the Spanish practice surface.
 *
 * Uses adapter injection via `<Practice adapter={...} getCards={...} />` — no
 * module mocks needed. The `StubRemoteAdapter` from `src/mastery/adapters/stubRemote.ts`
 * provides an in-memory backend that mirrors the localStorage adapter's contract.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  Practice,
  EmptyState,
  placeholderFor,
  getMcqOptions,
  formatNextDue,
  nextDueDisplayMsForCard,
  TYPING_ENABLED_KINDS,
  MCQ_KINDS,
  ENGLISH_ANSWER_KINDS,
  KINDS_WITH_PROMPT_SPEAK,
  KINDS_AUTO_PLAY_ON_REVEAL,
} from './index';
import { StubRemoteAdapter } from '../../../mastery/adapters/stubRemote';
import type { ReviewCard } from '../../../mastery/cards';
import { speakSpanish } from '../../../utils/speech';

// Stub speakSpanish so tests don't attempt Web Speech API calls in jsdom.
// The mock reference is used in mute-toggle tests to assert the chokepoint.
vi.mock('../../../utils/speech', () => ({
  speakSpanish: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

const mockCard: ReviewCard = {
  cardId: 'test-card-1',
  guideId: 1,
  guideSlug: 'spanish',
  kind: 'letter-sound',
  prompt: { kind: 'letter-sound', letter: 'A' },
  answer: '/a/',
  acceptableAnswers: ['like "ah"'],
  speakText: 'a',
};

const mockVerbCard: ReviewCard = {
  cardId: 'test-verb-card-1',
  guideId: 4,
  guideSlug: 'spanish',
  kind: 'verb-conjugation',
  prompt: { kind: 'verb-conjugation', verb: 'hablar', pronoun: 'yo', meaning: 'to speak' },
  answer: 'hablo',
  speakText: 'hablo',
};

const mockNounGenderCard: ReviewCard = {
  cardId: 'test-noun-gender-1',
  guideId: 11,
  guideSlug: 'spanish',
  kind: 'noun-gender',
  prompt: { kind: 'noun-gender', noun: 'libro', meaning: 'book' },
  answer: 'el (masculine)',
  speakText: 'libro',
};

// MCQ fixture pool — 5 idiom cards so getMcqOptions has enough distractors
// to fill 4 options (1 correct + 3 distractors).
const mockIdiomCards: ReviewCard[] = [
  {
    cardId: 'spanish-32-tener-calor',
    guideId: 32,
    guideSlug: 'spanish',
    kind: 'idiom-meaning',
    prompt: { kind: 'idiom-meaning', idiom: 'tener calor', literal: 'to have heat' },
    answer: 'to be hot',
    speakText: 'tener calor',
  },
  {
    cardId: 'spanish-32-tener-hambre',
    guideId: 32,
    guideSlug: 'spanish',
    kind: 'idiom-meaning',
    prompt: { kind: 'idiom-meaning', idiom: 'tener hambre', literal: 'to have hunger' },
    answer: 'to be hungry',
    speakText: 'tener hambre',
  },
  {
    cardId: 'spanish-32-tener-sed',
    guideId: 32,
    guideSlug: 'spanish',
    kind: 'idiom-meaning',
    prompt: { kind: 'idiom-meaning', idiom: 'tener sed', literal: 'to have thirst' },
    answer: 'to be thirsty',
    speakText: 'tener sed',
  },
  {
    cardId: 'spanish-32-tener-sueno',
    guideId: 32,
    guideSlug: 'spanish',
    kind: 'idiom-meaning',
    prompt: { kind: 'idiom-meaning', idiom: 'tener sueño', literal: 'to have sleep' },
    answer: 'to be sleepy',
    speakText: 'tener sueño',
  },
  {
    cardId: 'spanish-32-tener-prisa',
    guideId: 32,
    guideSlug: 'spanish',
    kind: 'idiom-meaning',
    prompt: { kind: 'idiom-meaning', idiom: 'tener prisa', literal: 'to have hurry' },
    answer: 'to be in a hurry',
    speakText: 'tener prisa',
  },
];

const firstIdiomCard = mockIdiomCards[0]!;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// `getCards` is defined outside `renderPractice` so the function reference is
// stable across re-renders. An arrow defined inside the helper would allocate
// a new function on each call, making the `useMemo` in Practice re-run on
// every test render — a brittleness source, not a bug.
function makeGetCards(cards: ReviewCard[]) {
  return () => cards;
}

function renderPractice(
  adapter: StubRemoteAdapter,
  cards: ReviewCard[],
) {
  const getCards = makeGetCards(cards);
  return render(
    <MemoryRouter>
      <Practice adapter={adapter} getCards={getCards} />
    </MemoryRouter>,
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Practice surface', () => {
  let adapter: StubRemoteAdapter;

  beforeEach(() => {
    adapter = new StubRemoteAdapter();
    vi.clearAllMocks();
    // Pin the Date to 2026-01-15 so todaySeed() returns the deterministic value
    // 20260115, making seededShuffle produce a stable card order across all runs.
    // Using toFake: ['Date'] mocks only the Date constructor/methods, leaving
    // setTimeout/setInterval/Promise resolution untouched.
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-01-15T10:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // -------------------------------------------------------------------------
  // Hydration placeholder
  // -------------------------------------------------------------------------

  it('shows a loading placeholder before hydration', () => {
    // The adapter resolves async so on first render it's not yet hydrated
    renderPractice(adapter, [mockCard]);
    // The loading text should appear before the async bulkExport resolves
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Empty state
  // -------------------------------------------------------------------------

  it('renders empty state when there are no cards', async () => {
    renderPractice(adapter, []);
    await waitFor(() => expect(screen.getByRole('heading', { name: /all caught up/i })).toBeInTheDocument());
    expect(screen.getByText(/no cards are due/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to spanish/i })).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Prompt rendering
  // -------------------------------------------------------------------------

  it('renders a prompt when cards are available', async () => {
    renderPractice(adapter, [mockCard]);
    await waitFor(() => expect(screen.getByText('A')).toBeInTheDocument());
    // Prompt label for letter-sound
    expect(screen.getByText(/what sound/i)).toBeInTheDocument();
    // Show Answer button
    expect(screen.getByRole('button', { name: /show answer/i })).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Show Answer
  // -------------------------------------------------------------------------

  it('reveals the answer when Show Answer is clicked', async () => {
    renderPractice(adapter, [mockCard]);
    await waitFor(() => expect(screen.getByRole('button', { name: /show answer/i })).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: /show answer/i }));

    expect(screen.getByText('/a/')).toBeInTheDocument();
    // Acceptable answer shown in smaller text
    expect(screen.getByText(/like "ah"/i)).toBeInTheDocument();
    // Rating buttons appear
    expect(screen.getByRole('button', { name: /again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /good/i })).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Rating — Good
  // -------------------------------------------------------------------------

  it('calls rateCard with the correct cardId and Rating.Good when Good is clicked', async () => {
    renderPractice(adapter, [mockCard]);

    await waitFor(() => expect(screen.getByRole('button', { name: /show answer/i })).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /show answer/i }));

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /good/i }));
    });

    // After a "Good" rating, the card state should be persisted. Good (3) schedules
    // well into the future — not the same-minute re-queue that "Again" (1) produces.
    // A non-null lastReview and a due date at least a few minutes out confirms the
    // correct rating path was taken through the FSRS scheduler.
    await waitFor(() => {
      const persisted = adapter.peek('test-card-1');
      expect(persisted).toBeDefined();
      expect(persisted?.lastReview).not.toBeNull();
      // Good/Easy always schedules at least 60 s out; Again may be as short as 1 min
      // but Good for a new card is typically 1+ day. Check it's at least 60 seconds.
      expect(persisted?.due).toBeGreaterThan(Date.now() + 60_000);
    });
  });

  // -------------------------------------------------------------------------
  // Next-due message appears after rating
  // -------------------------------------------------------------------------

  it('shows a next-review message after rating', async () => {
    renderPractice(adapter, [mockCard]);

    await waitFor(() => screen.getByRole('button', { name: /show answer/i }));
    fireEvent.click(screen.getByRole('button', { name: /show answer/i }));

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /good/i }));
    });

    // The "Next review: …" message must appear (via data-testid) BEFORE the card
    // is unmounted. The NEXT_DUE_DISPLAY_MS delay (800ms) keeps it visible briefly.
    await waitFor(() => {
      expect(screen.getByTestId('next-due-message')).toBeInTheDocument();
    }, { timeout: 2000 });
    expect(screen.getByTestId('next-due-message').textContent).toMatch(/next review/i);
  });

  // -------------------------------------------------------------------------
  // Header strip
  // -------------------------------------------------------------------------

  it('renders the header strip with streak and daily goal after hydration', async () => {
    renderPractice(adapter, [mockCard]);
    await waitFor(() => screen.getByRole('link', { name: /español/i }));

    // Daily goal progress (default: 0/5)
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    // Due count label
    expect(screen.getByText(/due/)).toBeInTheDocument();
  });

  it('header strip renders an "All collections" link pointing to "/"', async () => {
    renderPractice(adapter, [mockCard]);
    await waitFor(() => screen.getByRole('link', { name: /all collections/i }));
    const homeLink = screen.getByRole('link', { name: /all collections/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  // -------------------------------------------------------------------------
  // Multiple cards — advances to next card after rating
  //
  // With the pinned date seed 20260115, seededShuffle([mockCard, mockVerbCard])
  // produces [mockVerbCard, mockCard]. So the first prompt is the verb card
  // (showing "hablar"), and after rating it the second card (letter-sound "A")
  // should appear. This seed is computed in the test suite setup (beforeEach).
  // -------------------------------------------------------------------------

  it('advances to the next card after rating', async () => {
    renderPractice(adapter, [mockCard, mockVerbCard]);

    // With seed 20260115, first card is mockVerbCard — verb conjugation prompt.
    await waitFor(() => expect(screen.getByText(/hablar/i)).toBeInTheDocument());

    // Verb card is typing-eligible: input and Submit button render.
    // Use "Show Answer" escape hatch to get to the rating buttons.
    fireEvent.click(screen.getByRole('button', { name: /show answer without typing/i }));

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /good/i }));
    });

    // After the advance delay, the second card (mockCard, letter "A") should be shown.
    await waitFor(() => {
      expect(screen.getByText('A')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  // -------------------------------------------------------------------------
  // Typed-answer flow — verb-conjugation (typing-eligible)
  // -------------------------------------------------------------------------

  it('renders an input field for typing-eligible cards (verb-conjugation)', async () => {
    renderPractice(adapter, [mockVerbCard]);
    await waitFor(() => expect(screen.getByText(/hablar/i)).toBeInTheDocument());

    // Input field should be present
    expect(screen.getByRole('textbox', { name: /type your answer/i })).toBeInTheDocument();
    // Submit button should be present
    expect(screen.getByRole('button', { name: /submit answer/i })).toBeInTheDocument();
    // Show Answer escape hatch should be present
    expect(screen.getByRole('button', { name: /show answer without typing/i })).toBeInTheDocument();
  });

  it('shows correct feedback and only a Continue button (no rating buttons) in typed-correct path', async () => {
    renderPractice(adapter, [mockVerbCard]);
    await waitFor(() => expect(screen.getByText(/hablar/i)).toBeInTheDocument());

    const input = screen.getByRole('textbox', { name: /type your answer/i });
    fireEvent.change(input, { target: { value: 'hablo' } });
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));

    await waitFor(() => {
      expect(screen.getByTestId('answer-feedback')).toBeInTheDocument();
    });
    expect(screen.getByTestId('answer-feedback').textContent).toMatch(/correct/i);
    // Typed path: only Continue button — no rating buttons
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^good$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^hard$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^easy$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^again$/i })).not.toBeInTheDocument();
  });

  it('typed-correct → Continue → next card visible; persisted state has Good rating', async () => {
    // Use two verb cards so we don't rely on shuffle order — both are typing-eligible
    const mockVerbCard2: ReviewCard = {
      cardId: 'test-verb-card-2',
      guideId: 4,
      guideSlug: 'spanish',
      kind: 'verb-conjugation',
      prompt: { kind: 'verb-conjugation', verb: 'comer', pronoun: 'tú', meaning: 'to eat' },
      answer: 'comes',
      speakText: 'comes',
    };
    renderPractice(adapter, [mockVerbCard, mockVerbCard2]);

    // Wait for any verb prompt to appear
    await waitFor(() =>
      expect(
        screen.getByRole('textbox', { name: /type your answer/i })
      ).toBeInTheDocument()
    );

    // Determine which card is shown first, then type the correct answer
    const isHablar = !!screen.queryByText(/hablar/i);
    const correctAnswer = isHablar ? 'hablo' : 'comes';
    const firstCardId = isHablar ? 'test-verb-card-1' : 'test-verb-card-2';

    fireEvent.change(screen.getByRole('textbox', { name: /type your answer/i }), {
      target: { value: correctAnswer },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    });

    // Verify the rating was persisted as Good (schedules well into the future)
    await waitFor(() => {
      const persisted = adapter.peek(firstCardId);
      expect(persisted).toBeDefined();
      expect(persisted?.due).toBeGreaterThan(Date.now() + 60_000);
    });

    // Click Continue — should advance to the second verb card
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    });

    // The other verb card's input should now be visible
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: /type your answer/i })).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('typed-incorrect → Continue → next card visible; persisted state has Again rating', async () => {
    // Use two verb cards to avoid shuffle dependency
    const mockVerbCard2: ReviewCard = {
      cardId: 'test-verb-card-2',
      guideId: 4,
      guideSlug: 'spanish',
      kind: 'verb-conjugation',
      prompt: { kind: 'verb-conjugation', verb: 'comer', pronoun: 'tú', meaning: 'to eat' },
      answer: 'comes',
      speakText: 'comes',
    };
    renderPractice(adapter, [mockVerbCard, mockVerbCard2]);

    await waitFor(() =>
      expect(screen.getByRole('textbox', { name: /type your answer/i })).toBeInTheDocument()
    );

    // Determine first card
    const isHablar = !!screen.queryByText(/hablar/i);
    const firstCardId = isHablar ? 'test-verb-card-1' : 'test-verb-card-2';

    // Type a wrong answer
    fireEvent.change(screen.getByRole('textbox', { name: /type your answer/i }), {
      target: { value: 'wronganswer' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));

    await waitFor(() => {
      expect(screen.getByTestId('answer-feedback')).toBeInTheDocument();
    });
    expect(screen.getByTestId('answer-feedback').textContent).toMatch(/correct answer/i);
    // Typed path: only Continue button — no rating buttons
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^again$/i })).not.toBeInTheDocument();

    // Verify Again rating persisted (due should be very soon — within ~10 minutes)
    await waitFor(() => {
      const persisted = adapter.peek(firstCardId);
      expect(persisted).toBeDefined();
      expect(persisted?.due).toBeLessThan(Date.now() + 10 * 60_000 + 5000);
    });

    // Click Continue — should advance to the second card
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    });

    // The other verb card's input should now be visible
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: /type your answer/i })).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('shows close feedback and only a Continue button in typed-close path', async () => {
    // Use a card whose answer has a diacritic
    const accentCard: ReviewCard = {
      cardId: 'test-accent-card',
      guideId: 4,
      guideSlug: 'spanish',
      kind: 'verb-conjugation',
      prompt: { kind: 'verb-conjugation', verb: 'ir', pronoun: 'vosotros' },
      answer: 'váis',
      speakText: 'váis',
    };
    renderPractice(adapter, [accentCard]);
    await waitFor(() => expect(screen.getByText(/ir/i)).toBeInTheDocument());

    fireEvent.change(screen.getByRole('textbox', { name: /type your answer/i }), {
      target: { value: 'vais' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));

    await waitFor(() => {
      expect(screen.getByTestId('answer-feedback')).toBeInTheDocument();
    });
    expect(screen.getByTestId('answer-feedback').textContent).toMatch(/close/i);
    // Typed path: only Continue — no rating buttons
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^again$/i })).not.toBeInTheDocument();
  });

  it('shows incorrect feedback and only a Continue button in typed-incorrect path', async () => {
    renderPractice(adapter, [mockVerbCard]);
    await waitFor(() => expect(screen.getByText(/hablar/i)).toBeInTheDocument());

    fireEvent.change(screen.getByRole('textbox', { name: /type your answer/i }), {
      target: { value: 'hablamos' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));

    await waitFor(() => {
      expect(screen.getByTestId('answer-feedback')).toBeInTheDocument();
    });
    expect(screen.getByTestId('answer-feedback').textContent).toMatch(/correct answer/i);
    // Typed path: only Continue — no 4-button rating UI
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^again$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^good$/i })).not.toBeInTheDocument();
  });

  it('accepts Enter key to submit the typed answer', async () => {
    renderPractice(adapter, [mockVerbCard]);
    await waitFor(() => expect(screen.getByText(/hablar/i)).toBeInTheDocument());

    const input = screen.getByRole('textbox', { name: /type your answer/i });
    fireEvent.change(input, { target: { value: 'hablo' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByTestId('answer-feedback')).toBeInTheDocument();
    });
    expect(screen.getByTestId('answer-feedback').textContent).toMatch(/correct/i);
  });

  it('typed-correct does NOT auto-advance — feedback stays until Continue', async () => {
    const mockVerbCard2: ReviewCard = {
      cardId: 'test-verb-card-2',
      guideId: 4,
      guideSlug: 'spanish',
      kind: 'verb-conjugation',
      prompt: { kind: 'verb-conjugation', verb: 'comer', pronoun: 'tú', meaning: 'to eat' },
      answer: 'comes',
      speakText: 'comes',
    };
    renderPractice(adapter, [mockVerbCard, mockVerbCard2]);

    await waitFor(() =>
      expect(screen.getByRole('textbox', { name: /type your answer/i })).toBeInTheDocument()
    );

    const isHablar = !!screen.queryByText(/hablar/i);
    const correctAnswer = isHablar ? 'hablo' : 'comes';

    fireEvent.change(screen.getByRole('textbox', { name: /type your answer/i }), {
      target: { value: correctAnswer },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    });

    // Wait well past the old 800ms auto-advance window — feedback must persist.
    await new Promise(resolve => setTimeout(resolve, 1200));
    expect(screen.getByTestId('answer-feedback')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  it('global Enter advances after typed answer when focus is off the Continue button', async () => {
    const mockVerbCard2: ReviewCard = {
      cardId: 'test-verb-card-2',
      guideId: 4,
      guideSlug: 'spanish',
      kind: 'verb-conjugation',
      prompt: { kind: 'verb-conjugation', verb: 'comer', pronoun: 'tú', meaning: 'to eat' },
      answer: 'comes',
      speakText: 'comes',
    };
    renderPractice(adapter, [mockVerbCard, mockVerbCard2]);

    await waitFor(() =>
      expect(screen.getByRole('textbox', { name: /type your answer/i })).toBeInTheDocument()
    );

    const isHablar = !!screen.queryByText(/hablar/i);
    const correctAnswer = isHablar ? 'hablo' : 'comes';
    const firstCardId = isHablar ? 'test-verb-card-1' : 'test-verb-card-2';

    fireEvent.change(screen.getByRole('textbox', { name: /type your answer/i }), {
      target: { value: correctAnswer },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    });

    // Move focus off the auto-focused Continue button so the global handler is what advances us.
    (document.activeElement as HTMLElement | null)?.blur();

    await act(async () => {
      fireEvent.keyDown(window, { key: 'Enter' });
    });

    // Next card prompt is visible; previous card's feedback is gone.
    await waitFor(() => {
      const persistedFirst = adapter.peek(firstCardId);
      expect(persistedFirst).toBeDefined();
    });
    await waitFor(() => {
      expect(screen.queryByTestId('answer-feedback')).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('Show Answer escape hatch on verb card shows canonical answer + all 4 rating buttons with sub-labels', async () => {
    renderPractice(adapter, [mockVerbCard]);
    await waitFor(() => expect(screen.getByText(/hablar/i)).toBeInTheDocument());

    // Click Show Answer (escape hatch, not Submit)
    fireEvent.click(screen.getByRole('button', { name: /show answer without typing/i }));

    // The canonical answer block should appear (not the match feedback)
    await waitFor(() => {
      expect(screen.getByText('hablo')).toBeInTheDocument();
    });
    // Match feedback should NOT appear (no scoring on escape-hatch path)
    expect(screen.queryByTestId('answer-feedback')).not.toBeInTheDocument();
    // All 4 rating buttons appear
    expect(screen.getByRole('button', { name: /again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hard/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /good/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /easy/i })).toBeInTheDocument();
    // Sub-labels appear
    expect(screen.getByText(/forgot it/i)).toBeInTheDocument();
    expect(screen.getByText(/barely got it/i)).toBeInTheDocument();
    expect(screen.getByText(/^got it$/i)).toBeInTheDocument();
    expect(screen.getByText(/trivial/i)).toBeInTheDocument();
    // No Continue button on show-answer path
    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Self-rate-only path — letter-sound
  // -------------------------------------------------------------------------

  it('does NOT render an input field for self-rate-only cards (letter-sound)', async () => {
    renderPractice(adapter, [mockCard]);
    await waitFor(() => expect(screen.getByText('A')).toBeInTheDocument());

    // No input field
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    // Show Answer is the primary button
    expect(screen.getByRole('button', { name: /show answer/i })).toBeInTheDocument();
    // Hint text for self-rate mode
    expect(screen.getByText(/rate yourself when ready/i)).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Noun-gender typing with short-form acceptable answers (el / masculine)
  // -------------------------------------------------------------------------

  it('accepts short form "el" as correct for noun-gender card', async () => {
    renderPractice(adapter, [mockNounGenderCard]);
    await waitFor(() => expect(screen.getByText(/libro/i)).toBeInTheDocument());

    fireEvent.change(screen.getByRole('textbox', { name: /type your answer/i }), {
      target: { value: 'el' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));

    await waitFor(() => {
      expect(screen.getByTestId('answer-feedback')).toBeInTheDocument();
    });
    expect(screen.getByTestId('answer-feedback').textContent).toMatch(/correct/i);
  });

  // -------------------------------------------------------------------------
  // XP indicator in header
  // -------------------------------------------------------------------------

  it('shows XP indicator in header after reviewing a card', async () => {
    renderPractice(adapter, [mockVerbCard]);
    await waitFor(() => expect(screen.getByText(/hablar/i)).toBeInTheDocument());

    // Submit a correct answer — auto-rates as Good, which earns XP
    fireEvent.change(screen.getByRole('textbox', { name: /type your answer/i }), {
      target: { value: 'hablo' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));

    // Wait for the Continue button to appear (rating was persisted on submit)
    await waitFor(() => expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument());

    // After the persist resolves, XP today should appear in header (value > 0)
    await waitFor(() => {
      expect(screen.getByLabelText(/xp today/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  // -------------------------------------------------------------------------
  // MCQ flow — idiom-meaning
  //
  // Idioms have many valid English phrasings, so the surface presents 4
  // options instead of typed input. Distractors are pulled from other idiom
  // cards in the pool. With 5 mock idioms in the pool, we always have enough
  // to fill 4 options.
  // -------------------------------------------------------------------------

  it('auto-focuses the first MCQ option so keyboard users land on something actionable', async () => {
    renderPractice(adapter, mockIdiomCards);
    await waitFor(() =>
      expect(screen.getByRole('group', { name: /choose the correct meaning/i })).toBeInTheDocument()
    );
    const optionButtons = screen.getAllByRole('button').filter(b => {
      const txt = (b.textContent || '').trim();
      return mockIdiomCards.some(c => c.answer === txt);
    });
    expect(optionButtons.length).toBeGreaterThan(0);
    expect(document.activeElement).toBe(optionButtons[0]);
  });

  it('renders 4 option buttons (not a textbox) for idiom-meaning cards', async () => {
    renderPractice(adapter, [firstIdiomCard, ...mockIdiomCards.slice(1)]);
    await waitFor(() => expect(screen.getByText(/idiom/i)).toBeInTheDocument());

    // No textbox / Submit
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /submit answer/i })).not.toBeInTheDocument();

    // Option group is present
    expect(screen.getByRole('group', { name: /choose the correct meaning/i })).toBeInTheDocument();
    // The correct answer appears as one of the options
    expect(screen.getByRole('button', { name: 'to be hot' })).toBeInTheDocument();
  });

  it('clicking the correct MCQ option shows correct feedback + Continue and persists Good', async () => {
    renderPractice(adapter, mockIdiomCards);

    // Wait for the first idiom card (whichever shuffles first) — the Show
    // Answer escape-hatch label disambiguates the MCQ surface from rating UI.
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /show answer without choosing/i })).toBeInTheDocument()
    );
    // Determine which idiom rendered first via the prompt text
    // Detect which idiom rendered first by literal substring match — avoids
    // regex hazards when an idiom contains regex metacharacters (e.g. ".") or
    // is empty.
    const shownIdiom = mockIdiomCards.find(c =>
      c.prompt.kind === 'idiom-meaning' && screen.queryByText(c.prompt.idiom) !== null
    );
    expect(shownIdiom).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: shownIdiom!.answer }));

    await waitFor(() => {
      expect(screen.getByTestId('answer-feedback')).toBeInTheDocument();
    });
    expect(screen.getByTestId('answer-feedback').textContent).toMatch(/correct/i);
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    // No rating buttons in MCQ path
    expect(screen.queryByRole('button', { name: /^good$/i })).not.toBeInTheDocument();

    // Good rating persists — schedules well into the future
    await waitFor(() => {
      const persisted = adapter.peek(shownIdiom!.cardId);
      expect(persisted).toBeDefined();
      expect(persisted?.due).toBeGreaterThan(Date.now() + 60_000);
    });
  });

  it('clicking a distractor shows incorrect feedback and persists Again', async () => {
    renderPractice(adapter, mockIdiomCards);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /show answer without choosing/i })).toBeInTheDocument()
    );
    // Detect which idiom rendered first by literal substring match — avoids
    // regex hazards when an idiom contains regex metacharacters (e.g. ".") or
    // is empty.
    const shownIdiom = mockIdiomCards.find(c =>
      c.prompt.kind === 'idiom-meaning' && screen.queryByText(c.prompt.idiom) !== null
    );
    expect(shownIdiom).toBeDefined();

    // Pick any rendered option button whose label is NOT the correct answer.
    // Iterating the actual on-screen options avoids the failure mode where
    // a "wrong card" is chosen but its answer isn't among the picked distractors.
    const allCandidates = mockIdiomCards
      .filter(c => c.answer !== shownIdiom!.answer)
      .map(c => screen.queryByRole('button', { name: c.answer }))
      .filter((btn): btn is HTMLElement => btn !== null);
    expect(allCandidates.length).toBeGreaterThan(0);
    fireEvent.click(allCandidates[0]!);

    await waitFor(() => {
      expect(screen.getByTestId('answer-feedback')).toBeInTheDocument();
    });
    expect(screen.getByTestId('answer-feedback').textContent).toMatch(/correct answer/i);
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();

    // Again rating persists — due very soon (≤ ~10 minutes)
    await waitFor(() => {
      const persisted = adapter.peek(shownIdiom!.cardId);
      expect(persisted).toBeDefined();
      expect(persisted?.due).toBeLessThan(Date.now() + 10 * 60_000 + 5000);
    });
  });

  it('renders MCQ for false-cognate cards (no text input)', async () => {
    const falseCognateCards: ReviewCard[] = [
      'embarazada/pregnant',
      'constipado/having a cold',
      'molestar/to bother or annoy',
      'éxito/success',
      'asistir/to attend',
    ].map((pair, i) => {
      const [spanish, english] = pair.split('/');
      return {
        cardId: `spanish-25-fc-${i}`,
        guideId: 25,
        guideSlug: 'spanish',
        kind: 'false-cognate',
        prompt: { kind: 'false-cognate', spanish: spanish!, falseFriend: 'distractor' },
        answer: english!,
        speakText: spanish!,
      };
    });
    renderPractice(adapter, falseCognateCards);
    await waitFor(() =>
      expect(screen.getByRole('group', { name: /choose the correct meaning/i })).toBeInTheDocument()
    );
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /submit answer/i })).not.toBeInTheDocument();
  });

  it('renders MCQ for reflexive-meaning-change cards', async () => {
    const reflexiveCards: ReviewCard[] = [
      ['ir', 'to leave/go away'],
      ['dormir', 'to fall asleep'],
      ['poner', 'to put on / become'],
      ['llevar', 'to take away / get along'],
      ['parecer', 'to resemble'],
    ].map(([base, m2], i) => ({
      cardId: `spanish-31-rmc-${i}`,
      guideId: 31,
      guideSlug: 'spanish',
      kind: 'reflexive-meaning-change',
      prompt: {
        kind: 'reflexive-meaning-change',
        reflexive: `${base}se`,
        baseVerb: base!,
        baseMeaning: 'placeholder',
      },
      answer: m2!,
      speakText: `${base}se`,
    }));
    renderPractice(adapter, reflexiveCards);
    await waitFor(() =>
      expect(screen.getByRole('group', { name: /choose the correct meaning/i })).toBeInTheDocument()
    );
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Keyboard shortcuts — self-rate path (items 1/a, 2/h, 3/g, 4/e)
  // -------------------------------------------------------------------------

  it('keyboard shortcut "g" rates Good when answer is shown (self-rate path)', async () => {
    renderPractice(adapter, [mockCard]);

    // Wait for the self-rate card to appear, then reveal the answer
    await waitFor(() => expect(screen.getByRole('button', { name: /show answer/i })).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /show answer/i }));

    // Rating buttons should now be visible
    await waitFor(() => expect(screen.getByRole('button', { name: /good/i })).toBeInTheDocument());

    // Dispatch 'g' keydown on window — should trigger Rating.Good
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g', bubbles: true }));
    });

    // Good rating schedules well into the future (> 60s)
    await waitFor(() => {
      const persisted = adapter.peek('test-card-1');
      expect(persisted).toBeDefined();
      expect(persisted?.due).toBeGreaterThan(Date.now() + 60_000);
    });
  });

  it('keyboard shortcut "1" rates Again (self-rate path)', async () => {
    renderPractice(adapter, [mockCard]);

    await waitFor(() => expect(screen.getByRole('button', { name: /show answer/i })).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /show answer/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: /again/i })).toBeInTheDocument());

    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '1', bubbles: true }));
    });

    // Again rating schedules very soon (within ~10 minutes for a new card)
    await waitFor(() => {
      const persisted = adapter.peek('test-card-1');
      expect(persisted).toBeDefined();
      expect(persisted?.due).toBeLessThan(Date.now() + 10 * 60_000 + 5000);
    });
  });

  it('keyboard shortcuts are NOT triggered when focus is in a text input', async () => {
    renderPractice(adapter, [mockVerbCard]);

    // Wait for verb card (typing-eligible) — input should be focused
    await waitFor(() => expect(screen.getByRole('textbox', { name: /type your answer/i })).toBeInTheDocument());

    const input = screen.getByRole('textbox', { name: /type your answer/i });
    // Focus the input explicitly
    input.focus();

    // Show answer via escape hatch (puts us in 'shown-answer' with no matchResult)
    fireEvent.click(screen.getByRole('button', { name: /show answer without typing/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: /good/i })).toBeInTheDocument());

    // Focus input (simulate user clicking back into it after reveal)
    input.focus();

    // Dispatch 'g' while focus is on input — should NOT trigger keyboard shortcut
    fireEvent.keyDown(input, { key: 'g' });

    // The card should NOT have been rated (adapter has no persisted state)
    // Wait briefly to let any spurious async effects settle
    await new Promise(resolve => setTimeout(resolve, 50));
    const persisted = adapter.peek('test-verb-card-1');
    expect(persisted).toBeUndefined();
  });

  // -------------------------------------------------------------------------
  // Mute toggle — header strip button
  // -------------------------------------------------------------------------

  it('mute button initial aria-pressed is false (audio enabled)', async () => {
    renderPractice(adapter, [mockCard]);
    await waitFor(() => screen.getByRole('button', { name: /mute audio/i }));
    const muteBtn = screen.getByRole('button', { name: /mute audio/i });
    expect(muteBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('clicking mute button toggles aria-pressed and changes label to Unmute', async () => {
    renderPractice(adapter, [mockCard]);
    await waitFor(() => screen.getByRole('button', { name: /mute audio/i }));

    const muteBtn = screen.getByRole('button', { name: /mute audio/i });
    expect(muteBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(muteBtn);

    // After click: label becomes "Unmute audio" and aria-pressed is true
    await waitFor(() => expect(screen.getByRole('button', { name: /unmute audio/i })).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /unmute audio/i })).toHaveAttribute('aria-pressed', 'true');
  });

  it('clicking mute then unmute restores original state', async () => {
    renderPractice(adapter, [mockCard]);
    await waitFor(() => screen.getByRole('button', { name: /mute audio/i }));

    // Mute
    fireEvent.click(screen.getByRole('button', { name: /mute audio/i }));
    await waitFor(() => screen.getByRole('button', { name: /unmute audio/i }));

    // Unmute
    fireEvent.click(screen.getByRole('button', { name: /unmute audio/i }));
    await waitFor(() => screen.getByRole('button', { name: /mute audio/i }));
    expect(screen.getByRole('button', { name: /mute audio/i })).toHaveAttribute('aria-pressed', 'false');
  });

  it('speakSpanish is NOT called when muted and auto-play triggers on reveal', async () => {
    // verb-conjugation is in KINDS_AUTO_PLAY_ON_REVEAL — on reveal it calls playAudio
    (speakSpanish as ReturnType<typeof vi.fn>).mockClear();
    renderPractice(adapter, [mockVerbCard]);
    await waitFor(() => screen.getByRole('button', { name: /mute audio/i }));

    // Mute before revealing the answer
    fireEvent.click(screen.getByRole('button', { name: /mute audio/i }));
    await waitFor(() => screen.getByRole('button', { name: /unmute audio/i }));

    // Reveal via escape hatch — this triggers auto-play which goes through playAudio
    fireEvent.click(screen.getByRole('button', { name: /show answer without typing/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: /good/i })).toBeInTheDocument());

    // speakSpanish should NOT have been called (muted path short-circuits before it)
    expect(speakSpanish).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Pure-helper tests (no React rendering)
// ---------------------------------------------------------------------------

describe('placeholderFor', () => {
  it('returns the Spanish placeholder for typing-eligible Spanish-answer kinds', () => {
    expect(placeholderFor('verb-conjugation')).toBe('Type your answer in Spanish');
    expect(placeholderFor('noun-gender')).toBe('Type your answer in Spanish');
    expect(placeholderFor('weather-expression')).toBe('Type your answer in Spanish');
    expect(placeholderFor('number-spell')).toBe('Type your answer in Spanish');
  });

  // ENGLISH_ANSWER_KINDS has 3 members — all are also MCQ_KINDS so the
  // placeholder is dead code for them today. Kept for future English-answer
  // typed kinds.
  it('honours ENGLISH_ANSWER_KINDS membership', () => {
    for (const k of ENGLISH_ANSWER_KINDS) {
      expect(placeholderFor(k)).toBe('Type your answer in English');
    }
  });

  it('ENGLISH_ANSWER_KINDS contains exactly the 3 MCQ English-answer kinds', () => {
    expect(ENGLISH_ANSWER_KINDS.has('idiom-meaning')).toBe(true);
    expect(ENGLISH_ANSWER_KINDS.has('false-cognate')).toBe(true);
    expect(ENGLISH_ANSWER_KINDS.has('reflexive-meaning-change')).toBe(true);
    expect([...ENGLISH_ANSWER_KINDS]).toHaveLength(3);
  });
});

describe('CardKind classification sets', () => {
  it('TYPING_ENABLED_KINDS and MCQ_KINDS are disjoint', () => {
    const overlap = [...TYPING_ENABLED_KINDS].filter(k => MCQ_KINDS.has(k));
    expect(overlap).toEqual([]);
  });

  // ENGLISH_ANSWER_KINDS now intentionally overlaps MCQ_KINDS — all 3 English-
  // answer kinds are MCQ. The placeholder text is dormant for them but kept for
  // future typed English-answer kinds.
  it('ENGLISH_ANSWER_KINDS is a subset of MCQ_KINDS (all 3 overlap intentionally)', () => {
    const overlap = [...ENGLISH_ANSWER_KINDS].filter(k => MCQ_KINDS.has(k));
    expect(overlap).toHaveLength(3);
  });

  it('all three "many-phrasings" kinds are in MCQ_KINDS', () => {
    expect(MCQ_KINDS.has('idiom-meaning')).toBe(true);
    expect(MCQ_KINDS.has('false-cognate')).toBe(true);
    expect(MCQ_KINDS.has('reflexive-meaning-change')).toBe(true);
    expect(TYPING_ENABLED_KINDS.has('idiom-meaning')).toBe(false);
    expect(TYPING_ENABLED_KINDS.has('false-cognate')).toBe(false);
    expect(TYPING_ENABLED_KINDS.has('reflexive-meaning-change')).toBe(false);
  });

  it('accent-discrimination is in MCQ_KINDS but not TYPING_ENABLED_KINDS', () => {
    expect(MCQ_KINDS.has('accent-discrimination')).toBe(true);
    expect(TYPING_ENABLED_KINDS.has('accent-discrimination')).toBe(false);
  });

  it('listening-recall is in TYPING_ENABLED_KINDS but not MCQ_KINDS', () => {
    expect(TYPING_ENABLED_KINDS.has('listening-recall')).toBe(true);
    expect(MCQ_KINDS.has('listening-recall')).toBe(false);
  });

  it('KINDS_WITH_PROMPT_SPEAK includes idiom-meaning, false-cognate, reflexive-meaning-change, tu-vs-usted, letter-sound', () => {
    expect(KINDS_WITH_PROMPT_SPEAK.has('letter-sound')).toBe(true);
    expect(KINDS_WITH_PROMPT_SPEAK.has('idiom-meaning')).toBe(true);
    expect(KINDS_WITH_PROMPT_SPEAK.has('false-cognate')).toBe(true);
    expect(KINDS_WITH_PROMPT_SPEAK.has('reflexive-meaning-change')).toBe(true);
    expect(KINDS_WITH_PROMPT_SPEAK.has('tu-vs-usted')).toBe(true);
    // ser-vs-estar and por-vs-para omitted because speakText substitutes the answer
    expect(KINDS_WITH_PROMPT_SPEAK.has('ser-vs-estar')).toBe(false);
    expect(KINDS_WITH_PROMPT_SPEAK.has('por-vs-para')).toBe(false);
  });

  it('KINDS_AUTO_PLAY_ON_REVEAL includes Phase 3 additions', () => {
    // Original members
    expect(KINDS_AUTO_PLAY_ON_REVEAL.has('letter-sound')).toBe(true);
    expect(KINDS_AUTO_PLAY_ON_REVEAL.has('verb-conjugation')).toBe(true);
    // Phase 3 additions
    expect(KINDS_AUTO_PLAY_ON_REVEAL.has('noun-gender')).toBe(true);
    expect(KINDS_AUTO_PLAY_ON_REVEAL.has('weather-expression')).toBe(true);
    expect(KINDS_AUTO_PLAY_ON_REVEAL.has('number-spell')).toBe(true);
    expect(KINDS_AUTO_PLAY_ON_REVEAL.has('gustar-pattern')).toBe(true);
    expect(KINDS_AUTO_PLAY_ON_REVEAL.has('negation-translate')).toBe(true);
  });
});

describe('getMcqOptions', () => {
  const idiomPool: ReviewCard[] = [
    {
      cardId: 'spanish-32-tener-calor', guideId: 32, guideSlug: 'spanish', kind: 'idiom-meaning',
      prompt: { kind: 'idiom-meaning', idiom: 'tener calor', literal: 'to have heat' },
      answer: 'to be hot', speakText: 'tener calor',
    },
    {
      cardId: 'spanish-32-tener-hambre', guideId: 32, guideSlug: 'spanish', kind: 'idiom-meaning',
      prompt: { kind: 'idiom-meaning', idiom: 'tener hambre', literal: 'to have hunger' },
      answer: 'to be hungry', speakText: 'tener hambre',
    },
    {
      cardId: 'spanish-32-tener-sed', guideId: 32, guideSlug: 'spanish', kind: 'idiom-meaning',
      prompt: { kind: 'idiom-meaning', idiom: 'tener sed', literal: 'to have thirst' },
      answer: 'to be thirsty', speakText: 'tener sed',
    },
    {
      cardId: 'spanish-32-tener-sueno', guideId: 32, guideSlug: 'spanish', kind: 'idiom-meaning',
      prompt: { kind: 'idiom-meaning', idiom: 'tener sueño', literal: 'to have sleep' },
      answer: 'to be sleepy', speakText: 'tener sueño',
    },
    // Different kind — should NOT show up as a distractor
    {
      cardId: 'spanish-other-1', guideId: 1, guideSlug: 'spanish', kind: 'noun-gender',
      prompt: { kind: 'noun-gender', noun: 'libro', meaning: 'book' },
      answer: 'el (masculine)', speakText: 'libro',
    },
  ];

  it('returns optionCount options including the correct answer', () => {
    const card = idiomPool[0]!;
    const options = getMcqOptions(card, idiomPool, 4);
    expect(options).toHaveLength(4);
    expect(options).toContain(card.answer);
  });

  it('excludes distractors from other kinds', () => {
    const card = idiomPool[0]!;
    const options = getMcqOptions(card, idiomPool, 4);
    expect(options).not.toContain('el (masculine)');
  });

  it('produces deterministic output for the same cardId and pool', () => {
    const card = idiomPool[0]!;
    const a = getMcqOptions(card, idiomPool, 4);
    const b = getMcqOptions(card, idiomPool, 4);
    expect(a).toEqual(b);
  });

  it('produces different option order for different cards', () => {
    // With distinct cardIds, the seeded shuffle should diverge for at least
    // one of these card pairs.
    const a = getMcqOptions(idiomPool[0]!, idiomPool, 4);
    const b = getMcqOptions(idiomPool[1]!, idiomPool, 4);
    const c = getMcqOptions(idiomPool[2]!, idiomPool, 4);
    const allEqual = JSON.stringify(a) === JSON.stringify(b) && JSON.stringify(b) === JSON.stringify(c);
    expect(allEqual).toBe(false);
  });

  it('degrades gracefully when pool is too small for full distractor set', () => {
    const tinyPool = [idiomPool[0]!, idiomPool[1]!];
    const options = getMcqOptions(idiomPool[0]!, tinyPool, 4);
    // 1 correct + 1 distractor = 2 options total
    expect(options).toHaveLength(2);
    expect(options).toContain('to be hot');
    expect(options).toContain('to be hungry');
  });

  it('does not duplicate the correct answer if pool contains a card with the same answer', () => {
    const dupPool: ReviewCard[] = [
      idiomPool[0]!,
      // Two cards with identical answer text (different cardIds)
      { ...idiomPool[1]!, cardId: 'spanish-32-dup', answer: 'to be hot' },
      idiomPool[2]!,
      idiomPool[3]!,
    ];
    const options = getMcqOptions(idiomPool[0]!, dupPool, 4);
    const occurrences = options.filter(o => o === 'to be hot').length;
    expect(occurrences).toBe(1);
  });

  it('requiredDistractors are always present in the result', () => {
    const card = idiomPool[0]!;
    // Force a distractor that isn't in the pool at all
    const options = getMcqOptions(card, idiomPool, 4, ['forced-option-xyz']);
    expect(options).toContain('forced-option-xyz');
    expect(options).toContain(card.answer);
  });

  it('requiredDistractors do not duplicate the correct answer', () => {
    const card = idiomPool[0]!;
    // Pass the card's own answer as required — should be deduplicated
    const options = getMcqOptions(card, idiomPool, 4, [card.answer]);
    const occurrences = options.filter(o => o === card.answer).length;
    expect(occurrences).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// nextDueDisplayMsForCard
// ---------------------------------------------------------------------------

describe('nextDueDisplayMsForCard', () => {
  const makeMinimalCard = (kind: ReviewCard['kind']): ReviewCard => ({
    cardId: 'test',
    guideId: 1,
    guideSlug: 'spanish',
    kind,
    prompt: { kind: 'letter-sound', letter: 'A' } as ReviewCard['prompt'],
    answer: 'answer',
  });

  it('returns 1400 for a long-answer kind (gustar-pattern)', () => {
    expect(nextDueDisplayMsForCard(makeMinimalCard('gustar-pattern'))).toBe(1400);
  });

  it('returns 1400 for negation-translate', () => {
    expect(nextDueDisplayMsForCard(makeMinimalCard('negation-translate'))).toBe(1400);
  });

  it('returns 1400 for idiom-meaning', () => {
    expect(nextDueDisplayMsForCard(makeMinimalCard('idiom-meaning'))).toBe(1400);
  });

  it('returns 800 for a short-answer kind (letter-sound)', () => {
    expect(nextDueDisplayMsForCard(makeMinimalCard('letter-sound'))).toBe(800);
  });

  it('returns 800 for verb-conjugation', () => {
    expect(nextDueDisplayMsForCard(makeMinimalCard('verb-conjugation'))).toBe(800);
  });
});

// ---------------------------------------------------------------------------
// formatNextDue
// ---------------------------------------------------------------------------

describe('formatNextDue', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "All caught up" copy when nextDueAt is null', () => {
    expect(formatNextDue(null)).toBe('All caught up. Add more cards by reviewing guides.');
  });

  it('returns "less than a minute" when diff < 60s', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatNextDue(now + 30_000)).toBe('Next review in less than a minute.');
  });

  it('returns singular minute when diff is exactly 1 minute', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatNextDue(now + 60_000)).toBe('Next review in 1 minute.');
  });

  it('returns plural minutes when diff is several minutes', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatNextDue(now + 15 * 60_000)).toBe('Next review in 15 minutes.');
  });

  it('returns hours only when diff is exact hours (no leftover minutes)', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatNextDue(now + 2 * 60 * 60_000)).toBe('Next review in 2 hours.');
  });

  it('returns singular hour', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatNextDue(now + 60 * 60_000)).toBe('Next review in 1 hour.');
  });

  it('returns hours and minutes when there are remaining minutes', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatNextDue(now + (2 * 60 + 30) * 60_000)).toBe('Next review in 2 hours 30 minutes.');
  });

  it('returns hour and singular minute', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatNextDue(now + (1 * 60 + 1) * 60_000)).toBe('Next review in 1 hour 1 minute.');
  });
});

// ---------------------------------------------------------------------------
// EmptyState rendering
// ---------------------------------------------------------------------------

describe('EmptyState', () => {
  const renderEmptyState = (nextDueAt: number | null, streak = 0, reviewCount = 0) =>
    render(
      <MemoryRouter>
        <EmptyState
          todaysReviewCount={reviewCount}
          dailyGoal={5}
          streak={streak}
          nextDueAt={nextDueAt}
        />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows "All caught up" headline', () => {
    renderEmptyState(null);
    expect(screen.getByRole('heading', { name: /all caught up/i })).toBeTruthy();
  });

  it('shows null-nextDueAt copy when no cards are scheduled', () => {
    renderEmptyState(null);
    expect(screen.getByText(/add more cards by reviewing guides/i)).toBeTruthy();
  });

  it('shows minute countdown when next card is due in minutes', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    renderEmptyState(now + 15 * 60_000);
    expect(screen.getByText(/next review in 15 minutes/i)).toBeTruthy();
  });

  it('shows hour+minute countdown for multi-hour due times', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    renderEmptyState(now + (3 * 60 + 20) * 60_000);
    expect(screen.getByText(/next review in 3 hours 20 minutes/i)).toBeTruthy();
  });

  it('shows streak when streak is positive', () => {
    renderEmptyState(null, 5);
    // The streak text "🔥 5-day streak" contains both the count and label.
    expect(screen.getByText(/day streak/i)).toBeTruthy();
  });

  it('renders "Back to Spanish guides" link', () => {
    renderEmptyState(null);
    const link = screen.getByRole('link', { name: /back to spanish guides/i });
    expect(link).toBeTruthy();
  });
});
