import { Locator, Page, expect } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';

export class MainPage {
    public readonly headerComponent: HeaderComponent;

    public constructor(
        protected readonly page: Page,
        protected readonly _url = 'https://www.weltrade.com/'
    ) {
        this.headerComponent = new HeaderComponent(this.page.locator('.wt-main-header.shadow.js-header'));
    }

    public platformsSectionTabs = ['Desktop Platforms', 'Mobile Platforms', 'Web Platforms'];

    private get allPlatformsSectionTabs(): Locator {
        return this.page.locator('.tabs .tab');
    }

    private get platformsSectionTitle(): Locator {
        return this.page.locator('.platform-description .text:visible');
    }

    public async goToMain(): Promise<void> {
        await this.page.goto(this._url);
    }

    public async clickPlatformsSectionTab(tabName: string): Promise<void> {
        await this.platformsSectionTitle.scrollIntoViewIfNeeded();
        await this.allPlatformsSectionTabs.filter({ hasText: tabName }).click();

    }

    public async checkTitle(text: string): Promise<void> {
        await expect(this.page).toHaveTitle(new RegExp(text));
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
