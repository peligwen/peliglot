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

    // Reveal the answer for the verb card.
    fireEvent.click(screen.getByRole('button', { name: /show answer/i }));

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /good/i }));
    });

    // After the advance delay, the second card (mockCard, letter "A") should be shown.
    await waitFor(() => {
      expect(screen.getByText('A')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
