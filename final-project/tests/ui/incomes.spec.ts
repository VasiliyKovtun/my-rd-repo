import { allure } from 'allure-playwright';
import { test } from '../../src/fixtures/fophelp.fixture';
import { IncomesPage } from '../../src/pages/incomes.page';
import { DeleteIncomesPrecondition } from 'tests/preconditions/delete-incomes.precondition';
import { AddIncomePrecondition } from 'tests/preconditions/add-incomes.precondition';

test.describe('Incomes UI', { tag: ['@incomes'] }, () => {
    let incomesPage: IncomesPage;

    const defaultIncomes = [
        { Income: '50000', Date: '2025-12-20', Comment: 'add income 50000', Currency: 'UAH', Cash: true },
        { Income: '10000', Date: '2025-12-20', Comment: 'add income 10000', Currency: 'UAH', Cash: true },
        { Income: '55000', Date: '2025-10-20', Comment: 'add income 55000', Currency: 'UAH', Cash: false },
        { Income: '20000', Date: '2025-09-20', Comment: 'add income 20000', Currency: 'UAH', Cash: false },
        { Income: '40000', Date: '2024-12-20', Comment: 'add income 40000', Currency: 'UAH', Cash: false }
    ];

    test.beforeEach(async ({ fophelpPage, configService, apiRequest }, testInfo) => {
        allure.label('layer', 'ui');
        allure.tag('ui');

        const deletePrecondition = new DeleteIncomesPrecondition(apiRequest);
        await deletePrecondition.deleteAllIncomes();

        const hasPrecondition = testInfo.tags.includes('@withAddPrecondition');

        if (hasPrecondition) {
            const addPrecondition = new AddIncomePrecondition(apiRequest);
            await addPrecondition.addIncomes(defaultIncomes);
        }

        incomesPage = new IncomesPage(fophelpPage.pageInstance, configService);
        await incomesPage.goToIncomes();
        await incomesPage.tabsComponent.clickMenuItem('Прибутки');
    });

    test('add incomes and verify adding', async () => {
        await incomesPage.addRecord('20122025', '50000', 'add income 50000');
        await incomesPage.addRecord('20122025', '10000', 'add income 10000');
        await incomesPage.addRecord('20102025', '55000', 'add income 55000');
        await incomesPage.addRecord('20092025', '20000', 'add income 20000');
        await incomesPage.addRecord('20122024', '40000', 'add income 40000');
        await incomesPage.filterComponent.checkResultQuantity('Знайдено: 5 записів');
        await incomesPage.filterComponent.checkSummaryValue('₴175000,00');
        await incomesPage.incomesTablesComponent.checkRecordsCountToContain('грудень 2025 р.', 'Записів: 2');
        await incomesPage.incomesTablesComponent.checkTotalAmountToContain('грудень 2025 р.', '60000');
        await incomesPage.incomesTablesComponent.checkRecordsCountToContain('жовтень 2025 р.', 'Записів: 1');
        await incomesPage.incomesTablesComponent.checkTotalAmountToContain('жовтень 2025 р.', '55000');
        await incomesPage.incomesTablesComponent.checkRecordsCountToContain('вересень 2025 р.', 'Записів: 1');
        await incomesPage.incomesTablesComponent.checkTotalAmountToContain('вересень 2025 р.', '20000');
        await incomesPage.incomesTablesComponent.checkRecordsCountToContain('грудень 2024 р.', 'Записів: 1');
        await incomesPage.incomesTablesComponent.checkTotalAmountToContain('грудень 2024 р.', '40000');
    });

    test('test year filter', { tag: '@withAddPrecondition' }, async () => {
        await incomesPage.filterComponent.setYearFilter('2024');

        await incomesPage.filterComponent.checkResultQuantity('Знайдено: 1 записів');
        await incomesPage.filterComponent.checkSummaryValue('₴40000,00');
        await incomesPage.incomesTablesComponent.checkRecordsCountToContain('грудень 2024 р.', 'Записів: 1');
        await incomesPage.incomesTablesComponent.checkTotalAmountToContain('грудень 2024 р.', '40000');

        await incomesPage.filterComponent.setAllOptionsYearFilter();

        await incomesPage.filterComponent.checkResultQuantity('Знайдено: 5 записів');
        await incomesPage.filterComponent.checkSummaryValue('₴175000,00');
    });

    test('test month filter', { tag: '@withAddPrecondition' }, async () => {
        await incomesPage.filterComponent.setMonthFilter('Грудень');

        await incomesPage.filterComponent.checkResultQuantity('Знайдено: 3 записів');
        await incomesPage.filterComponent.checkSummaryValue('₴100000,00');

        await incomesPage.filterComponent.setMonthFilter('Жовтень');

        await incomesPage.filterComponent.checkResultQuantity('Знайдено: 4 записів');
        await incomesPage.filterComponent.checkSummaryValue('₴155000,00');
        await incomesPage.incomesTablesComponent.checkRecordsCountToContain('грудень 2025 р.', 'Записів: 2');
        await incomesPage.incomesTablesComponent.checkTotalAmountToContain('грудень 2025 р.', '60000');
        await incomesPage.incomesTablesComponent.checkRecordsCountToContain('жовтень 2025 р.', 'Записів: 1');
        await incomesPage.incomesTablesComponent.checkTotalAmountToContain('жовтень 2025 р.', '55000');
        await incomesPage.incomesTablesComponent.checkRecordsCountToContain('грудень 2024 р.', 'Записів: 1');
        await incomesPage.incomesTablesComponent.checkTotalAmountToContain('грудень 2024 р.', '40000');
    });

    test('delete records', { tag: '@withAddPrecondition' }, async () => {
        await incomesPage.incomesTablesComponent.deleteAllIncomesRecords();

        await incomesPage.filterComponent.checkResultQuantity('Знайдено: 0 записів');
        await incomesPage.filterComponent.checkSummaryValue('0.00₴');
        await incomesPage.incomesTablesComponent.checkEmptyStateTable();
    });
});
