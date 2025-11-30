import { WebDriver } from 'selenium-webdriver';
import { AtlassianPage } from '../src/pom/atlassian.page';
import { AtlassianHomePage } from '../src/pom/altassian-home.page';
import { closeBrowserInstance, getBrowserInstance } from '../src/driver-manager';
import { expect } from 'chai';

describe('Selenium WebDriver tests', () => {
    let driver: WebDriver;
    let atlassianPage: AtlassianPage;
    let atlassianHomePage: AtlassianHomePage;

    beforeEach(async () => {
        driver = await getBrowserInstance();
        driver.manage().setTimeouts({ implicit: 0 });
        atlassianPage = new AtlassianPage(driver);
        atlassianHomePage = new AtlassianHomePage(driver);
    });

    afterEach(async () => {
        await closeBrowserInstance(driver);
    });

    describe('Login test', () => {
        it('login', async () => {
            await atlassianPage.goto();
            await atlassianPage.login();
            expect(await driver.getCurrentUrl()).to.include('atlassian.com');
        });
    });

    describe('Login test with saved login session', () => {
        it('login', async () => {
            await atlassianHomePage.goto();
            await atlassianHomePage.waitForLoginState();
            await atlassianHomePage.expectWelcomeBanner({ isVisible: true, hasText: 'Welcome, ' });
        });
    });

});
