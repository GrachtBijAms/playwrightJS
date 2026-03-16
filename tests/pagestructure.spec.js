import {test, expect} from '@playwright/test';
const { CommonPOJO } = require('../pages/commonpojo');

const web_url = 'https://grachtbijams.github.io/playwrightJS/res/testsite.html';

test('Verify page structure', async ({page}) => {
    await page.goto(web_url);
    // Verify the header
    await expect(page.getByRole('button')).toHaveCount(23);
    await expect.soft(page.getByRole('button').first()).toHaveText('Login');
    await expect(page).toHaveTitle('Test Automation Practice Site');
    await expect(page).toHaveURL('https://grachtbijams.github.io/playwrightJS/res/testsite.html');

    const header = page.locator('h1');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Test Automation Practice Site');

    // Verify the main content
    const main = page.locator('id=login-section');
    await expect(main).toBeVisible();
    await expect(main.locator('h2')).toHaveText('Login Form');
    await expect(main.getByRole('button', { name: 'Login' })).toBeVisible();
    await main.getByRole('button', { name: 'Login' }).click();
    await expect(main.locator('id=login-message')).toHaveText('Invalid credentials.');
    await expect(main.getByRole('button')).toHaveCount(1);

    // Verify the footer
    const footer = page.locator('id=new-window-section');
    await expect(footer).toBeVisible();
    await expect(footer.locator('h2')).toHaveText('New Window Example');
})  

test('Verify page structure using POJO', async ({page}) => {

    const commonPOJO = new CommonPOJO(page);
    await commonPOJO.goto();
    await commonPOJO.verifyHeader();
})  