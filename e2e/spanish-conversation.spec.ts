import { test, expect } from '@playwright/test';

/**
 * E2E tests for the Spanish conversation surface at /guides/spanish/conversation.
 *
 * These tests verify the empty/no-key state only. Live API calls are not tested
 * in E2E — that's the domain of unit tests with mocked providers.
 */

test.beforeEach(async ({ page }) => {
  // Ensure no BYOK keys are configured
  await page.addInitScript(() => {
    try {
      localStorage.removeItem('peliglot-byok-anthropic');
      localStorage.removeItem('peliglot-byok-openai');
      localStorage.removeItem('peliglot-byok-openai-compatible');
      localStorage.removeItem('peliglot-conversation-provider');
    } catch {
      // ignore
    }
  });
});

// ---------------------------------------------------------------------------
// Navigation and empty state
// ---------------------------------------------------------------------------

test('navigates to /guides/spanish/conversation and shows no-provider state', async ({
  page,
}) => {
  await page.goto('/guides/spanish/conversation');
  await page.waitForLoadState('networkidle');

  // Header strip is visible
  await expect(page.getByRole('link', { name: /español/i })).toBeVisible({ timeout: 8000 });

  // No-provider empty state
  await expect(page.getByText(/add a key to start chatting/i)).toBeVisible({ timeout: 8000 });

  // Settings link in empty state
  await expect(page.getByRole('link', { name: /open settings/i })).toBeVisible();
});

test('shows level selector buttons even in no-provider state', async ({ page }) => {
  await page.goto('/guides/spanish/conversation');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('button', { name: /beginner/i })).toBeVisible({ timeout: 8000 });
  await expect(page.getByRole('button', { name: /intermediate/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /advanced/i })).toBeVisible();
});

test('back-link navigates to Spanish guides', async ({ page }) => {
  await page.goto('/guides/spanish/conversation');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('link', { name: /español/i })).toBeVisible({ timeout: 8000 });
  await page.getByRole('link', { name: /español/i }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/\/guides\/spanish/);
});

test('route does not 404', async ({ page }) => {
  const response = await page.goto('/guides/spanish/conversation');
  // The SPA returns 200 for the HTML shell; a 404 would come from Vite/server
  // returning a 404 page. In development, all routes return 200 for the shell.
  expect(response?.status()).toBeLessThan(400);
});

// ---------------------------------------------------------------------------
// Landing page entry point
// ---------------------------------------------------------------------------

test('landing page has a Conversation link that goes to /guides/spanish/conversation', async ({
  page,
}) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const convLink = page.getByRole('link', { name: /conversation practice in spanish/i });
  await expect(convLink).toBeVisible({ timeout: 8000 });

  await convLink.click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/\/guides\/spanish\/conversation/);
});
