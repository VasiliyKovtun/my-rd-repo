import { After } from '@cucumber/cucumber';
import { WeltradeWorld } from '../worlds/weltrade.world.ts';

After(async function (this: WeltradeWorld) {
    await this.page?.close();
    await this.context?.close();
});
