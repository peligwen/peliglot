import { test, expect } from '@playwright/test';

/**
 * Smoke tests for the /support (Supporters) page.
 *
 * Verifies:
 * - Page loads and has the correct <title>
 * - The supporter list section is rendered
 * - The donate CTA is an anchor pointing to Ko-fi with target="_blank"
 * - The landing page footer has a link to /support
 */

test('support page: renders correctly with title, supporter list, and donate CTA', async ({ page }) => {
  await page.goto('/support');
  await page.waitForLoadState('networkidle');

  // Title must contain both "Support" and "Peliglot"
  await expect(page).toHaveTitle(/Support/);
  await expect(page).toHaveTitle(/Peliglot/);

  // The main heading should be visible
  await expect(page.getByRole('heading', { name: /Support Peliglot/i, level: 1 })).toBeVisible();

  // The supporters section heading
  await expect(page.getByRole('heading', { name: /People who made this easier/i })).toBeVisible();

  // The placeholder supporter entry should be present
  await expect(page.getByText('Future you')).toBeVisible();

  // The transparency / "no ads" block
  await expect(page.getByText(/No ads/)).toBeVisible();
});

test('support page: donate CTA links to Ko-fi in a new tab (no window.open)', async ({ page }) => {
  await page.goto('/support');
  await page.waitForLoadState('networkidle');

  // The donate button is an <a> — find it by its text content
  const donateLink = page.getByRole('link', { name: /Chip in on Ko-fi/i });
  await expect(donateLink).toBeVisible();

  // Verify it points to Ko-fi (exact username may vary; just verify the domain)
  const href = await donateLink.getAttribute('href');
  expect(href).toMatch(/^https:\/\/ko-fi\.com\//);

  // Must open in a new tab
  const target = await donateLink.getAttribute('target');
  expect(target).toBe('_blank');

  // Must have rel="noopener noreferrer" for security
  const rel = await donateLink.getAttribute('rel');
  expect(rel).toContain('noopener');
});

test('landing page: footer has a Support link pointing to /support', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const footer = page.getByRole('contentinfo');
  const supportLink = footer.getByRole('link', { name: /Support Peliglot/i });
  await expect(supportLink).toBeVisible();

  const href = await supportLink.getAttribute('href');
  expect(href).toBe('/support');
});
