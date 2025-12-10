import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { MainPage } from '../pages/main.page.ts';

export class WeltradeWorld extends World {
    public browser: Browser | undefined;
    public context!: BrowserContext;
    public page!: Page;

    public menuItems: string[] = [];
    public currentIndex = 0;

    public constructor(options: IWorldOptions) {
        super(options);
    }

    public get mainPage(): MainPage {
        return new MainPage(this.page);
    }

    // public async initPage(): Promise<void> {
    //     if (!WeltradeWorld.browser) {
    //         WeltradeWorld.browser = await chromium.launch({ headless: false });
    //     }
    //     this.context = await WeltradeWorld.browser.newContext();
    //     this.page = await WeltradeWorld.browser.newPage();
    // }

    public async initPage(): Promise<void> {
        this.browser = await chromium.launch({ headless: false });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    public async closePage(): Promise<void> {
        if (this.page) {
            await this.page.close();
        }
        if (this.context) {
            await this.context.close();
        }
        if (this.browser) {
            await this.browser.close();
        }
    }
}

setWorldConstructor(WeltradeWorld);
