import { Dialog, expect, Locator, Page } from '@playwright/test';

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

        const cleanHeader = headerText.replace(/\s*р\.?\s*$/, '').trim();

        return this.baseLocator.locator('.month-group').filter({
            has: this.page.locator('.month-header').filter({
                // search: cleanHeader, case-insensitive
                hasText: new RegExp(cleanHeader, 'i')
            })
        });
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

        try {
            await deleteButtons.first().waitFor({ state: 'visible', timeout: 3000 });
        } catch {
            return;
        }

        let count = await deleteButtons.count();
        while (count > 0) {
            const handleDialog = async (dialog: Dialog): Promise<void> => {
                await dialog.accept();
            };

            this.page.once('dialog', handleDialog);

            await deleteButtons.first().click();

            await expect(deleteButtons).toHaveCount(count - 1);

            count = await deleteButtons.count();
            if (count === 0) break;
        }
    }

    public async deleteAllExpensesRecords(): Promise<void> {
        const deleteButtons = this.expensesDeleteButton;

        try {
            await deleteButtons.first().waitFor({ state: 'visible', timeout: 3000 });
        } catch {
            return;
        }

        let count = await deleteButtons.count();
        while (count > 0) {
            const handleDialog = async (dialog: Dialog): Promise<void> => {
                await dialog.accept();
            };

            this.page.once('dialog', handleDialog);

            await deleteButtons.first().click();

            await expect(deleteButtons).toHaveCount(count - 1);

            count = await deleteButtons.count();
            if (count === 0) break;
        }
    }

    public async checkRecordsCountToContain(headerText: string, expectedText: string): Promise<void> {
        const locator = this.recordsCountForGroup(headerText);

        await expect(async () => {
            await expect(locator).toBeVisible();
            await expect(locator).toContainText(expectedText);
        }).toPass({ timeout: 15000 });
    }

    public async checkTotalAmountToContain(headerText: string, expectedText: string): Promise<void> {
        const locator = this.totalAmountForGroup(headerText);

        await expect(async () => {
            await expect(locator).toBeVisible();
            const rawText = await locator.textContent() ?? '';
            const cleanText = rawText.replace(/[\s\u00a0]/g, '');
            const cleanExpected = expectedText.replace(/[\s\u00a0]/g, '');
            expect(cleanText).toContain(cleanExpected);
        }).toPass({
            timeout: 15000
        });
    }

    public async checkEmptyStateTable(): Promise<void> {
        await expect(this.emptyState).toBeVisible();
    }
}
