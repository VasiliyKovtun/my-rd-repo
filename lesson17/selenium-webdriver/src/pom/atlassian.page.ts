import { By, until, WebDriver, WebElementPromise } from 'selenium-webdriver';
import { getWaitedLocator, getIntractableLocator } from '../driver-manager';

export class AtlassianPage {
    private readonly _url = 'https://www.atlassian.com/';

    private get signInButton(): WebElementPromise {
        return getWaitedLocator(this.driver, By.css('button[name="sign-in"]'));
    }

    private get emailInput(): WebElementPromise {
        return getWaitedLocator(this.driver, By.css('#username-uid1'));
    }

    private get continueButton(): WebElementPromise {
        return getWaitedLocator(this.driver, By.id('login-submit'));
    }

    private get passwordInput(): WebElementPromise {
        return getWaitedLocator(this.driver, By.css('#password'));
    }

    private get passwordInputInteract(): WebElementPromise {
        return getIntractableLocator(this.driver, By.css('#password'));
    }

    private get profileIcon(): WebElementPromise {
        return getIntractableLocator(this.driver, By.css('[data-testid="nav-profile-button--trigger"]'));
    }

    public constructor(private readonly driver: WebDriver) {}

    public async goto(): Promise<void> {
        await this.driver.get('https://www.atlassian.com/');
    }

    public async login(): Promise<void> {
        await this.signInButton.click();
        await this.emailInput.sendKeys(process.env.JIRA_LOGIN as string);
        await this.continueButton.click();
        await this.passwordInput;
        await this.passwordInputInteract.sendKeys(process.env.JIRA_PASSWORD as string);
        await this.continueButton.click();
        await this.driver.wait(until.elementLocated(By.css('[data-testid="nav-profile-button--trigger"]')));
        // await this.profileIcon.wait();
    }
}
