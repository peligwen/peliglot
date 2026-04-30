/**
 * Encode / decode a MasteryExport snapshot as a compact, URL-safe string.
 *
 * Pipeline:
 *   encode: JSON → UTF-8 bytes → gzip (CompressionStream) → base64url
 *   decode: base64url → gunzip (DecompressionStream) → UTF-8 text → JSON → migrate()
 *
 * Size estimate: a saturated Spanish learner (~662 cards) compresses to roughly
 * 15–25 KB gzipped → ~20–35 KB base64url. Modern browsers handle this fine in
 * hash fragments; the Settings page copy describes this as "best for paste."
 *
 * Browser support: CompressionStream / DecompressionStream require
 *   Chrome 80+, Firefox 113+, Safari 16.4+.
 * Callers should check `typeof CompressionStream === 'undefined'` and surface
 * a graceful degradation message if the API is absent.
 */

import type { MasteryExport, MigrationStatus } from '../mastery';
import { migrate, migrateWithStatus } from '../mastery';

// ---------------------------------------------------------------------------
// Typed error
// ---------------------------------------------------------------------------

/**
 * Thrown by `decodeSnapshot` when the input is not a valid encoded snapshot.
 * The `message` is end-user-friendly.
 */
export class SnapshotDecodeError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'SnapshotDecodeError';
    if (cause !== undefined) {
      this.cause = cause;
    }
  }
}

// ---------------------------------------------------------------------------
// Base64url helpers (RFC 4648 §5 — URL-safe, no padding)
// ---------------------------------------------------------------------------

function bytesToBase64url(bytes: Uint8Array): string {
  // btoa only works with latin-1 bytes; convert through a binary string.
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i] as number);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function base64urlToBytes(b64url: string): Uint8Array {
  // Re-pad: base64url stripped padding — add it back.
  const padded = b64url
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(b64url.length + ((4 - (b64url.length % 4)) % 4), '=');

  let binary: string;
  try {
    binary = atob(padded);
  } catch (e) {
    throw new SnapshotDecodeError(
      'Invalid share link — the encoded data is corrupted.',
      e,
    );
  }

  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// ---------------------------------------------------------------------------
// Compression helpers
// ---------------------------------------------------------------------------

async function collectStream(readable: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  const reader = readable.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

async function gzip(data: Uint8Array): Promise<Uint8Array> {
  const cs = new CompressionStream('gzip');
  const writer = cs.writable.getWriter();
  // Write + close the writable side concurrently while reading the readable side.
  // Awaiting both prevents unhandled promise rejections.
  // Cast: CompressionStream.writable expects ArrayBuffer-backed Uint8Array;
  // our Uint8Array always has a plain ArrayBuffer since we create it with `new Uint8Array(n)`.
  const writePromise = writer.write(data as unknown as Uint8Array<ArrayBuffer>).then(() => writer.close());
  const [result] = await Promise.all([collectStream(cs.readable), writePromise]);
  return result;
}

async function gunzip(data: Uint8Array): Promise<Uint8Array> {
  const ds = new DecompressionStream('gzip');
  const writer = ds.writable.getWriter();
  // Write + close the writable side concurrently while reading the readable side.
  // Cast: same ArrayBuffer constraint as gzip above.
  const writePromise = writer.write(data as unknown as Uint8Array<ArrayBuffer>).then(() => writer.close());
  let result: Uint8Array;
  try {
    [result] = await Promise.all([collectStream(ds.readable), writePromise]);
  } catch (e) {
    throw new SnapshotDecodeError(
      'Invalid share link — could not decompress the data. The link may be truncated.',
      e,
    );
  }
  return result;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Encode a MasteryExport snapshot to a compact, URL-safe string.
 *
 * The caller should check `typeof CompressionStream === 'undefined'` first
 * and surface a graceful fallback message if the browser doesn't support it.
 */
export async function encodeSnapshot(snapshot: MasteryExport): Promise<string> {
  const json = JSON.stringify(snapshot);
  const bytes = new TextEncoder().encode(json);
  const compressed = await gzip(bytes);
  return bytesToBase64url(compressed);
}

/**
 * Decode an encoded snapshot string back to a MasteryExport.
 *
 * The decoded JSON is always passed through `migrate()`, which ensures forward
 * compatibility with future schema versions and handles malformed input
 * defensively (returning an empty export rather than throwing for schema issues).
 *
 * @throws {SnapshotDecodeError} if the input is not valid base64url, not valid
 *   gzip, or not valid JSON. Schema-version mismatches are handled by `migrate()`
 *   returning an empty export — this propagates as-is (decoded but logically empty).
 */
export async function decodeSnapshot(encoded: string): Promise<MasteryExport> {
  const compressed = base64urlToBytes(encoded);
  const decompressed = await gunzip(compressed);
  const json = new TextDecoder().decode(decompressed);

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch (e) {
    throw new SnapshotDecodeError(
      'Invalid share link — the data could not be parsed.',
      e,
    );
  }

  // migrate() handles malformed/unknown-version snapshots defensively,
  // returning emptyExport() rather than throwing. This propagates as-is.
  return migrate(parsed);
}

/**
 * Like decodeSnapshot but returns the migration status alongside the snapshot,
 * so callers can show "your browser is too old" copy when the input came from a
 * newer schema version.
 */
export async function decodeSnapshotWithStatus(encoded: string): Promise<MigrationStatus> {
  const compressed = base64urlToBytes(encoded);
  const decompressed = await gunzip(compressed);
  const json = new TextDecoder().decode(decompressed);

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch (e) {
    throw new SnapshotDecodeError(
      'Invalid share link — the data could not be parsed.',
      e,
    );
  }

  return migrateWithStatus(parsed);
}
