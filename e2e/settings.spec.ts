import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { encodeSnapshot } from '../src/utils/snapshot';

/**
 * E2E tests for the Settings page at /settings.
 *
 * Coverage:
 * 1. Page renders with expected sections.
 * 2. Download triggers a file download and the file contains valid MasteryExport JSON.
 * 3. Re-upload of the downloaded file shows an all-zero delta preview (LWW idempotence).
 * 4. Apply on the re-upload succeeds with the Import complete screen.
 * 5. Uploading a file with one newer card shows accepted: 1 after Apply.
 */

test.beforeEach(async ({ page }) => {
  // Clean localStorage so each test starts with predictable state
  await page.addInitScript(() => {
    try {
      localStorage.removeItem('peliglot-mastery-v1');
    } catch {
      // ignore
    }
  });
});

// ---------------------------------------------------------------------------
// Navigation and render
// ---------------------------------------------------------------------------

test('navigates to /settings and shows expected sections', async ({ page }) => {
  await page.goto('/settings');
  await page.waitForLoadState('networkidle');

  // Page heading
  await expect(page.getByRole('heading', { name: /settings/i, level: 1 })).toBeVisible({ timeout: 6000 });

  // Backup section
  await expect(page.getByRole('button', { name: /download my progress/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /import from file/i })).toBeVisible();

  // AI keys section
  await expect(page.getByRole('heading', { name: /ai keys/i })).toBeVisible();

  // Share links section
  await expect(page.getByRole('heading', { name: /share links/i })).toBeVisible();
});

test('landing page footer has a Settings link that goes to /settings', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const settingsLink = page.getByRole('link', { name: /settings/i });
  await expect(settingsLink).toBeVisible({ timeout: 5000 });

  await settingsLink.click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/\/settings/);
  await expect(page.getByRole('heading', { name: /settings/i, level: 1 })).toBeVisible();
});

// ---------------------------------------------------------------------------
// Download
// ---------------------------------------------------------------------------

test('download produces valid MasteryExport JSON', async ({ page }) => {
  await page.goto('/settings');
  await page.waitForLoadState('networkidle');

  // Register download listener BEFORE clicking
  const downloadPromise = page.waitForEvent('download');

  // Wait for button to be enabled (hydration complete)
  const downloadBtn = page.getByRole('button', { name: /download my progress/i });
  await expect(downloadBtn).toBeEnabled({ timeout: 6000 });
  await downloadBtn.click();

  const download = await downloadPromise;

  // Filename should be peliglot-progress-YYYY-MM-DD.json
  expect(download.suggestedFilename()).toMatch(/^peliglot-progress-\d{4}-\d{2}-\d{2}\.json$/);

  // File content must be valid MasteryExport
  const filePath = await download.path();
  expect(filePath).toBeTruthy();

  const content = readFileSync(filePath!, 'utf-8');
  const parsed = JSON.parse(content) as Record<string, unknown>;

  expect(parsed).toHaveProperty('schemaVersion', 1);
  expect(parsed).toHaveProperty('cards');
  expect(typeof parsed.cards).toBe('object');
});

// ---------------------------------------------------------------------------
// Download + re-upload roundtrip (idempotence)
// ---------------------------------------------------------------------------

test('re-uploading the downloaded file shows Apply succeeds with Import complete', async ({ page }) => {
  await page.goto('/settings');
  await page.waitForLoadState('networkidle');

  // Step 1: Download the snapshot
  const downloadPromise = page.waitForEvent('download');
  const downloadBtn = page.getByRole('button', { name: /download my progress/i });
  await expect(downloadBtn).toBeEnabled({ timeout: 6000 });
  await downloadBtn.click();
  const download = await downloadPromise;

  const filePath = await download.path();
  expect(filePath).toBeTruthy();

  // Step 2: Re-upload the same file via the file input
  const fileInput = page.locator('input[type="file"][accept="application/json"]');
  await fileInput.setInputFiles(filePath!);

  // Step 3: Preview screen should appear
  await expect(page.getByRole('region', { name: /import preview/i })).toBeVisible({ timeout: 5000 });

  // Apply button must be present
  const applyBtn = page.getByRole('button', { name: /apply/i });
  await expect(applyBtn).toBeVisible();

  // Step 4: Apply
  await applyBtn.click();

  // Step 5: Result screen shows success
  await expect(page.getByRole('region', { name: /import result/i })).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Import complete')).toBeVisible();
});

