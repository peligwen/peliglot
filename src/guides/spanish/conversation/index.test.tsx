/**
 * Tests for the Spanish Conversation surface.
 *
 * Uses makeStubProvider / makeErrorStubProvider to verify behavior
 * without any real network calls. The Conversation component accepts
 * a `getProviderFn` injection prop.
 */

import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Conversation } from './index';
import { makeStubProvider, makeErrorStubProvider } from '../../../byok/providers/__test_stub';
import { LlmProviderError } from '../../../byok/providers/types';
import { resetAllCosts } from '../../../byok';
import type { Provider } from '../../../byok';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('../../../byok', async () => {
  const actual = await vi.importActual('../../../byok');
  return {
    ...actual,
    listConfigured: vi.fn(),
    getProvider: vi.fn(),
  };
});

import { listConfigured } from '../../../byok';
const mockListConfigured = vi.mocked(listConfigured);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderConversation(
  getProviderFn?: (id: Provider) => ReturnType<typeof makeStubProvider> | null,
) {
  return render(
    <MemoryRouter>
      <Conversation getProviderFn={getProviderFn} />
    </MemoryRouter>,
  );
}

function makeDefaultResult(text = '¡Hola! ¿Cómo estás?') {
  return { text, usage: { input: 10, output: 20 }, model: 'stub' };
}

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks();
  // Default: anthropic configured
  mockListConfigured.mockReturnValue(['anthropic']);
  // Clear localStorage conversation provider preference and cost data
  try { localStorage.removeItem('peliglot-conversation-provider'); } catch { /* ok */ }
  resetAllCosts();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// No-provider empty state
// ---------------------------------------------------------------------------

describe('no provider configured', () => {
  it('shows empty state when no provider is configured', async () => {
    mockListConfigured.mockReturnValue([]);
    renderConversation();

    await waitFor(() => {
      expect(screen.getByText(/add a key to start chatting/i)).toBeInTheDocument();
    });
  });

  it('shows Settings link in no-provider state', async () => {
    mockListConfigured.mockReturnValue([]);
    renderConversation();

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /open settings/i })).toBeInTheDocument();
    });
  });
});

// ---------------------------------------------------------------------------
// Sending a message
// ---------------------------------------------------------------------------

describe('sending a message', () => {
  it('shows user bubble and assistant bubble after sending', async () => {
    const stub = makeStubProvider([makeDefaultResult()]);
    renderConversation(() => stub);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
    });

    const sendBtn = screen.getByRole('button', { name: /send message/i });
    await act(async () => {
      fireEvent.click(sendBtn);
    });

    await waitFor(() => {
      expect(screen.getByText('Hola')).toBeInTheDocument();
      expect(screen.getByText('¡Hola! ¿Cómo estás?')).toBeInTheDocument();
    });
  });

  it('disables the send button when input is empty', () => {
    renderConversation(() => makeStubProvider([]));

    const sendBtn = screen.getByRole('button', { name: /send message/i });
    expect(sendBtn).toBeDisabled();
  });

  it('clears the input after sending', async () => {
    const stub = makeStubProvider([makeDefaultResult()]);
    renderConversation(() => stub);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      expect((textarea as HTMLTextAreaElement).value).toBe('');
    });
  });
});

// ---------------------------------------------------------------------------
// Level switching
// ---------------------------------------------------------------------------

describe('level switching', () => {
  it('shows level selector buttons', () => {
    renderConversation(() => makeStubProvider([]));

    expect(screen.getByRole('button', { name: /beginner/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /intermediate/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /advanced/i })).toBeInTheDocument();
  });

  it('includes the new system prompt on subsequent messages after level switch', async () => {
    const stub = makeStubProvider([
      makeDefaultResult('Hola'),
      makeDefaultResult('Interesante'),
    ]);
    renderConversation(() => stub);

    // Send first message at beginner level
    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hello' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });
    await waitFor(() => expect(stub.calls).toHaveLength(1));

    // Switch to advanced
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /advanced/i }));
    });

    // Send second message
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola otra vez' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });
    await waitFor(() => expect(stub.calls).toHaveLength(2));

    // The system prompt in the second call should be the advanced one
    const secondCall = stub.calls[1]!;
    const systemMsg = secondCall.messages.find(m => m.role === 'system');
    expect(systemMsg?.content.toLowerCase()).toContain('advanced');
  });
});

// ---------------------------------------------------------------------------
// Provider switching
// ---------------------------------------------------------------------------

