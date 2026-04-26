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

  it('shows correct feedback when the typed answer is right', async () => {
    renderPractice(adapter, [mockVerbCard]);
    await waitFor(() => expect(screen.getByText(/hablar/i)).toBeInTheDocument());

    const input = screen.getByRole('textbox', { name: /type your answer/i });
    fireEvent.change(input, { target: { value: 'hablo' } });
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));

    await waitFor(() => {
      expect(screen.getByTestId('answer-feedback')).toBeInTheDocument();
    });
    expect(screen.getByTestId('answer-feedback').textContent).toMatch(/correct/i);
    // Rating buttons appear after submission
    expect(screen.getByRole('button', { name: /good/i })).toBeInTheDocument();
  });

  it('shows close feedback when the typed answer is missing only a diacritic', async () => {
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
    expect(screen.getByRole('button', { name: /again/i })).toBeInTheDocument();
  });

  it('shows incorrect feedback when the typed answer is wrong', async () => {
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
    // All 4 rating buttons appear even for incorrect
    expect(screen.getByRole('button', { name: /again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /good/i })).toBeInTheDocument();
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

  it('Show Answer escape hatch on verb card skips to canonical answer + ratings', async () => {
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
    // Rating buttons appear
    expect(screen.getByRole('button', { name: /good/i })).toBeInTheDocument();
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

    // Submit a correct answer to earn XP
    fireEvent.change(screen.getByRole('textbox', { name: /type your answer/i }), {
      target: { value: 'hablo' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit answer/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: /good/i })).toBeInTheDocument());

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /good/i }));
    });

    // After rating, XP today should appear in header (value > 0)
    await waitFor(() => {
      expect(screen.getByLabelText(/xp today/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
