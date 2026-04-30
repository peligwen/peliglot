/**
 * Tests for CostSection component.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CostSection } from './CostSection';
import {
  addToCost,
  resetAllCosts,
  writeConfig,
  clearAll,
  getDailyCap,
  setDailyCap,
  markUnpricedCall,
} from '../byok';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const COST_KEYS = [
  'peliglot-byok-cost-anthropic',
  'peliglot-byok-cost-openai',
  'peliglot-byok-cost-openai-compatible',
];

const CONFIG_KEYS = [
  'peliglot-byok-anthropic',
  'peliglot-byok-openai',
  'peliglot-byok-openai-compatible',
];

const CAP_KEYS = [
  'peliglot-byok-cap-anthropic',
  'peliglot-byok-cap-openai',
  'peliglot-byok-cap-openai-compatible',
];

const UNPRICED_KEYS = [
  'peliglot-byok-unpriced-anthropic',
  'peliglot-byok-unpriced-openai',
  'peliglot-byok-unpriced-openai-compatible',
];

beforeEach(() => {
  for (const key of [...COST_KEYS, ...CONFIG_KEYS, ...CAP_KEYS, ...UNPRICED_KEYS]) {
    localStorage.removeItem(key);
  }
  vi.spyOn(window, 'confirm').mockReturnValue(true);
});

afterEach(() => {
  vi.restoreAllMocks();
  clearAll();
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

// ---------------------------------------------------------------------------
// Daily limits — visibility
// ---------------------------------------------------------------------------

describe('CostSection — daily limits visibility', () => {
  it('does not render the daily limits section when no provider is configured', () => {
    render(<CostSection />);
    expect(screen.queryByRole('heading', { name: /daily limits/i })).toBeNull();
  });

  it('renders the daily limits section with a row per configured provider', () => {
    writeConfig({ provider: 'anthropic', apiKey: 'sk-ant-test' });
    writeConfig({ provider: 'openai', apiKey: 'sk-openai-test' });
    render(<CostSection />);

    expect(screen.getByRole('heading', { name: /daily limits/i })).toBeInTheDocument();
    // One labeled input per configured provider
    expect(screen.getByLabelText(/daily limit \(usd\)/i, { selector: '#cap-anthropic' }))
      .toBeInTheDocument();
    expect(screen.getByLabelText(/daily limit \(usd\)/i, { selector: '#cap-openai' }))
      .toBeInTheDocument();
  });

  it('shows today\'s spend per provider', () => {
    writeConfig({ provider: 'anthropic', apiKey: 'sk-ant-test' });
    addToCost('anthropic', { input: 100, output: 50, costUsd: 0.42 });
    render(<CostSection />);

    // "Today: $0.42" text
    expect(screen.getByText(/today:\s*\$0\.42/i)).toBeInTheDocument();
  });

  it('renders progress bar only when a cap is set', () => {
    writeConfig({ provider: 'anthropic', apiKey: 'sk-ant-test' });
    render(<CostSection />);
    expect(screen.queryByRole('progressbar')).toBeNull();

    setDailyCap('anthropic', 1.0);
    // Re-render
    render(<CostSection />);
    expect(screen.getAllByRole('progressbar').length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Daily limits — input + persist
// ---------------------------------------------------------------------------

describe('CostSection — daily limits input', () => {
  beforeEach(() => {
    writeConfig({ provider: 'anthropic', apiKey: 'sk-ant-test' });
  });

  it('saves a positive cap when Save is clicked', () => {
    render(<CostSection />);
    const input = screen.getByLabelText(/daily limit \(usd\)/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '1.50' } });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    expect(getDailyCap('anthropic')).toBeCloseTo(1.5, 6);
  });

  it('saves cap on Enter key', () => {
    render(<CostSection />);
    const input = screen.getByLabelText(/daily limit \(usd\)/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '0.25' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(getDailyCap('anthropic')).toBeCloseTo(0.25, 6);
  });

  it('rejects zero with an inline error', () => {
    render(<CostSection />);
    const input = screen.getByLabelText(/daily limit \(usd\)/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/positive number/i);
    expect(getDailyCap('anthropic')).toBeNull();
  });

  it('rejects negative with an inline error', () => {
    render(<CostSection />);
    const input = screen.getByLabelText(/daily limit \(usd\)/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '-5' } });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(getDailyCap('anthropic')).toBeNull();
  });

  it('rejects values above maximum', () => {
    render(<CostSection />);
    const input = screen.getByLabelText(/daily limit \(usd\)/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '5000' } });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/maximum/i);
    expect(getDailyCap('anthropic')).toBeNull();
  });

  it('saving an empty value clears the cap', () => {
    setDailyCap('anthropic', 1.0);
    render(<CostSection />);

    const input = screen.getByLabelText(/daily limit \(usd\)/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    expect(getDailyCap('anthropic')).toBeNull();
  });

  it('Clear button appears only when a cap is set', () => {
    render(<CostSection />);
    expect(screen.queryByRole('button', { name: /^clear$/i })).toBeNull();

    setDailyCap('anthropic', 1.0);
    render(<CostSection />);
    expect(screen.getByRole('button', { name: /^clear$/i })).toBeInTheDocument();
  });

  it('Clear button removes the persisted cap', () => {
    setDailyCap('anthropic', 1.0);
    const { rerender } = render(<CostSection />);
    fireEvent.click(screen.getByRole('button', { name: /^clear$/i }));
    rerender(<CostSection />);

    expect(getDailyCap('anthropic')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Daily limits — unpriced-model warning
// ---------------------------------------------------------------------------

describe('CostSection — unpriced model warning', () => {
  beforeEach(() => {
    writeConfig({ provider: 'anthropic', apiKey: 'sk-ant-test' });
  });

  it('does not show the warning when no unpriced models recorded', () => {
    render(<CostSection />);
    expect(screen.queryByText(/no pricing data/i)).toBeNull();
  });

  it('shows a warning when an unpriced model has been recorded', () => {
    markUnpricedCall('anthropic', 'claude-future-1');
    render(<CostSection />);

    expect(screen.getByText(/no pricing data/i)).toBeInTheDocument();
    expect(screen.getByText(/claude-future-1/)).toBeInTheDocument();
  });

  it('lists multiple unpriced models when present', () => {
    markUnpricedCall('anthropic', 'claude-future-1');
    markUnpricedCall('anthropic', 'claude-future-2');
    render(<CostSection />);

    expect(screen.getByText(/claude-future-1/)).toBeInTheDocument();
    expect(screen.getByText(/claude-future-2/)).toBeInTheDocument();
  });

  it('warning is scoped to the affected provider', () => {
    writeConfig({ provider: 'openai', apiKey: 'sk-openai-test' });
    markUnpricedCall('openai', 'mystery-model');
    render(<CostSection />);

    // The warning should appear once (for openai) but not for anthropic
    expect(screen.getByText(/mystery-model/)).toBeInTheDocument();
    const allWarnings = screen.queryAllByText(/no pricing data/i);
    expect(allWarnings.length).toBe(1);
  });
});
