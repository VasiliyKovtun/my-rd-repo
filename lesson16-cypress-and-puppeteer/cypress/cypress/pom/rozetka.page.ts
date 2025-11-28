export class RozetkaPage {

    private searchField(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow> | undefined
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('[data-testid="search-suggest-input"]', options);
    }

    private searchResult(searchResult: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('[data-testid="search-suggest-records"] li').contains(searchResult);
    }

    private setFilters(setFilter: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('[data-testid="selected-filter-item"]').contains(setFilter);
    }

    private itemsTitles(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('[data-testid="category_goods"] .tile-title.black-link.text-base');
    }

    private itemsPrice(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('rz-catalog-goods div rz-product-tile .price.text-2xl.color-red');
    }

    private sort(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#sort');
    }

    private sortOption(sortValue: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(`#sort option[value="${sortValue}"]`);
    }

    public itemIdOnList(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('[data-testid="category_goods"] .item:nth-of-type(1) .g-id');
    }

    public firstItemOnList(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('[data-testid="category_goods"] .item:nth-of-type(1) .tile-image-host');
    }

    public goTo(): void {
        cy.visit('https://rozetka.com.ua/');
        this.searchField({ timeout: 10000 }).should('be.visible');
    }

    public enterSearchRequest(searchRequest: string): void {
        this.searchField().type(searchRequest);
    }

    public clickSearchResultPreview(searchRequest: string): void {
        this.searchResult(searchRequest).click();
    }

    public clickFirstItemOnList(): void {
        this.firstItemOnList().click();
    }

    public getItemsTitles(): Cypress.Chainable<string[]> {
        const titles: string[] = [];
        return this.itemsTitles().each(($el) =>
            cy.wrap($el)
                .invoke('text')
                .then((text) => titles.push(text.trim()))
        ).then(() => titles);
    }

    public getItemsPrices(): Cypress.Chainable<number[]> {
        const prices: number[] = [];

        return this.itemsPrice()
            .each(($el) => {
                cy.wrap($el)
                    .invoke('text')
                    .then((text) => {
                        const clean = text
                            .replace(/[^\d]/g, '');

                        const num = Number(clean);

                        prices.push(num);
                    });
            })
            .then(() => prices);
    }

    public selectSort(sortValue: string): void {
        this.sort().click();
        this.sortOption(sortValue).click();
    }

    public checkSetFilters(filterName: string): void {
        this.setFilters(filterName).should('be.visible');
    }

    public checkSelectedSortOption(sortValue: string): void {
        this.sort().should('have.value', sortValue);
    }

    public checkTitlesContainText(expectedText: string): void {
        this.itemsTitles().each(($el) => {
            cy.wrap($el).invoke('text').should('contain', expectedText);
        });
    }

    public checkPriceIsLowerThanNext(): void {
        this.getItemsPrices().then((prices) => {

            for (let i = 0; i < prices.length - 1; i++) {
                const current = prices[i];
                const next = prices[i + 1];

                expect(current, `Price at index ${i} should be ≤ next price`)
                    .to.be.at.most(next);
            }

        });
    }
}
