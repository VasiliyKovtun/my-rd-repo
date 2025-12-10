import { Locator, Page } from 'playwright';
import { expect } from 'chai';
import { HeaderComponent } from '../components/header.component.ts';
import DataTable from '@cucumber/cucumber/lib/models/data_table';

export class MainPage {
    public readonly headerComponent: HeaderComponent;

    public constructor(
        protected readonly page: Page,
        protected readonly _url = 'https://www.weltrade.com/'
    ) {
        this.headerComponent = new HeaderComponent(this.page.locator('.wt-main-header.shadow.js-header'));
    }

    private get allPlatformsSectionTabs(): Locator {
        return this.page.locator('.tabs .tab');
    }

    public get platformsSectionTitle(): Locator {
        return this.page.locator('.platform-description .text:visible');
    }

    public async goToMain(): Promise<void> {
        await this.page.goto(this._url);
    }

    public async clickPlatformsSectionTab(tabName: string): Promise<void> {
        await this.platformsSectionTitle.scrollIntoViewIfNeeded();
        await this.allPlatformsSectionTabs.filter({ hasText: tabName }).click();
    }

    public async scrollIntoView(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }

    public async checkTitle(text: string): Promise<void> {
        const title = await this.page.title();
        expect(title).to.match(new RegExp(text, 'i'));
    }

    public async checkPlatformsSectionTabsName(table: DataTable): Promise<void> {
        const expectedItems: string[] = table
            .raw()
            .flat()
            .map((item) => item.trim().replace(/\s+/g, ''));

        const tabsItems = (await this.allPlatformsSectionTabs.allTextContents()).map((text) => text.trim().replace(/\s+/g, ''));

        for (const expected of expectedItems) {
            expect(tabsItems).to.include(expected);
        }
    }

    public async checkPlatformsSectionTabIsActive(tabName: string): Promise<void> {
        const tab = this.allPlatformsSectionTabs.filter({ hasText: tabName });
        const classAttr = await tab.getAttribute('class');
        expect(classAttr).to.match(/tab active/);
    }

    public async checkPlatformsSectionTitle(tabName: string): Promise<void> {
        expect(await this.platformsSectionTitle.textContent()).to.match(new RegExp(tabName));
    }
}
