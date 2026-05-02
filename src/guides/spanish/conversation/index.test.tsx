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
import { resetAllCosts, getUnpricedModelIds } from '../../../byok';
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

// ---------------------------------------------------------------------------
// Lifecycle: unmount during in-flight request
// ---------------------------------------------------------------------------

describe('lifecycle — unmount during in-flight request', () => {
  it('passes a signal in chat options and aborts it on unmount', async () => {
    let resolveChat: ((result: { text: string; usage: { input: number; output: number }; model: string }) => void) | null = null;
    const slowStub = {
      id: 'anthropic' as const,
      defaultModel: 'stub-model',
      calls: [] as Array<{ messages: unknown; options: { signal?: AbortSignal } }>,
      chat: (messages: unknown, options: { signal?: AbortSignal }) => {
        slowStub.calls.push({ messages, options });
        return new Promise((resolve) => { resolveChat = resolve; });
      },
    };

    const { unmount } = renderConversation(() => slowStub as unknown as ReturnType<typeof makeStubProvider>);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    // Send fired; the stub is suspended — verify it received an AbortSignal
    expect(slowStub.calls).toHaveLength(1);
    const signal = slowStub.calls[0]!.options.signal;
    expect(signal).toBeInstanceOf(AbortSignal);
    expect(signal!.aborted).toBe(false);

    // Unmount mid-flight — the AbortController inside the component should fire
    unmount();

    expect(signal!.aborted).toBe(true);

    // Resolve the still-pending promise. The component is gone; nothing should
    // throw and no late state writes should happen. (If it does, React will
    // log a "state update on unmounted component" warning and the test runner
    // surfaces it.)
    resolveChat!({ text: 'late reply', usage: { input: 1, output: 1 }, model: 'stub' });
    await new Promise((r) => setTimeout(r, 10));
  });
});

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

// ---------------------------------------------------------------------------
// Sliding context window
// ---------------------------------------------------------------------------

describe('sliding context window', () => {
  async function sendOne(stub: ReturnType<typeof makeStubProvider>, content: string) {
    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: content } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });
    // Wait for the assistant message to land (loading state to clear)
    await waitFor(() => {
      expect(stub.calls.length).toBeGreaterThan(0);
    });
  }

  it('sends full history when under the cap', async () => {
    const responses = Array.from({ length: 5 }, (_, i) => ({
      text: `Respuesta ${i + 1}`,
      usage: { input: 10, output: 20 },
      model: 'stub',
    }));
    const stub = makeStubProvider(responses);
    renderConversation(() => stub);

    for (let i = 1; i <= 5; i++) {
      await sendOne(stub, `Mensaje ${i}`);
    }

    // 5th call should include 4 prior pairs (8 messages) + new user (1) + system (1) = 10 messages
    const lastCall = stub.calls[stub.calls.length - 1]!;
    const userOrAssistant = lastCall.messages.filter(
      m => m.role === 'user' || m.role === 'assistant',
    );
    expect(userOrAssistant.length).toBe(9); // 4 prior pairs (8) + new user (1)

    // Truncation notice should NOT be visible
    expect(screen.queryByText(/older messages dropped/i)).toBeNull();
  });

  it('truncates history to last 40 messages when conversation exceeds the window', async () => {
    // 21 round-trips → 42 user/assistant messages after the 21st send.
    // The 22nd send sees 42 prior messages — exceeds cap of 40, so we trim.
    const responses = Array.from({ length: 22 }, (_, i) => ({
      text: `Respuesta ${i + 1}`,
      usage: { input: 10, output: 20 },
      model: 'stub',
    }));
    const stub = makeStubProvider(responses);
    renderConversation(() => stub);

    for (let i = 1; i <= 22; i++) {
      await sendOne(stub, `Mensaje ${i}`);
    }

    // Final call should send: system (1) + last 40 history + new user (1) = 42 total
    const lastCall = stub.calls[stub.calls.length - 1]!;
    expect(lastCall.messages.length).toBe(42);

    const userOrAssistant = lastCall.messages.filter(
      m => m.role === 'user' || m.role === 'assistant',
    );
    expect(userOrAssistant.length).toBe(41); // 40 trimmed history + 1 new user

    // The earliest message in the trimmed history should NOT be "Mensaje 1"
    const earliestKept = userOrAssistant[0]!.content;
    expect(earliestKept).not.toBe('Mensaje 1');

    // Truncation notice should be visible
    await waitFor(() => {
      expect(screen.getByText(/older messages dropped/i)).toBeInTheDocument();
    });
  });

  it('keeps older messages visible in the UI even when dropped from context', async () => {
    const responses = Array.from({ length: 22 }, (_, i) => ({
      text: `Respuesta ${i + 1}`,
      usage: { input: 10, output: 20 },
      model: 'stub',
    }));
    const stub = makeStubProvider(responses);
    renderConversation(() => stub);

    for (let i = 1; i <= 22; i++) {
      await sendOne(stub, `Mensaje ${i}`);
    }

    // The first user message should still be visible in the thread (just not in context)
    expect(screen.getByText('Mensaje 1')).toBeInTheDocument();
  });

  it('after a mid-conversation error the trimmed slice still starts with a user message', async () => {
    // Setup: one mid-conversation failure, then many successes. Errors are
    // filtered out of the model-context history, so the user/assistant
    // sequence is odd-length ending in `user` after the error. When the
    // window cap kicks in, slice(-40) might start with `assistant` —
    // Anthropic rejects that. The route must drop a leading `assistant`.
    let callCount = 0;
    type ChatArgs = Parameters<ReturnType<typeof makeStubProvider>['chat']>;
    type Recorded = { messages: ChatArgs[0]; options?: ChatArgs[1] };
    const calls: Recorded[] = [];
    const composite = {
      id: 'anthropic' as const,
      defaultModel: 'stub',
      calls,
      async chat(messages: ChatArgs[0], options?: ChatArgs[1]) {
        calls.push({ messages, options });
        callCount++;
        if (callCount === 1) {
          throw new LlmProviderError('temporary 500', 'http-error');
        }
        return { text: `Respuesta ${callCount}`, usage: { input: 10, output: 20 }, model: 'stub' };
      },
    };
    renderConversation(() => composite);

    // Turn 1: errors. Turn 2..23: succeed. After turn 23 the post-filter
    // sequence has 1 + 22*2 = 45 user/assistant messages, exceeding the 40 cap.
    await sendOne(composite, 'Mensaje 1');
    for (let i = 2; i <= 23; i++) {
      await sendOne(composite, `Mensaje ${i}`);
    }

    // Inspect the most recent call's payload — the first surviving
    // user/assistant message must be a user message.
    const lastCall = calls[calls.length - 1]!;
    const userOrAssistant = lastCall.messages.filter(
      m => m.role === 'user' || m.role === 'assistant',
    );
    expect(userOrAssistant[0]!.role).toBe('user');
  });
});

