import { Before } from '@cucumber/cucumber';
import { WeltradeWorld } from '../worlds/weltrade.world.ts';

Before(async function (this: WeltradeWorld) {
    await this.initPage();
    await this.mainPage.goToMain();
});
