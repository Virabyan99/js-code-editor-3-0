import { test, expect } from '@playwright/test';

test.describe('Two-Panel Layout', () => {
  test('displays panels and icons correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Left Panel')).toBeVisible();
    await expect(page.getByText('Right Panel')).toBeVisible();
    await expect(page.getByRole('button', { name: /interactive icon/i })).toHaveCount(8);
  });

  test('resizes panels on drag', async ({ page }) => {
    await page.goto('/');
    const divider = page.getByRole('separator', { name: /resize panels/i });
    const leftPanel = page.getByText('Left Panel').locator('..');

    // Initial width
    const initialWidth = await leftPanel.evaluate((el) => el.clientWidth);

    // Drag divider to the right
    await divider.dragTo(divider, { targetPosition: { x: 100, y: 0 } });
    const newWidth = await leftPanel.evaluate((el) => el.clientWidth);
    expect(newWidth).toBeGreaterThan(initialWidth);
  });

  test('applies hover effects to icons', async ({ page }) => {
    await page.goto('/');
    const icon = page.getByRole('button', { name: /interactive icon/i }).first();

    await icon.hover();
    await expect(icon).toHaveCSS('background-color', 'rgb(0, 0, 0)');
    await expect(icon.locator('svg')).toHaveCSS('color', 'rgb(255, 255, 255)');
  });

  test('hides divider on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.goto('/');
    const divider = page.getByRole('separator', { name: /resize panels/i });
    await expect(divider).not.toBeVisible();
  });
});
