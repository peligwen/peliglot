/**
 * Spanish Conversation Surface — /guides/spanish/conversation
 *
 * Chat-style UI with a Spanish-speaking native-peer NPC.
 * System prompt scales with level (beginner / intermediate / advanced).
 *
 * Architecture:
 * - `Component()` is the lazy-route entry: no args, uses default adapter.
 * - `Conversation({ getProvider? })` is the internal component: accepts injection
 *   for testing without module mocks.
 *
 * Invariants:
 * - Conversation history is in component state ONLY — not persisted.
 * - Provider selection is persisted via localStorage (key below).
 * - NO mastery imports. This surface is completely parallel to mastery.
 * - NO direct fetch calls. All LLM calls go through the provider abstraction.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactElement, CSSProperties, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { listConfigured, getProvider, addToCost, lookupPricing, computeCostUsd, formatCostUsd, PROVIDER_LABELS, CONVERSATION_PROVIDER_KEY, markUnpricedCall, getUnpricedModelIds } from '../../../byok';
import type { LlmProvider, ChatMessage } from '../../../byok';
import { LlmProviderError } from '../../../byok';
import type { Provider } from '../../../byok';
import { systemPromptFor, ENGLISH_HELP_REQUEST } from './systemPrompt';
import type { ConversationLevel } from './systemPrompt';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SPANISH_RED = '#C62828';

/**
 * Sliding-context-window cap. We send at most this many user/assistant
 * messages (plus the system prompt) per request. With 20 user + 20 assistant
 * messages the typical input bill is bounded at ~5–8K tokens regardless of
 * how long the conversation has been running. Older history is dropped from
 * context (and a notice is shown to the user) but stays visible in the UI.
 */
const MAX_HISTORY_MESSAGES = 40;

const LEVEL_LABELS: Record<ConversationLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

/** Labels for the provider dropdown selector. */
const DROPDOWN_PROVIDER_LABELS: Record<Provider, string> = {
  anthropic: 'Anthropic (Claude)',
  openai: 'OpenAI (GPT)',
  'openai-compatible': 'Local / compatible',
};

// ---------------------------------------------------------------------------
// Message types
// ---------------------------------------------------------------------------

type MessageRole = 'user' | 'assistant' | 'error';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  /** Only set for error messages — the original user content to retry. */
  retryContent?: string;
  /** Optional inline link shown below error bubbles. */
  link?: { to: string; label: string };
}

let msgIdCounter = 0;
function nextId(): string {
  return `msg-${++msgIdCounter}`;
}

// ---------------------------------------------------------------------------
// usePersistedProvider — reads/writes provider preference to localStorage
// ---------------------------------------------------------------------------

function loadPersistedProvider(): Provider | null {
  try {
    const raw = localStorage.getItem(CONVERSATION_PROVIDER_KEY);
    if (raw === 'anthropic' || raw === 'openai' || raw === 'openai-compatible') return raw;
    return null;
  } catch {
    return null;
  }
}

function savePersistedProvider(id: Provider): void {
  try {
    localStorage.setItem(CONVERSATION_PROVIDER_KEY, id);
  } catch {
    // Private mode / full storage — silently skip
  }
}

// ---------------------------------------------------------------------------
// HeaderStrip
// ---------------------------------------------------------------------------

