import { test, expect } from '../../src/fixtures/api.fixture';
import { IncomeV2 } from '../../src/api/models/income.v2.model';
import { extractIncomeIdFromResponse } from '../../src/api/utils/income-response.parser';
import { allure } from 'allure-playwright';

test.describe('01 - Incomes API', () => {
    let createdIncomeId: string;
    let createdIncomeAmount = 10;
    let createdIncomeComment = 'added via API test';

    test.beforeEach(() => {
        allure.label('layer', 'api');
        allure.tag('api');
    });

    test('Add income', async ({ incomeRecord }) => {
        const data = {
            Income: String(createdIncomeAmount),
            Date: '2025-12-21',
            Comment: createdIncomeComment,
            Currency: 'UAH',
            Cash: false
        };

        const response = await incomeRecord.addIncome(data);
        expect(response.ok()).toBeTruthy();

        const bodyText = await response.text();

        createdIncomeId = extractIncomeIdFromResponse(bodyText);

        expect(createdIncomeId).toBeTruthy();
    });

    test('Get incomes and verify created income', async ({ incomeRecord }) => {
        const response = await incomeRecord.getAllIncomes();
        expect(response.ok()).toBeTruthy();

        const incomes: IncomeV2[] = await response.json();

        const createdIncome = incomes.find((income) => income.id === createdIncomeId);

        expect(createdIncome).toBeDefined();
        expect(Number(createdIncome!.income)).toBe(createdIncomeAmount);
        expect(createdIncome!.comment).toBe(createdIncomeComment);
    });

    test('Update income', async ({ incomeRecord }) => {
        const updatedAmount = 20;
        const updatedComment = 'updated via API test';

        const data = {
            ID: createdIncomeId,
            Income: String(updatedAmount),
            Date: '2025-12-21',
            Comment: updatedComment,
            Currency: 'UAH',
            Cash: false
        };

        const response = await incomeRecord.updateIncome(data);
        expect(response.ok()).toBeTruthy();

        createdIncomeAmount = updatedAmount;
        createdIncomeComment = updatedComment;
    });

    test('Get incomes and verify updated income', async ({ incomeRecord }) => {
        const response = await incomeRecord.getAllIncomes();
        expect(response.ok()).toBeTruthy();

        const incomes: IncomeV2[] = await response.json();

        const createdIncome = incomes.find((income) => income.id === createdIncomeId);

        expect(createdIncome).toBeDefined();
        expect(Number(createdIncome!.income)).toBe(createdIncomeAmount);
        expect(createdIncome!.comment).toBe(createdIncomeComment);
    });

    test('Delete income', async ({ incomeRecord }) => {
        const data = {
            ID: createdIncomeId,
            Income: '',
            Date: '',
            Comment: '',
            Currency: '',
            Cash: false
        };

        const response = await incomeRecord.deleteIncome(data);
        expect(response.ok()).toBeTruthy();
    });

    test('Get incomes and verify deleted income is not present', async ({ incomeRecord }) => {
        const response = await incomeRecord.getAllIncomes();
        expect(response.ok()).toBeTruthy();

        const incomes: IncomeV2[] = await response.json();

        const createdIncome = incomes.find((income) => income.id === createdIncomeId);

        expect(createdIncome).toBeUndefined();
    });
});
