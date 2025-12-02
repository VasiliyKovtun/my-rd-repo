import { test as base } from '@playwright/test';
import { MainPage } from '../pages/main.page';

export const test = base.extend<{
    mainPage: MainPage;
}>({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage);
    }
});

export const expect = test.expect;
