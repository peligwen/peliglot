/**
 * Unit tests for SettingsPage.
 *
 * Uses vi.mock for useMastery so we can drive both the basic render tests
 * (simple mock return) and the import flow (adapter-backed mock).
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SettingsPage } from './SettingsPage';
import { StubRemoteAdapter } from '../mastery/adapters/stubRemote';
import type { CardState, MasteryExport } from '../mastery';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('../hooks/useRouteMeta', () => ({
  useRouteMeta: vi.fn(),
}));

vi.mock('../hooks/useMastery', () => ({
  useMastery: vi.fn(),
}));

// Mock ShareLinkSection so it doesn't try to access clipboard/CompressionStream
// or require additional setup in SettingsPage tests.
vi.mock('../components/ShareLinkSection', () => ({
  ShareLinkSection: () => (
    <section aria-labelledby="share-link-heading">
      <h2 id="share-link-heading">Share links &amp; QR codes</h2>
    </section>
  ),
}));

// Mock URL.createObjectURL + revokeObjectURL (jsdom doesn't implement them)
const mockCreateObjectURL = vi.fn().mockReturnValue('blob:mock-url');
const mockRevokeObjectURL = vi.fn();

import { useMastery } from '../hooks/useMastery';
import type { UseMasteryReturn } from '../hooks/useMastery';

const mockUseMastery = useMastery as ReturnType<typeof vi.fn>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeCard(cardId: string, updatedAt: number): CardState {
  return {
    cardId,
    updatedAt,
    due: Date.now() + 86_400_000,
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
      <SettingsPage />
    </MemoryRouter>,
  );
}

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------

beforeEach(() => {
  // Default mock return
  mockUseMastery.mockReturnValue(makeReturn());

  Object.defineProperty(globalThis.URL, 'createObjectURL', {
    value: mockCreateObjectURL,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(globalThis.URL, 'revokeObjectURL', {
    value: mockRevokeObjectURL,
    writable: true,
    configurable: true,
  });
  mockCreateObjectURL.mockClear();
  mockRevokeObjectURL.mockClear();
});

afterEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

describe('SettingsPage — render', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /settings/i, level: 1 })).toBeInTheDocument();
  });

  it('renders download and import buttons', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /download my progress/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /import from file/i })).toBeInTheDocument();
  });

  it('renders the Coming soon section', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /share links/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Download
// ---------------------------------------------------------------------------

describe('SettingsPage — download', () => {
  it('clicking download triggers URL.createObjectURL with a JSON blob', async () => {
    const mockExport = vi.fn().mockResolvedValue({ schemaVersion: 1, cards: {} });
    mockUseMastery.mockReturnValue(makeReturn({ exportSnapshot: mockExport }));

    renderPage();

    const btn = screen.getByRole('button', { name: /download my progress/i });
    await act(async () => {
      fireEvent.click(btn);
    });

    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);
    });

    const blobArg = mockCreateObjectURL.mock.calls[0][0] as Blob;
    expect(blobArg.type).toBe('application/json');

    // Blob content should be valid JSON with schemaVersion
    const text = await blobArg.text();
    const parsed = JSON.parse(text) as Record<string, unknown>;
    expect(parsed).toHaveProperty('schemaVersion', 1);
    expect(parsed).toHaveProperty('cards');

    // revokeObjectURL must also be called
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    expect(mockExport).toHaveBeenCalledTimes(1);
  });

  it('download button is disabled until isHydrated is true', () => {
    mockUseMastery.mockReturnValue(makeReturn({ isHydrated: false }));
    renderPage();
    const btn = screen.getByRole('button', { name: /download my progress/i });
    expect(btn).toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Import flow
// ---------------------------------------------------------------------------

describe('SettingsPage — import flow', () => {
  function makeFileFromSnapshot(snapshot: MasteryExport, name = 'test.json'): File {
    return new File([JSON.stringify(snapshot)], name, { type: 'application/json' });
  }

  function getFileInput(): HTMLInputElement {
    const input = document.querySelector('input[type="file"]');
    if (!input) throw new Error('file input not found');
    return input as HTMLInputElement;
  }

  it('shows preview after selecting a valid file with one new card', async () => {
    const remoteCard = makeCard('new-card', Date.now());
    const snapshot: MasteryExport = { schemaVersion: 1, cards: { 'new-card': remoteCard } };

    // Local has no cards; incoming has one
    const mockExport = vi.fn().mockResolvedValue({ schemaVersion: 1, cards: {} });
    mockUseMastery.mockReturnValue(makeReturn({ exportSnapshot: mockExport }));

    renderPage();
    const fileInput = getFileInput();

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [makeFileFromSnapshot(snapshot)] } });
    });

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /import preview/i })).toBeInTheDocument();
    });

    const previewRegion = screen.getByRole('region', { name: /import preview/i });
    // "Cards that would be updated" = 1 (new card)
    expect(previewRegion).toHaveTextContent('Cards that would be updated');
  });

  it('Apply calls importSnapshot and shows the result screen', async () => {
    const remoteCard = makeCard('apply-card', Date.now());
    const snapshot: MasteryExport = { schemaVersion: 1, cards: { 'apply-card': remoteCard } };

    const mockExport = vi.fn().mockResolvedValue({ schemaVersion: 1, cards: {} });
    const mockImport = vi.fn().mockResolvedValue({ accepted: 1, rejected: 0, unchanged: 0 });
    mockUseMastery.mockReturnValue(makeReturn({ exportSnapshot: mockExport, importSnapshot: mockImport }));

    renderPage();

    await act(async () => {
      fireEvent.change(getFileInput(), { target: { files: [makeFileFromSnapshot(snapshot)] } });
    });

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /import preview/i })).toBeInTheDocument();
    });

    const applyBtn = screen.getByRole('button', { name: /apply/i });
    await act(async () => {
      fireEvent.click(applyBtn);
    });

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /import result/i })).toBeInTheDocument();
    });

    expect(mockImport).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Import complete')).toBeInTheDocument();
  });

  it('re-importing same snapshot shows unchanged count in preview', async () => {
    const adapter = new StubRemoteAdapter();
    const ts = Date.now();
    const card = makeCard('idempotent-card', ts);
    adapter.seed('idempotent-card', card);

    const mockExport = vi.fn().mockImplementation(() => adapter.bulkExport());
    const mockImport = vi.fn().mockImplementation((snap: MasteryExport) => adapter.bulkImport(snap));
    mockUseMastery.mockReturnValue(makeReturn({ exportSnapshot: mockExport, importSnapshot: mockImport }));

    renderPage();

    // Same snapshot — same timestamps
    const snapshot: MasteryExport = { schemaVersion: 1, cards: { 'idempotent-card': card } };

    await act(async () => {
      fireEvent.change(getFileInput(), { target: { files: [new File([JSON.stringify(snapshot)], 'test.json', { type: 'application/json' })] } });
    });

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /import preview/i })).toBeInTheDocument();
    });

    // Apply
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /apply/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /import result/i })).toBeInTheDocument();
    });

    // Result should show Cards unchanged
    const resultRegion = screen.getByRole('region', { name: /import result/i });
    expect(resultRegion).toHaveTextContent('Cards unchanged');
  });

  it('Cancel button removes preview and shows import button again', async () => {
    const remoteCard = makeCard('cancel-card', Date.now());
    const snapshot: MasteryExport = { schemaVersion: 1, cards: { 'cancel-card': remoteCard } };

    renderPage();

    await act(async () => {
      fireEvent.change(getFileInput(), { target: { files: [new File([JSON.stringify(snapshot)], 'test.json', { type: 'application/json' })] } });
    });

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /import preview/i })).toBeInTheDocument();
    });

    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);

    // Preview gone, import button visible again
    expect(screen.queryByRole('region', { name: /import preview/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /import from file/i })).toBeInTheDocument();
  });

  it('shows error message for invalid JSON', async () => {
    renderPage();

    const badFile = new File(['not json {{{'], 'bad.json', { type: 'application/json' });

    await act(async () => {
      fireEvent.change(getFileInput(), { target: { files: [badFile] } });
    });

    await waitFor(() => {
      expect(screen.getByText(/invalid json/i)).toBeInTheDocument();
    });
  });
});
