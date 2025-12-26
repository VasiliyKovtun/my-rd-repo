import { Locator, Page } from '@playwright/test';
import { ConfigService } from '../services/config.service';

export class FophelpLoginPage {
    private readonly _url: string;

    public constructor(
        private readonly page: Page,
        private readonly configService: ConfigService
    ) {
        this._url = this.configService.config.uiConfig.fophelpBaseUrl;
    }

    private get userInfo(): Locator {
        return this.page.locator('.user-info').filter({ visible: true });
    }

    private get signInButton(): Locator {
        return this.page.locator('.nav-button.signin-button').filter({ visible: true });
    }

    private get submitButton(): Locator {
        return this.page.locator('.login-submit-button').filter({ visible: true });
    }

    private get emailInput(): Locator {
        return this.page.locator('#login-email');
    }

    private get passwordInput(): Locator {
        return this.page.locator('#login-password');
    }

    public async gotoLoginPage(): Promise<void> {
        await this.page.goto(this._url);
    }

    public async login(workerId: number): Promise<void> {
        await this.gotoLoginPage();
        await this.signInButton.waitFor();
        await this.signInButton.click();
        await this.emailInput.fill(this.configService.config.auth.login);
        await this.passwordInput.fill(this.configService.config.auth.password);
        await this.submitButton.click();
        await this.userInfo.waitFor({ timeout: 15000 });

        await this.page.context().storageState({ path: `.auth/storage-state-${workerId}.json` });
    }
}
