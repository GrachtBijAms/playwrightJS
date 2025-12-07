import test, { expect } from "@playwright/test";


const web_url='https://grachtbijams.github.io/playwrightJS/res/testsite.html';

test.beforeAll('---Test Start---',()=>{
    //console.log('---Test Start---')
})

test('navigate',async ({page}) => {
    await page.goto(web_url);

    await expect(page).toHaveTitle('Test Automation Practice Site')    
})


test('Invalid Login',async ({page}) => {
    await page.goto(web_url);

    await expect(page.getByRole("checkbox",{name: 'Remember me'})).toBeChecked({checked:false});
    await page.getByRole('checkbox', { name: 'Remember me' }).check();
    await expect(page.getByRole("checkbox",{name: 'Remember me'})).toBeChecked();

    await page.getByRole('button',{name: 'Login',exact:true}).click();
    const error = page.locator('p[id="login-message"]');
    await expect(error).toHaveText('Invalid credentials.')
})

test.afterAll('---Test End---',()=>{
    //console.log('---Test End---')
})