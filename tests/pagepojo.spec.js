import {test,expect, chromium} from '@playwright/test';
import {CommonPOJO} from '../pages/commonpojo'

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

test('Verify page structure using POJO', async ({browser}) => {

    //setting the resolution
    const context = await browser.newContext({
        viewport:{width:1280,height:720},
        recordVideo:{dir:'videos/'}
    });
    const page = await context.newPage();

    const pojo = new CommonPOJO(page);
    await pojo.goto();
    await pojo.verifyHeader();
    await pojo.newwindow();

    await context.close();
    await page.close();
})  


test.skip('test', async ({  }) => {

    // browser
    const browser = await chromium.launch({headless:true,slowMo:1000});
    //setting the resolution
    const context = await browser.newContext({
        viewport:{width:1280,height:720},
        recordVideo:{dir:'videos/'}
    });
    const page = await context.newPage();
  
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');

    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await context.close();
    await page.close();


});




test('Multiple Windows11', async ({ browser }) => {
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  let page;
  try {
    page = await context.newPage();
    const pojo = new CommonPOJO(page);

    await pojo.goto();
    await pojo.verifyHeader();
    //await pojo.newwindow();

    // Fixed: Await Promise.all with proper event & longer timeout
    const [newpage] = await Promise.all([
      context.waitForEvent('page'),
      pojo.newwindow()
    ]);
    
    await newpage.waitForLoadState('networkidle');
    // Your assertions here
    await expect(newpage).toHaveTitle("Google");
    const cookieBanner = newpage.getByRole("button", { name: "Alles accepteren" }).or(newpage.getByRole("button", { name: "Accept all" }));
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click();
    }
    const searchBtn = newpage.getByRole("button", { name: "Google zoeken" }).or(newpage.getByRole("button", { name: "Google Search" }));
    await expect(searchBtn).toBeVisible();
    
 

    const [newpage1] = await Promise.all([
      context.waitForEvent('page'),
      pojo.selwindow(),
    ]);
    await expect(newpage1).toHaveTitle("Selenium");

  } finally {

    if (page) await page.close();
    await context.close();
  }
});
