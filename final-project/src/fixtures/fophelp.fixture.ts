import { APIRequestContext, test as base, Browser, request } from '@playwright/test';
import { FophelpPage } from '../pages/fophelp.page';
import { FophelpLoginPage } from '../pages/login.page';
import fs from 'fs';
import { ConfigService } from '../services/config.service';

import { getApiBaseUrl } from '../../config';

interface WorkerFixtures {
    authState: string;
}

interface TestFixtures {
    fophelpPage: FophelpPage;
    configService: ConfigService;
    apiRequest: APIRequestContext;
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

    // eslint-disable-next-line no-empty-pattern
    apiRequest: async ({}, use) => {
        const context = await request.newContext({
            baseURL: getApiBaseUrl(),
            storageState: storageStatePath // <<< ключевой фикс
        });

        await use(context);
        await context.dispose();
    },

    configService: async ({ browserName }, use) => {
        console.log(browserName);
        const configService = new ConfigService();
        await use(configService);
    }
});

async function authenticateFophelp(browser: Browser, storagePath: string): Promise<void> {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new FophelpLoginPage(page, new ConfigService());
    await loginPage.login(0);

    await context.storageState({ path: storagePath });
    await context.close();
}
