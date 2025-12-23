import { test as base, request, APIRequestContext, expect as baseExpect } from '@playwright/test';
import { IncomeRecord } from '../api/incomes.record';
import { ExpensesRecord } from '../api/expenses.record';
import { getApiBaseUrl } from '../../config';

interface TestFixtures {
    apiRequest: APIRequestContext;
    incomeRecord: IncomeRecord;
    expensesRecord: ExpensesRecord;
}

export const test = base.extend<TestFixtures>({
    // eslint-disable-next-line no-empty-pattern
    apiRequest: async ({}, use) => {
        const baseURL = getApiBaseUrl();

        const context = await request.newContext({
            baseURL,
            storageState: '.auth/storage-state-0.json'
        });

        await use(context);
        await context.dispose();
    },

    incomeRecord: async ({ apiRequest }, use) => {
        await use(new IncomeRecord(apiRequest));
    },

    expensesRecord: async ({ apiRequest }, use) => {
        await use(new ExpensesRecord(apiRequest));
    }
});

export { baseExpect as expect };
