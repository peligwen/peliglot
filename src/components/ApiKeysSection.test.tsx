/**
 * Tests for ApiKeysSection.
 *
 * Tests the full render, provider card expand/collapse, form interactions,
 * validation outcomes (ok / unauthorized / mixed-content / cors-blocked /
 * network-error), Save (writes to localStorage), and Forget all.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ApiKeysSection } from './ApiKeysSection';
import { clearAll, readConfig, writeConfig } from '../byok';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  clearAll();
  vi.restoreAllMocks();
  // Default: http: so mixed-content checks are inactive
  Object.defineProperty(window, 'location', {
    value: { ...window.location, protocol: 'http:' },
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  clearAll();
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

describe('ApiKeysSection — render', () => {
  it('renders the section heading', () => {
    render(<ApiKeysSection />);
    expect(screen.getByRole('heading', { name: /ai keys/i })).toBeInTheDocument();
  });

  it('renders all three provider cards collapsed', () => {
    render(<ApiKeysSection />);
    // Button names include the pill text (e.g. "Anthropic Not set up")
    expect(screen.getByRole('button', { name: /anthropic/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /openai not set up/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /custom endpoint/i })).toBeInTheDocument();
  });

  it('shows "Not set up" pill for unconfigured providers', () => {
    render(<ApiKeysSection />);
    const notSetUp = screen.getAllByText('Not set up');
    expect(notSetUp).toHaveLength(3);
  });

  it('shows the disclosure panel', () => {
    render(<ApiKeysSection />);
    expect(screen.getByText(/your key never leaves this browser/i)).toBeInTheDocument();
  });

  it('renders "Forget all keys" button', () => {
    render(<ApiKeysSection />);
    expect(screen.getByRole('button', { name: /forget all keys/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Expand / collapse
// ---------------------------------------------------------------------------

describe('ApiKeysSection — expand/collapse', () => {
  it('expands Anthropic card on click', () => {
    render(<ApiKeysSection />);
    // Use aria-expanded to find the toggle button
    fireEvent.click(screen.getByRole('button', { name: /anthropic/i }));
    expect(screen.getByRole('button', { name: /^test$/i })).toBeInTheDocument();
  });

  it('collapses an expanded card on second click', () => {
    render(<ApiKeysSection />);
    const toggle = screen.getByRole('button', { name: /anthropic/i });
    fireEvent.click(toggle);
    expect(screen.getByLabelText(/anthropic api key/i)).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.queryByLabelText(/anthropic api key/i)).not.toBeInTheDocument();
  });

  it('expands OpenAI card on click', () => {
    render(<ApiKeysSection />);
    fireEvent.click(screen.getByRole('button', { name: /openai not set up/i }));
    expect(screen.getByLabelText(/openai api key/i)).toBeInTheDocument();
  });

  it('expands Custom endpoint card on click', () => {
    render(<ApiKeysSection />);
    fireEvent.click(screen.getByRole('button', { name: /custom endpoint/i }));
    expect(screen.getByLabelText(/base url for custom endpoint/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/model name for custom endpoint/i)).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Anthropic — validation outcomes and save
// ---------------------------------------------------------------------------

describe('ApiKeysSection — Anthropic card', () => {
  function openAnthropic() {
    render(<ApiKeysSection />);
    fireEvent.click(screen.getByRole('button', { name: /anthropic/i }));
  }

  it('Test button is disabled when key field is empty', () => {
    openAnthropic();
    const testBtn = screen.getByRole('button', { name: /^test$/i });
    expect(testBtn).toBeDisabled();
  });

  it('Test button enabled after typing a key', () => {
    openAnthropic();
    fireEvent.change(screen.getByLabelText(/anthropic api key/i), {
      target: { value: 'sk-ant-test' },
    });
    expect(screen.getByRole('button', { name: /^test$/i })).not.toBeDisabled();
  });

  it('shows "Connected" on successful validation', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ content: [] }),
    } as unknown as Response);

    openAnthropic();
    fireEvent.change(screen.getByLabelText(/anthropic api key/i), {
      target: { value: 'sk-ant-valid' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^test$/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/connected/i);
    });
  });

  it('shows unauthorized message on 401', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ error: { message: 'Invalid key' } }),
    } as unknown as Response);

    openAnthropic();
    fireEvent.change(screen.getByLabelText(/anthropic api key/i), {
      target: { value: 'sk-ant-bad' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^test$/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
    expect(screen.getByRole('alert')).not.toHaveTextContent('sk-ant-bad');
  });

  it('shows network-error message when fetch throws TypeError', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));

    openAnthropic();
    fireEvent.change(screen.getByLabelText(/anthropic api key/i), {
      target: { value: 'sk-ant-test' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^test$/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('Save button writes config to localStorage on successful test', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ content: [] }),
    } as unknown as Response);

    openAnthropic();
    fireEvent.change(screen.getByLabelText(/anthropic api key/i), {
      target: { value: 'sk-ant-valid-key' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^test$/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/connected/i);
    });

    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    // Card should close; check localStorage
    const config = readConfig('anthropic');
    expect(config).not.toBeNull();
    expect(config?.provider).toBe('anthropic');
    if (config?.provider === 'anthropic') {
      expect(config.apiKey).toBe('sk-ant-valid-key');
    }
  });

  it('Save button is disabled before a successful test', () => {
    openAnthropic();
    fireEvent.change(screen.getByLabelText(/anthropic api key/i), {
      target: { value: 'sk-ant-test' },
    });
    expect(screen.getByRole('button', { name: /^save$/i })).toBeDisabled();
  });

  it('shows "Configured" pill and Forget button after saving', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ content: [] }),
    } as unknown as Response);

    openAnthropic();
    fireEvent.change(screen.getByLabelText(/anthropic api key/i), {
      target: { value: 'sk-ant-valid-key' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^test$/i }));
    });

    await waitFor(() => screen.getByRole('status'));
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    // Re-open the card
    fireEvent.click(screen.getByRole('button', { name: /anthropic/i }));
    expect(screen.getByText('Configured')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /forget this key/i })).toBeInTheDocument();
  });

  it('Forget this key clears the config', () => {
    // Pre-seed a config
    writeConfig({ provider: 'anthropic', apiKey: 'sk-ant-pre-seeded' });

    render(<ApiKeysSection />);
    fireEvent.click(screen.getByRole('button', { name: /anthropic/i }));

    expect(screen.getByText('Configured')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /forget this key/i }));

    expect(readConfig('anthropic')).toBeNull();
    expect(screen.queryByRole('button', { name: /forget this key/i })).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// OpenAI — validation outcomes and save
// ---------------------------------------------------------------------------

describe('ApiKeysSection — OpenAI card', () => {
  function openOpenAI() {
    render(<ApiKeysSection />);
    fireEvent.click(screen.getByRole('button', { name: /openai not set up/i }));
  }

  it('shows "Connected" and saves on successful test', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ choices: [] }),
    } as unknown as Response);

    openOpenAI();
    fireEvent.change(screen.getByLabelText(/openai api key/i), {
      target: { value: 'sk-openai-valid' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^test$/i }));
    });

    await waitFor(() => screen.getByRole('status'));
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    const config = readConfig('openai');
    expect(config?.provider).toBe('openai');
    if (config?.provider === 'openai') {
      expect(config.apiKey).toBe('sk-openai-valid');
    }
  });

  it('shows error on unauthorized', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ error: { message: 'Incorrect key' } }),
    } as unknown as Response);

    openOpenAI();
    fireEvent.change(screen.getByLabelText(/openai api key/i), {
      target: { value: 'sk-bad' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^test$/i }));
    });

    await waitFor(() => screen.getByRole('alert'));
    expect(screen.getByRole('alert')).not.toHaveTextContent('sk-bad');
  });
});

// ---------------------------------------------------------------------------
// Custom endpoint — form + outcomes
// ---------------------------------------------------------------------------

describe('ApiKeysSection — Custom endpoint card', () => {
  function openCustom() {
    render(<ApiKeysSection />);
    fireEvent.click(screen.getByRole('button', { name: /custom endpoint/i }));
  }

  it('Test button disabled when baseUrl or model is empty', () => {
    openCustom();
    expect(screen.getByRole('button', { name: /^test$/i })).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/base url for custom endpoint/i), {
      target: { value: 'http://localhost:11434/v1' },
    });
    // Still disabled — model is empty
    expect(screen.getByRole('button', { name: /^test$/i })).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/model name for custom endpoint/i), {
      target: { value: 'llama3' },
    });
    expect(screen.getByRole('button', { name: /^test$/i })).not.toBeDisabled();
  });

  it('shows cors-blocked message when fetch throws TypeError', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));

    openCustom();
    fireEvent.change(screen.getByLabelText(/base url for custom endpoint/i), {
      target: { value: 'http://localhost:11434/v1' },
    });
    fireEvent.change(screen.getByLabelText(/model name for custom endpoint/i), {
      target: { value: 'llama3' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^test$/i }));
    });

    await waitFor(() => screen.getByRole('alert'));
    // Should mention CORS / origin
    expect(screen.getByRole('alert')).toHaveTextContent(/origin|cors|ollama/i);
  });

  it('shows mixed-content message when HTTPS page calls plain HTTP non-localhost', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, protocol: 'https:' },
      writable: true,
      configurable: true,
    });

    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    openCustom();
    fireEvent.change(screen.getByLabelText(/base url for custom endpoint/i), {
      target: { value: 'http://my-home-server.local:11434/v1' },
    });
    fireEvent.change(screen.getByLabelText(/model name for custom endpoint/i), {
      target: { value: 'llama3' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^test$/i }));
    });

    await waitFor(() => screen.getByRole('alert'));
    expect(screen.getByRole('alert')).toHaveTextContent(/mixed content|https|tailscale/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('saves config to localStorage on successful test', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ choices: [] }),
    } as unknown as Response);

    openCustom();
    fireEvent.change(screen.getByLabelText(/friendly name/i), {
      target: { value: 'Home server' },
    });
    fireEvent.change(screen.getByLabelText(/base url for custom endpoint/i), {
      target: { value: 'http://localhost:11434/v1' },
    });
    fireEvent.change(screen.getByLabelText(/model name for custom endpoint/i), {
      target: { value: 'llama-3.1-70b' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^test$/i }));
    });

    await waitFor(() => screen.getByRole('status'));
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    const config = readConfig('openai-compatible');
    expect(config?.provider).toBe('openai-compatible');
    if (config?.provider === 'openai-compatible') {
      expect(config.baseUrl).toBe('http://localhost:11434/v1');
      expect(config.model).toBe('llama-3.1-70b');
      expect(config.label).toBe('Home server');
    }
  });
});

// ---------------------------------------------------------------------------
// Forget all keys
// ---------------------------------------------------------------------------

describe('ApiKeysSection — Forget all keys', () => {
  it('calls clearAll and prompts confirm before deleting', () => {
    writeConfig({ provider: 'anthropic', apiKey: 'sk-ant-test' });
    writeConfig({ provider: 'openai', apiKey: 'sk-openai-test' });

    vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(<ApiKeysSection />);
    fireEvent.click(screen.getByRole('button', { name: /forget all keys/i }));

    expect(window.confirm).toHaveBeenCalledWith('Forget all configured API keys?');
    expect(readConfig('anthropic')).toBeNull();
    expect(readConfig('openai')).toBeNull();
  });

  it('does nothing if confirm is cancelled', () => {
    writeConfig({ provider: 'anthropic', apiKey: 'sk-ant-test' });

    vi.spyOn(window, 'confirm').mockReturnValue(false);

    render(<ApiKeysSection />);
    fireEvent.click(screen.getByRole('button', { name: /forget all keys/i }));

    expect(readConfig('anthropic')).not.toBeNull();
  });
});
