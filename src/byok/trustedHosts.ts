/**
 * Trusted-host classification for BYOK custom endpoints.
 *
 * The custom OpenAI-compatible endpoint sends the user's API key as a Bearer
 * token to whatever URL they paste. This is the precise key-phishing vector
 * the BYOK security review flagged: an attacker convinces the user to paste
 * their real OpenAI key plus an attacker-controlled URL into Peliglot.
 *
 * `isTrustedHost` returns true for hosts where we don't need to prompt
 * before sending the key. Everything else gets a one-time confirm dialog.
 *
 * Trusted set:
 *   - `localhost`, `127.0.0.1`, `::1` — loopback
 *   - `*.ts.net` — Tailscale (free HTTPS via Tailscale Funnel)
 *   - `*.trycloudflare.com` — Cloudflare quick tunnels (HTTPS by default)
 *
 * Collection-agnostic. No imports from src/guides/, src/mastery/, or any
 * specific guide collection.
 */

const TRUSTED_EXACT = new Set(['localhost', '127.0.0.1', '::1']);
const TRUSTED_SUFFIXES = ['.ts.net', '.trycloudflare.com'];

function extractHostname(input: string): string | null {
  const trimmed = input.trim();
  if (trimmed === '') return null;
  // If the user pasted a bare hostname (no scheme), treat it as-is.
  // URL constructor needs a scheme to parse, so add a fake one for parsing.
  const candidate = /^[a-z][a-z0-9+\-.]*:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;
  try {
    const url = new URL(candidate);
    // Per the WHATWG URL spec, IPv6 hostnames are returned wrapped in brackets
    // (e.g., '[::1]'). Strip them so the trusted-exact set can match the
    // bare address.
    const host = url.hostname.toLowerCase();
    if (host.startsWith('[') && host.endsWith(']')) {
      return host.slice(1, -1);
    }
    return host;
  } catch {
    return null;
  }
}

/**
 * Returns true if the given URL or hostname is one we trust to receive the
 * user's API key without explicit per-save confirmation.
 *
 * Returns false for any URL that fails to parse — fail-closed by design,
 * since the only consequence of a false negative is one extra confirm prompt.
 */
export function isTrustedHost(input: string): boolean {
  const host = extractHostname(input);
  if (host === null) return false;
  if (TRUSTED_EXACT.has(host)) return true;
  return TRUSTED_SUFFIXES.some(suffix => host.endsWith(suffix));
}
