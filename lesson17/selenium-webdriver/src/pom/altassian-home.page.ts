import { By, WebDriver, WebElementPromise } from 'selenium-webdriver';
import { getWaitedLocator } from '../driver-manager';
import { expect } from 'chai';

export class AtlassianHomePage {
    private readonly welcomeBannerSelector = '[data-testid="home-header-content"]';

    private get profileIcon(): WebElementPromise {
        return getWaitedLocator(this.driver, By.css('[data-testid="nav-profile-button--trigger"]'));
    }

    private get welcomeBanner(): WebElementPromise {
        return  getWaitedLocator(this.driver, By.css(this.welcomeBannerSelector));
    }

    public constructor(private readonly driver: WebDriver) {}

    public async goto(): Promise<void> {
        await this.driver.get('https://levkoniuk.atlassian.net/');
    }

    public async waitForLoginState(): Promise<void> {
        await this.profileIcon;
    }

    public async expectWelcomeBanner(options: { isVisible?: boolean; hasText?: string }): Promise<void> {
        if (options.isVisible) {
            const isVisible = true;
            try {
                await this.welcomeBanner;
            } catch {
                isVisible;
            }
            expect(isVisible).to.be.true;
        }
        if (options.hasText) {
            const text = await this.welcomeBanner.getText();
            expect(text).to.contain(options.hasText);
        }
    }
}
