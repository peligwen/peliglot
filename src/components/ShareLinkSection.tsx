/**
 * ShareLinkSection — Settings sub-component for share-link / QR continuity.
 *
 * Two actions:
 *  1. "Copy share link" — encodes the current snapshot and copies a URL to
 *     the clipboard. Falls back to a selectable input if the Clipboard API
 *     is unavailable.
 *  2. "Show QR" — lazy-loads qrcode-generator (~11 KB gzipped) and renders
 *     the QR as inline SVG. Toggled on/off.
 *
 * Browser support note: CompressionStream requires Chrome 80+, Firefox 113+,
 * Safari 16.4+. If absent, the button shows a graceful message.
 *
 * Size note: a saturated Spanish learner (~662 cards) encodes to ~20–35 KB
 * base64url. Best for paste; long links may break in SMS/Twitter.
 */

import { useState, useRef } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useMastery } from '../hooks/useMastery';
import { encodeSnapshot } from '../utils/snapshot';
import { colors, spacing, radii, typography } from '../styles/tokens';

// ---------------------------------------------------------------------------
// Action button (local variant)
// ---------------------------------------------------------------------------

function ActionButton({
  onClick,
  disabled,
  children,
  variant = 'primary',
}: {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}): ReactElement {
  const bgColor = variant === 'primary' ? colors.surface.dark : colors.surface.white;
  const textColor = variant === 'secondary' ? colors.text.primary : colors.text.white;
  const borderStyle = variant === 'secondary' ? `1px solid ${colors.border.default}` : 'none';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-block',
        padding: `${spacing.sm + 2}px ${spacing.xl}px`,
        background: disabled ? '#ccc' : bgColor,
        color: disabled ? '#888' : textColor,
        border: borderStyle,
        borderRadius: radii.base,
        fontSize: typography.fontSize['2xl'],
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

// ---------------------------------------------------------------------------
// QR render — uses a container ref to set innerHTML; content is generated
// by qrcode-generator from the user's own URL so XSS is not a concern here.
// ---------------------------------------------------------------------------

function QrDisplay({ svgMarkup }: { svgMarkup: string }): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  // We can't avoid innerHTML here — the qrcode lib returns an SVG string.
  // Content source: qrcode-generator's createSvgTag(), called with a URL
  // we built from the user's own data. Not user-supplied HTML.
  // biome-ignore lint/security/noDangerouslySetInnerHtml: QR SVG is machine-generated from our own URL
  return <div ref={ref} data-testid="qr-svg-container" style={{ width: '100%', lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: svgMarkup }} />;
}

// ---------------------------------------------------------------------------
// ShareLinkSection
// ---------------------------------------------------------------------------

type CopyPhase =
  | 'idle'
  | 'working'
  | 'copied'
  | 'fallback'
  | 'no-compression'
  | 'error';

