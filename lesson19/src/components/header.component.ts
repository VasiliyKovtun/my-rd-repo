import { expect, Locator } from '@playwright/test';

export class HeaderComponent {
    public constructor(private readonly baseLocator: Locator) {}

    public menuItems = ['Trading', 'Partnership', 'Tools', 'Education', 'Promotions', 'Company'];

    private get signInButton(): Locator {
        return this.baseLocator.locator('#header-login-btn').filter({ visible: true });
    }

    private get signUpButton(): Locator {
        return this.baseLocator.locator('#header-registration-btn').filter({ visible: true });
    }

    private get allMenuItems(): Locator {
        return this.baseLocator.locator('.wt-navList-title');
    }

    private getMenuItem(menuItem: string): Locator {
        return this.baseLocator.locator('[class="wt-navList-title"]', { hasText: menuItem });
    }

    private getSubMenu(menuItem: string): Locator {
        return this.baseLocator.locator('[class="wt-navList-title"]', { hasText: menuItem }).locator('+ [class="wt-navList-subList"]');
    }

    public async hoverMenuItem(menuItem: string): Promise<void> {
        await this.getMenuItem(menuItem).hover();
    }

    public async clickSubMenuItem(menuItem: string): Promise<void> {
        await this.getSubMenu(menuItem).click();
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

}
