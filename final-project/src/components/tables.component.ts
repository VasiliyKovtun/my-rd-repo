import { expect, Locator, Page } from '@playwright/test';

export class TablesComponent {
    public readonly page: Page;
    private readonly root: Locator;

    public constructor(private readonly baseLocator: Locator) {
        this.root = baseLocator;
        this.page = this.root.page();
    }

    private get incomesTableComponent(): Locator {
        return this.baseLocator.locator('.income-table-container');
    }

    private get expensesTableComponent(): Locator {
        return this.baseLocator.locator('.expenses-table-container');
    }

    private get emptyState(): Locator {
        return this.baseLocator.locator('.empty-state');
    }

    private get firstIncomeButton(): Locator {
        return this.baseLocator.locator('.add-first-income-btn');
    }

    private get firstExpenseButton(): Locator {
        return this.baseLocator.locator('.add-first-expense-btn');
    }

    public get expensesDeleteButton(): Locator {
        return this.expensesTableComponent.locator('.action-btn.delete-btn');
    }

    public get incomesDeleteButton(): Locator {
        return this.incomesTableComponent.locator('.action-btn.delete-btn');
    }

    private monthGroupByHeader(headerText: string): Locator {
        return this.baseLocator.locator('.month-group').filter({ hasText: headerText });
    }

    public recordsCountForGroup(headerText: string): Locator {
        return this.monthGroupByHeader(headerText).locator('.records-count');
    }

    public totalAmountForGroup(headerText: string): Locator {
        return this.monthGroupByHeader(headerText).locator('.total-amount');
    }

    public deleteButtonByAmount(headerText: string, amountText: string): Locator {
        const group = this.monthGroupByHeader(headerText);
        return group.locator('tr', { has: group.locator('.amount-cell', { hasText: amountText }) }).locator('.action-btn.delete-btn');
    }

    public async clickDeleteByAmount(headerText: string, amountText: string): Promise<void> {
        const btn = this.deleteButtonByAmount(headerText, amountText);
        await btn.click();
    }

    public async deleteAllIncomesRecords(): Promise<void> {
        const deleteButtons = this.incomesDeleteButton;
        await deleteButtons
            .first()
            .waitFor({
                state: 'visible',
                timeout: 2000
            })
            .catch(() => {
                return;
            });
        const count = await deleteButtons.count();

        if (count === 0) return;

        for (let i = 0; i < count; i++) {
            this.page.once('dialog', async (dialog) => {
                await dialog.accept();
            });

            await deleteButtons.first().click();
            await expect(deleteButtons).toHaveCount(count - i - 1);
        }
    }

    public async deleteAllExpensesRecords(): Promise<void> {
        const deleteButtons = this.expensesDeleteButton;
        await deleteButtons
            .first()
            .waitFor({
                state: 'visible',
                timeout: 2000
            })
            .catch(() => {
                return;
            });
        const count = await deleteButtons.count();

        if (count === 0) return;

        for (let i = 0; i < count; i++) {
            this.page.once('dialog', async (dialog) => {
                await dialog.accept();
            });

            await deleteButtons.first().click();
            await expect(deleteButtons).toHaveCount(count - i - 1);
        }
    }

    public async checkRecordsCountToContain(headerText: string, expectedText: string): Promise<void> {
        await expect(this.recordsCountForGroup(headerText)).toContainText(expectedText);
    }

    public async checkTotalAmountToContain(headerText: string, expectedText: string): Promise<void> {
        const locator: Locator = this.totalAmountForGroup(headerText);

        let text = (await locator.textContent()) ?? '';
        text = text.replace(/\s/g, '');

        expect(text).toContain(expectedText.toString());
    }

    public async checkEmptyStateTable(): Promise<void> {
        await expect(this.emptyState).toBeVisible();
    }
}
