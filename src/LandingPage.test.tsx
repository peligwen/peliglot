/**
 * Tests for the LandingPage component, focused on the Spanish recommendation CTA.
 *
 * useMastery is mocked at the module level so we can drive all three
 * recommendation states (cold-start, has-due, caught-up) without a real adapter.
 *
 * Note: getAllSpanishCards() is called live in SpanishRecommendationCTA, so
 * cardCount is always > 0 in tests. The cold-start recommendation branch
 * (cardCount === 0) is covered by recommendation.test.ts.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import type { UseMasteryReturn } from './hooks/useMastery';

// ---------------------------------------------------------------------------
// Mock useMastery
// ---------------------------------------------------------------------------

vi.mock('./hooks/useMastery', () => ({
  useMastery: vi.fn(),
}));

// Also mock useRouteMeta so it doesn't try to mutate document.title / head
vi.mock('./hooks/useRouteMeta', () => ({
  useRouteMeta: vi.fn(),
}));

import { useMastery } from './hooks/useMastery';

const mockUseMastery = useMastery as ReturnType<typeof vi.fn>;

function makeUseMasteryReturn(
  overrides: Partial<UseMasteryReturn> = {},
): UseMasteryReturn {
  return {
    getCardState: vi.fn().mockReturnValue(undefined),
    rateCard: vi.fn().mockResolvedValue({}),
    dueCards: [],
    streak: { current: 0, longest: 0, lastReviewDate: null },
    todaysReviewCount: 0,
    dailyGoal: 5,
    setDailyGoal: vi.fn().mockResolvedValue(undefined),
    isHydrated: true,
    xpToday: 0,
    xpAllTime: 0,
    ...overrides,
  };
}

function renderLanding() {
  return render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>,
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('LandingPage — SpanishRecommendationCTA', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows the Practice link before hydration completes', async () => {
    mockUseMastery.mockReturnValue(makeUseMasteryReturn({ isHydrated: false }));
    renderLanding();
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /practice spanish/i })).toBeInTheDocument();
    });
  });

  it('has-due: shows due-card count CTA when cards are due', async () => {
    const dueCards = [
      { cardId: 'card-1', state: { cardId: 'card-1', due: Date.now() - 1000, stability: 1, difficulty: 5, reps: 1, lapses: 0, lastReview: null, learningSteps: 0, fsrsState: 0, updatedAt: Date.now() } },
      { cardId: 'card-2', state: { cardId: 'card-2', due: Date.now() - 2000, stability: 1, difficulty: 5, reps: 1, lapses: 0, lastReview: null, learningSteps: 0, fsrsState: 0, updatedAt: Date.now() } },
      { cardId: 'card-3', state: { cardId: 'card-3', due: Date.now() - 3000, stability: 1, difficulty: 5, reps: 1, lapses: 0, lastReview: null, learningSteps: 0, fsrsState: 0, updatedAt: Date.now() } },
    ];
    mockUseMastery.mockReturnValue(makeUseMasteryReturn({
      isHydrated: true,
      dueCards,
      todaysReviewCount: 0,
    }));
    renderLanding();
    await waitFor(() => {
      expect(screen.getByText(/3 cards due/i)).toBeInTheDocument();
    });
    // The link should still go to practice
    expect(screen.getByRole('link', { name: /practice spanish/i })).toHaveAttribute(
      'href',
      '/guides/spanish/practice',
    );
  });

  it('caught-up: shows "All caught up" and a quiet "Open practice anyway" link', async () => {
    mockUseMastery.mockReturnValue(makeUseMasteryReturn({
      isHydrated: true,
      dueCards: [],
      todaysReviewCount: 5,
    }));
    renderLanding();
    await waitFor(() => {
      expect(screen.getByText(/all caught up/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /open practice anyway/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open practice anyway/i })).toHaveAttribute(
      'href',
      '/guides/spanish/practice',
    );
  });

  it('caught-up: does not show a prominent CTA button (muted link only)', async () => {
    mockUseMastery.mockReturnValue(makeUseMasteryReturn({
      isHydrated: true,
      dueCards: [],
      todaysReviewCount: 3,
    }));
    renderLanding();
    await waitFor(() => {
      expect(screen.getByText(/all caught up/i)).toBeInTheDocument();
    });
    // The prominent "Practice Spanish with spaced repetition" link should NOT appear
    expect(screen.queryByRole('link', { name: /practice spanish/i })).not.toBeInTheDocument();
  });

  it('does not show a practice affordance for Arabic, German, or other collections', async () => {
    mockUseMastery.mockReturnValue(makeUseMasteryReturn({
      isHydrated: true,
      dueCards: [
        { cardId: 'c1', state: { cardId: 'c1', due: Date.now() - 1000, stability: 1, difficulty: 5, reps: 1, lapses: 0, lastReview: null, learningSteps: 0, fsrsState: 0, updatedAt: Date.now() } },
      ],
    }));
    renderLanding();
    await waitFor(() => {
      expect(screen.getByText(/1 card due/i)).toBeInTheDocument();
    });
    // No practice affordance for Arabic
    expect(screen.queryByText(/practice arabic/i)).not.toBeInTheDocument();
    // No practice affordance for German
    expect(screen.queryByText(/practice german/i)).not.toBeInTheDocument();
  });
});
