/**
 * Internal: error-message extraction and secret scrubbing for BYOK providers.
 *
 * Not exported from the public barrel. Used by validate.ts and each provider
 * implementation. Centralised here so a future hardening (regex partial match,
 * different threshold, etc.) updates one site, not four.
 *
 * Why >=4 chars: below that, scrubbing risks clobbering common substrings in
 * error text. Real provider keys are far longer; the only case this misses is
 * a deliberately tiny custom-endpoint token, which is itself a misconfig.
 */

export function scrubSecrets(
  text: string,
  secrets: ReadonlyArray<string | undefined>,
): string {
  let out = text;
  for (const s of secrets) {
    if (s && s.length >= 4) {
      out = out.split(s).join('[redacted]');
    }
  }
  return out;
}

export async function extractErrorMessage(
  response: Response,
  secrets: ReadonlyArray<string | undefined> = [],
): Promise<string> {
  let raw: string | null = null;
  try {
    const body: unknown = await response.json();
    if (typeof body === 'object' && body !== null) {
      const obj = body as Record<string, unknown>;
      if (
        typeof obj.error === 'object' &&
        obj.error !== null &&
        typeof (obj.error as Record<string, unknown>).message === 'string'
      ) {
        raw = (obj.error as Record<string, unknown>).message as string;
      } else if (typeof obj.message === 'string') {
        raw = obj.message;
      }
    }
  } catch {
    // body wasn't JSON — fall through
  }
  const message = raw ?? `HTTP ${response.status}`;
  return scrubSecrets(message, secrets);
}
