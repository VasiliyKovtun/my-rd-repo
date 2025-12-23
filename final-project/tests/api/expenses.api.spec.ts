import { test, expect } from '../../src/fixtures/api.fixture';
import { ExpenseV2 } from '../../src/api/models/expense.v2.model';
import { extractExpenseIdFromResponse } from '../../src/api/utils/expense-response.parser';
import { allure } from 'allure-playwright';

test.describe('Expenses API', () => {
    let createdExpenseId: string;
    let createdExpenseAmount = 10;
    let createdExpenseComment = 'added via API test';

    test.beforeEach(() => {
        allure.label('layer', 'api');
        allure.tag('api');
    });

    test('Add expense', async ({ expensesRecord }) => {
        const data = {
            Expense: String(createdExpenseAmount),
            Date: '2025-12-21',
            Comment: createdExpenseComment,
            Currency: 'UAH',
            Cash: false
        };

        const response = await expensesRecord.addExpense(data);
        expect(response.ok()).toBeTruthy();

        const bodyText = await response.text();

        createdExpenseId = extractExpenseIdFromResponse(bodyText);

        expect(createdExpenseId).toBeTruthy();
    });

    test('Get expenses and verify created expense', async ({ expensesRecord }) => {
        const response = await expensesRecord.getAllExpenses();
        expect(response.ok()).toBeTruthy();

        const expenses: ExpenseV2[] = await response.json();

        const createdExpense = expenses.find((expense) => expense.id === createdExpenseId);

        expect(createdExpense).toBeDefined();
        expect(Number(createdExpense!.expense)).toBe(createdExpenseAmount);
        expect(createdExpense!.comment).toBe(createdExpenseComment);
    });

    test('Update expense', async ({ expensesRecord }) => {
        const updatedAmount = 20;
        const updatedComment = 'updated via API test';

        const data = {
            ID: createdExpenseId,
            Expense: String(updatedAmount),
            Date: '2025-12-21',
            Comment: updatedComment,
            Currency: 'UAH',
            Cash: false
        };

        const response = await expensesRecord.updateExpense(data);
        expect(response.ok()).toBeTruthy();

        createdExpenseAmount = updatedAmount;
        createdExpenseComment = updatedComment;
    });

    test('Get expenses and verify updated expense', async ({ expensesRecord }) => {
        const response = await expensesRecord.getAllExpenses();
        expect(response.ok()).toBeTruthy();

        const expenses: ExpenseV2[] = await response.json();

        const createdExpense = expenses.find((expense) => expense.id === createdExpenseId);

        expect(createdExpense).toBeDefined();
        expect(Number(createdExpense!.expense)).toBe(createdExpenseAmount);
        expect(createdExpense!.comment).toBe(createdExpenseComment);
    });

    test('Delete expense', async ({ expensesRecord }) => {
        const data = {
            ID: createdExpenseId,
            Expense: '',
            Date: '',
            Comment: '',
            Currency: '',
            Cash: false
        };

        const response = await expensesRecord.deleteExpense(data);
        expect(response.ok()).toBeTruthy();
    });

    test('Get expenses and verify deleted expense is not present', async ({ expensesRecord }) => {
        const response = await expensesRecord.getAllExpenses();
        expect(response.ok()).toBeTruthy();

        const expenses: ExpenseV2[] = await response.json();

        const createdExpense = expenses.find((expense) => expense.id === createdExpenseId);

        expect(createdExpense).toBeUndefined();
    });
});