function HeaderStrip({
  level,
  onLevelChange,
}: {
  level: ConversationLevel;
  onLevelChange: (l: ConversationLevel) => void;
}): ReactElement {
  const levels: ConversationLevel[] = ['beginner', 'intermediate', 'advanced'];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 20px',
        borderBottom: '1px solid #eee',
        background: '#fff',
        fontSize: 13,
        flexWrap: 'wrap',
        fontFamily: "system-ui,'Segoe UI',sans-serif",
      }}
    >
      <Link
        to="/"
        style={{
          color: '#888',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 12,
          letterSpacing: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span aria-hidden="true">{'←'}</span> All collections
      </Link>

      <Link
        to="/guides/spanish"
        style={{
          color: '#888',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 12,
          letterSpacing: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span aria-hidden="true">{'←'}</span> Español
      </Link>

      <div
        style={{
          fontWeight: 700,
          fontSize: 13,
          color: SPANISH_RED,
          marginLeft: 4,
        }}
      >
        Conversation practice
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{ display: 'flex', gap: 6, alignItems: 'center' }}
        role="group"
        aria-label="Conversation level"
      >
        {levels.map(l => (
          <button
            key={l}
            onClick={() => onLevelChange(l)}
            aria-pressed={level === l}
            style={{
              padding: '4px 12px',
              borderRadius: 20,
              border: level === l ? `2px solid ${SPANISH_RED}` : '2px solid #e0e0e0',
              background: level === l ? '#fff0f0' : '#fff',
              color: level === l ? SPANISH_RED : '#666',
              fontWeight: level === l ? 700 : 500,
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: "system-ui,'Segoe UI',sans-serif",
              transition: 'all 0.15s',
            }}
          >
            {LEVEL_LABELS[l]}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProviderSelector
// ---------------------------------------------------------------------------

function ProviderSelector({
  configured,
  selected,
  onChange,
}: {
  configured: Provider[];
  selected: Provider | null;
  onChange: (p: Provider) => void;
}): ReactElement {
  if (configured.length === 0) {
    return (
      <div
        style={{
          padding: '16px 20px',
          background: '#fffbe6',
          borderBottom: '1px solid #ffe082',
          fontSize: 13,
          color: '#7B6F00',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: "system-ui,'Segoe UI',sans-serif",
        }}
      >
        No AI provider configured.{' '}
        <Link
          to="/settings"
          style={{ color: SPANISH_RED, fontWeight: 700, textDecoration: 'none' }}
        >
          Add a key in Settings
        </Link>{' '}
        to start chatting.
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '8px 20px',
        borderBottom: '1px solid #eee',
        background: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 13,
        fontFamily: "system-ui,'Segoe UI',sans-serif",
      }}
    >
      <label
        htmlFor="provider-select"
        style={{ color: '#666', fontWeight: 600, flexShrink: 0 }}
      >
        Provider:
      </label>
      <select
        id="provider-select"
        value={selected ?? ''}
        onChange={e => onChange(e.target.value as Provider)}
        style={{
          padding: '4px 10px',
          borderRadius: 6,
          border: '1px solid #ddd',
          background: '#fff',
          fontSize: 13,
          color: '#1a1a1a',
          cursor: 'pointer',
          fontFamily: "system-ui,'Segoe UI',sans-serif",
        }}
      >
        {configured.map(p => (
          <option key={p} value={p}>
            {DROPDOWN_PROVIDER_LABELS[p]}
          </option>
        ))}
      </select>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MessageBubble
// ---------------------------------------------------------------------------

function MessageBubble({
  message,
  onRetry,
  retryDisabled = false,
}: {
  message: Message;
  onRetry?: (content: string) => void;
  /** When true, the Retry button is disabled (typically while another
   *  request is in flight) so users can't spam-click during a flapping 5xx. */
  retryDisabled?: boolean;
}): ReactElement {
  const isUser = message.role === 'user';
  const isError = message.role === 'error';

  const bubbleStyle: CSSProperties = {
    maxWidth: '75%',
    padding: '12px 16px',
    borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
    fontSize: 15,
    lineHeight: 1.55,
    wordBreak: 'break-word',
    fontFamily: isUser ? "system-ui,'Segoe UI',sans-serif" : 'Georgia, serif',
    ...(isError
      ? {
          background: '#ffebee',
          color: '#B71C1C',
          border: '1px solid #ef9a9a',
          borderRadius: 12,
        }
      : isUser
        ? {
            background: SPANISH_RED,
            color: '#fff',
          }
        : {
            background: '#f5f5f5',
            color: '#1a1a1a',
            border: '1px solid #e8e8e8',
          }),
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 12,
        padding: '0 4px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
        <div style={bubbleStyle}>
          {message.content}
          {isError && message.link && (
            <Link
              to={message.link.to}
              style={{
                color: '#B71C1C',
                fontWeight: 700,
                marginLeft: 4,
                textDecoration: 'underline',
              }}
            >
              {message.link.label}
            </Link>
          )}
        </div>
        {isError && onRetry && message.retryContent && (
          <button
            onClick={() => onRetry(message.retryContent!)}
            disabled={retryDisabled}
            aria-label="Retry sending this message"
            style={{
              marginTop: 6,
              background: 'none',
              border: '1px solid #ef9a9a',
              borderRadius: 8,
              padding: '4px 12px',
              fontSize: 12,
              color: retryDisabled ? '#ccc' : '#B71C1C',
              borderColor: retryDisabled ? '#eee' : '#ef9a9a',
              cursor: retryDisabled ? 'default' : 'pointer',
              fontFamily: "system-ui,'Segoe UI',sans-serif",
            }}
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TypingIndicator
// ---------------------------------------------------------------------------

function TypingIndicator(): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: 12,
        padding: '0 4px',
      }}
      aria-label="Assistant is typing"
      role="status"
    >
      <div
        style={{
          background: '#f5f5f5',
          border: '1px solid #e8e8e8',
          borderRadius: '18px 18px 18px 4px',
          padding: '14px 18px',
          display: 'flex',
          gap: 5,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#bbb',
              animation: `typing-dot 1.2s ${i * 0.2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// EmptyConversation — shown when no messages and provider is available
// ---------------------------------------------------------------------------

function EmptyConversation({ level }: { level: ConversationLevel }): ReactElement {
  const starters: Record<ConversationLevel, string[]> = {
    beginner: ['Hola, ¿cómo te llamas?', '¿De dónde eres?', '¿Qué tiempo hace hoy?'],
    intermediate: ['¿Qué hiciste el fin de semana?', '¿Tienes planes para esta semana?', '¿Cuál es tu comida favorita y por qué?'],
    advanced: ['¿Qué opinas del uso del español en redes sociales?', '¿Cómo ha cambiado el español mexicano en los últimos años?', '¿Qué refrán mexicano te parece más sabio y por qué?'],
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
        gap: 16,
        color: '#888',
        fontFamily: "system-ui,'Segoe UI',sans-serif",
      }}
    >
      <div style={{ fontSize: 40 }}>💬</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#555' }}>
        Start the conversation
      </div>
      <div style={{ fontSize: 13, maxWidth: 320, lineHeight: 1.6 }}>
        Say anything — your partner will reply in Spanish
        {level === 'beginner' ? ' and keep it simple' : ''}.
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 12, color: '#aaa', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Try one of these
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          {starters[level].map(s => (
            <div
              key={s}
              style={{
                background: '#fff',
                border: '1px solid #e8e5e0',
                borderRadius: 10,
                padding: '8px 16px',
                fontSize: 14,
                color: '#444',
                fontFamily: 'Georgia, serif',
                maxWidth: 300,
              }}
            >
              "{s}"
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// NoProviderState
// ---------------------------------------------------------------------------

function NoProviderState(): ReactElement {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
        gap: 20,
        fontFamily: "system-ui,'Segoe UI',sans-serif",
      }}
    >
      <div style={{ fontSize: 48 }}>🔑</div>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1a1a1a' }}>
        Add a key to start chatting
      </h2>
      <p style={{ margin: 0, fontSize: 15, color: '#666', maxWidth: 340, lineHeight: 1.6 }}>
        Conversation practice uses your own AI API key — nothing is sent to Peliglot servers.
        Paste a key in Settings and you're good to go.
      </p>
      <Link
        to="/settings"
        style={{
          background: SPANISH_RED,
          color: '#fff',
          textDecoration: 'none',
          padding: '12px 28px',
          borderRadius: 12,
          fontWeight: 700,
          fontSize: 15,
        }}
      >
        Open Settings
      </Link>
      <Link
        to="/guides/spanish"
        style={{ fontSize: 13, color: '#aaa', textDecoration: 'none' }}
      >
        Back to Spanish guides
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Session usage types — shared by SessionCostChip and Conversation
// ---------------------------------------------------------------------------

interface SessionUsage {
  input: number;
  output: number;
  costUsd: number;
  /** Model returned by the last successful call — used for "no pricing" copy. */
  lastModel: string | null;
  /** Number of successful API calls this session. */
  callCount: number;
}

const ZERO_SESSION_USAGE: SessionUsage = {
  input: 0,
  output: 0,
  costUsd: 0,
  lastModel: null,
  callCount: 0,
};

// ---------------------------------------------------------------------------
// SessionCostChip — per-session token/cost footer
// ---------------------------------------------------------------------------

function SessionCostChip({ usage }: { usage: SessionUsage }): ReactElement {
  const { input, output, costUsd, lastModel } = usage;

  const inputFmt = input.toLocaleString();
  const outputFmt = output.toLocaleString();

  // Check if we have pricing data for the model used
  const hasPricing = lastModel !== null && lookupPricing(lastModel) !== null;

  let chipText: string;
  if (input === 0 && output === 0) {
    chipText = "Provider didn't report token usage.";
  } else if (hasPricing) {
    chipText = `This session: ${inputFmt} input + ${outputFmt} output tokens ≈ ${formatCostUsd(costUsd)}`;
  } else {
    const modelName = lastModel ?? 'unknown';
    chipText = `This session: ${inputFmt} input + ${outputFmt} output tokens (no pricing data for \`${modelName}\`)`;
  }

  return (
    <div
      aria-label="Session cost"
      style={{
        marginTop: 8,
        padding: '4px 10px',
        background: '#f5f5f5',
        border: '1px solid #e8e8e8',
        borderRadius: 20,
        fontSize: 11,
        // Bumped from #999 to #555 — #999/#f5f5f5 fails WCAG AA at this size
        color: '#555',
        textAlign: 'center',
        fontFamily: "system-ui,'Segoe UI',sans-serif",
        lineHeight: 1.4,
      }}
    >
      {chipText}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Conversation — injectable internal component
// ---------------------------------------------------------------------------

export interface ConversationProps {
  /** Override getProvider for testing (defaults to the byok barrel's getProvider). */
  getProviderFn?: (id: Provider) => LlmProvider | null;
}

export function Conversation({ getProviderFn = getProvider }: ConversationProps): ReactElement {
  const [level, setLevel] = useState<ConversationLevel>('beginner');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [configuredProviders, setConfiguredProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [sessionUsage, setSessionUsage] = useState<SessionUsage>({ ...ZERO_SESSION_USAGE });
  // True once the conversation grows past MAX_HISTORY_MESSAGES and we start
  // dropping oldest turns from the model's context. Surfaced in UI as a
  // small notice; older messages remain visible in the thread.
  const [historyTruncated, setHistoryTruncated] = useState(false);
  // True when the active provider has called any model without pricing data.
  // Surfaced as an inline warning so the user knows the daily cap can't engage
  // for those models — Settings is too far away when this is the active risk.
  const [hasUnpricedCalls, setHasUnpricedCalls] = useState(false);

  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // Track mount status so an in-flight request that resolves after unmount
  // doesn't write to state or charge the cost meter for work the user threw away.
  const mountedRef = useRef(true);
  // AbortController for the active request — aborted on unmount so the network
  // call is actually cancelled, not just ignored.
  const abortRef = useRef<AbortController | null>(null);
  // Mirror of `messages` so sendMessage can read latest history without
  // taking it as a dep (which churns callback identity every render).
  const messagesRef = useRef<Message[]>(messages);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  // Load configured providers and persisted selection on mount
  useEffect(() => {
    const configured = listConfigured();
    setConfiguredProviders(configured);

    if (configured.length === 0) return;

    const persisted = loadPersistedProvider();
    const initial = persisted && configured.includes(persisted) ? persisted : configured[0]!;
    setSelectedProvider(initial);
  }, []);

  // Re-check unpriced state whenever the selected provider changes — getUnpricedModelIds
  // self-heals against current pricing, so a returning user who already had
  // unpriced calls will see the warning until those models gain pricing entries.
  useEffect(() => {
    if (selectedProvider) {
      setHasUnpricedCalls(getUnpricedModelIds(selectedProvider).length > 0);
    } else {
      setHasUnpricedCalls(false);
    }
  }, [selectedProvider]);

  // Cleanup: abort any in-flight request and mark unmounted.
  // Re-init mountedRef.current = true on every effect run so StrictMode's
  // dev-mode double-invoke (mount → cleanup → remount) doesn't leave the ref
  // permanently false and silently swallow subsequent errors.
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  // Scroll to bottom when messages change or loading starts
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleProviderChange = useCallback((p: Provider) => {
    setSelectedProvider(p);
    savePersistedProvider(p);
  }, []);

  const handleLevelChange = useCallback((l: ConversationLevel) => {
    setLevel(l);
    // Level change affects next message's system prompt — no need to clear history
  }, []);

  // Core send logic — extracted so both the Send button and "Ask in English"
  // can use it.
  const sendMessage = useCallback(
    async (userContent: string) => {
      if (!userContent.trim() || loading || !selectedProvider) return;

      const provider = getProviderFn(selectedProvider);
      if (!provider) return;

      const userMsg: Message = { id: nextId(), role: 'user', content: userContent.trim() };
      setMessages(prev => [...prev, userMsg]);
      setInput('');
      setLoading(true);

      // Build the messages array for the API call.
      // System prompt is first. Then conversation history (user + assistant only),
      // then the new user message. Read history from the ref so this callback
      // doesn't depend on `messages` (which churns every send/receive).
      //
      // Sliding window: if history exceeds MAX_HISTORY_MESSAGES, send only the
      // most recent slice. This caps input-token cost at O(window) per turn
      // instead of O(turns), preventing N² billing on long conversations.
      // Older messages remain visible in the UI but don't go to the model.
      //
      // Alternation guard: errors are filtered out (they're not part of the
      // model's context), so after a failed turn the surviving sequence can
      // be odd-length ending in `user`. A subsequent slice may then begin with
      // `assistant`, which Anthropic rejects (messages must start with `user`
      // after the system prompt). Drop a leading `assistant` to keep the
      // payload alternation-safe across providers.
      const fullHistory: ChatMessage[] = messagesRef.current
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
      const trimmed = fullHistory.length > MAX_HISTORY_MESSAGES;
      let historyMessages = trimmed ? fullHistory.slice(-MAX_HISTORY_MESSAGES) : fullHistory;
      if (historyMessages[0]?.role === 'assistant') historyMessages = historyMessages.slice(1);
      if (trimmed) setHistoryTruncated(true);

      const apiMessages: ChatMessage[] = [
        { role: 'system', content: systemPromptFor(level) },
        ...historyMessages,
        { role: 'user', content: userContent.trim() },
      ];

      // Fresh AbortController per request. On unmount or new request, abort
      // the previous one so we don't bill the user for work they walked away from.
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const result = await provider.chat(apiMessages, { maxTokens: 512, signal: controller.signal });

        // If unmounted (or aborted) while the call was in flight, drop the
        // result silently — no UI write, no cost meter charge.
        if (!mountedRef.current || controller.signal.aborted) return;

        const assistantMsg: Message = { id: nextId(), role: 'assistant', content: result.text };
        setMessages(prev => [...prev, assistantMsg]);

        // ---- Cost telemetry ----
        const pricing = lookupPricing(result.model);
        const callCostUsd = pricing
          ? computeCostUsd(result.usage, pricing)
          : 0;

        // Persist to cumulative cost storage (only when we have pricing data).
        // Without pricing we can't compute cost, which means the daily cap can't
        // engage for this model — record it so the UI can warn the user.
        if (pricing) {
          addToCost(selectedProvider, {
            input: result.usage.input,
            output: result.usage.output,
            costUsd: callCostUsd,
          });
        } else {
          markUnpricedCall(selectedProvider, result.model);
          setHasUnpricedCalls(true);
          console.warn(
            `[peliglot] No pricing data for ${selectedProvider} model "${result.model}" — daily cap is not enforcing this model.`,
          );
        }

        // Update per-session counters
        setSessionUsage(prev => ({
          input: prev.input + result.usage.input,
          output: prev.output + result.usage.output,
          costUsd: prev.costUsd + callCostUsd,
          lastModel: result.model,
          callCount: prev.callCount + 1,
        }));
      } catch (err) {
        // Aborted requests bubble up as DOMException name='AbortError' or as
        // an LlmProviderError wrapping the underlying. Silently drop both —
        // we already did the right thing by aborting.
        if (!mountedRef.current || controller.signal.aborted) return;
        if (err instanceof DOMException && err.name === 'AbortError') return;

        const providerLabel = selectedProvider
          ? PROVIDER_LABELS[selectedProvider]
          : 'the provider';

        let errorText = 'Something went wrong.';
        let errorLink: Message['link'];

        if (err instanceof LlmProviderError) {
          switch (err.kind) {
            case 'unauthorized':
              errorText = `Your ${providerLabel} key was rejected.`;
              errorLink = { to: '/settings', label: 'Test it in Settings.' };
              break;
            case 'rate-limited': {
              const secs = err.retryAfterMs !== undefined
                ? Math.ceil(err.retryAfterMs / 1000)
                : null;
              errorText = secs !== null
                ? `${providerLabel} is rate-limiting requests. Try again in ${secs} seconds.`
                : `${providerLabel} is rate-limiting requests. Try again in a moment.`;
              break;
            }
            case 'mixed-content':
              errorText =
                "Browsers block HTTPS pages from calling plain HTTP servers.";
              errorLink = { to: '/settings', label: 'See settings for fixes.' };
              break;
            case 'cap-exceeded':
              errorText = err.message;
              errorLink = { to: '/settings', label: 'Adjust your daily limit in Settings.' };
              break;
            case 'cors-blocked':
              errorText =
                `Your custom server didn't allow this page. Check its CORS settings — ` +
                `add peliglot.com as an allowed origin in your server's config.`;
              break;
            case 'network':
              errorText = `Couldn't reach ${providerLabel}. Check your connection.`;
              break;
            case 'http-error':
              errorText = err.message
                ? `${providerLabel} returned an error: ${err.message.slice(0, 200)}`
                : `${providerLabel} returned an unexpected error.`;
              break;
            default:
              errorText = err.message
                ? `Something went wrong: ${err.message.slice(0, 200)}`
                : 'Something went wrong. Try again.';
          }
        } else if (err instanceof Error) {
          errorText = `Something went wrong: ${err.message.slice(0, 200)}`;
        }

        const errorMsg: Message = {
          id: nextId(),
          role: 'error',
          content: errorText,
          retryContent: userContent.trim(),
          link: errorLink,
        };
        setMessages(prev => [...prev, errorMsg]);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    },
    [loading, selectedProvider, level, getProviderFn],
  );

  const handleSend = useCallback(() => {
    void sendMessage(input);
  }, [input, sendMessage]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        void sendMessage(input);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setInput('');
      }
    },
    [input, sendMessage],
  );

  const handleAskInEnglish = useCallback(() => {
    void sendMessage(ENGLISH_HELP_REQUEST);
  }, [sendMessage]);

  const handleRetry = useCallback(
    (content: string) => {
      void sendMessage(content);
    },
    [sendMessage],
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const hasProviders = configuredProviders.length > 0;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#fafafa',
        fontFamily: "system-ui,'Segoe UI',sans-serif",
      }}
    >
      {/* Typing dot animation */}
      <style>{`
        @keyframes typing-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>

      <HeaderStrip level={level} onLevelChange={handleLevelChange} />

      <ProviderSelector
        configured={configuredProviders}
        selected={selectedProvider}
        onChange={handleProviderChange}
      />

      {/* Main content */}
      {!hasProviders ? (
        <NoProviderState />
      ) : (
        <>
          {/* Thread */}
          <div
            ref={threadRef}
            aria-live="polite"
            aria-atomic="false"
            aria-label="Conversation"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px 16px 12px',
              maxWidth: 720,
              width: '100%',
              margin: '0 auto',
              boxSizing: 'border-box',
            }}
          >
            {messages.length === 0 && !loading ? (
              <EmptyConversation level={level} />
            ) : (
              <>
                {messages.map(m => (
                  <MessageBubble
                    key={m.id}
                    message={m}
                    onRetry={handleRetry}
                    retryDisabled={loading}
                  />
                ))}
                {loading && <TypingIndicator />}
              </>
            )}
          </div>

          {/* Input area */}
          <div
            style={{
              borderTop: '1px solid #eee',
              background: '#fff',
              padding: '12px 16px',
              maxWidth: 720,
              width: '100%',
              margin: '0 auto',
              boxSizing: 'border-box',
            }}
          >
            {/* Unpriced-model warning — the daily cap can only enforce against
                models with pricing data. If the active provider has called an
                unpriced model, the cap silently doesn't apply for that model.
                Surface it where the user is doing the spending, not just in Settings. */}
            {hasUnpricedCalls && (
              <div
                role="alert"
                style={{
                  marginBottom: 8,
                  padding: '6px 10px',
                  background: '#FFF8E7',
                  border: '1px solid #F0E4C4',
                  borderRadius: 8,
                  fontSize: 12,
                  color: '#8B6914',
                  fontFamily: "system-ui,'Segoe UI',sans-serif",
                  lineHeight: 1.4,
                }}
              >
                ⚠ Your daily limit doesn't apply to this model — Peliglot has no pricing data for it.{' '}
                <Link to="/settings" style={{ color: '#8B6914', fontWeight: 700 }}>
                  Details in Settings
                </Link>
              </div>
            )}

            {/* Truncation notice — shown once history has exceeded MAX_HISTORY_MESSAGES.
                Older messages remain visible in the thread but no longer go to the model. */}
            {historyTruncated && (
              <div
                role="status"
                aria-live="polite"
                style={{
                  marginBottom: 8,
                  padding: '4px 10px',
                  background: '#fffaf0',
                  border: '1px solid #f0e4c4',
                  borderRadius: 8,
                  fontSize: 11,
                  color: '#8B6914',
                  textAlign: 'center',
                  fontFamily: "system-ui,'Segoe UI',sans-serif",
                  lineHeight: 1.4,
                }}
              >
                Older messages dropped from context to keep this affordable.
              </div>
            )}

            {/* Ask in English button */}
            {messages.length > 0 && (
              <div style={{ marginBottom: 8, textAlign: 'right' }}>
                <button
                  onClick={handleAskInEnglish}
                  disabled={loading}
                  aria-label="Ask for English explanation"
                  style={{
                    background: 'none',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    padding: '4px 12px',
                    fontSize: 12,
                    color: loading ? '#ccc' : '#666',
                    cursor: loading ? 'default' : 'pointer',
                    fontFamily: "system-ui,'Segoe UI',sans-serif",
                  }}
                >
                  Ask in English
                </button>
              </div>
            )}

            {/* Input row */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje… (Enter to send)"
                aria-label="Message input"
                rows={2}
                disabled={loading}
                style={{
                  flex: 1,
                  resize: 'none',
                  padding: '10px 14px',
                  fontSize: 15,
                  borderRadius: 14,
                  border: '2px solid #e0e0e0',
                  fontFamily: "system-ui,'Segoe UI',sans-serif",
                  outline: 'none',
                  background: loading ? '#f5f5f5' : '#fff',
                  color: '#1a1a1a',
                  lineHeight: 1.4,
                  transition: 'border-color 0.15s',
                  boxSizing: 'border-box',
                  minHeight: 60,
                }}
                onFocus={e => { e.currentTarget.style.borderColor = SPANISH_RED; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#e0e0e0'; }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                style={{
                  background: input.trim() && !loading ? SPANISH_RED : '#e0e0e0',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 14,
                  padding: '14px 20px',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: input.trim() && !loading ? 'pointer' : 'default',
                  flexShrink: 0,
                  transition: 'background 0.15s',
                  fontFamily: "system-ui,'Segoe UI',sans-serif",
                  alignSelf: 'stretch',
                  minWidth: 72,
                }}
              >
                {loading ? '…' : 'Send'}
              </button>
            </div>

            <div
              style={{
                marginTop: 6,
                fontSize: 11,
                color: '#aaa',
                textAlign: 'center',
                fontFamily: "system-ui,'Segoe UI',sans-serif",
              }}
            >
              Shift+Enter for new line · messages are not saved
            </div>

            {/* Session cost chip */}
            {sessionUsage.callCount > 0 && (
              <SessionCostChip usage={sessionUsage} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component — lazy-route entry point (no props, uses default provider)
// ---------------------------------------------------------------------------

export function Component(): ReactElement {
  return <Conversation />;
}
