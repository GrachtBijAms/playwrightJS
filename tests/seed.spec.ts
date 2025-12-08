import { test, expect } from '@playwright/test';

const LOGIN_PAGE = 'https://grachtbijams.github.io/playwrightJS/res/testsite.html';

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE);
    await expect(page.locator('text=Login Form')).toBeVisible();
  });

  test('successful login shows success message', async ({ page }) => {
    await page.fill('#username', 'admin');
    await page.fill('#password', 'password123');
    await page.click('#login-btn');

    const msg = page.locator('#login-message');
    await expect(msg).toBeVisible();
    await expect(msg).toHaveText('Login successful!');
  });

  test('failed login shows error message', async ({ page }) => {
    await page.fill('#username', 'bad');
    await page.fill('#password', 'wrong');
    await page.click('#login-btn');

    const msg = page.locator('#login-message');
    await expect(msg).toBeVisible();
    await expect(msg).toHaveText('Invalid credentials.');
  });
});
