/**
 * ApiKeysSection — Settings sub-component for BYOK key management.
 *
 * Lets users paste, test, save, and forget API keys (or a custom endpoint)
 * for three providers: Anthropic, OpenAI, and OpenAI-compatible local servers.
 *
 * Keys never leave this browser. No backend involved.
 */

import { useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import {
  readConfig,
  writeConfig,
  clearConfig,
  clearAll,
  validate,
  isTrustedHost,
} from '../byok';
import type { ProviderConfig, ValidationResult } from '../byok';
import { colors, spacing, radii, typography } from '../styles/tokens';

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

function SectionHeading({ id, children }: { id: string; children: ReactNode }): ReactElement {
  return (
    <h2
      id={id}
      style={{
        margin: `0 0 ${spacing.lg}px`,
        fontSize: 22,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        letterSpacing: '-0.01em',
        paddingBottom: spacing.sm,
        borderBottom: `2px solid ${colors.border.default}`,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
      }}
    >
      {children}
    </h2>
  );
}

/**
 * Experimental pill — visible badge that signals the BYOK feature is not yet
 * production-grade. Shown in the Settings AI-keys heading and the conversation
 * page header so the user sees it before and during spending.
 */
function ExperimentalPill(): ReactElement {
  return (
    <span
      aria-label="Experimental feature"
      style={{
        display: 'inline-block',
        padding: `1px ${spacing.sm}px`,
        borderRadius: radii.pill,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold,
        background: '#FFF3CD',
        color: '#7B5E00',
        border: '1px solid #F0E4A8',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        verticalAlign: 'middle',
      }}
    >
      Experimental
    </span>
  );
}

function SmallButton({
  onClick,
  disabled,
  children,
  variant = 'primary',
}: {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}): ReactElement {
  const bgColor =
    variant === 'primary'
      ? colors.surface.dark
      : variant === 'danger'
      ? '#C62828'
      : colors.surface.white;
  const textColor = variant === 'secondary' ? colors.text.primary : colors.text.white;
  const border = variant === 'secondary' ? `1px solid ${colors.border.default}` : 'none';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-block',
        padding: `${spacing.xs + 2}px ${spacing.lg}px`,
        background: disabled ? '#ccc' : bgColor,
        color: disabled ? '#888' : textColor,
        border,
        borderRadius: radii.base,
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
        letterSpacing: '0.01em',
        lineHeight: typography.lineHeight.tight,
      }}
    >
      {children}
    </button>
  );
}

function TextInput({
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  'aria-label': ariaLabel,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: 'text' | 'password';
  'aria-label': string;
}): ReactElement {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: `${spacing.sm}px ${spacing.md}px`,
        fontSize: typography.fontSize.base,
        border: `1px solid ${colors.border.default}`,
        borderRadius: radii.base,
        background: colors.surface.white,
        color: colors.text.primary,
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
      }}
    />
  );
}

function StatusLine({ result }: { result: ValidationResult | null | 'testing' }): ReactElement | null {
  if (result === null) return null;

  if (result === 'testing') {
    return (
      <p
        role="status"
        aria-live="polite"
        style={{
          margin: `${spacing.sm}px 0 0`,
          fontSize: typography.fontSize.base,
          color: colors.text.secondary,
        }}
      >
        Testing…
      </p>
    );
  }

  if (result.outcome === 'ok') {
    return (
      <p
        role="status"
        aria-live="polite"
        style={{
          margin: `${spacing.sm}px 0 0`,
          fontSize: typography.fontSize.base,
          color: '#2E7D32',
          fontWeight: typography.fontWeight.semibold,
        }}
      >
        Connected ({result.latencyMs}ms)
      </p>
    );
  }

  let message: string;
  switch (result.outcome) {
    case 'unauthorized':
      message = result.message;
      break;
    case 'mixed-content':
      message = result.message;
      break;
    case 'cors-blocked':
      message = result.message;
      break;
    case 'network-error':
      message = result.message;
      break;
    case 'http-error':
      message = `HTTP ${result.status}: ${result.message}`;
      break;
    case 'unknown-error':
      message = result.message;
      break;
  }

  return (
    <p
      role="alert"
      aria-live="assertive"
      style={{
        margin: `${spacing.sm}px 0 0`,
        fontSize: typography.fontSize.base,
        color: '#C62828',
        lineHeight: typography.lineHeight.relaxed,
      }}
    >
      {message}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Provider card — collapsible panel
// ---------------------------------------------------------------------------

function ProviderPill({ configured }: { configured: boolean }): ReactElement {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: `1px ${spacing.sm}px`,
        borderRadius: radii.pill,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        background: configured ? '#E8F5E9' : '#F5F5F5',
        color: configured ? '#2E7D32' : colors.text.secondary,
        border: `1px solid ${configured ? '#C8E6C9' : colors.border.default}`,
        marginLeft: spacing.sm,
        verticalAlign: 'middle',
      }}
    >
      {configured ? 'Configured' : 'Not set up'}
    </span>
  );
}

