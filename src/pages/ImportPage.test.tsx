/**
 * Tests for ImportPage.
 *
 * Simulates hash-based snapshot loading, preview rendering, Apply, and
 * error / missing states.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ImportPage } from './ImportPage';
import { encodeSnapshot } from '../utils/snapshot';
import type { MasteryExport, CardState, MergeReport } from '../mastery';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('../hooks/useRouteMeta', () => ({
  useRouteMeta: vi.fn(),
}));

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
    ...overrides,
  };
}

function renderPage() {
  return render(
    <MemoryRouter>
      <ImportPage />
    </MemoryRouter>,
  );
}

const originalHash = window.location.hash;

beforeEach(() => {
  mockUseMastery.mockReturnValue(makeReturn());
});

afterEach(() => {
  vi.clearAllMocks();
  // Restore original hash after each test
  window.location.hash = originalHash;
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ImportPage — missing hash', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('shows the empty state when no hash is present', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole('region', { name: /empty state/i })).toBeInTheDocument();
    });
    expect(screen.getByText(/no share link found/i)).toBeInTheDocument();
  });

  it('shows a link to settings page in empty state', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText(/go to settings/i)).toBeInTheDocument();
    });
  });
});

describe('ImportPage — valid hash', () => {
  let snapshotStr: string;
  const snapshot: MasteryExport = {
    schemaVersion: 1,
    cards: {
      'spanish-1-hola': makeCard('spanish-1-hola', 1_700_000_000_000),
    },
  };

  beforeEach(async () => {
    snapshotStr = await encodeSnapshot(snapshot);
    window.location.hash = `#snapshot=${snapshotStr}`;
  });

  it('decodes the hash and shows the import preview', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole('region', { name: /import preview/i })).toBeInTheDocument();
    });
    expect(screen.getByText(/preview.*what would change/i)).toBeInTheDocument();
  });

  it('Apply triggers importSnapshot and shows the result screen', async () => {
    const mockReport: MergeReport = { accepted: 1, rejected: 0, unchanged: 0 };
    const mockImport = vi.fn().mockResolvedValue(mockReport);
    mockUseMastery.mockReturnValue(makeReturn({ importSnapshot: mockImport }));

    renderPage();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /apply/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /import result/i })).toBeInTheDocument();
    });

    expect(mockImport).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Import complete')).toBeInTheDocument();
  });

  it('Apply success shows MergeReport counts', async () => {
    const mockReport: MergeReport = { accepted: 1, rejected: 0, unchanged: 0 };
    mockUseMastery.mockReturnValue(makeReturn({
      importSnapshot: vi.fn().mockResolvedValue(mockReport),
    }));

    renderPage();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /apply/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /import result/i })).toBeInTheDocument();
    });

    expect(screen.getByText('Cards updated')).toBeInTheDocument();
  });
});

describe('ImportPage — invalid hash', () => {
  beforeEach(() => {
    // Set a hash with invalid base64url that can't be decoded
    window.location.hash = '#snapshot=this-is-not-valid-encoded-data@@@@';
  });

  it('shows decode error state', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole('region', { name: /decode error/i })).toBeInTheDocument();
    });
    expect(screen.getByRole('heading', { name: /invalid share link/i })).toBeInTheDocument();
  });

  it('shows a back to settings link in error state', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText(/back to settings/i)).toBeInTheDocument();
    });
  });
});

describe('ImportPage — page heading', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('renders the page heading', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /import progress/i, level: 1 })).toBeInTheDocument();
    });
  });
});
