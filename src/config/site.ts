// Single source of truth for the production site origin. Used by useRouteMeta,
// JSON-LD builders, and any client-side code that needs an absolute URL. Build
// scripts (sitemap, OG cards) honor PELIGLOT_SITE_URL with this same default.
export const SITE_URL = 'https://peliglot.com';

// Ko-fi handle for the donation flow. VITE_KOFI_USERNAME overrides for staging
// or preview deployments. The env value is sanitized to the character class
// Ko-fi accepts in usernames; anything else falls back to the default and dev
// builds emit a warning so the typo is visible.
const KOFI_USERNAME_DEFAULT = 'peliglot';
const KOFI_USERNAME_PATTERN = /^[a-zA-Z0-9_-]+$/;

function resolveKofiUsername(): string {
  const raw = import.meta.env.VITE_KOFI_USERNAME as string | undefined;
  if (!raw) return KOFI_USERNAME_DEFAULT;
  if (KOFI_USERNAME_PATTERN.test(raw)) return raw;
  if (import.meta.env.DEV) {
    console.warn(
      `[Peliglot] VITE_KOFI_USERNAME=${JSON.stringify(raw)} contains characters outside [a-zA-Z0-9_-]; falling back to '${KOFI_USERNAME_DEFAULT}'.`,
    );
  }
  return KOFI_USERNAME_DEFAULT;
}

export const KOFI_USERNAME = resolveKofiUsername();
export const KOFI_URL = `https://ko-fi.com/${KOFI_USERNAME}`;
