import { After, Status } from '@cucumber/cucumber';
import { WeltradeWorld } from '../worlds/weltrade.world.ts';

export function attachResultsHook(): void {

    After(async function (this: WeltradeWorld, { result }) {
        if (!result) return;

        await this.attach(`Status: ${result.status}. Duration: ${result.duration.seconds}s`);

        if (result.status !== Status.PASSED && this.page) {
            const screenshot = await this.page.screenshot();
            await this.attach(screenshot, 'image/png');
        }
    });
}
