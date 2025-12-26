import { APIRequestContext } from '@playwright/test';
import { ExpensesRecord } from '../../src/api/expenses.record';

export class DeleteExpensesPrecondition {
    private expensesRecord: ExpensesRecord;

    public constructor(private request: APIRequestContext) {
        this.expensesRecord = new ExpensesRecord(request);
    }

    public async deleteAllExpenses(): Promise<void> {
        const response = await this.expensesRecord.getAllExpenses();
        const responseData = await response.json();

        const expenses = Array.isArray(responseData)
            ? responseData
            : (responseData.data || responseData.items || []);

        if (expenses.length === 0) {
            console.log('No expenses found to delete.');
            return;
        }

        for (const expense of expenses) {
            const expenseId = expense.ID || expense.id;

            if (expenseId === undefined) {
                console.error('Received expense object without ID:', expense);
                continue;
            }

            const deleteResponse = await this.expensesRecord.deleteExpense({
                ID: expenseId,
                Cash: true
            });

            if (deleteResponse.status() !== 200) {
                throw new Error(
                    `Failed to delete expense with ID ${expenseId}. Status: ${deleteResponse.status()}, Body: ${await deleteResponse.text()}`
                );
            }
        }
        console.log(`Successfully deleted ${expenses.length} expenses.`);
    }
}
