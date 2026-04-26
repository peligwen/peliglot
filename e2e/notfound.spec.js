import { test, expect } from '@playwright/test';

/**
 * 404 catch-all route tests.
 *
 * useRouteMeta no longer restores previous meta values on cleanup, so every
 * route must set its own. The wildcard route covers unmatched paths.
 */

test('unknown route renders the NotFoundPage with a 404 heading', async ({ page }) => {
  await page.goto('/this-route-does-not-exist');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('heading', { name: '404', level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: /Back to Peliglot/i })).toBeVisible();
});

test('unknown route updates document title to "Not found"', async ({ page }) => {
  await page.goto('/another-bad-path');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveTitle(/Not found/);
  await expect(page).toHaveTitle(/Peliglot/);
});

test('unknown route under /guides/ also resolves to NotFoundPage', async ({ page }) => {
  await page.goto('/guides/not-a-collection');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('heading', { name: '404', level: 1 })).toBeVisible();
});
