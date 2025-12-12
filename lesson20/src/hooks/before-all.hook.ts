import { BeforeAll } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { WeltradeWorld } from '../worlds/weltrade.world.ts';

BeforeAll(async function () {
    WeltradeWorld.browser = await chromium.launch({ headless: false });
});
