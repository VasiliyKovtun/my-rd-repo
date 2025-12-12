import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { WeltradeWorld } from './worlds/weltrade.world.ts';

setDefaultTimeout(999999999);
setWorldConstructor(WeltradeWorld);
