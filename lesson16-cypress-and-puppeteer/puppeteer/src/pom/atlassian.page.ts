import { Locator, Page } from 'puppeteer';

export class AtlassianPage {
    private get signInButton(): Locator<Element> {
        return this.page.locator('button[name="sign-in"]');
    }

    private get emailInput(): Locator<Element> {
        return this.page.locator('#username-uid1');
    }

    private get continueButton(): Locator<Element> {
        return this.page.locator('#login-submit');
    }

    private get passwordInput(): Locator<Element> {
        return this.page.locator('#password');
    }

    private get profileIcon(): Locator<Element> {
        return this.page.locator('[data-testid="nav-profile-button--trigger"]');
    }

    public constructor(private readonly page: Page) {}

    public async goto(): Promise<void> {
        await this.page.goto('https://www.atlassian.com/', { waitUntil: 'domcontentloaded' });
    }

    public async login(): Promise<void> {
        await this.signInButton.click();
        await this.emailInput.fill(process.env.JIRA_LOGIN as string);
        await this.continueButton.click();
        await this.passwordInput.fill(process.env.JIRA_PASSWORD as string);
        await this.continueButton.click();
        await this.profileIcon.wait();
    }
}
