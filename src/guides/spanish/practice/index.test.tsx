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
import { Practice } from './index';
import { StubRemoteAdapter } from '../../../mastery/adapters/stubRemote';
import type { ReviewCard } from '../../../mastery/cards';

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
    await waitFor(() => expect(screen.getByText(/all caught up/i)).toBeInTheDocument());
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
});
