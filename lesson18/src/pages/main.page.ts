import { Locator, Page, expect } from '@playwright/test';

export class MainPage {
    public constructor(private page: Page) {}

    public menuItems = ['Trading', 'Partnership', 'Tools', 'Education', 'Promotions', 'Company'];

    public platformsSectionTabs = ['Desktop Platforms', 'Mobile Platforms', 'Web Platforms'];

    private get signInButton(): Locator {
        return this.page.locator('#header-login-btn').filter({ visible: true });
    }

    private get signUpButton(): Locator {
        return this.page.locator('#header-registration-btn').filter({ visible: true });
    }

    private get allMenuItems(): Locator {
        return this.page.locator('.wt-navList-title');
    }

    private get allPlatformsSectionTabs(): Locator {
        return this.page.locator('.tabs .tab');
    }

    private get platformsSectionTitle(): Locator {
        return this.page.locator('.platform-description .text:visible');
    }

    private getMenuItem(menuItem: string): Locator {
        return this.page.locator('[class="wt-navList-title"]', { hasText: menuItem });
    }

    private getSubMenu(menuItem: string): Locator {
        return this.page.locator('[class="wt-navList-title"]', { hasText: menuItem }).locator('+ [class="wt-navList-subList"]');
    }

    public async goToMain(): Promise<void> {
        await this.page.goto('https://www.weltrade.com/');
    }

    public async hoverMenuItem(menuItem: string): Promise<void> {
        await this.getMenuItem(menuItem).hover();
    }

    public async clickSubMenuItem(menuItem: string): Promise<void> {
        await this.getSubMenu(menuItem).click();
    }

    public async clickPlatformsSectionTab(tabName: string): Promise<void> {
        await this.platformsSectionTitle.scrollIntoViewIfNeeded();
        await this.allPlatformsSectionTabs.filter({ hasText: tabName }).click();

    }

    public async checkTitle(text: string): Promise<void> {
        await expect(this.page).toHaveTitle(new RegExp(text));
    }

    public async checkSubMenuVisible(menuItem: string): Promise<void> {
        await expect(this.getSubMenu(menuItem)).toBeVisible();
    }

    public async checkQuantityMenuItems(): Promise<void> {
        await expect(this.allMenuItems).toHaveCount(6);
    }

    public async checkMenuItemsNames(): Promise<void> {
        const menuTexts = (await this.allMenuItems.allTextContents()).map((text) => text.trim().replace(/\s+/g, ''));

        for (const expected of this.menuItems) {
            const cleanedExpected = expected.replace(/\s+/g, '');
            expect(menuTexts).toContain(cleanedExpected);
        }
    }

    public async checkPlatformsSectionTabsName(): Promise<void> {
        const menuTexts = (await this.allPlatformsSectionTabs.allTextContents()).map((text) => text.trim().replace(/\s+/g, ''));

        for (const expected of this.platformsSectionTabs) {
            const cleanedExpected = expected.replace(/\s+/g, '');
            expect(menuTexts).toContain(cleanedExpected);
        }
    }

    public async checkPlatformsSectionTabIsActive(tabName: string): Promise<void> {
        await expect(this.allPlatformsSectionTabs.filter({ hasText: tabName })).toHaveClass(/tab active/);
    }

    public async checkPlatformsSectionTitle(tabName: string): Promise<void> {
        await expect(this.platformsSectionTitle).toContainText(new RegExp(tabName));
    }
}
