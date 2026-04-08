import { test, expect } from '@playwright/test';

test('Verify page load', async ({ page }) => {
  // Navigate to the root route
  await page.goto('http://localhost:3000/');

  await page.waitForTimeout(2000);

  // Verify that the page loads properly without breaking
  await expect(page.locator('body')).toBeVisible();

  await page.screenshot({ path: '/home/jules/verification/screenshots/full-page-success.png' });
});