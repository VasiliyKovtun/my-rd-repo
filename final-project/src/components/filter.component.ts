import { expect, Locator } from '@playwright/test';

export class FilterComponent {
    public constructor(private readonly baseLocator: Locator) {}

    private get addButton(): Locator {
        return this.baseLocator.locator('.add-button');
    }

    private get yearFilter(): Locator {
        return this.baseLocator.locator('.filter-group.year-filter');
    }

    private get monthFilter(): Locator {
        return this.baseLocator.locator('.filter-group.month-filter');
    }

    private get groupingFilter(): Locator {
        return this.baseLocator.locator('.filter-group.grouping-filter');
    }

    private get selectAllOption(): Locator {
        return this.baseLocator.locator('.select-all-option');
    }

    private selectOption(name: string): Locator {
        return this.baseLocator.locator('.select-option label', { hasText: name });
    }

    private selectOptionGroupingFilter(name: string): Locator {
        return this.baseLocator.locator('.select-option', { hasText: name });
    }

    private get summaryValue(): Locator {
        return this.baseLocator.locator('.summary-value');
    }

    private get resultCount(): Locator {
        return this.baseLocator.locator('.results-count-header');
    }

    public async setYearFilter(name: string): Promise<void> {
        await this.yearFilter.click();
        const option = this.selectOption(name);
        await option.click();
        await this.yearFilter.click();
    }

    public async setMonthFilter(name: string): Promise<void> {
        await this.monthFilter.click();
        const option = this.selectOption(name);
        await option.click();
        await this.monthFilter.click();
    }

    public async setGroupingFilter(name: string): Promise<void> {
        await this.groupingFilter.click();
        await this.selectOptionGroupingFilter(name).click();
    }

    public async setAllOptionsYearFilter(): Promise<void> {
        await this.yearFilter.click();
        await this.selectAllOption.click();
        await this.yearFilter.click();
    }

    public async setAllOptionsMonthFilter(): Promise<void> {
        await this.monthFilter.click();
        await this.selectAllOption.click();
        await this.monthFilter.click();
    }

    public async clickAddButton(): Promise<void> {
        await this.addButton.click();
    }

    public async checkResultQuantity(quantity: string): Promise<void> {
        await expect(this.resultCount).toHaveText(quantity);
    }

    public async checkSummaryValue(value: string): Promise<void> {
        const locator: Locator = this.summaryValue;
        let text = (await locator.textContent()) ?? '';
        text = text.replace(/\s/g, '');
        await expect(text).toContain(value.toString());
    }
}
