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

// ---------------------------------------------------------------------------
// Cap-exceeded inline error
// ---------------------------------------------------------------------------

test('cap-exceeded: blocks the request locally and shows a Settings deep-link', async ({
  page,
}) => {
  // Seed a configured Anthropic provider whose today's spend is above the
  // configured cap. The cap preflight should reject before any fetch fires —
  // verifying both the wrapper and the conversation route's error handling.
  await page.addInitScript(() => {
    try {
      localStorage.setItem(
        'peliglot-byok-anthropic',
        JSON.stringify({ provider: 'anthropic', apiKey: 'sk-ant-test' }),
      );
      localStorage.setItem('peliglot-byok-cap-anthropic', '1.00');
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      localStorage.setItem(
        'peliglot-byok-cost-anthropic',
        JSON.stringify({
          totalInputTokens: 5000,
          totalOutputTokens: 2000,
          totalCostUsd: 1.5,
          lastUpdated: Date.now(),
          byDate: { [dateStr]: { input: 5000, output: 2000, costUsd: 1.5 } },
        }),
      );
    } catch {
      // ignore
    }
  });

  // Block any network call to the Anthropic API — if the cap preflight is
  // working, this route handler should never fire. If it does, the test
  // fails (we're not whitelisting it).
  let anthropicCalled = false;
  await page.route('**/api.anthropic.com/**', async route => {
    anthropicCalled = true;
    await route.abort();
  });

  await page.goto('/guides/spanish/conversation');
  await page.waitForLoadState('networkidle');

  const textarea = page.getByRole('textbox', { name: /message input/i });
  await expect(textarea).toBeVisible({ timeout: 8000 });
  await textarea.fill('Hola, ¿cómo estás?');

  await page.getByRole('button', { name: /send message/i }).click();

  // Cap-exceeded error bubble appears
  await expect(page.getByText(/daily cap.*reached/i)).toBeVisible({ timeout: 6000 });
  // Settings deep-link
  await expect(page.getByRole('link', { name: /adjust your daily limit/i })).toBeVisible();
  // Confirm preflight short-circuited the network
  expect(anthropicCalled).toBe(false);
});

test('experimental pill is visible in the conversation header', async ({ page }) => {
  await page.goto('/guides/spanish/conversation');
  await page.waitForLoadState('networkidle');

  // Pill is rendered as a span with an aria-label; visible text is
  // ALL-CAPS via CSS but DOM text is "Experimental"
  await expect(
    page.getByLabel('Experimental feature').first(),
  ).toBeVisible({ timeout: 8000 });
});

test('silent-usage: blocks subsequent sends and surfaces an inline warning', async ({ page }) => {
  // Seed a silent-usage record so the wrapper short-circuits on every chat call.
  // This proves the sticky-block contract: even with a configured key and below
  // the cap, no network I/O happens — the user sees the inline warning instead.
  await page.addInitScript(() => {
    try {
      localStorage.setItem(
        'peliglot-byok-anthropic',
        JSON.stringify({ provider: 'anthropic', apiKey: 'sk-ant-test' }),
      );
      localStorage.setItem(
        'peliglot-byok-silent-anthropic',
        JSON.stringify(['claude-future-silent']),
      );
    } catch {
      // ignore
    }
  });

  // Block any anthropic API call — the silent-usage guard should preflight-reject
  // before fetch fires. If it does fire, this test fails.
  let anthropicCalled = false;
  await page.route('**/api.anthropic.com/**', async route => {
    anthropicCalled = true;
    await route.abort();
  });

  await page.goto('/guides/spanish/conversation');
  await page.waitForLoadState('networkidle');

  // Inline warning is visible from hydration (record was seeded before mount)
  await expect(page.getByText(/chat paused/i)).toBeVisible({ timeout: 8000 });
  await expect(page.getByRole('link', { name: /resolve in settings/i })).toBeVisible();

  // Send a message anyway — wrapper should reject locally; no fetch fires
  const textarea = page.getByRole('textbox', { name: /message input/i });
  await textarea.fill('Hola');
  await page.getByRole('button', { name: /send message/i }).click();

  // Error bubble shows the silent-usage error, with a Settings deep-link
  await expect(page.getByText(/without reporting token usage/i)).toBeVisible({ timeout: 6000 });
  expect(anthropicCalled).toBe(false);
});

test('unpriced model warning: surfaces inline above the input on hydration', async ({ page }) => {
  // Seed a configured Anthropic provider plus an unpriced-call record. The
  // conversation route should render the warning on mount without requiring
  // a fresh chat call.
  await page.addInitScript(() => {
    try {
      localStorage.setItem(
        'peliglot-byok-anthropic',
        JSON.stringify({ provider: 'anthropic', apiKey: 'sk-ant-test' }),
      );
      localStorage.setItem(
        'peliglot-byok-unpriced-anthropic',
        JSON.stringify(['claude-future-mystery']),
      );
    } catch {
      // ignore
    }
  });

  await page.goto('/guides/spanish/conversation');
  await page.waitForLoadState('networkidle');

  // Inline warning above the input
  await expect(page.getByText(/daily limit doesn't apply/i)).toBeVisible({ timeout: 6000 });
  await expect(page.getByRole('link', { name: /details in settings/i })).toBeVisible();
});
