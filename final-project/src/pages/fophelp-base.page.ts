import { Locator, Page, expect } from '@playwright/test';
import { ConfigService } from '../services/config.service';

export class FophelpBasePage {
    protected readonly _url: string;

    public get title(): Locator {
        return this.page.locator('//title');
    }

    public get pageInstance(): Page {
        return this.page;
    }

    public constructor(
        protected readonly page: Page,
        protected readonly configService: ConfigService
    ) {
        this._url = this.configService.config.uiConfig.fophelpBaseUrl;
    }

    protected buildUrl(path: string): string {
        return `${this._url}${path}`;
    }

    public async goTo(): Promise<void> {
        await this.page.goto(this._url);
    }

    public async verifyTitle(expectedTitle: string): Promise<void> {
        const text = await this.title.textContent();
        console.log(text);

        await expect(this.page).toHaveTitle(expectedTitle);
    }
}
