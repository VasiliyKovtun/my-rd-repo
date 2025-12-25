import { Page } from '@playwright/test';
import { ConfigService } from '../services/config.service';
import { FilterComponent, ModalComponent, TablesComponent } from '../components';
import { TabsComponent } from '../components/tabs.component';

export class IncomesPage {
    private readonly _url: string;

    public readonly filterComponent: FilterComponent;
    public readonly modalComponent: ModalComponent;
    public readonly incomesTablesComponent: TablesComponent;
    public readonly tabsComponent: TabsComponent;

    public constructor(
        private readonly page: Page,
        private readonly configService: ConfigService
    ) {
        this._url = this.configService.config.uiConfig.fophelpBaseUrl;
        this.filterComponent = new FilterComponent(this.page.locator('.filters-section'));
        this.modalComponent = new ModalComponent(this.page.locator('.modal-content'));
        this.incomesTablesComponent = new TablesComponent(this.page.locator('.income-table-page'));
        this.tabsComponent = new TabsComponent(this.page.locator('.main-navigation'));
    }

    public async goToIncomes(): Promise<void> {
        await this.page.goto(`${this._url}incomes`);
    }

    public async addRecord(date: string, amount: string, comment: string): Promise<void> {
        await this.filterComponent.clickAddButton();
        await this.modalComponent.fillDate(date);
        await this.modalComponent.fillAmount(amount);
        await this.modalComponent.fillComment(comment);
        await this.modalComponent.clickSubmitButton();
        await this.page.waitForTimeout(500);
    }
}