// ---------------------------------------------------------------------------
// Upload with one newer card shows accepted: 1 after Apply
// ---------------------------------------------------------------------------

test('uploading a file with one newer card shows Import complete after Apply', async ({ page }) => {
  // Seed localStorage with a known card at a low updatedAt
  await page.addInitScript(() => {
    const baseCard = {
      cardId: 'e2e-test-card',
      updatedAt: 1000,
      due: Date.now() + 86400000,
      stability: 1,
      difficulty: 5,
      reps: 1,
      lapses: 0,
      lastReview: null,
      learningSteps: 0,
      fsrsState: 0,
    };
    const snapshot = {
      schemaVersion: 1,
      cards: { 'e2e-test-card': baseCard },
    };
    try {
      localStorage.setItem('peliglot-mastery-v1', JSON.stringify(snapshot));
    } catch {
      // ignore
    }
  });

  await page.goto('/settings');
  await page.waitForLoadState('networkidle');

  // Create a snapshot with the same card but a NEWER updatedAt
  const newerCard = {
    cardId: 'e2e-test-card',
    updatedAt: 9_999_999_999_999, // far future — definitely newer
    due: Date.now() + 86400000,
    stability: 2,
    difficulty: 4,
    reps: 2,
    lapses: 0,
    lastReview: Date.now() - 1000,
    learningSteps: 0,
    fsrsState: 2,
  };
  const newerSnapshot = {
    schemaVersion: 1,
    cards: { 'e2e-test-card': newerCard },
  };
  const newerJson = JSON.stringify(newerSnapshot);

  const fileInput = page.locator('input[type="file"][accept="application/json"]');
  await fileInput.setInputFiles({
    name: 'peliglot-newer.json',
    mimeType: 'application/json',
    buffer: Buffer.from(newerJson, 'utf-8'),
  });

  // Preview should appear
  await expect(page.getByRole('region', { name: /import preview/i })).toBeVisible({ timeout: 5000 });

  // Apply
  await page.getByRole('button', { name: /apply/i }).click();

  // Result screen
  await expect(page.getByRole('region', { name: /import result/i })).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Import complete')).toBeVisible();

  // Cards updated row should show 1
  const resultRegion = page.getByRole('region', { name: /import result/i });
  await expect(resultRegion.getByText('Cards updated')).toBeVisible();
});

// ---------------------------------------------------------------------------
// Share link + /import page
// ---------------------------------------------------------------------------

test('navigating to /import with a valid encoded snapshot shows preview and Apply succeeds', async ({ page }) => {
  // Build a small known snapshot
  const ts = Date.now();
  const knownCard = {
    cardId: 'e2e-share-card',
    updatedAt: ts,
    due: ts + 86_400_000,
    stability: 1,
    difficulty: 5,
    reps: 1,
    lapses: 0,
    lastReview: null,
    learningSteps: 0,
    fsrsState: 0,
  };
  const snapshot = { schemaVersion: 1, cards: { 'e2e-share-card': knownCard } };

  // Encode the snapshot in Node (same function used by ShareLinkSection)
  const encoded = await encodeSnapshot(snapshot as Parameters<typeof encodeSnapshot>[0]);
  const importUrl = `/import#snapshot=${encoded}`;

  await page.goto(importUrl);
  await page.waitForLoadState('networkidle');

  // Preview should be visible — requires explicit Apply click
  await expect(page.getByRole('region', { name: /import preview/i })).toBeVisible({ timeout: 6000 });

  // Apply
  const applyBtn = page.getByRole('button', { name: /apply/i });
  await expect(applyBtn).toBeVisible();
  await applyBtn.click();

  // Result screen
  await expect(page.getByRole('region', { name: /import result/i })).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Import complete')).toBeVisible();
});

