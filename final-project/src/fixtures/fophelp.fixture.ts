import { test as base, Browser } from '@playwright/test';
import { FophelpPage } from '../pages/fophelp.page';
import { FophelpLoginPage } from '../pages/login.page';
import fs from 'fs';
import { ConfigService } from '../services/config.service';

interface WorkerFixtures {
    authState: string;
}

interface TestFixtures {
    fophelpPage: FophelpPage;
    configService: ConfigService;
}

const storageStatePath = '.auth/storage-state-0.json';

export const test = base.extend<TestFixtures, WorkerFixtures>({
    authState: [
        async ({ browser }, use) => {
            if (!fs.existsSync(storageStatePath)) {
                await authenticateFophelp(browser, storageStatePath);
            }
            await use(storageStatePath);
        },
        { scope: 'worker' }
    ],

    fophelpPage: async ({ browser, configService }, use) => {
        const context = await browser.newContext({
            storageState: storageStatePath,
            recordVideo: { dir: 'test-results/videos' }
        });

        const page = await context.newPage();
        const fophelpPage = new FophelpPage(page, configService);

        await use(fophelpPage);

        await context.close();
    },

    configService: async ({ browserName }, use) => {
        console.log(browserName);
        const configService = new ConfigService();
        await use(configService);
    }
});

async function authenticateFophelp(browser: Browser, path: string): Promise<void> {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new FophelpLoginPage(page, new ConfigService());
    await loginPage.login(0);

    await context.storageState({ path });
    await context.close();
}
