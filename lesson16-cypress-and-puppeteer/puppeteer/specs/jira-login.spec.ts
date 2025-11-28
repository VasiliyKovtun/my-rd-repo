import { expect } from 'chai';
import { after, describe } from 'mocha';
import { Browser, BrowserContext, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import { AtlassianPage } from '../src/pom/atlassian.page';
import { restoreSession, saveSession } from 'src/state-management';
import * as dotenv from 'dotenv';
import { AtlassianHomePage } from '../src/pom/attlassian-home.page';

describe('This is a set of our first tests', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let atlassianPage: AtlassianPage;
    dotenv.config();

    before(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: {width: 1200, height: 800}
        });
    });

    beforeEach(async () => {
        context = await browser.createBrowserContext();
        page = await context.newPage();
        page.setDefaultTimeout(30000);
        atlassianPage = new AtlassianPage(page);
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    after(async () => {
        await browser.close();
    });

    describe('Login test', () => {
        it('login', async () => {
            await atlassianPage.goto();
            await atlassianPage.login();
            expect(page.url()).to.include('atlassian.com');
            await saveSession(context);
        });
    });

    describe('Login test with saved login session', () => {
        it('login', async () => {
            await page.close();
            context = await restoreSession(context);
            page = await context.newPage();
            const atlassianHomePage = new AtlassianHomePage(page);
            await atlassianHomePage.goto();
            await atlassianHomePage.waitForLoginState();
            await atlassianHomePage.expectWelcomeBanner({ isVisible: true, hasText: 'Welcome, ' });
        });
    });

});
