import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { WeltradeWorld } from '../../worlds/weltrade.world.ts';

Given('user goes to weltrade main page', async function (this: WeltradeWorld) {
    await this.mainPage.goToMain();
});

Then('the title of page contains {string}', async function (this: WeltradeWorld, title: string) {
    await this.mainPage.checkTitle(title);
});

Then('the header menu contains {int} items', async function (this: WeltradeWorld, quantity: number) {
    await this.mainPage.headerComponent.checkQuantityMenuItems(quantity);
});

Then('the header menu items are:', async function (this: WeltradeWorld, table: DataTable) {
    await this.mainPage.headerComponent.checkMenuItemsNames(table);
});

When('the user hovers the following menu items in header:', async function (this: WeltradeWorld, table: DataTable) {
    this.menuItems = table.raw().flat();
    this.currentIndex = 0;

    await this.mainPage.headerComponent.hoverMenuItem(`${this.menuItems[this.currentIndex]}`);
});

Then('the corresponding submenus should be displayed', async function (this: WeltradeWorld) {

    for (let i = 0; i < this.menuItems.length; i++) {
        const menuItem = this.menuItems[i];

        await this.mainPage.headerComponent.checkSubMenuVisible(menuItem);

        if (i + 1 < this.menuItems.length) {
            this.currentIndex++;
            await this.mainPage.headerComponent.hoverMenuItem(`${this.menuItems[this.currentIndex]}`);
        }
    }
});

When('the user scrolls to the platforms section', async function (this: WeltradeWorld) {
    await this.mainPage.scrollIntoView(this.mainPage.platformsSectionTitle);
});

Then('the following tabs should be present in the platforms section:', async function (this: WeltradeWorld, table: DataTable) {
    this.menuItems = table.raw().flat();
    this.currentIndex = 0;

    await this.mainPage.checkPlatformsSectionTabsName(table);
});

Then('the content of {string} tab should be displayed', async function (this: WeltradeWorld, tabName: string) {

    await this.mainPage.checkPlatformsSectionTitle(tabName);
});

When('the user clicks the following tabs in the platforms section:', async function (this: WeltradeWorld, table: DataTable) {
    this.menuItems = table.raw().flat();
    this.currentIndex = 0;

    await this.mainPage.clickPlatformsSectionTab(`${this.menuItems[this.currentIndex]}`);
});

Then('the corresponding tab should be active and its content should be displayed', async function (this: WeltradeWorld) {

    for (let i = 0; i < this.menuItems.length; i++) {
        const menuItem = this.menuItems[i];

        await this.mainPage.checkPlatformsSectionTabIsActive(menuItem);
        await this.mainPage.checkPlatformsSectionTitle(menuItem);

        if (i + 1 < this.menuItems.length) {
            this.currentIndex++;
            await this.mainPage.clickPlatformsSectionTab(`${this.menuItems[this.currentIndex]}`);
        }
    }
});
