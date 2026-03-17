import { expect } from '@playwright/test';


class CommonPOJO {

    constructor(page) {
        this.page = page;
        this.header = page.locator('h1');
        this.loginSection = page.locator('id=login-section');
        this.footer = page.locator('id=new-window-section');
    }

    async verifyHeader() {
        await expect(this.header).toBeVisible();
        await expect(this.header).toHaveText('Test Automation Practice Site');
    }

    async goto() {
        await this.page.goto('https://grachtbijams.github.io/playwrightJS/res/testsite.html');
    }
}   

module.exports = { CommonPOJO };