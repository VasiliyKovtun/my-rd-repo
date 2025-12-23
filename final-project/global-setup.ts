import { chromium, Browser } from '@playwright/test';
import fs from 'fs';
import { FophelpLoginPage } from './src/pages/login.page';
import { ConfigService } from './src/services/config.service';

export default async function globalSetup(): Promise<void> {
    const browser: Browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const configService = new ConfigService();
    const loginPage = new FophelpLoginPage(page, configService);

    await loginPage.login(0);

    const path = '.auth/storage-state-0.json';
    if (!fs.existsSync(path)) {
        throw new Error(`StorageState file was not created: ${path}`);
    }

    await browser.close();
}
