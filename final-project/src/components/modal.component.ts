import { Locator, expect, Page } from '@playwright/test';

export class ModalComponent {
    public constructor(private readonly baseLocator: Locator) {}

    private page(): Page {
        return this.baseLocator.page();
    }

    private get dateField(): Locator {
        return this.baseLocator.locator('#date');
    }

    private get amountField(): Locator {
        return this.baseLocator.locator('#amount');
    }

    private get commentField(): Locator {
        return this.baseLocator.locator('#comment');
    }

    private get submitButton(): Locator {
        return this.baseLocator.locator('.btn.btn-primary');
    }

    private get cancelButton(): Locator {
        return this.baseLocator.locator('.btn.btn-secondary');
    }

    public async fillDate(date: string): Promise<void> {
        await this.dateField.waitFor({ state: 'visible' });

        await this.dateField.click();
        const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
        await this.page().keyboard.press(`${modifier}+A`);
        await this.page().keyboard.press('Backspace');

        const digitsOnly = date.replace(/\D/g, '');

        await this.dateField.pressSequentially(digitsOnly, { delay: 150 });
        await this.dateField.press('Tab');
    }

    public async fillAmount(amount: string): Promise<void> {
        await this.amountField.waitFor({ state: 'visible' });
        await this.amountField.fill(amount);
    }

    public async fillComment(comment: string): Promise<void> {
        await this.commentField.fill(comment);
    }

    public async clickSubmitButton(): Promise<void> {
        await expect(this.submitButton).toBeEnabled({ timeout: 5000 });
        await this.submitButton.click();
        await this.baseLocator.waitFor({ state: 'hidden' });
    }

    public async clickCancelButton(): Promise<void> {
        await this.cancelButton.click();
        await this.baseLocator.waitFor({ state: 'hidden' });
    }
}