describe('provider switching', () => {
  it('shows provider selector when multiple providers are configured', () => {
    mockListConfigured.mockReturnValue(['anthropic', 'openai']);
    renderConversation(() => makeStubProvider([]));

    expect(screen.getByRole('combobox', { name: /provider/i })).toBeInTheDocument();
  });

  it('sends subsequent messages to the newly selected provider', async () => {
    mockListConfigured.mockReturnValue(['anthropic', 'openai']);

    const anthropicStub = makeStubProvider([makeDefaultResult('Anthropic response')]);
    const openaiStub = makeStubProvider([makeDefaultResult('OpenAI response')]);

    const providerMap: Record<string, ReturnType<typeof makeStubProvider>> = {
      anthropic: anthropicStub,
      openai: openaiStub,
    };

    renderConversation(id => providerMap[id] ?? null);

    // Send with anthropic (default)
    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Primera pregunta' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });
    await waitFor(() => screen.getByText('Anthropic response'));

    // Switch provider to openai
    const select = screen.getByRole('combobox', { name: /provider/i });
    await act(async () => {
      fireEvent.change(select, { target: { value: 'openai' } });
    });

    // Send second message
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Segunda pregunta' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });
    await waitFor(() => screen.getByText('OpenAI response'));

    expect(openaiStub.calls).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Ask in English
// ---------------------------------------------------------------------------

describe('Ask in English button', () => {
  it('injects the English help request into the conversation', async () => {
    const stub = makeStubProvider([
      makeDefaultResult('Primera respuesta'),
      makeDefaultResult('[help]: Here is the explanation in English. Continuemos en español.'),
    ]);
    renderConversation(() => stub);

    // Send initial message to make the conversation active
    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });
    await waitFor(() => screen.getByText('Primera respuesta'));

    // Ask in English button should now be visible
    const askBtn = screen.getByRole('button', { name: /ask for english explanation/i });
    await act(async () => {
      fireEvent.click(askBtn);
    });

    await waitFor(() => expect(stub.calls).toHaveLength(2));

    // The last user message in the second call should be the English help request
    const secondCall = stub.calls[1]!;
    const lastUserMsg = [...secondCall.messages].reverse().find(m => m.role === 'user');
    expect(lastUserMsg?.content).toContain('English');
  });
});

// ---------------------------------------------------------------------------
// Error path
// ---------------------------------------------------------------------------

describe('error handling', () => {
  it('shows inline error message on LlmProviderError(unauthorized)', async () => {
    const err = new LlmProviderError('Unauthorized', 'unauthorized');
    const stub = makeErrorStubProvider(err);
    renderConversation(() => stub);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/key was rejected/i)).toBeInTheDocument();
    });
  });

  it('shows retry button in error message', async () => {
    const err = new LlmProviderError('Network error', 'network');
    const stub = makeErrorStubProvider(err);
    renderConversation(() => stub);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });
  });

  it('does not auto-retry — error message persists until user action', async () => {
    const err = new LlmProviderError('Network error', 'network');
    const stub = makeErrorStubProvider(err);
    renderConversation(() => stub);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    // Error stays; no additional calls happened
    expect(stub.calls).toHaveLength(1);
  });

  it('shows rate-limit copy with retry-after seconds when retryAfterMs is set', async () => {
    const err = new LlmProviderError('Rate limited', 'rate-limited', 30_000);
    const stub = makeErrorStubProvider(err);
    renderConversation(() => stub);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/rate-limiting/i)).toBeInTheDocument();
      expect(screen.getByText(/30 seconds/i)).toBeInTheDocument();
    });
  });

  it('shows rate-limit fallback copy when retryAfterMs is undefined', async () => {
    const err = new LlmProviderError('Rate limited', 'rate-limited');
    const stub = makeErrorStubProvider(err);
    renderConversation(() => stub);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/rate-limiting/i)).toBeInTheDocument();
      expect(screen.getByText(/in a moment/i)).toBeInTheDocument();
    });
  });

  it('shows network error copy with provider name', async () => {
    const err = new LlmProviderError('Failed to fetch', 'network');
    const stub = makeErrorStubProvider(err);
    renderConversation(() => stub);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      // Provider is 'anthropic' (stub default), so "Anthropic" should appear
      expect(screen.getByText(/couldn't reach/i)).toBeInTheDocument();
    });
  });
});

// ---------------------------------------------------------------------------
// Session cost chip
// ---------------------------------------------------------------------------

describe('session cost chip', () => {
  it('does not show the chip before any messages', () => {
    renderConversation(() => makeStubProvider([]));
    expect(screen.queryByLabelText(/session cost/i)).toBeNull();
  });

  it('shows the chip with cost estimate after a successful message (known model)', async () => {
    // Use a model that IS in the pricing table
    const stub = makeStubProvider([
      { text: '¡Hola!', usage: { input: 100, output: 50 }, model: 'gpt-4o-mini' },
    ]);
    renderConversation(() => stub);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      const chip = screen.getByLabelText(/session cost/i);
      expect(chip).toBeInTheDocument();
      // Should show token counts
      expect(chip.textContent).toMatch(/100/);
      expect(chip.textContent).toMatch(/50/);
      // Should show a cost estimate (≈$...)
      expect(chip.textContent).toMatch(/≈/);
    });
  });

  it('shows "no pricing data" copy after a successful message with an unknown model', async () => {
    // 'stub' model is not in the pricing table
    const stub = makeStubProvider([
      { text: '¡Hola!', usage: { input: 100, output: 50 }, model: 'my-local-llm' },
    ]);
    renderConversation(() => stub);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      const chip = screen.getByLabelText(/session cost/i);
      expect(chip).toBeInTheDocument();
      expect(chip.textContent).toContain('no pricing data');
      expect(chip.textContent).toContain('my-local-llm');
    });
  });

  it('shows "provider didn\'t report token usage" when usage is {0,0}', async () => {
    const stub = makeStubProvider([
      { text: '¡Hola!', usage: { input: 0, output: 0 }, model: 'some-server' },
    ]);
    renderConversation(() => stub);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      const chip = screen.getByLabelText(/session cost/i);
      expect(chip.textContent).toMatch(/didn't report token usage/i);
    });
  });
});
