import { Before } from '@cucumber/cucumber';
import { WeltradeWorld } from '../worlds/weltrade.world.ts';

Before(async function (this: WeltradeWorld) {
    if (!WeltradeWorld.browser) {
        throw new Error('Browser is not initialized. Did BeforeAll run?');
    }
    this.context = await WeltradeWorld.browser.newContext();
    this.page = await this.context.newPage();
});
