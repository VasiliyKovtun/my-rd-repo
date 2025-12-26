import { Locator } from '@playwright/test';

export class TabsComponent {
    public constructor(private readonly baseLocator: Locator) {}

    private menuItem(name: string): Locator {
        return this.baseLocator.locator('.nav-link', { hasText: name });
    }

    private subMenuItem(menuName: string, subMenuName: string): Locator {
        return this.menuItem(menuName).locator('.dropdown-item', { hasText: subMenuName });
    }

    public async clickMenuItem(name: string): Promise<void> {
        await this.menuItem(name).click();
    }

    public async clickSubMenuItem(menuName: string, subMenuName: string): Promise<void> {
        await this.subMenuItem(menuName, subMenuName).click();
    }
}
