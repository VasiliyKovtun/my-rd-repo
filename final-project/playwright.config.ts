import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });
const isCI = !!process.env.CI;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 0 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    // reporter: [['html'], ['allure-playwright'], ['json']],
    timeout: 45000,
    globalTeardown: require.resolve('./tests/ui/global-teardown'),
    globalSetup: './global-setup.ts',
    reporter: [
        ['list'],
        [
            'allure-playwright',
            {
                outputFolder: 'allure-results',
                detail: true,
                suiteTitle: false
            }
        ]
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        headless: isCI,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'retain-on-failure',
        // this will work if the playwright is controlling context and page for you
        // In our case when we use fixture that injects only browser instance and we are creating our own context and page it will not work
        // In that case we should add video recording options during context creation
        video: 'on'
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                headless: isCI,
                viewport: {
                    width: 1680,
                    height: 900
                }
                // storageState: '.auth/storage-state-0.json'
            }
        }

        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] }
        // },

        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] }
        // }

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ]

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