export function ShareLinkSection(): ReactElement {
  const { exportSnapshot, isHydrated } = useMastery();

  const [copyPhase, setCopyPhase] = useState<CopyPhase>('idle');
  const [fallbackUrl, setFallbackUrl] = useState<string>('');
  const [copyError, setCopyError] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [qrSvg, setQrSvg] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  const fallbackInputRef = useRef<HTMLInputElement>(null);

  // -- Copy share link --------------------------------------------------------

  async function handleCopyLink(): Promise<void> {
    if (typeof CompressionStream === 'undefined') {
      setCopyPhase('no-compression');
      return;
    }

    setCopyPhase('working');
    setCopyError(null);

    try {
      const snapshot = await exportSnapshot();
      const encoded = await encodeSnapshot(snapshot);
      const url = `${window.location.origin}/import#snapshot=${encoded}`;
      setCurrentUrl(url);

      try {
        await navigator.clipboard.writeText(url);
        setCopyPhase('copied');
        // Reset back to idle after 2 seconds
        setTimeout(() => setCopyPhase('idle'), 2000);
      } catch {
        // Clipboard API failed — show fallback selectable input
        setFallbackUrl(url);
        setCopyPhase('fallback');
        // Select the text after render
        requestAnimationFrame(() => {
          fallbackInputRef.current?.select();
        });
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Something went wrong.';
      setCopyError(message);
      setCopyPhase('error');
    }
  }

  // -- Show QR ----------------------------------------------------------------

  async function handleToggleQr(): Promise<void> {
    if (showQr) {
      setShowQr(false);
      return;
    }

    // Need a URL to generate QR; get one if not cached
    let url = currentUrl;
    if (!url) {
      if (typeof CompressionStream === 'undefined') {
        setQrError('Your browser doesn\'t support this. Please update or use the file export/import on the Settings page.');
        setShowQr(true);
        return;
      }

      setQrLoading(true);
      setQrError(null);
      try {
        const snapshot = await exportSnapshot();
        const encoded = await encodeSnapshot(snapshot);
        url = `${window.location.origin}/import#snapshot=${encoded}`;
        setCurrentUrl(url);
      } catch (e) {
        setQrError(e instanceof Error ? e.message : 'Could not generate share link.');
        setQrLoading(false);
        setShowQr(true);
        return;
      }
    }

    // Lazy-load qrcode-generator (~11 KB gzipped; well within the 20 KB threshold)
    try {
      const qrcode = (await import('qrcode-generator')).default;
      const qr = qrcode(0, 'M');
      qr.addData(url);
      qr.make();
      // scalable: true → viewBox-based SVG that scales with CSS width
      setQrSvg(qr.createSvgTag({ scalable: true }));
      setQrLoading(false);
      setShowQr(true);
    } catch (e) {
      setQrError(e instanceof Error ? e.message : 'Could not generate QR code.');
      setQrLoading(false);
      setShowQr(true);
    }
  }

  // -- Render -----------------------------------------------------------------

  const copyLabel = (() => {
    switch (copyPhase) {
      case 'working': return 'Generating…';
      case 'copied': return 'Copied!';
      default: return 'Copy share link';
    }
  })();

  return (
    <section
      aria-labelledby="share-link-heading"
      style={{ marginBottom: spacing.xxxl * 2 }}
    >
      <h2
        id="share-link-heading"
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
        Share links &amp; QR codes
      </h2>

      <p style={{
        margin: `0 0 ${spacing.xxl}px`,
        fontSize: typography.fontSize.base,
        color: colors.text.muted,
        lineHeight: typography.lineHeight.relaxed,
      }}>
        One tap. No account. Your progress jumps to a new device.
      </p>

      {/* Buttons row */}
      <div style={{ display: 'flex', gap: spacing.md, flexWrap: 'wrap', marginBottom: spacing.lg }}>
        <ActionButton
          onClick={() => { void handleCopyLink(); }}
          disabled={!isHydrated || copyPhase === 'working'}
        >
          {copyLabel}
        </ActionButton>

        <ActionButton
          onClick={() => { void handleToggleQr(); }}
          disabled={!isHydrated || qrLoading}
          variant="secondary"
        >
          {showQr ? 'Hide QR' : qrLoading ? 'Loading…' : 'Show QR'}
        </ActionButton>
      </div>

      {/* No-compression fallback */}
      {copyPhase === 'no-compression' && (
        <div style={{
          background: '#FFF8E7',
          border: '1px solid #F0E4C4',
          borderRadius: radii.base,
          padding: `${spacing.sm}px ${spacing.md}px`,
          fontSize: typography.fontSize.base,
          color: colors.callout.tipText,
          lineHeight: typography.lineHeight.relaxed,
          marginBottom: spacing.md,
        }}>
          Your browser doesn&apos;t support this. Please update or use the file export/import on the Settings page.
        </div>
      )}

      {/* Clipboard error */}
      {copyPhase === 'error' && copyError && (
        <div style={{
          background: '#FFEBEE',
          border: '1px solid #FFCDD2',
          borderRadius: radii.base,
          padding: `${spacing.sm}px ${spacing.md}px`,
          fontSize: typography.fontSize.base,
          color: '#C62828',
          lineHeight: typography.lineHeight.relaxed,
          marginBottom: spacing.md,
        }}>
          {copyError}
        </div>
      )}

      {/* Clipboard fallback — selectable input */}
      {copyPhase === 'fallback' && fallbackUrl && (
        <div style={{ marginBottom: spacing.md }}>
          <p style={{
            margin: `0 0 ${spacing.xs}px`,
            fontSize: typography.fontSize.base,
            color: colors.text.muted,
          }}>
            Clipboard unavailable — copy the link manually:
          </p>
          <input
            ref={fallbackInputRef}
            type="text"
            readOnly
            value={fallbackUrl}
            aria-label="Share link"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: `${spacing.sm}px ${spacing.md}px`,
              fontSize: typography.fontSize.base,
              border: `1px solid ${colors.border.default}`,
              borderRadius: radii.base,
              background: colors.surface.white,
              color: colors.text.primary,
              fontFamily: 'monospace',
            }}
            onClick={() => fallbackInputRef.current?.select()}
          />
        </div>
      )}

      {/* QR code panel */}
      {showQr && (
        <div
          aria-label="QR code panel"
          style={{
            marginBottom: spacing.lg,
            padding: `${spacing.lg}px`,
            background: colors.surface.white,
            border: `1px solid ${colors.border.default}`,
            borderRadius: radii.lg,
            maxWidth: 260,
          }}
        >
          {qrError && (
            <div style={{
              fontSize: typography.fontSize.base,
              color: '#C62828',
              lineHeight: typography.lineHeight.relaxed,
            }}>
              {qrError}
            </div>
          )}
          {qrSvg && !qrError && (
            <QrDisplay svgMarkup={qrSvg} />
          )}
          {qrLoading && !qrError && (
            <div style={{ fontSize: typography.fontSize.base, color: colors.text.secondary }}>
              Generating QR…
            </div>
          )}
        </div>
      )}

      {/* Size note */}
      <p style={{
        margin: 0,
        fontSize: typography.fontSize.sm,
        color: colors.text.tertiary,
        lineHeight: typography.lineHeight.relaxed,
      }}>
        Best for paste. Long links may break in SMS/Twitter. Roughly 20–35 KB for a saturated user.
      </p>
    </section>
  );
}
