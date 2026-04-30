/**
 * CostSection — Settings sub-component for BYOK usage and safety controls.
 *
 * Two blocks:
 *   1. Daily limits — per-configured-provider USD cap, with today's spend.
 *   2. Cumulative usage — totals per provider that has spent something.
 *
 * No off-device telemetry — all data is local.
 */

import { useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import {
  readCost,
  resetCost,
  resetAllCosts,
  getAllProviders,
  PROVIDER_LABELS,
  getTodayCost,
  getDailyCap,
  setDailyCap,
  MAX_DAILY_CAP_USD,
  listConfigured,
  getUnpricedModelIds,
} from '../byok';
import type { Provider, ProviderCostState, DailyBucket } from '../byok';
import { formatCostUsd } from '../byok';
import { colors, spacing, radii, typography } from '../styles/tokens';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTokenCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function hasCost(state: ProviderCostState): boolean {
  return state.totalInputTokens > 0 || state.totalOutputTokens > 0 || state.totalCostUsd > 0;
}

function displayLabel(provider: Provider): string {
  const label = PROVIDER_LABELS[provider];
  return label.charAt(0).toUpperCase() + label.slice(1);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SmallButton({
  onClick,
  children,
  variant = 'secondary',
  type = 'button',
  disabled = false,
}: {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'secondary' | 'danger' | 'primary';
  type?: 'button' | 'submit';
  disabled?: boolean;
}): ReactElement {
  const bgColor =
    variant === 'danger' ? '#C62828' : variant === 'primary' ? '#1B5E20' : colors.surface.white;
  const textColor =
    variant === 'danger' || variant === 'primary' ? colors.text.white : colors.text.primary;
  const border = variant === 'secondary' ? `1px solid ${colors.border.default}` : 'none';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-block',
        padding: `${spacing.xs + 2}px ${spacing.lg}px`,
        background: bgColor,
        color: textColor,
        border,
        borderRadius: radii.base,
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
        letterSpacing: '0.01em',
        lineHeight: typography.lineHeight.tight,
      }}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// DailyLimitRow — one row per configured provider, with cap input + today
// ---------------------------------------------------------------------------

function DailyLimitRow({
  provider,
  today,
  initialCap,
  unpricedModelIds,
  onCapChange,
}: {
  provider: Provider;
  today: DailyBucket;
  initialCap: number | null;
  unpricedModelIds: string[];
  onCapChange: () => void;
}): ReactElement {
  const [draft, setDraft] = useState<string>(initialCap === null ? '' : String(initialCap));
  const [error, setError] = useState<string | null>(null);
  const cap = initialCap;

  function handleSave(): void {
    const trimmed = draft.trim();
    if (trimmed === '') {
      setDailyCap(provider, null);
      setError(null);
      onCapChange();
      return;
    }
    const parsed = parseFloat(trimmed);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setError('Enter a positive number.');
      return;
    }
    if (parsed > MAX_DAILY_CAP_USD) {
      setError(`Maximum is ${formatCostUsd(MAX_DAILY_CAP_USD)}.`);
      return;
    }
    setDailyCap(provider, parsed);
    setError(null);
    onCapChange();
  }

  function handleClear(): void {
    setDraft('');
    setDailyCap(provider, null);
    setError(null);
    onCapChange();
  }

  const fillPct = cap !== null && cap > 0 ? Math.min(100, (today.costUsd / cap) * 100) : 0;
  const overCap = cap !== null && today.costUsd >= cap;

  return (
    <div
      style={{
        padding: `${spacing.md}px 0`,
        borderBottom: `1px solid ${colors.border.subtle}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: spacing.md,
          flexWrap: 'wrap',
          marginBottom: spacing.sm,
        }}
      >
        <div
          style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
          }}
        >
          {displayLabel(provider)}
        </div>
        <div
          style={{
            fontSize: typography.fontSize.base,
            color: overCap ? '#C62828' : colors.text.secondary,
            fontWeight: overCap ? typography.fontWeight.semibold : typography.fontWeight.normal,
          }}
        >
          Today: {formatCostUsd(today.costUsd)}
          {cap !== null ? ` / ${formatCostUsd(cap)}` : ''}
        </div>
      </div>

      {cap !== null && (
        <div
          aria-label={`${displayLabel(provider)} daily cap progress`}
          role="progressbar"
          aria-valuenow={Math.round(fillPct)}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            height: 6,
            background: colors.border.subtle,
            borderRadius: radii.sm,
            marginBottom: spacing.sm,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${fillPct}%`,
              height: '100%',
              background: overCap ? '#C62828' : '#1B5E20',
              transition: 'width 0.2s ease',
            }}
          />
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing.sm,
          flexWrap: 'wrap',
        }}
      >
        <label
          htmlFor={`cap-${provider}`}
          style={{
            fontSize: typography.fontSize.base,
            color: colors.text.secondary,
          }}
        >
          Daily limit (USD):
        </label>
        <input
          id={`cap-${provider}`}
          type="text"
          inputMode="decimal"
          placeholder="no limit"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSave();
            }
          }}
          style={{
            width: 100,
            padding: `${spacing.xs + 2}px ${spacing.sm}px`,
            border: `1px solid ${colors.border.default}`,
            borderRadius: radii.base,
            fontSize: typography.fontSize.base,
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
          }}
        />
        <SmallButton onClick={handleSave} variant="primary">
          Save
        </SmallButton>
        {cap !== null && (
          <SmallButton onClick={handleClear} variant="secondary">
            Clear
          </SmallButton>
        )}
      </div>

      {error !== null && (
        <div
          role="alert"
          style={{
            marginTop: spacing.xs,
            fontSize: typography.fontSize.base,
            color: '#C62828',
          }}
        >
          {error}
        </div>
      )}

      {unpricedModelIds.length > 0 && (
        <div
          role="alert"
          aria-label={`${displayLabel(provider)} cap warning: unpriced model`}
          style={{
            marginTop: spacing.sm,
            padding: `${spacing.xs}px ${spacing.sm + 2}px`,
            background: colors.callout.tipBg,
            border: `1px solid ${colors.callout.tipBorder}`,
            borderRadius: radii.base,
            fontSize: typography.fontSize.base,
            color: colors.callout.tipText,
            lineHeight: typography.lineHeight.relaxed,
          }}
        >
          ⚠ This provider returned model{unpricedModelIds.length > 1 ? 's' : ''}{' '}
          {unpricedModelIds.map((id, i) => (
            <span key={id}>
              {i > 0 ? ', ' : ''}
              <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{id}</code>
            </span>
          ))}{' '}
          with no pricing data. Daily limit is not enforced for unpriced models — calls still
          go to your provider and will appear on your bill.
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProviderCostRow — one row per provider with non-zero cumulative cost
// ---------------------------------------------------------------------------

function ProviderCostRow({
  provider,
  state,
  onReset,
}: {
  provider: Provider;
  state: ProviderCostState;
  onReset: () => void;
}): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.md,
        padding: `${spacing.md}px 0`,
        borderBottom: `1px solid ${colors.border.subtle}`,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            marginBottom: 2,
          }}
        >
          {displayLabel(provider)}:{' '}
          <span style={{ color: '#2E7D32' }}>{formatCostUsd(state.totalCostUsd)}</span>
        </div>
        <div
          style={{
            fontSize: typography.fontSize.base,
            color: colors.text.secondary,
          }}
        >
          {formatTokenCount(state.totalInputTokens)} input tokens /{' '}
          {formatTokenCount(state.totalOutputTokens)} output tokens
        </div>
      </div>
      <SmallButton onClick={onReset} variant="secondary">
        Reset
      </SmallButton>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------

