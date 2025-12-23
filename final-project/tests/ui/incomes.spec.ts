import { allure } from 'allure-playwright';
import { test } from '../../src/fixtures/fophelp.fixture';
import { IncomesPage } from '../../src/pages/incomes.page';

test.describe('Incomes UI', { tag: ['@incomes'] }, () => {
    let incomesPage: IncomesPage;

    test.beforeAll(async ({ fophelpPage, configService }) => {
        incomesPage = new IncomesPage(fophelpPage.pageInstance, configService);

        await incomesPage.goToIncomes();
        await incomesPage.tabsComponent.clickMenuItem('Прибутки');

        await incomesPage.incomesTablesComponent.deleteAllIncomesRecords();
    });

    test.beforeEach(() => {
        allure.label('layer', 'ui');
        allure.tag('ui');
    });

    test.beforeEach(async ({ fophelpPage, configService }) => {
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

    test('test year filter', async () => {
        await incomesPage.filterComponent.setYearFilter('2024');

        await incomesPage.filterComponent.checkResultQuantity('Знайдено: 1 записів');
        await incomesPage.filterComponent.checkSummaryValue('₴40000,00');
        await incomesPage.incomesTablesComponent.checkRecordsCountToContain('грудень 2024 р.', 'Записів: 1');
        await incomesPage.incomesTablesComponent.checkTotalAmountToContain('грудень 2024 р.', '40000');

        await incomesPage.filterComponent.setAllOptionsYearFilter();

        await incomesPage.filterComponent.checkResultQuantity('Знайдено: 5 записів');
        await incomesPage.filterComponent.checkSummaryValue('₴175000,00');
    });

    test('test month filter', async () => {
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

    test('delete records', async () => {
        await incomesPage.incomesTablesComponent.deleteAllIncomesRecords();

        await incomesPage.filterComponent.checkResultQuantity('Знайдено: 0 записів');
        await incomesPage.filterComponent.checkSummaryValue('0.00₴');
        await incomesPage.incomesTablesComponent.checkEmptyStateTable();
    });
});
