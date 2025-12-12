import { Locator } from 'playwright';
import { expect } from 'chai';
import DataTable from '@cucumber/cucumber/lib/models/data_table';

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
        return this.getMenuItem(menuItem).locator('+ [class="wt-navList-subList"]');
    }

    public async hoverMenuItem(menuItem: string): Promise<void> {
        await this.getMenuItem(menuItem).hover();
    }

    public async clickSubMenuItem(menuItem: string): Promise<void> {
        await this.getSubMenu(menuItem).click();
    }

    public async checkSubMenuVisible(menuItem: string): Promise<void> {
        const submenu = this.getSubMenu(menuItem);

        await submenu.waitFor({ state: 'visible', timeout: 5000 });

        expect(await submenu.isVisible()).to.be.true;
    }

    public async checkQuantityMenuItems(quantity: number): Promise<void> {
        const count = await this.allMenuItems.count();
        expect(count).to.equal(quantity);
    }

    public async checkMenuItemsNames(table: DataTable): Promise<void> {
        const expectedItems: string[] = table.raw().flat().map(item => item.trim().replace(/\s+/g, ''));

        const menuTexts = (await this.allMenuItems.allTextContents())
            .map(text => text.trim().replace(/\s+/g, ''));

        for (const expected of expectedItems) {
            expect(menuTexts).to.include(expected);
        }
    }
}
