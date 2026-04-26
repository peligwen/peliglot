import { test, expect } from '@playwright/test';

/**
 * Parameterized smoke tests for all 10 guide collections.
 *
 * Each test:
 *  1. Navigates to /guides/{slug}
 *  2. Opens the sidebar (hamburger button)
 *  3. Asserts the sidebar shows the expected sidebarTitle
 *  4. Clicks the second guide button in the sidebar list
 *  5. Asserts the URL hash changed to #1
 *     — useGuideNavigation calls history.pushState(null, null, '#' + page) on
 *       user-initiated navs, so clicking guide 2 (index 1) updates the hash
 *       to #1. The URL path does NOT change; only the hash changes.
 */

const collections = [
  { slug: 'spanish',       sidebarTitle: 'Guía de Español' },
  { slug: 'arabic',        sidebarTitle: 'العربية' },
  { slug: 'english',       sidebarTitle: 'American English' },
  { slug: 'german',        sidebarTitle: 'Deutsch' },
  { slug: 'hawaiian',      sidebarTitle: 'ʻŌlelo Hawaiʻi' },
  { slug: 'music',         sidebarTitle: 'Music Theory' },
  { slug: 'jazz-guitar',   sidebarTitle: 'Jazz Guitar' },
  { slug: 'math',          sidebarTitle: 'Math' },
  { slug: 'ai-interaction', sidebarTitle: 'AI Interaction' },
  { slug: 'freecad',       sidebarTitle: 'FreeCAD' },
];

for (const { slug, sidebarTitle } of collections) {
  test(`${slug}: sidebar renders and guide navigation works`, async ({ page }) => {
    // Ensure a clean localStorage state to avoid leftover page index from previous test runs
    await page.addInitScript(() => {
      try { localStorage.clear(); } catch { /* ignore */ }
    });

    await page.goto(`/guides/${slug}`);
    await page.waitForLoadState('networkidle');

    // Initially on guide 1; URL should contain #0 (or no hash — hook sets it on mount)
    // Open the sidebar via the hamburger button
    await page.getByRole('button', { name: 'Open guide menu' }).click();

    // The sidebar is a dialog with aria-label="Guide list"
    const sidebar = page.getByRole('dialog', { name: 'Guide list' });

    // Assert the sidebarTitle is visible inside the sidebar
    // (scoped to sidebar to avoid matching cross-link labels with the same text)
    await expect(sidebar.getByText(sidebarTitle, { exact: true })).toBeVisible();

    // Guide items are <button> elements with no aria-label.
    // The search input is <input type="text"> (not a button).
    // With no search term active there is no "Clear search" button in the DOM.
    // So every sidebar button is a guide-list item: nth(0) = guide 1, nth(1) = guide 2.
    await sidebar.getByRole('button').nth(1).click();

    // After clicking guide 2, the hook calls history.pushState to '#1'
    // and closes the sidebar. Assert the URL hash is now #1.
    await expect(page).toHaveURL(/#1$/);

    // Also assert the page counter in the top bar updated to "2/N"
    // (the aria-label on the guide counter badge updates to "Guide 2 of N guides")
    await expect(page.getByLabel(/Guide 2 of \d+ guides/)).toBeVisible();

    // Assert per-route <title> contains both the collection name and "Peliglot"
    await expect(page).toHaveTitle(new RegExp(sidebarTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    await expect(page).toHaveTitle(/Peliglot/);
  });
}

// ---------------------------------------------------------------------------
// Landing page meta checks
// ---------------------------------------------------------------------------
test('landing page: <title> and <meta description> are set correctly', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveTitle(/Peliglot/);
  await expect(page).toHaveTitle(/Interactive learning guides/);

  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description).toContain('No ads, no accounts');
});