export function CostSection(): ReactElement {
  // Increment to trigger re-read from localStorage after a reset / cap change
  const [version, setVersion] = useState(0);

  const allProviders = getAllProviders();
  const configured = listConfigured();

  const costsByProvider: Array<{ provider: Provider; state: ProviderCostState }> = allProviders
    .map(p => ({ provider: p, state: readCost(p) }))
    .filter(({ state }) => hasCost(state));

  function bump(): void {
    setVersion(v => v + 1);
  }

  function handleResetProvider(provider: Provider): void {
    if (!window.confirm(`Reset cost data for ${displayLabel(provider)}?`)) return;
    resetCost(provider);
    bump();
  }

  function handleResetAll(): void {
    if (!window.confirm('Reset all cost data on this device?')) return;
    resetAllCosts();
    bump();
  }

  const headingStyle = {
    margin: `0 0 ${spacing.lg}px`,
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    letterSpacing: '-0.01em',
    paddingBottom: spacing.sm,
    borderBottom: `2px solid ${colors.border.default}`,
  } as const;

  return (
    <div data-version={version}>
      {/* ---------- Daily limits ---------- */}
      {configured.length > 0 && (
        <section
          aria-labelledby="cost-limits-heading"
          style={{ marginBottom: spacing.xxxl * 2 }}
        >
          <h2 id="cost-limits-heading" style={headingStyle}>
            Daily limits
          </h2>
          <p
            style={{
              margin: `0 0 ${spacing.xl}px`,
              fontSize: typography.fontSize.base,
              color: colors.text.muted,
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            Set a per-provider daily USD cap. When today's spend reaches the cap, new
            requests are blocked until tomorrow (local time). Leave blank for no limit.
          </p>
          <div>
            {configured.map(provider => (
              <DailyLimitRow
                key={provider}
                provider={provider}
                today={getTodayCost(provider)}
                initialCap={getDailyCap(provider)}
                unpricedModelIds={getUnpricedModelIds(provider)}
                onCapChange={bump}
              />
            ))}
          </div>
        </section>
      )}

      {/* ---------- Cumulative usage ---------- */}
      <section
        aria-labelledby="cost-section-heading"
        style={{ marginBottom: spacing.xxxl * 2 }}
      >
        <h2 id="cost-section-heading" style={headingStyle}>
          Usage costs
        </h2>

        {costsByProvider.length === 0 ? (
          <p
            style={{
              fontSize: typography.fontSize.base,
              color: colors.text.muted,
              margin: 0,
            }}
          >
            No costs tracked yet. Cost data appears here once you start using a provider.
          </p>
        ) : (
          <>
            <p
              style={{
                margin: `0 0 ${spacing.xl}px`,
                fontSize: typography.fontSize.base,
                color: colors.text.muted,
                lineHeight: typography.lineHeight.relaxed,
              }}
            >
              What you've spent on this device, based on the provider's published token rates.
              Estimates only — billing depends on your provider's actual invoicing.
            </p>

            <div>
              {costsByProvider.map(({ provider, state }) => (
                <ProviderCostRow
                  key={provider}
                  provider={provider}
                  state={state}
                  onReset={() => handleResetProvider(provider)}
                />
              ))}
            </div>

            <div style={{ marginTop: spacing.xl }}>
              <SmallButton onClick={handleResetAll} variant="danger">
                Reset all cost data
              </SmallButton>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
