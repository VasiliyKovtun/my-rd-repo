import { allure } from 'allure-playwright';
import { test } from '../../src/fixtures/fophelp.fixture';
import { ExpensesPage } from '../../src/pages/expenses.page';
import { DeleteExpensesPrecondition } from 'tests/preconditions/delete-expenses.precondition';
import { AddExpensePrecondition } from 'tests/preconditions/add-expenses.precondition';

test.describe('Expenses UI', { tag: ['@expenses'] }, () => {
    let expensesPage: ExpensesPage;

    const defaultExpenses = [
        { Expense: '50000', Date: '2025-12-20', Comment: 'add expense 50000', Currency: 'UAH', Cash: true },
        { Expense: '10000', Date: '2025-12-20', Comment: 'add expense 10000', Currency: 'UAH', Cash: true },
        { Expense: '55000', Date: '2025-10-20', Comment: 'add expense 55000', Currency: 'UAH', Cash: false },
        { Expense: '20000', Date: '2025-09-20', Comment: 'add expense 20000', Currency: 'UAH', Cash: false },
        { Expense: '40000', Date: '2024-12-20', Comment: 'add expense 40000', Currency: 'UAH', Cash: false }
    ];

    test.beforeEach(async ({ fophelpPage, configService, apiRequest }, testInfo) => {
        allure.label('layer', 'ui');
        allure.tag('ui');

        const deletePrecondition = new DeleteExpensesPrecondition(apiRequest);
        await deletePrecondition.deleteAllExpenses();

        const hasPrecondition = testInfo.tags.includes('@withAddPrecondition');

        if (hasPrecondition) {
            const addPrecondition = new AddExpensePrecondition(apiRequest);
            await addPrecondition.addExpenses(defaultExpenses);
        }

        expensesPage = new ExpensesPage(fophelpPage.pageInstance, configService);
        await expensesPage.goToExpenses();
        await expensesPage.tabsComponent.clickMenuItem('Витрати');
    });

    test('add expenses and verify adding', async () => {
        await expensesPage.addRecord('20122025', '50000', 'add expense 50000');
        await expensesPage.addRecord('20122025', '10000', 'add expense 10000');
        await expensesPage.addRecord('20102025', '55000', 'add expense 55000');
        await expensesPage.addRecord('20092025', '20000', 'add expense 20000');
        await expensesPage.addRecord('20122024', '40000', 'add expense 40000');
        await expensesPage.filterComponent.checkResultQuantity('Знайдено: 5 записів');
        await expensesPage.filterComponent.checkSummaryValue('₴175000,00');
        await expensesPage.expensesTablesComponent.checkRecordsCountToContain('грудень 2025 р.', 'Записів: 2');
        await expensesPage.expensesTablesComponent.checkTotalAmountToContain('грудень 2025 р.', '60000');
        await expensesPage.expensesTablesComponent.checkRecordsCountToContain('жовтень 2025 р.', 'Записів: 1');
        await expensesPage.expensesTablesComponent.checkTotalAmountToContain('жовтень 2025 р.', '55000');
        await expensesPage.expensesTablesComponent.checkRecordsCountToContain('вересень 2025 р.', 'Записів: 1');
        await expensesPage.expensesTablesComponent.checkTotalAmountToContain('вересень 2025 р.', '20000');
        await expensesPage.expensesTablesComponent.checkRecordsCountToContain('грудень 2024 р.', 'Записів: 1');
        await expensesPage.expensesTablesComponent.checkTotalAmountToContain('грудень 2024 р.', '40000');
    });

    test('test year filter', { tag: '@withAddPrecondition' }, async () => {

        await expensesPage.filterComponent.setYearFilter('2024');
        await expensesPage.filterComponent.checkResultQuantity('Знайдено: 1 записів');
        await expensesPage.filterComponent.checkSummaryValue('₴40000,00');
        await expensesPage.expensesTablesComponent.checkRecordsCountToContain('грудень 2024 р.', 'Записів: 1');
        await expensesPage.expensesTablesComponent.checkTotalAmountToContain('грудень 2024 р.', '40000');

        await expensesPage.filterComponent.setAllOptionsYearFilter();

        await expensesPage.filterComponent.checkResultQuantity('Знайдено: 5 записів');
        await expensesPage.filterComponent.checkSummaryValue('₴175000,00');
    });

    test('test month filter', { tag: '@withAddPrecondition' }, async () => {

        await expensesPage.filterComponent.setMonthFilter('Грудень');
        await expensesPage.filterComponent.checkResultQuantity('Знайдено: 3 записів');
        await expensesPage.filterComponent.checkSummaryValue('₴100000,00');

        await expensesPage.filterComponent.setMonthFilter('Жовтень');

        await expensesPage.filterComponent.checkResultQuantity('Знайдено: 4 записів');
        await expensesPage.filterComponent.checkSummaryValue('₴155000,00');
        await expensesPage.expensesTablesComponent.checkRecordsCountToContain('грудень 2025 р.', 'Записів: 2');
        await expensesPage.expensesTablesComponent.checkTotalAmountToContain('грудень 2025 р.', '60000');
        await expensesPage.expensesTablesComponent.checkRecordsCountToContain('жовтень 2025 р.', 'Записів: 1');
        await expensesPage.expensesTablesComponent.checkTotalAmountToContain('жовтень 2025 р.', '55000');
        await expensesPage.expensesTablesComponent.checkRecordsCountToContain('грудень 2024 р.', 'Записів: 1');
        await expensesPage.expensesTablesComponent.checkTotalAmountToContain('грудень 2024 р.', '40000');
    });

    test('delete records', { tag: '@withAddPrecondition' }, async () => {

        await expensesPage.expensesTablesComponent.deleteAllExpensesRecords();
        await expensesPage.filterComponent.checkResultQuantity('Знайдено: 0 записів');
        await expensesPage.filterComponent.checkSummaryValue('0.00₴');
        await expensesPage.expensesTablesComponent.checkEmptyStateTable();
    });
});
