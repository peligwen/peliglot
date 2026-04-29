/**
 * CostSection — Settings sub-component showing cumulative BYOK usage costs.
 *
 * Tracks what you've spent on this device, per provider.
 * No off-device telemetry — all data is local.
 */

import { useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { readCost, resetCost, resetAllCosts, getAllProviders, PROVIDER_LABELS } from '../byok';
import type { Provider, ProviderCostState } from '../byok';
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

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SmallButton({
  onClick,
  children,
  variant = 'secondary',
}: {
  onClick: () => void;
  children: ReactNode;
  variant?: 'secondary' | 'danger';
}): ReactElement {
  const bgColor = variant === 'danger' ? '#C62828' : colors.surface.white;
  const textColor = variant === 'danger' ? colors.text.white : colors.text.primary;
  const border = variant === 'secondary' ? `1px solid ${colors.border.default}` : 'none';

  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-block',
        padding: `${spacing.xs + 2}px ${spacing.lg}px`,
        background: bgColor,
        color: textColor,
        border,
        borderRadius: radii.base,
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        cursor: 'pointer',
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
// ProviderCostRow — one row per provider with non-zero cost
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
  const label = PROVIDER_LABELS[provider];
  // Capitalize first letter for display
  const displayLabel = label.charAt(0).toUpperCase() + label.slice(1);

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
          {displayLabel}:{' '}
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
  // Increment to trigger re-read from localStorage after a reset
  const [version, setVersion] = useState(0);

  // Re-read all costs from storage each render cycle (keyed by version)
  const providers = getAllProviders();
  const costsByProvider: Array<{ provider: Provider; state: ProviderCostState }> = providers
    .map(p => ({ provider: p, state: readCost(p) }))
    .filter(({ state }) => hasCost(state));

  function handleResetProvider(provider: Provider): void {
    const label = PROVIDER_LABELS[provider];
    const displayLabel = label.charAt(0).toUpperCase() + label.slice(1);
    if (!window.confirm(`Reset cost data for ${displayLabel}?`)) return;
    resetCost(provider);
    setVersion(v => v + 1);
  }

  function handleResetAll(): void {
    if (!window.confirm('Reset all cost data on this device?')) return;
    resetAllCosts();
    setVersion(v => v + 1);
  }

  if (costsByProvider.length === 0) {
    return (
      <section
        aria-labelledby="cost-section-heading"
        style={{ marginBottom: spacing.xxxl * 2 }}
        data-version={version}
      >
        <h2
          id="cost-section-heading"
          style={{
            margin: `0 0 ${spacing.lg}px`,
            fontSize: 22,
            fontWeight: typography.fontWeight.bold,
            color: colors.text.primary,
            letterSpacing: '-0.01em',
            paddingBottom: spacing.sm,
            borderBottom: `2px solid ${colors.border.default}`,
          }}
        >
          Usage costs
        </h2>
        <p
          style={{
            fontSize: typography.fontSize.base,
            color: colors.text.muted,
            margin: 0,
          }}
        >
          No costs tracked yet. Cost data appears here once you start using a provider.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="cost-section-heading"
      style={{ marginBottom: spacing.xxxl * 2 }}
      data-version={version}
    >
      <h2
        id="cost-section-heading"
        style={{
          margin: `0 0 ${spacing.lg}px`,
          fontSize: 22,
          fontWeight: typography.fontWeight.bold,
          color: colors.text.primary,
          letterSpacing: '-0.01em',
          paddingBottom: spacing.sm,
          borderBottom: `2px solid ${colors.border.default}`,
        }}
      >
        Usage costs
      </h2>

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
    </section>
  );
}
