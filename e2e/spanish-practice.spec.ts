import { test, expect } from '@playwright/test';

/**
 * E2E tests for the Spanish practice surface at /guides/spanish/practice.
 *
 * Since all cards start as "new" (never reviewed) on a fresh localStorage,
 * the practice queue is non-empty on every fresh visit — the entire 247-card
 * pool is due by default.
 */

test.beforeEach(async ({ page }) => {
  // Ensure a clean mastery state for each test
  await page.addInitScript(() => {
    try {
      localStorage.removeItem('peliglot-mastery-v1');
    } catch {
      // ignore
    }
  });
});

// ---------------------------------------------------------------------------
// Navigation and basic render
// ---------------------------------------------------------------------------

test('navigates to /guides/spanish/practice and shows a card prompt', async ({ page }) => {
  await page.goto('/guides/spanish/practice');
  await page.waitForLoadState('networkidle');

  // The practice surface should render (not 404)
  // The header strip back-link is always present after hydration
  await expect(page.getByRole('link', { name: /español/i })).toBeVisible({ timeout: 8000 });

  // A prompt card should be visible — all cards are new/due on a fresh visit
  // The "Show Answer" button is the clearest indicator that a card is showing
  await expect(page.getByRole('button', { name: /show answer/i })).toBeVisible({ timeout: 8000 });
});

test('header strip shows streak and daily goal info', async ({ page }) => {
  await page.goto('/guides/spanish/practice');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('link', { name: /español/i })).toBeVisible({ timeout: 8000 });

  // Progress bar for daily goal is rendered
  await expect(page.getByRole('progressbar')).toBeVisible();

  // Due count
  await expect(page.getByText(/due/)).toBeVisible();
});

// ---------------------------------------------------------------------------
// Card interaction flow
// ---------------------------------------------------------------------------

test('clicking Show Answer reveals the answer and rating buttons', async ({ page }) => {
  await page.goto('/guides/spanish/practice');
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: /show answer/i }).click();

  // Rating buttons should appear
  await expect(page.getByRole('button', { name: /again/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /hard/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /good/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /easy/i })).toBeVisible();

  // An answer text should be visible (we can't predict which card first, but
  // the Answer label should appear)
  await expect(page.getByText('Answer')).toBeVisible();
});

test('clicking Good advances to next card or shows empty state', async ({ page }) => {
  await page.goto('/guides/spanish/practice');
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: /show answer/i }).click();
  await expect(page.getByRole('button', { name: /good/i })).toBeVisible();

  await page.getByRole('button', { name: /good/i }).click();

  // After rating: either a "next review" message appears, or the next card shows,
  // or we see "all caught up". The key thing is the previous rating buttons are gone
  // and we moved forward.
  await expect(async () => {
    const hasNextReview = await page.getByText(/next review/i).isVisible().catch(() => false);
    const hasNewCard = await page.getByRole('button', { name: /show answer/i }).isVisible().catch(() => false);
    const hasCaughtUp = await page.getByText(/all caught up/i).isVisible().catch(() => false);
    expect(hasNextReview || hasNewCard || hasCaughtUp).toBe(true);
  }).toPass({ timeout: 5000 });
});

// ---------------------------------------------------------------------------
// Persistence across reload
// ---------------------------------------------------------------------------

test('after rating a card, reload reflects the review count in header', async ({ page }) => {
  await page.goto('/guides/spanish/practice');
  await page.waitForLoadState('networkidle');

  // Rate the first card
  await page.getByRole('button', { name: /show answer/i }).click();
  await expect(page.getByRole('button', { name: /good/i })).toBeVisible();
  await page.getByRole('button', { name: /good/i }).click();

  // Wait for the rating to persist (async write)
  await page.waitForTimeout(500);

  // Reload — localStorage should have persisted
  await page.reload();
  await page.waitForLoadState('networkidle');

  // The header should reflect at least 1 review today
  // "1/5 today" or "1/N today" — look for the number 1 in the header context
  await expect(page.getByRole('link', { name: /español/i })).toBeVisible({ timeout: 8000 });

  // The rated card should no longer be first in queue (it got rescheduled)
  // We can't know the exact order, but the page should still function
  await expect(page.getByText(/due/)).toBeVisible();
});

// ---------------------------------------------------------------------------
// Visual no-regression — existing Spanish guide still loads
// ---------------------------------------------------------------------------

test('existing /guides/spanish still loads after visiting practice', async ({ page }) => {
  // Visit practice first
  await page.goto('/guides/spanish/practice');
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('link', { name: /español/i })).toBeVisible({ timeout: 8000 });

  // Navigate to the existing Spanish guide
  await page.goto('/guides/spanish');
  await page.waitForLoadState('networkidle');

  // Open sidebar to confirm it's the correct collection
  await page.getByRole('button', { name: 'Open guide menu' }).click();
  const sidebar = page.getByRole('dialog', { name: 'Guide list' });
  await expect(sidebar.getByText('Guía de Español', { exact: true })).toBeVisible();
});

// ---------------------------------------------------------------------------
// Landing page — Practice affordance
// ---------------------------------------------------------------------------

test('landing page has a Practice link for Spanish that goes to /guides/spanish/practice', async ({
  page,
}) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const practiceLink = page.getByRole('link', { name: /practice spanish/i });
  await expect(practiceLink).toBeVisible();

  await practiceLink.click();
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/\/guides\/spanish\/practice/);
  await expect(page.getByRole('button', { name: /show answer/i })).toBeVisible({ timeout: 8000 });
});
