import { expect } from '@playwright/test';


export class CommonPOJO {

    constructor(page) { 
        this.page = page;
        this.header = page.locator('h1');
        this.loginSection = page.locator('id=login-section');
        this.footer = page.locator('id=new-window-section');
        this.newwindowbtn = page.locator("#open-new-window-btn");
        this.selewindow = page.locator('//button[text()="Open Selenium.dev Window"]');
    }

    async verifyHeader() {
        await expect(this.header).toBeVisible();
        await expect(this.header).toHaveText('Test Automation Practice Site');
    }

    async goto() {
        await this.page.goto('https://grachtbijams.github.io/playwrightJS/res/testsite.html');
    }

    async newwindow(){
        await expect(this.newwindowbtn).toHaveText("Open New Window");
        await this.newwindowbtn.click();
  
    }
    async selwindow(){
        await expect(this.newwindowbtn).toHaveText("Open New Window");
        await this.selewindow.click();
    }
}   
