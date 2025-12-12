import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { MainPage } from '../pages/main.page.ts';

export class WeltradeWorld extends World {
    public static browser: Browser | undefined;

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
}

setWorldConstructor(WeltradeWorld);
