import { Locator } from '@playwright/test';

export class ModalComponent {
    public constructor(private readonly baseLocator: Locator) {}

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

    public async fillDate(quantity: string): Promise<void> {
        await this.dateField.waitFor({ state: 'visible' });
        await this.dateField.click({ delay: 100 });
        await this.dateField.type(quantity, { delay: 100 });
    }

    public async fillAmount(amount: string): Promise<void> {
        await this.amountField.fill(amount);
    }

    public async fillComment(comment: string): Promise<void> {
        await this.commentField.fill(comment);
    }

    public async clickSubmitButton(): Promise<void> {
        await this.submitButton.click();
        await this.baseLocator.waitFor({ state: 'hidden' });
    }

    public async clickCancelButton(): Promise<void> {
        await this.cancelButton.click();
        await this.baseLocator.waitFor({ state: 'hidden' });
    }
}
