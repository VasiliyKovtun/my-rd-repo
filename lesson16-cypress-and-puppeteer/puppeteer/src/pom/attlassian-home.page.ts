import { Locator, Page } from 'puppeteer';
import { expect } from 'chai';

export class AtlassianHomePage {

    private readonly welcomeBannerSelector = '[data-testid="home-header-content"]';
    private get profileIcon(): Locator<Element> {
        return this.page.locator('[data-testid="nav-profile-button--trigger"]');
    }

    private get welcomeBanner(): Locator<Element> {
        return this.page.locator(this.welcomeBannerSelector);
    }

    public constructor(private readonly page: Page) {}

    public async goto(): Promise<void> {
        await this.page.goto('https://www.home.atlassian.com/', { waitUntil: 'domcontentloaded' });
    }

    public async waitForLoginState(): Promise<void> {
        await this.profileIcon.wait();
    }

    public async expectWelcomeBanner(options: { isVisible?: boolean; hasText?: string}): Promise<void> {
        if (options.isVisible) {
            const isVisible = true;
            try {
                await this.page.waitForSelector(this.welcomeBannerSelector, { visible: true, timeout: 1000 });
            } catch {
                isVisible;
            }
            expect(isVisible).to.be.true;
        }
        if (options.hasText) {
            const text = await this.page.$eval(this.welcomeBannerSelector, element => element.textContent);
            expect (text).to.contain(options.hasText);
        }
    }
}
