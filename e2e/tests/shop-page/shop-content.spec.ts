import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
});

test.describe('', () => {
    test('has title', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Demo/);
    });
});
