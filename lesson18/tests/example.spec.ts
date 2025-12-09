import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://www.weltrade.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/WELTRADE/);
});

test('get started link', async ({ page }) => {
    await page.goto('https://www.weltrade.com/');

    // Click the get started link.
    const platforms = page.locator('[class=tab]', { hasText: 'Mobile Platforms' });
    await platforms.scrollIntoViewIfNeeded();
    await platforms.click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Mobile Platforms' })).toBeVisible();
});
