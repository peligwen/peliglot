import { test, expect } from '@playwright/test';

/**
 * Privacy assertion tests.
 *
 * Verifies that Peliglot does not set cookies or non-Peliglot localStorage
 * entries, and that the only third-party network requests in CI (where the
 * Cloudflare analytics beacon is NOT loaded) are the Google Fonts CDN calls
 * that pre-exist in index.html.
 *
 * Allowed third-party hosts (by design):
 *   - fonts.googleapis.com  — Google Fonts CSS (declared in index.html)
 *   - fonts.gstatic.com     — Google Fonts woff2 files
 *
 * The Cloudflare beacon (static.cloudflareinsights.com) is only injected
 * when VITE_CF_ANALYTICS_TOKEN is set at build time. In CI / local dev the
 * token is absent, so the beacon is never loaded. This test therefore asserts
 * cloudflareinsights.com is NOT present in requests (correct for dev/CI
 * builds). A separate manual check documents the beacon-present case.
 *
 * Explicitly NOT allowed (would indicate a regression):
 *   - Any analytics or tracking domain other than Cloudflare
 *   - Any cookie set by the site or its scripts
 *   - Any localStorage key that doesn't start with "peliglot-"
 */

const ALLOWED_THIRD_PARTY_HOSTS = new Set([
  'fonts.googleapis.com',
  'fonts.gstatic.com',
]);

// Routes to visit in sequence (exercises real route changes)
const TEST_ROUTES = ['/', '/guides/spanish', '/support', '/analytics', '/'];

test('no cookies are set across multiple routes', async ({ page }) => {
  for (const route of TEST_ROUTES) {
    await page.goto(route);
    await page.waitForLoadState('networkidle');

    const cookies = await page.context().cookies();
    // Filter to cookies for the app origin only (ignore any browser internals)
    const appCookies = cookies.filter(c =>
      c.domain === 'localhost' || c.domain === '127.0.0.1',
    );
    expect(
      appCookies,
      `Expected no cookies after navigating to ${route}`,
    ).toHaveLength(0);
  }
});

test('localStorage contains only peliglot-* keys', async ({ page }) => {
  // Visit several routes to trigger any storage writes
  for (const route of TEST_ROUTES) {
    await page.goto(route);
    await page.waitForLoadState('networkidle');
  }

  const storageKeys = await page.evaluate(() => Object.keys(localStorage));
  const foreignKeys = storageKeys.filter(k => !k.startsWith('peliglot-'));

  expect(
    foreignKeys,
    `localStorage contains unexpected non-peliglot keys: ${foreignKeys.join(', ')}`,
  ).toHaveLength(0);
});

test('no unexpected third-party network requests (beacon absent in CI)', async ({ page }) => {
  const thirdPartyRequests = [];

  page.on('request', request => {
    const url = new URL(request.url());
    const host = url.hostname;

    // Ignore same-origin requests
    if (host === 'localhost' || host === '127.0.0.1') return;

    // Ignore known, intentional CDN hosts
    if (ALLOWED_THIRD_PARTY_HOSTS.has(host)) return;

    // Anything else is unexpected
    thirdPartyRequests.push(`${request.method()} ${request.url()}`);
  });

  for (const route of TEST_ROUTES) {
    await page.goto(route);
    await page.waitForLoadState('networkidle');
  }

  expect(
    thirdPartyRequests,
    `Unexpected third-party requests found:\n${thirdPartyRequests.join('\n')}`,
  ).toHaveLength(0);
});

test('analytics page: renders title and key privacy sections', async ({ page }) => {
  await page.goto('/analytics');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveTitle(/Analytics/);
  await expect(page).toHaveTitle(/Peliglot/);

  await expect(page.getByRole('heading', { name: /Analytics at Peliglot/i, level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: /What's measured/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /What's NOT measured/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Why/i })).toBeVisible();
});

test('landing page footer has a link to /analytics', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const footer = page.getByRole('contentinfo');
  const analyticsLink = footer.getByRole('link', { name: /Privacy-respecting analytics/i });
  await expect(analyticsLink).toBeVisible();

  const href = await analyticsLink.getAttribute('href');
  expect(href).toBe('/analytics');
});

test('supporters page footer has a link to /analytics', async ({ page }) => {
  await page.goto('/support');
  await page.waitForLoadState('networkidle');

  const footer = page.getByRole('contentinfo');
  const analyticsLink = footer.getByRole('link', { name: /details/i });
  await expect(analyticsLink).toBeVisible();

  const href = await analyticsLink.getAttribute('href');
  expect(href).toBe('/analytics');
});
