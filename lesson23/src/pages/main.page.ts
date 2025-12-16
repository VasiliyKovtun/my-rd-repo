import { Locator, Page, expect } from '@playwright/test';

export class MainPage {

    public constructor(
        protected readonly page: Page
    ) {}

    private get descriptionField(): Locator {
        return this.page.locator('#description');
    }

    private get amountField(): Locator {
        return this.page.locator('#transactionamount');
    }

    private get incomeAmount(): Locator {
        return this.page.locator('.money.plus');
    }

    private get expenseAmount(): Locator {
        return this.page.locator('.money.minus');
    }

    private get balanceAmount(): Locator {
        return this.page.locator('#balance');
    }

    private get addButton(): Locator {
        return this.page.locator('.btn');
    }

    public async goToMain(): Promise<void> {
        await this.page.goto('/');
    }

    public async enterDescription(description: string): Promise<void> {
        await this.descriptionField.fill(description);
    }

    public async enterAmount(amount: string): Promise<void> {
        await this.amountField.fill(amount);
    }

    public async clickAddButton(): Promise<void> {
        await this.addButton.click();
    }

    public async checkExpenseAmount(expectedAmount: string): Promise<void> {
        await expect(this.expenseAmount).toContainText(expectedAmount);
    }

    public async checkIncomeAmount(expectedAmount: string): Promise<void> {
        await expect(this.incomeAmount).toContainText(expectedAmount);
    }

    public async checkBalanceAmount(expectedAmount: string): Promise<void> {
        await expect(this.balanceAmount).toContainText(expectedAmount);
    }
}
