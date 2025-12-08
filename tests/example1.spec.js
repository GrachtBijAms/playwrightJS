import test, { expect } from "@playwright/test";


const web_url='https://grachtbijams.github.io/playwrightJS/res/testsite.html';

test.beforeAll('---Test Start---',()=>{
    //console.log('---Test Start---')
})

test('Navigate to the site',async ({page}) => {
    await page.goto(web_url);
    // Verify title of the webiste
    await expect(page).toHaveTitle('Test Automation Practice Site')    
})


test('Invalid Login',async ({page}) => {
    await page.goto(web_url);

    // store element in a variable and find by role
    const rem_chk = page.getByRole("checkbox",{name: 'Remember me'});
    await expect(rem_chk).toBeChecked({checked:false});
    await rem_chk.check();
    await expect(rem_chk).toBeChecked();

    await page.getByRole('button',{name: 'Login',exact:true}).click();
    // using locator to find element
    const error = page.locator('p[id="login-message"]');
    await expect(error).toHaveText('Invalid credentials.')
})

test('Forgot password',async ({page}) => {
    await page.goto(web_url);
    await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();

    //listner to handle dialog alert boxes before click
    page.on('dialog',async (dialog) => {
        // mention the dialog type
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toContain('Password reset link sent!');
        await dialog.accept(); 
    })

    //await page.getByRole('link',{name: 'Forgot password?'}).click();
    await page.locator('a:has-text("Forgot password?")').click();

})


test('valid Login',async ({page}) => {
    await page.goto(web_url);
    await page.locator('#username').fill('admin');
    await page.locator('input[name="password"]').fill('password123');
    await page.getByRole("button", {name:"Login",exact:true}).click();
    // using locator to find element
    const success_msg = page.locator('p[id="login-message"]');
    await expect(success_msg).toHaveText('Login successful!');
    await expect(success_msg.isVisible()).toBeTruthy();

})

test('Search a Product', async ({ page }) => {
  await page.goto(web_url);

  const srchtxt = 'Apple';
  const srch = page.getByLabel('Search term');     // match the real label text

  await srch.fill(srchtxt);

  page.on('dialog', async dialog => {
    await expect(dialog.type()).toBe('alert');
    await expect(dialog.message()).toContain(`Search executed for: ${srchtxt}`);
    await dialog.accept();
  });

  await expect(srch).toHaveValue(srchtxt);         // <-- changed

  const srchbtn = page.getByRole('button', { name: 'Search' });
  await srchbtn.click();

  await page
    .getByRole('row')
    .filter({ hasText: 'Mouse' })
    .getByRole('button', { name: 'Add to Cart' })
    .click();

  const b1 = page
    .getByRole('row')
    .filter({ hasText: 'Mouse' })
    .getByRole('button', { name: 'Remove' });

  await expect(b1).toBeVisible();                  // simpler visibility check
});


test.afterAll('---Test End---',()=>{
    //console.log('---Test End---')
})