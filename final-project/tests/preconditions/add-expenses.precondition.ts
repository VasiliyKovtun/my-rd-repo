import { APIRequestContext } from '@playwright/test';
import { ExpensesRecord } from '../../src/api/expenses.record';

export class AddExpensePrecondition {
    private expensesRecord: ExpensesRecord;

    public constructor(private request: APIRequestContext) {
        this.expensesRecord = new ExpensesRecord(request);
    }

    public async addExpense(data: {
        Expense: string | number;
        Date: string;
        Comment: string;
        Currency: string;
        Cash: boolean;
    }): Promise<void> {
        const response = await this.expensesRecord.addExpense(data);

        if (response.status() !== 200) {
            throw new Error(`Failed to add expense. Status: ${response.status()}, Body: ${await response.text()}`);
        }
    }

    public async addExpenses(
        expenses: {
            Expense: string | number;
            Date: string;
            Comment: string;
            Currency: string;
            Cash: boolean;
        }[]
    ): Promise<void> {
        for (const expense of expenses) {
            await this.addExpense(expense);
        }
    }
}