interface CloudProviderCardProps {
  provider: 'anthropic' | 'openai';
  label: string;
  defaultModel: string;
  accentColor: string;
}

function CloudProviderCard({
  provider,
  label,
  defaultModel,
  accentColor,
}: CloudProviderCardProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [testResult, setTestResult] = useState<ValidationResult | null | 'testing'>(null);
  const [isConfigured, setIsConfigured] = useState(() => readConfig(provider) !== null);

  // Reset test result on input change. Strip CR/LF/tab so a key pasted with
  // surrounding whitespace doesn't construct an invalid Authorization header
  // (which would surface as a confusing "couldn't reach" error).
  function handleKeyChange(v: string): void {
    setApiKey(v.replace(/[\r\n\t]/g, ''));
    setTestResult(null);
  }

  async function handleTest(): Promise<void> {
    if (!apiKey.trim()) return;
    setTestResult('testing');
    const config: ProviderConfig =
      provider === 'anthropic'
        ? { provider: 'anthropic', apiKey: apiKey.trim() }
        : { provider: 'openai', apiKey: apiKey.trim() };
    const result = await validate(provider, config);
    setTestResult(result);
  }

  function handleSave(): void {
    if (testResult === null || testResult === 'testing' || testResult.outcome !== 'ok') return;
    const config: ProviderConfig =
      provider === 'anthropic'
        ? { provider: 'anthropic', apiKey: apiKey.trim() }
        : { provider: 'openai', apiKey: apiKey.trim() };
    writeConfig(config);
    setIsConfigured(true);
    setApiKey('');
    setTestResult(null);
    setIsOpen(false);
  }

  function handleForget(): void {
    clearConfig(provider);
    setIsConfigured(false);
    setApiKey('');
    setTestResult(null);
  }

  const canTest = apiKey.trim().length > 0 && testResult !== 'testing';
  const canSave =
    testResult !== null &&
    testResult !== 'testing' &&
    testResult.outcome === 'ok';

  return (
    <div
      style={{
        border: `1px solid ${colors.border.default}`,
        borderRadius: radii.lg,
        marginBottom: spacing.md,
        overflow: 'hidden',
      }}
    >
      {/* Collapsed header / toggle */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `${spacing.md}px ${spacing.lg}px`,
          background: colors.surface.white,
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: "'Source Sans 3', system-ui, sans-serif",
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: accentColor,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
            }}
          >
            {label}
          </span>
          <ProviderPill configured={isConfigured} />
        </span>
        <span
          style={{
            fontSize: typography.fontSize['2xl'],
            color: colors.text.secondary,
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.15s',
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Expanded form */}
      {isOpen && (
        <div
          style={{
            padding: `${spacing.md}px ${spacing.lg}px ${spacing.lg}px`,
            borderTop: `1px solid ${colors.border.subtle}`,
            background: '#FAFAFA',
          }}
        >
          <p
            style={{
              margin: `0 0 ${spacing.xs}px`,
              fontSize: typography.fontSize.sm,
              color: colors.text.secondary,
            }}
          >
            Default model: <code style={{ fontFamily: 'monospace' }}>{defaultModel}</code>
          </p>

          <div style={{ marginBottom: spacing.md }}>
            <label
              htmlFor={`${provider}-api-key`}
              style={{
                display: 'block',
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                color: colors.text.primary,
                marginBottom: spacing.xs,
              }}
            >
              API Key
            </label>
            <TextInput
              id={`${provider}-api-key`}
              type="password"
              value={apiKey}
              onChange={handleKeyChange}
              placeholder={`Paste your ${label} API key`}
              aria-label={`${label} API key`}
            />
          </div>

          <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap', alignItems: 'center' }}>
            <SmallButton
              onClick={() => { void handleTest(); }}
              disabled={!canTest}
            >
              Test
            </SmallButton>

            <SmallButton
              onClick={handleSave}
              disabled={!canSave}
              variant="secondary"
            >
              Save
            </SmallButton>

            {isConfigured && (
              <SmallButton onClick={handleForget} variant="danger">
                Forget this key
              </SmallButton>
            )}
          </div>

          <StatusLine result={testResult} />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Custom endpoint card
// ---------------------------------------------------------------------------

function CustomEndpointCard(): ReactElement {
  // Hydrate non-secret fields from saved config so the user can edit an
  // existing custom endpoint without having to "Forget" first. The API key is
  // intentionally NOT hydrated — re-paste required to test/save.
  const savedAtMount = readConfig('openai-compatible');
  const initial = savedAtMount?.provider === 'openai-compatible' ? savedAtMount : null;

  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(initial?.label ?? '');
  const [baseUrl, setBaseUrl] = useState(initial?.baseUrl ?? '');
  const [model, setModel] = useState(initial?.model ?? '');
  const [apiKey, setApiKey] = useState('');
  const [testResult, setTestResult] = useState<ValidationResult | null | 'testing'>(null);
  const [isConfigured, setIsConfigured] = useState(initial !== null);

  function resetTestResult(): void {
    setTestResult(null);
  }

  function handleApiKeyChange(v: string): void {
    setApiKey(v.replace(/[\r\n\t]/g, ''));
    resetTestResult();
  }

  /**
   * Confirm with the user before sending the API key to a non-trusted host.
   * The custom-endpoint field is the precise key-phishing vector identified
   * in the BYOK security review: an attacker-supplied URL combined with a
   * real provider key would deliver the key on the first Test click. This
   * one-time confirm breaks that flow without inconveniencing legitimate
   * Tailscale / localhost / Cloudflare-tunnel setups.
   *
   * Returns true if the host is trusted OR the user confirmed; false to abort.
   * If no API key was entered (truly anonymous local LLM), no confirm is needed.
   */
  function confirmDestination(): boolean {
    const url = baseUrl.trim();
    if (apiKey.trim() === '') return true;
    if (isTrustedHost(url)) return true;
    let host = url;
    try {
      host = new URL(/^[a-z][a-z0-9+\-.]*:\/\//i.test(url) ? url : `http://${url}`).host || url;
    } catch {
      // fall through with the raw string
    }
    return window.confirm(
      `Peliglot is about to send your API key to ${host}.\n\n` +
      `Only continue if you control this server. If someone else gave you ` +
      `this URL, your key may be stolen.`,
    );
  }

  async function handleTest(): Promise<void> {
    if (!baseUrl.trim() || !model.trim()) return;
    if (!confirmDestination()) return;
    setTestResult('testing');
    const config: ProviderConfig = {
      provider: 'openai-compatible',
      baseUrl: baseUrl.trim(),
      model: model.trim(),
      apiKey: apiKey.trim() || undefined,
      label: label.trim() || undefined,
    };
    const result = await validate('openai-compatible', config);
    setTestResult(result);
  }

  function handleSave(): void {
    if (testResult === null || testResult === 'testing' || testResult.outcome !== 'ok') return;
    // Re-confirm on Save in case the user changed the URL (or only typed it
    // after the Test). Test already gated, so this is a belt-and-braces path.
    if (!confirmDestination()) return;
    const config: ProviderConfig = {
      provider: 'openai-compatible',
      baseUrl: baseUrl.trim(),
      model: model.trim(),
      apiKey: apiKey.trim() || undefined,
      label: label.trim() || undefined,
    };
    writeConfig(config);
    setIsConfigured(true);
    setApiKey('');
    setTestResult(null);
    setIsOpen(false);
  }

  function handleForget(): void {
    clearConfig('openai-compatible');
    setIsConfigured(false);
    setBaseUrl('');
    setModel('');
    setApiKey('');
    setLabel('');
    setTestResult(null);
  }

  const canTest = baseUrl.trim().length > 0 && model.trim().length > 0 && testResult !== 'testing';
  const canSave =
    testResult !== null &&
    testResult !== 'testing' &&
    testResult.outcome === 'ok';

  return (
    <div
      style={{
        border: `1px solid ${colors.border.default}`,
        borderRadius: radii.lg,
        marginBottom: spacing.md,
        overflow: 'hidden',
      }}
    >
      {/* Collapsed header */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `${spacing.md}px ${spacing.lg}px`,
          background: colors.surface.white,
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: "'Source Sans 3', system-ui, sans-serif",
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#5C6BC0',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
            }}
          >
            Custom endpoint
          </span>
          <ProviderPill configured={isConfigured} />
        </span>
        <span
          style={{
            fontSize: typography.fontSize['2xl'],
            color: colors.text.secondary,
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.15s',
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Expanded form */}
      {isOpen && (
        <div
          style={{
            padding: `${spacing.md}px ${spacing.lg}px ${spacing.lg}px`,
            borderTop: `1px solid ${colors.border.subtle}`,
            background: '#FAFAFA',
          }}
        >
          <p
            style={{
              margin: `0 0 ${spacing.md}px`,
              fontSize: typography.fontSize.base,
              color: colors.text.muted,
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            Any OpenAI-shaped server: Ollama, llama.cpp, LM Studio, vLLM, TGI, Jan.
          </p>

          <div style={{ marginBottom: spacing.md }}>
            <label
              htmlFor="custom-label"
              style={{
                display: 'block',
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                color: colors.text.primary,
                marginBottom: spacing.xs,
              }}
            >
              Friendly name <span style={{ color: colors.text.tertiary, fontWeight: typography.fontWeight.normal }}>(optional)</span>
            </label>
            <TextInput
              id="custom-label"
              value={label}
              onChange={(v) => { setLabel(v); resetTestResult(); }}
              placeholder="e.g. Home llama-3 70b"
              aria-label="Friendly name for this endpoint"
            />
          </div>

          <div style={{ marginBottom: spacing.md }}>
            <label
              htmlFor="custom-base-url"
              style={{
                display: 'block',
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                color: colors.text.primary,
                marginBottom: spacing.xs,
              }}
            >
              Base URL
            </label>
            <TextInput
              id="custom-base-url"
              value={baseUrl}
              onChange={(v) => { setBaseUrl(v); resetTestResult(); }}
              placeholder="http://localhost:11434/v1 or https://your-tunnel.ts.net"
              aria-label="Base URL for custom endpoint"
            />
          </div>

          <div style={{ marginBottom: spacing.md }}>
            <label
              htmlFor="custom-model"
              style={{
                display: 'block',
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                color: colors.text.primary,
                marginBottom: spacing.xs,
              }}
            >
              Model
            </label>
            <TextInput
              id="custom-model"
              value={model}
              onChange={(v) => { setModel(v); resetTestResult(); }}
              placeholder="llama-3.1-70b-instruct"
              aria-label="Model name for custom endpoint"
            />
          </div>

          <div style={{ marginBottom: spacing.md }}>
            <label
              htmlFor="custom-api-key"
              style={{
                display: 'block',
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                color: colors.text.primary,
                marginBottom: spacing.xs,
              }}
            >
              API key <span style={{ color: colors.text.tertiary, fontWeight: typography.fontWeight.normal }}>(optional)</span>
            </label>
            <TextInput
              id="custom-api-key"
              type="password"
              value={apiKey}
              onChange={handleApiKeyChange}
              placeholder={isConfigured ? 'Re-paste to test (saved key is hidden)' : "Leave blank if your server doesn't require auth"}
              aria-label="API key for custom endpoint (optional)"
            />
          </div>

          <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap', alignItems: 'center' }}>
            <SmallButton
              onClick={() => { void handleTest(); }}
              disabled={!canTest}
            >
              Test
            </SmallButton>

            <SmallButton
              onClick={handleSave}
              disabled={!canSave}
              variant="secondary"
            >
              Save
            </SmallButton>

            {isConfigured && (
              <SmallButton onClick={handleForget} variant="danger">
                Forget this key
              </SmallButton>
            )}
          </div>

          <StatusLine result={testResult} />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------

export function ApiKeysSection(): ReactElement {
  // Increment to remount all provider cards (forces them to re-read localStorage)
  const [forgetAllKey, setForgetAllKey] = useState(0);

  function handleForgetAll(): void {
    if (!window.confirm('Forget all configured API keys?')) return;
    clearAll();
    setForgetAllKey((k) => k + 1);
  }

  return (
    <section
      aria-labelledby="api-keys-heading"
      style={{ marginBottom: spacing.xxxl * 2 }}
    >
      <SectionHeading id="api-keys-heading">
        <span>AI keys</span>
        <ExperimentalPill />
      </SectionHeading>

      {/* Disclosure panel */}
      <div
        style={{
          background: colors.callout.tipBg,
          border: `1px solid ${colors.callout.tipBorder}`,
          borderRadius: radii.lg,
          padding: `${spacing.lg}px ${spacing.xl}px`,
          marginBottom: spacing.xl,
          fontSize: typography.fontSize.base,
          color: colors.callout.tipText,
          lineHeight: typography.lineHeight.relaxed,
        }}
      >
        <p style={{ margin: `0 0 ${spacing.sm}px`, fontWeight: typography.fontWeight.semibold }}>
          This feature is experimental.
        </p>
        <p style={{ margin: `0 0 ${spacing.sm}px` }}>
          Cloud providers ship with a low default daily spend limit as a safety net.
          You can raise it in the Daily limits section below. Two narrow gaps trigger
          warnings rather than enforcement: missing pricing data for a model, and a
          provider returning a successful response with zero token counts. Both surface
          inline; chat is paused on the second until you investigate.
        </p>
        <p style={{ margin: `0 0 ${spacing.sm}px`, fontWeight: typography.fontWeight.semibold }}>
          Your key never leaves this browser.
        </p>
        <p style={{ margin: `0 0 ${spacing.sm}px` }}>
          Peliglot has no backend — the browser calls the LLM provider directly.
          Clear site data and the key is gone.
        </p>
        <ul style={{ margin: `0 0 ${spacing.sm}px`, paddingLeft: spacing.xxl }}>
          <li>
            <strong>Anthropic / OpenAI:</strong> requests go directly to those vendors with your key.
          </li>
          <li>
            <strong>Custom endpoint:</strong> requests go to whatever URL you configured.{' '}
            Nothing else — including Peliglot — sees your prompts.
          </li>
        </ul>
        <p style={{ margin: 0 }}>
          For a local LLM, you&apos;ll need an HTTPS path to it (Tailscale, Cloudflare
          Tunnel) or to run it on <code style={{ fontFamily: 'monospace' }}>localhost</code>.
          HTTPS pages can&apos;t call HTTP servers on the network for security reasons.
        </p>
      </div>

      {/* Provider cards */}
      <div key={forgetAllKey}>
        <CloudProviderCard
          provider="anthropic"
          label="Anthropic"
          defaultModel="claude-sonnet-4-6"
          accentColor="#D97706"
        />
        <CloudProviderCard
          provider="openai"
          label="OpenAI"
          defaultModel="gpt-4o-mini"
          accentColor="#10A37F"
        />
        <CustomEndpointCard />
      </div>

      {/* Forget all */}
      <div style={{ marginTop: spacing.xl }}>
        <SmallButton onClick={handleForgetAll} variant="danger">
          Forget all keys
        </SmallButton>
      </div>
    </section>
  );
}
