import { test } from '../src/fixtures/weltrade.fixture';

test.describe('Expense Tracker App tests', () => {
    test.beforeEach(async ({ mainPage }) => {
        await mainPage.goToMain();
    });

    test('add income', async ({ mainPage }) => {
        await mainPage.enterDescription('Salary');
        await mainPage.enterAmount('1000');
        await mainPage.clickAddButton();
        await mainPage.checkIncomeAmount('1000.00');
        await mainPage.checkBalanceAmount('1000.00');
    });

    test('add expense', async ({ mainPage }) => {
        await mainPage.enterDescription('Groceries');
        await mainPage.enterAmount('-500');
        await mainPage.clickAddButton();
        await mainPage.checkExpenseAmount('500.00');
        await mainPage.checkBalanceAmount('500.00');
    });
});
