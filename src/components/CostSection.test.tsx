/**
 * Tests for CostSection component.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CostSection } from './CostSection';
import { addToCost, resetAllCosts } from '../byok';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const COST_KEYS = [
  'peliglot-byok-cost-anthropic',
  'peliglot-byok-cost-openai',
  'peliglot-byok-cost-openai-compatible',
];

beforeEach(() => {
  for (const key of COST_KEYS) {
    localStorage.removeItem(key);
  }
  vi.spyOn(window, 'confirm').mockReturnValue(true);
});

afterEach(() => {
  vi.restoreAllMocks();
  resetAllCosts();
});

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

describe('CostSection — empty state', () => {
  it('shows empty state when no costs are tracked', () => {
    render(<CostSection />);
    expect(screen.getByText(/no costs tracked yet/i)).toBeInTheDocument();
  });

  it('shows the section heading in empty state', () => {
    render(<CostSection />);
    expect(screen.getByRole('heading', { name: /usage costs/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// With cost data
// ---------------------------------------------------------------------------

describe('CostSection — with cost data', () => {
  it('renders a row for anthropic when it has cost data', () => {
    addToCost('anthropic', { input: 1000, output: 500, costUsd: 0.0105 });
    render(<CostSection />);

    expect(screen.getByText(/Anthropic/i)).toBeInTheDocument();
    // 0.0105 >= 0.01 → formatted as "$0.01"
    expect(screen.getByText(/\$0\.01/)).toBeInTheDocument();
  });

  it('renders a row for openai when it has cost data', () => {
    addToCost('openai', { input: 4200, output: 1800, costUsd: 0.00171 });
    render(<CostSection />);

    expect(screen.getByText(/OpenAI/i)).toBeInTheDocument();
  });

  it('does not render a row for providers with zero cost', () => {
    addToCost('anthropic', { input: 500, output: 200, costUsd: 0.005 });
    render(<CostSection />);

    // openai should not appear since it has no cost
    const rows = screen.queryByText(/OpenAI/i);
    expect(rows).toBeNull();
  });

  it('shows Reset button per row', () => {
    addToCost('anthropic', { input: 500, output: 200, costUsd: 0.005 });
    render(<CostSection />);

    // getAllByRole to handle both the per-row Reset and the Reset all button
    const resetButtons = screen.getAllByRole('button', { name: /reset/i });
    expect(resetButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('shows Reset all cost data button when costs exist', () => {
    addToCost('anthropic', { input: 500, output: 200, costUsd: 0.005 });
    render(<CostSection />);

    expect(screen.getByRole('button', { name: /reset all cost data/i })).toBeInTheDocument();
  });

  it('shows token counts (formatted with K suffix for thousands)', () => {
    addToCost('openai', { input: 4200, output: 1800, costUsd: 0.00171 });
    render(<CostSection />);

    // formatTokenCount converts 4200 → "4.2K" and 1800 → "1.8K"
    expect(screen.getByText(/4\.2K/)).toBeInTheDocument();
    expect(screen.getByText(/1\.8K/)).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Reset interactions
// ---------------------------------------------------------------------------

describe('CostSection — reset', () => {
  it('calls confirm before resetting a provider', () => {
    addToCost('anthropic', { input: 500, output: 200, costUsd: 0.005 });
    render(<CostSection />);

    fireEvent.click(screen.getByRole('button', { name: /^reset$/i }));

    expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('Anthropic'));
  });

  it('resets provider cost when confirm returns true', () => {
    addToCost('anthropic', { input: 500, output: 200, costUsd: 0.005 });
    const { rerender } = render(<CostSection />);

    fireEvent.click(screen.getByRole('button', { name: /^reset$/i }));
    rerender(<CostSection />);

    // After reset, should show empty state
    expect(screen.getByText(/no costs tracked yet/i)).toBeInTheDocument();
  });

  it('does not reset when confirm returns false', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    addToCost('anthropic', { input: 500, output: 200, costUsd: 0.005 });
    const { rerender } = render(<CostSection />);

    fireEvent.click(screen.getByRole('button', { name: /^reset$/i }));
    rerender(<CostSection />);

    // Cost row should still be visible
    expect(screen.getByText(/Anthropic/i)).toBeInTheDocument();
  });

  it('calls confirm before resetting all costs', () => {
    addToCost('anthropic', { input: 500, output: 200, costUsd: 0.005 });
    addToCost('openai', { input: 300, output: 100, costUsd: 0.003 });
    render(<CostSection />);

    fireEvent.click(screen.getByRole('button', { name: /reset all cost data/i }));

    expect(window.confirm).toHaveBeenCalled();
  });

  it('resets all costs when reset all is confirmed', () => {
    addToCost('anthropic', { input: 500, output: 200, costUsd: 0.005 });
    addToCost('openai', { input: 300, output: 100, costUsd: 0.003 });
    const { rerender } = render(<CostSection />);

    fireEvent.click(screen.getByRole('button', { name: /reset all cost data/i }));
    rerender(<CostSection />);

    expect(screen.getByText(/no costs tracked yet/i)).toBeInTheDocument();
  });
});
