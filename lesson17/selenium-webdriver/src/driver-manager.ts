import { Browser, Builder, WebDriver, Locator, WebElementPromise, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export async function getBrowserInstance(): Promise<WebDriver> {
    const options = new chrome.Options();
    options.addArguments(`user-data-dir=${process.cwd()}/chrome-profile`);
    const driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    driver.manage().window().maximize();
    return driver;
}

export async function closeBrowserInstance(driver: WebDriver): Promise<void> {
    await driver.quit();
}

export function getWaitedLocator(driver: WebDriver, locator: Locator, timeout = 10000): WebElementPromise {
    return driver.wait(until.elementLocated(locator), timeout);
}

export function getIntractableLocator(driver: WebDriver, locator: Locator, timeout = 10000): WebElementPromise {
    return driver.wait(until.elementIsVisible(driver.findElement(locator)), timeout);
}
