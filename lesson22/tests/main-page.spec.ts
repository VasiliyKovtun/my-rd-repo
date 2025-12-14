import { test, expect } from '../src/fixtures/weltrade.fixture';

test.describe('Main menu tests', () => {
    test.beforeEach(async ({ mainPage }) => {
        await mainPage.goToMain();
    });

    test('header menu contains correct items', async ({ mainPage }) => {
        await mainPage.headerComponent.checkQuantityMenuItems();
        await mainPage.headerComponent.checkMenuItemsNames();
    });

    test('Hover menu shows submenu', async ({ mainPage }) => {
        await mainPage.headerComponent.hoverMenuItem('Company');

        expect(await mainPage.headerComponent.checkSubMenuVisible('Company'));
    });

    test('Tabs in platforms section', async ({ mainPage }) => {
        await mainPage.checkPlatformsSectionTitle('Desktop Platforms');

        await mainPage.clickPlatformsSectionTab('Mobile Platforms');

        await mainPage.checkPlatformsSectionTitle('Mobile Platforms');
        await mainPage.checkPlatformsSectionTabIsActive('Mobile Platforms');

        await mainPage.clickPlatformsSectionTab('Web Platforms');

        await mainPage.checkPlatformsSectionTitle('Web Platforms');
        await mainPage.checkPlatformsSectionTabIsActive('Web Platforms');

        await mainPage.clickPlatformsSectionTab('Desktop Platforms');

        await mainPage.checkPlatformsSectionTitle('Desktop Platforms');
        await mainPage.checkPlatformsSectionTabIsActive('Desktop Platforms');
    });
});
