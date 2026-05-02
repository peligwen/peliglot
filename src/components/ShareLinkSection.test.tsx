/**
 * Tests for ShareLinkSection.
 *
 * Mocks clipboard.writeText and qrcode-generator to isolate the component.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ShareLinkSection } from './ShareLinkSection';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('../hooks/useMastery', () => ({
  useMastery: vi.fn(),
}));

// Mock qrcode-generator so it doesn't try to actually run in jsdom
vi.mock('qrcode-generator', () => {
  const mockQr = {
    addData: vi.fn(),
    make: vi.fn(),
    createSvgTag: vi.fn().mockReturnValue('<svg data-testid="mock-qr-svg"><rect /></svg>'),
  };
  const factory = vi.fn().mockReturnValue(mockQr);
  return { default: factory };
});

import { useMastery } from '../hooks/useMastery';
import type { UseMasteryReturn } from '../hooks/useMastery';

const mockUseMastery = useMastery as ReturnType<typeof vi.fn>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

function renderSection() {
  return render(
    <MemoryRouter>
      <ShareLinkSection />
    </MemoryRouter>,
  );
}

// Mock clipboard
const mockClipboardWrite = vi.fn().mockResolvedValue(undefined);

beforeEach(() => {
  mockUseMastery.mockReturnValue(makeReturn());
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: mockClipboardWrite },
    writable: true,
    configurable: true,
  });
  mockClipboardWrite.mockClear();
  mockClipboardWrite.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ShareLinkSection — render', () => {
  it('renders the section heading', () => {
    renderSection();
    expect(screen.getByRole('heading', { name: /share links/i })).toBeInTheDocument();
  });

  it('renders Copy share link and Show QR buttons', () => {
    renderSection();
    expect(screen.getByRole('button', { name: /copy share link/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show qr/i })).toBeInTheDocument();
  });

  it('Copy button is disabled when not hydrated', () => {
    mockUseMastery.mockReturnValue(makeReturn({ isHydrated: false }));
    renderSection();
    expect(screen.getByRole('button', { name: /copy share link/i })).toBeDisabled();
  });
});

describe('ShareLinkSection — copy share link', () => {
  it('calls clipboard.writeText with a /import#snapshot= URL', async () => {
    renderSection();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /copy share link/i }));
    });

    await waitFor(() => {
      expect(mockClipboardWrite).toHaveBeenCalledTimes(1);
    });

    const calledUrl: string = mockClipboardWrite.mock.calls[0][0] as string;
    expect(calledUrl).toMatch(/\/import#snapshot=/);
  });

  it('shows "Copied!" feedback after clipboard write succeeds', async () => {
    renderSection();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /copy share link/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument();
    });
  });

  it('shows fallback input when clipboard API throws', async () => {
    mockClipboardWrite.mockRejectedValue(new Error('Clipboard denied'));
    renderSection();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /copy share link/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: /share link/i })).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox', { name: /share link/i }) as HTMLInputElement;
    expect(input.value).toMatch(/\/import#snapshot=/);
  });
});

describe('ShareLinkSection — QR code', () => {
  it('toggles the QR panel when Show QR is clicked', async () => {
    renderSection();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /show qr/i }));
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/qr code panel/i)).toBeInTheDocument();
    });
  });

  it('renders the QR SVG in the panel after loading', async () => {
    renderSection();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /show qr/i }));
    });

    await waitFor(() => {
      expect(screen.getByTestId('qr-svg-container')).toBeInTheDocument();
    });
  });

  it('hides the QR panel when Hide QR is clicked', async () => {
    renderSection();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /show qr/i }));
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/qr code panel/i)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /hide qr/i }));
    });

    expect(screen.queryByLabelText(/qr code panel/i)).not.toBeInTheDocument();
  });
});
