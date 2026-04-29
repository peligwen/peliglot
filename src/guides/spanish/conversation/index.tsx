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
import { listConfigured, getProvider } from '../../../byok';
import type { LlmProvider, ChatMessage } from '../../../byok';
import { LlmProviderError } from '../../../byok';
import type { Provider } from '../../../byok';
import { systemPromptFor, ENGLISH_HELP_REQUEST } from './systemPrompt';
import type { ConversationLevel } from './systemPrompt';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SPANISH_RED = '#C62828';
const STORAGE_KEY_PROVIDER = 'peliglot-conversation-provider';

const LEVEL_LABELS: Record<ConversationLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const PROVIDER_LABELS: Record<Provider, string> = {
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
    const raw = localStorage.getItem(STORAGE_KEY_PROVIDER);
    if (raw === 'anthropic' || raw === 'openai' || raw === 'openai-compatible') return raw;
    return null;
  } catch {
    return null;
  }
}

function savePersistedProvider(id: Provider): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROVIDER, id);
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
            {PROVIDER_LABELS[p]}
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
}: {
  message: Message;
  onRetry?: (content: string) => void;
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
        </div>
        {isError && onRetry && message.retryContent && (
          <button
            onClick={() => onRetry(message.retryContent!)}
            style={{
              marginTop: 6,
              background: 'none',
              border: '1px solid #ef9a9a',
              borderRadius: 8,
              padding: '4px 12px',
              fontSize: 12,
              color: '#B71C1C',
              cursor: 'pointer',
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

  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load configured providers and persisted selection on mount
  useEffect(() => {
    const configured = listConfigured();
    setConfiguredProviders(configured);

    if (configured.length === 0) return;

    const persisted = loadPersistedProvider();
    const initial = persisted && configured.includes(persisted) ? persisted : configured[0]!;
    setSelectedProvider(initial);
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
      // then the new user message.
      const historyMessages: ChatMessage[] = messages
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));

      const apiMessages: ChatMessage[] = [
        { role: 'system', content: systemPromptFor(level) },
        ...historyMessages,
        { role: 'user', content: userContent.trim() },
      ];

      try {
        const result = await provider.chat(apiMessages, { maxTokens: 512 });
        const assistantMsg: Message = { id: nextId(), role: 'assistant', content: result.text };
        setMessages(prev => [...prev, assistantMsg]);
      } catch (err) {
        let errorText = 'Something went wrong. Try again.';
        if (err instanceof LlmProviderError) {
          switch (err.kind) {
            case 'unauthorized':
              errorText = 'Your API key was rejected. Check your key in Settings.';
              break;
            case 'rate-limited':
              errorText = err.retryAfterMs
                ? `Rate limit hit. Try again in ${Math.ceil(err.retryAfterMs / 1000)}s.`
                : 'Rate limit hit. Try again in a moment.';
              break;
            case 'mixed-content':
              errorText = 'Mixed-content error: your local server needs HTTPS or localhost.';
              break;
            case 'cors-blocked':
              errorText = "CORS error: your local server isn't allowing this origin.";
              break;
            case 'network':
              errorText = "Can't reach the provider. Check your internet connection.";
              break;
            default:
              errorText = err.message || errorText;
          }
        }
        const errorMsg: Message = {
          id: nextId(),
          role: 'error',
          content: errorText,
          retryContent: userContent.trim(),
        };
        setMessages(prev => [...prev, errorMsg]);
      } finally {
        setLoading(false);
      }
    },
    [loading, selectedProvider, messages, level, getProviderFn],
  );

  const handleSend = useCallback(() => {
    void sendMessage(input);
  }, [input, sendMessage]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        void sendMessage(input);
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
                  <MessageBubble key={m.id} message={m} onRetry={handleRetry} />
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
