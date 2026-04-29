/**
 * Tests for ImportPreview component and computePreview helper.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ImportPreview, computePreview } from './ImportPreview';
import type { ImportPreviewProps } from './ImportPreview';
import type { MasteryExport, CardState } from '../mastery';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('../hooks/useMastery', () => ({
  useMastery: vi.fn(),
}));

import { useMastery } from '../hooks/useMastery';
import type { UseMasteryReturn } from '../hooks/useMastery';

const mockUseMastery = useMastery as ReturnType<typeof vi.fn>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeCard(id: string, updatedAt: number): CardState {
  return {
    cardId: id,
    updatedAt,
    due: updatedAt + 86_400_000,
    stability: 1,
    difficulty: 5,
    reps: 1,
    lapses: 0,
    lastReview: null,
    learningSteps: 0,
    fsrsState: 0,
  };
}

function makeReturn(overrides: Partial<UseMasteryReturn> = {}): UseMasteryReturn {
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
    exportSnapshot: vi.fn().mockResolvedValue({ schemaVersion: 1, cards: {} }),
    importSnapshot: vi.fn().mockResolvedValue({ accepted: 0, rejected: 0, unchanged: 0 }),
    nextDueAt: null,
    ...overrides,
  };
}

function renderPreview(props: ImportPreviewProps) {
  return render(
    <MemoryRouter>
      <ImportPreview {...props} />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  mockUseMastery.mockReturnValue(makeReturn());
});

afterEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// computePreview unit tests (pure function)
// ---------------------------------------------------------------------------

describe('computePreview', () => {
  it('all-new cards are counted as accepted', () => {
    const incoming: MasteryExport = {
      schemaVersion: 1,
      cards: {
        'card-a': makeCard('card-a', 1000),
        'card-b': makeCard('card-b', 2000),
      },
    };
    const local: MasteryExport = { schemaVersion: 1, cards: {} };
    const result = computePreview(incoming, local);
    expect(result.accepted).toBe(2);
    expect(result.rejected).toBe(0);
    expect(result.unchanged).toBe(0);
  });

  it('remote-newer cards are counted as accepted', () => {
    const incoming: MasteryExport = {
      schemaVersion: 1,
      cards: { 'card-a': makeCard('card-a', 2000) },
    };
    const local: MasteryExport = {
      schemaVersion: 1,
      cards: { 'card-a': makeCard('card-a', 1000) },
    };
    const result = computePreview(incoming, local);
    expect(result.accepted).toBe(1);
    expect(result.rejected).toBe(0);
    expect(result.unchanged).toBe(0);
  });

  it('local-newer cards are counted as rejected', () => {
    const incoming: MasteryExport = {
      schemaVersion: 1,
      cards: { 'card-a': makeCard('card-a', 500) },
    };
    const local: MasteryExport = {
      schemaVersion: 1,
      cards: { 'card-a': makeCard('card-a', 1000) },
    };
    const result = computePreview(incoming, local);
    expect(result.accepted).toBe(0);
    expect(result.rejected).toBe(1);
    expect(result.unchanged).toBe(0);
  });

  it('same-timestamp cards are counted as unchanged', () => {
    const incoming: MasteryExport = {
      schemaVersion: 1,
      cards: { 'card-a': makeCard('card-a', 1000) },
    };
    const local: MasteryExport = {
      schemaVersion: 1,
      cards: { 'card-a': makeCard('card-a', 1000) },
    };
    const result = computePreview(incoming, local);
    expect(result.accepted).toBe(0);
    expect(result.rejected).toBe(0);
    expect(result.unchanged).toBe(1);
  });

  it('handles mixed scenarios correctly', () => {
    const incoming: MasteryExport = {
      schemaVersion: 1,
      cards: {
        'new-card': makeCard('new-card', 1000),        // new → accepted
        'remote-newer': makeCard('remote-newer', 2000), // remote newer → accepted
        'local-newer': makeCard('local-newer', 500),    // local newer → rejected
        'same-time': makeCard('same-time', 1000),       // same → unchanged
      },
    };
    const local: MasteryExport = {
      schemaVersion: 1,
      cards: {
        'remote-newer': makeCard('remote-newer', 1000),
        'local-newer': makeCard('local-newer', 1000),
        'same-time': makeCard('same-time', 1000),
      },
    };
    const result = computePreview(incoming, local);
    expect(result.accepted).toBe(2);
    expect(result.rejected).toBe(1);
    expect(result.unchanged).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// ImportPreview component tests
// ---------------------------------------------------------------------------

describe('ImportPreview — render', () => {
  it('renders the preview heading', async () => {
    const snapshot: MasteryExport = { schemaVersion: 1, cards: {} };
    renderPreview({
      snapshot,
      onApply: vi.fn().mockResolvedValue(undefined),
      onCancel: vi.fn(),
    });
    await waitFor(() => {
      expect(screen.getByRole('region', { name: /import preview/i })).toBeInTheDocument();
    });
    expect(screen.getByText(/preview.*what would change/i)).toBeInTheDocument();
  });

  it('shows preview table with card counts after loading', async () => {
    const card = makeCard('test-card', 1000);
    const snapshot: MasteryExport = {
      schemaVersion: 1,
      cards: { 'test-card': card },
    };
    // Local is empty → card will be "new" → accepted
    mockUseMastery.mockReturnValue(makeReturn({
      exportSnapshot: vi.fn().mockResolvedValue({ schemaVersion: 1, cards: {} }),
    }));

    renderPreview({
      snapshot,
      onApply: vi.fn().mockResolvedValue(undefined),
      onCancel: vi.fn(),
    });

    await waitFor(() => {
      expect(screen.getByText('Cards that would be updated')).toBeInTheDocument();
    });
  });

  it('Apply button is present and calls onApply when clicked', async () => {
    const snapshot: MasteryExport = { schemaVersion: 1, cards: {} };
    const onApply = vi.fn().mockResolvedValue(undefined);
    renderPreview({ snapshot, onApply, onCancel: vi.fn() });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();
    });

    const applyBtn = screen.getByRole('button', { name: /apply/i });
    await act(async () => {
      fireEvent.click(applyBtn);
    });

    await waitFor(() => {
      expect(onApply).toHaveBeenCalledTimes(1);
    });
  });

  it('Cancel button calls onCancel', async () => {
    const snapshot: MasteryExport = { schemaVersion: 1, cards: {} };
    const onCancel = vi.fn();
    renderPreview({
      snapshot,
      onApply: vi.fn().mockResolvedValue(undefined),
      onCancel,
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('shows error and retry button when onApply throws', async () => {
    const snapshot: MasteryExport = { schemaVersion: 1, cards: {} };
    const onApply = vi.fn().mockRejectedValue(new Error('test failure'));
    renderPreview({ snapshot, onApply, onCancel: vi.fn() });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /apply/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/import failed/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });
});
