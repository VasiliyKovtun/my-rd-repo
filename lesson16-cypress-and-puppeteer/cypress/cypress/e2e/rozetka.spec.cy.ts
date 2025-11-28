import { RozetkaPage } from '../pom/rozetka.page';

describe('searching and sorting', () => {
    let page: RozetkaPage;

    beforeEach(() => {
        page = new RozetkaPage();
        page.goTo();
    });

    it('search and search results', function () {
        page.enterSearchRequest('iphone 17');
        page.clickSearchResultPreview('iphone air');
        page.checkSetFilters('iphone air');
        page.checkSetFilters('Apple');
        page.checkSetFilters('Очистити всі');
        page.checkTitlesContainText('iphone air');
    });

    it('sorting', function () {
        page.enterSearchRequest('iphone 17');
        page.clickSearchResultPreview('iphone air');
        page.selectSort('cheap');
        page.checkSelectedSortOption('cheap');
        page.checkPriceIsLowerThanNext();
    });
});
