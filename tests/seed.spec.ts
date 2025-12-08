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

test.describe('Search Products', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE);
    await expect(page.locator('text=Search Products')).toBeVisible();
  });

  test('search with valid product term shows alert', async ({ page }) => {
    await page.fill('#search', 'laptop');
    
    // Listen for alert and dismiss it
    page.once('dialog', dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain('Search executed for: laptop');
      dialog.dismiss();
    });
    
    await page.click('#search-btn');
  });

  test('clear search button clears search input', async ({ page }) => {
    await page.fill('#search', 'phone');
    await expect(page.locator('#search')).toHaveValue('phone');
    
    await page.click('#clear-search-btn');
    await expect(page.locator('#search')).toHaveValue('');
  });

  test('search with empty term shows alert', async ({ page }) => {
    page.once('dialog', dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain('Search executed for:');
      dialog.dismiss();
    });
    
    await page.click('#search-btn');
  });
});

test.describe('Preferences', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE);
    await expect(page.locator('text=Preferences')).toBeVisible();
  });

  test('save preferences with tool selection shows confirmation', async ({ page }) => {
    // Select checkboxes for tools
    await page.check('#tool-selenium');
    await page.check('#tool-playwright');
    
    // Select experience level
    await page.check('input[name="level"][value="intermediate"]');
    
    // Fill comments
    await page.fill('#comments', 'I prefer Playwright for modern testing');
    
    // Save preferences
    await page.click('#save-pref-btn');
    
    // Verify confirmation message
    const msg = page.locator('#pref-message');
    await expect(msg).toBeVisible();
    await expect(msg).toHaveText('Preferences saved!');
  });

  test('save preferences with only beginner level shows confirmation', async ({ page }) => {
    // Select only Cypress checkbox
    await page.check('#tool-cypress');
    
    // Select beginner level
    await page.check('input[name="level"][value="beginner"]');
    
    // Save preferences without comments
    await page.click('#save-pref-btn');
    
    // Verify confirmation message
    const msg = page.locator('#pref-message');
    await expect(msg).toBeVisible();
    await expect(msg).toHaveText('Preferences saved!');
  });

  test('save preferences with advanced level and all tools selected', async ({ page }) => {
    // Select all tools
    await page.check('#tool-selenium');
    await page.check('#tool-playwright');
    await page.check('#tool-cypress');
    
    // Select advanced level
    await page.check('input[name="level"][value="advanced"]');
    
    // Fill comments
    await page.fill('#comments', 'Expert in all three frameworks');
    
    // Save preferences
    await page.click('#save-pref-btn');
    
    // Verify confirmation message
    const msg = page.locator('#pref-message');
    await expect(msg).toBeVisible();
    await expect(msg).toHaveText('Preferences saved!');
  });
});

test.describe('Dynamic Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE);
    await expect(page.locator('text=Dynamic Content')).toBeVisible();
  });

  test('load button displays loading message then dynamic content', async ({ page }) => {
    const dynamicText = page.locator('#dynamic-text');
    
    // Click load button
    await page.click('#load-btn');
    
    // Check for loading message
    await expect(dynamicText).toContainText('Loading...');
    
    // Wait for content to load (2 second delay)
    await expect(dynamicText).toHaveText('Dynamic content loaded!', { timeout: 5000 });
  });
});

test.describe('Modal Popup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE);
    await expect(page.locator('text=Modal Popup')).toBeVisible();
  });

  test('open modal displays modal and close button works', async ({ page }) => {
    const modal = page.locator('#modal');
    
    // Modal should be hidden initially
    await expect(modal).toHaveClass(/hidden/);
    
    // Open modal
    await page.click('#open-modal-btn');
    
    // Modal should be visible
    await expect(modal).not.toHaveClass(/hidden/);
    await expect(page.locator('#modal-text')).toHaveText('This is a modal dialog.');
    
    // Close modal
    await page.click('#close-modal-btn');
    
    // Modal should be hidden again
    await expect(modal).toHaveClass(/hidden/);
  });
});

test.describe('File Upload', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE);
    await expect(page.locator('text=File Upload & Disabled Button')).toBeVisible();
  });

  test('upload button is disabled until file is selected', async ({ page }) => {
    const uploadBtn = page.locator('#upload-btn');
    
    // Upload button should be disabled initially
    await expect(uploadBtn).toBeDisabled();
    
    // Set a file
    await page.setInputFiles('#file-input', '/dev/null');
    
    // Upload button should be enabled after file selection
    await expect(uploadBtn).toBeEnabled();
    
    // Click upload button
    await page.click('#upload-btn');
    
    // Verify upload message
    const uploadMsg = page.locator('#upload-message');
    await expect(uploadMsg).toHaveText('File upload simulated.');
  });
});

test.describe('Iframe Example', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE);
    await expect(page.locator('text=Iframe Example')).toBeVisible();
  });

  test('interact with content inside iframe', async ({ page }) => {
    // Access the iframe
    const frameLocator = page.locator('#info-frame');
    const frame = page.frameLocator('#info-frame');
    
    // Verify initial iframe title
    const frameTitle = frame.locator('#frame-title');
    await expect(frameTitle).toHaveText('Iframe Content');
    
    // Click button inside iframe
    const frameBtn = frame.locator('#frame-btn');
    await frameBtn.click();
    
    // Verify title changed after click
    await expect(frameTitle).toHaveText('Clicked inside iframe!');
  });
});

test.describe('Slider', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE);
    await expect(page.locator('text=Slider')).toBeVisible();
  });

  test('slider updates value display when moved', async ({ page }) => {
    const slider = page.locator('#volume-slider');
    const volumeValue = page.locator('#volume-value');
    
    // Initial value should be 50
    await expect(volumeValue).toHaveText('50');
    
    // Move slider to 75
    await slider.fill('75');
    
    // Value should update to 75
    await expect(volumeValue).toHaveText('75');
    
    // Move slider to 25
    await slider.fill('25');
    
    // Value should update to 25
    await expect(volumeValue).toHaveText('25');
    
    // Move slider to max (100)
    await slider.fill('100');
    await expect(volumeValue).toHaveText('100');
  });
});