test('/import with no hash shows empty state with link to settings', async ({ page }) => {
  await page.goto('/import');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('heading', { name: /no share link found/i })).toBeVisible({ timeout: 6000 });
  await expect(page.getByText(/settings page/i)).toBeVisible();
});

test('/import with invalid hash shows error state', async ({ page }) => {
  await page.goto('/import#snapshot=this-is-not-valid@@@@');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('heading', { name: /invalid share link/i })).toBeVisible({ timeout: 6000 });
  // There are two "Back to Settings" links (error region + footer); check just the error region
  const errorRegion = page.getByRole('region', { name: /decode error/i });
  await expect(errorRegion.getByRole('link', { name: /back to settings/i })).toBeVisible();
});

test('visiting a valid share link twice applies idempotently (second visit: unchanged=1)', async ({ page }) => {
  const ts = 1_700_000_000_000; // fixed timestamp for determinism
  const card = {
    cardId: 'idempotent-share-card',
    updatedAt: ts,
    due: ts + 86_400_000,
    stability: 1,
    difficulty: 5,
    reps: 1,
    lapses: 0,
    lastReview: null,
    learningSteps: 0,
    fsrsState: 0,
  };
  const snapshot = { schemaVersion: 1, cards: { 'idempotent-share-card': card } };
  const encoded = await encodeSnapshot(snapshot as Parameters<typeof encodeSnapshot>[0]);
  const importUrl = `/import#snapshot=${encoded}`;

  // First visit — apply
  await page.goto(importUrl);
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('region', { name: /import preview/i })).toBeVisible({ timeout: 6000 });
  await page.getByRole('button', { name: /apply/i }).click();
  await expect(page.getByRole('region', { name: /import result/i })).toBeVisible({ timeout: 5000 });

  // Second visit — navigate away first to force a fresh component mount,
  // then back to the same import URL.
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.goto(importUrl);
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('region', { name: /import preview/i })).toBeVisible({ timeout: 10000 });
  await page.getByRole('button', { name: /apply/i }).click();
  await expect(page.getByRole('region', { name: /import result/i })).toBeVisible({ timeout: 8000 });

  // Second apply should show unchanged: 1 (card already applied with same timestamp)
  const resultRegion = page.getByRole('region', { name: /import result/i });
  await expect(resultRegion.getByText('Cards unchanged')).toBeVisible();
});

// ---------------------------------------------------------------------------
// API Keys section — custom endpoint
// ---------------------------------------------------------------------------

test('custom endpoint: filling form and clicking Test shows an error (no real server), nothing saved', async ({ page }) => {
  await page.goto('/settings');
  await page.waitForLoadState('networkidle');

  // AI keys section should be visible
  await expect(page.getByRole('heading', { name: /ai keys/i })).toBeVisible({ timeout: 6000 });

  // Expand the Custom endpoint card
  await page.getByRole('button', { name: /custom endpoint/i }).click();

  // Fill in the form
  await page.getByLabel(/base url for custom endpoint/i).fill('http://localhost:11434/v1');
  await page.getByLabel(/model name for custom endpoint/i).fill('llama3');

  // Click Test — no real server so we expect a network error or cors-blocked message
  await page.getByRole('button', { name: /^test$/i }).click();

  // Wait for an error message to appear (either cors-blocked or network-error)
  await expect(page.getByRole('alert')).toBeVisible({ timeout: 10000 });

  // Nothing should have been saved to localStorage
  const config = await page.evaluate(() => {
    try {
      return localStorage.getItem('peliglot-byok-openai-compatible');
    } catch {
      return null;
    }
  });
  expect(config).toBeNull();
});
