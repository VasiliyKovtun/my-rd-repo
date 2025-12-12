import { AfterAll } from '@cucumber/cucumber';
import { WeltradeWorld } from '../worlds/weltrade.world.ts';

AfterAll(async function () {
    await WeltradeWorld.browser?.close();
});