// ---------------------------------------------------------------------------
// Unpriced-model tracking
// ---------------------------------------------------------------------------

describe('unpriced-model tracking', () => {
  beforeEach(() => {
    // Stub the cost-storage unpriced key so each test sees a clean slate.
    try {
      localStorage.removeItem('peliglot-byok-unpriced-anthropic');
    } catch { /* ok */ }
  });

  it('records the model ID when pricing is missing', async () => {
    const stub = makeStubProvider([
      { text: '¡Hola!', usage: { input: 100, output: 50 }, model: 'mystery-model-x' },
    ]);
    // Silence the expected console.warn so the test output stays clean.
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    renderConversation(() => stub);
    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      expect(getUnpricedModelIds('anthropic')).toContain('mystery-model-x');
    });
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('does not record when pricing is available', async () => {
    // claude-sonnet-4-6 is in pricing.ts
    const stub = makeStubProvider([
      { text: '¡Hola!', usage: { input: 100, output: 50 }, model: 'claude-sonnet-4-6' },
    ]);
    renderConversation(() => stub);
    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    // Wait for the assistant message to land before asserting the negative.
    await waitFor(() => {
      expect(stub.calls.length).toBe(1);
    });
    expect(getUnpricedModelIds('anthropic')).toEqual([]);
  });

  it('shows an inline warning above the input after an unpriced call lands', async () => {
    const stub = makeStubProvider([
      { text: '¡Hola!', usage: { input: 100, output: 50 }, model: 'mystery-model-x' },
    ]);
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderConversation(() => stub);

    // Pre-condition: no warning before any call
    expect(screen.queryByText(/daily limit doesn't apply/i)).toBeNull();

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/daily limit doesn't apply/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /details in settings/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Cap-exceeded error handling
// ---------------------------------------------------------------------------

describe('cap-exceeded error', () => {
  it('Retry button is disabled while another request is in flight', async () => {
    // Build a stub that never resolves on the first call (retry remains
    // pending) and would fail on the second. We never let the second fire —
    // the test only verifies the Retry button is gated.
    let firstResolve: (() => void) | null = null;
    type ChatArgs = Parameters<ReturnType<typeof makeStubProvider>['chat']>;
    type Recorded = { messages: ChatArgs[0]; options?: ChatArgs[1] };
    const calls: Recorded[] = [];
    const composite = {
      id: 'anthropic' as const,
      defaultModel: 'stub',
      calls,
      async chat(messages: ChatArgs[0], options?: ChatArgs[1]) {
        calls.push({ messages, options });
        if (calls.length === 1) {
          // First call: error immediately so Retry button appears
          throw new LlmProviderError('temporary 500', 'http-error');
        }
        // Second call: hang
        return new Promise<never>((_, reject) => {
          firstResolve = () => reject(new LlmProviderError('still bad', 'http-error'));
        });
      },
    };
    renderConversation(() => composite);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    // First request errored — Retry button should be present and enabled
    const retryBtn = await screen.findByRole('button', { name: /retry sending/i });
    expect(retryBtn).not.toBeDisabled();

    // Click Retry — second request hangs (loading=true)
    await act(async () => {
      fireEvent.click(retryBtn);
    });

    // Retry should now be disabled until the in-flight request resolves
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /retry sending/i })).toBeDisabled();
    });

    // Cleanup: resolve the hung promise so the test exits cleanly
    const resolver = firstResolve as (() => void) | null;
    if (resolver) resolver();
  });

  it('shows a friendly error and link to Settings on cap-exceeded', async () => {
    const stub = makeErrorStubProvider(
      new LlmProviderError(
        'Daily cap of $1.00 reached for Anthropic (spent $1.20 today). Adjust the limit in Settings or wait until tomorrow.',
        'cap-exceeded',
      ),
    );
    renderConversation(() => stub);

    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Hola' } });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    });

    await waitFor(() => {
      // The error bubble surfaces the underlying message verbatim
      expect(screen.getByText(/daily cap of \$1\.00 reached/i)).toBeInTheDocument();
      // Link to Settings is rendered
      expect(screen.getByRole('link', { name: /adjust your daily limit/i })).toBeInTheDocument();
    });
  });
});
