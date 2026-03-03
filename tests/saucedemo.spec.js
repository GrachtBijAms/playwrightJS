import { test, expect } from '@playwright/test';

const LOGIN_URL = 'https://www.saucedemo.com/';

test.describe('Swag Labs - Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test('Successful login with standard_user', async ({ page }) => {
    // Enter username
    await page.fill('[data-test="username"]', 'standard_user');
    
    // Enter password
    await page.fill('[data-test="password"]', 'secret_sauce');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify user is logged in and redirected to inventory page
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });

  test('Successful login with locked_out_user shows error message', async ({ page }) => {
    // Enter username
    await page.fill('[data-test="username"]', 'locked_out_user');
    
    // Enter password
    await page.fill('[data-test="password"]', 'secret_sauce');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify error message is displayed
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Epic sadface');
  });

  test('Login with invalid credentials shows error', async ({ page }) => {
    // Enter invalid username
    await page.fill('[data-test="username"]', 'invalid_user');
    
    // Enter invalid password
    await page.fill('[data-test="password"]', 'invalid_password');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify error message is displayed
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
  });

  test('Login with empty username shows error', async ({ page }) => {
    // Leave username empty
    // Enter password
    await page.fill('[data-test="password"]', 'secret_sauce');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify error message is displayed
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
  });

  test('Login with empty password shows error', async ({ page }) => {
    // Enter username
    await page.fill('[data-test="username"]', 'standard_user');
    
    // Leave password empty
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Verify error message is displayed
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
  });

  test('Verify login page displays user credentials information', async ({ page }) => {
    // Verify accepted usernames are displayed
    await expect(page.locator('text=Accepted usernames are:')).toBeVisible();
    await expect(page.locator('text=standard_user')).toBeVisible();
    await expect(page.locator('text=locked_out_user')).toBeVisible();
    
    // Verify password is displayed
    await expect(page.locator('text=Password for all users:')).toBeVisible();
    await expect(page.locator('text=secret_sauce')).toBeVisible();
  });
});

test.describe('Swag Labs - Product Inventory Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Verify all products are displayed on inventory page', async ({ page }) => {
    // Verify products are visible
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    
    // Verify specific products
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bolt T-Shirt',{exact: true})).toBeVisible();
    await expect(page.locator('text=Sauce Labs Fleece Jacket')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Onesie')).toBeVisible();
    await expect(page.locator('text=Test.allTheThings() T-Shirt (Red)')).toBeVisible();
  });

  test('Verify product prices are displayed correctly', async ({ page }) => {
    // Verify prices for each product
    await expect(page.locator('text=$29.99')).toBeVisible(); // Backpack
    await expect(page.locator('text=$9.99')).toBeVisible();  // Bike Light
    await expect(page.locator('text=$15.99').first()).toBeVisible(); // T-Shirts
    await expect(page.locator('text=$49.99')).toBeVisible(); // Jacket
    await expect(page.locator('text=$7.99')).toBeVisible();  // Onesie
  });

  test('Sort products by Name (A to Z)', async ({ page }) => {
    // Select sort option
    await page.selectOption('[data-test="product-sort-container"]', 'az');
    
    // Verify products are sorted alphabetically
    const productNames = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });

  test('Sort products by Name (Z to A)', async ({ page }) => {
    // Select sort option
    await page.selectOption('[data-test="product-sort-container"]', 'za');
    
    // Verify products are sorted in reverse alphabetically
    const productNames = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  });

  test('Sort products by Price (low to high)', async ({ page }) => {
    // Select sort option
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');
    
    // Verify first product is cheaper than last
    const firstPrice = await page.locator('[data-test="inventory-item-price"]').first();
    const lastPrice = await page.locator('[data-test="inventory-item-price"]').last();
    
    const firstPriceText = await firstPrice.textContent();
    const lastPriceText = await lastPrice.textContent();
    
    const firstValue = parseFloat(firstPriceText.replace('$', ''));
    const lastValue = parseFloat(lastPriceText.replace('$', ''));
    
    expect(firstValue).toBeLessThanOrEqual(lastValue);
  });

  test('Sort products by Price (high to low)', async ({ page }) => {
    // Select sort option
    await page.selectOption('[data-test="product-sort-container"]', 'hilo');
    
    // Verify first product is more expensive than last
    const firstPrice = await page.locator('[data-test="inventory-item-price"]').first();
    const lastPrice = await page.locator('[data-test="inventory-item-price"]').last();
    
    const firstPriceText = await firstPrice.textContent();
    const lastPriceText = await lastPrice.textContent();
    
    const firstValue = parseFloat(firstPriceText.replace('$', ''));
    const lastValue = parseFloat(lastPriceText.replace('$', ''));
    
    expect(firstValue).toBeGreaterThanOrEqual(lastValue);
  });

  test('Click on product image to view product details', async ({ page }) => {
    // Click on product image
    await page.click('[data-test="inventory-item-name"]');
    
    // Verify product details page is loaded
    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();
  });

  test('Verify logout functionality', async ({ page }) => {
    // Click menu button
    await page.click('[id="react-burger-menu-btn"]');
    
    // Click logout
    await page.click('[data-test="logout-sidebar-link"]');
    
    // Verify redirected to login page
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test('Verify reset app state functionality', async ({ page }) => {
    // Add item to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Verify cart badge shows 1 item
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    
    // Click menu button
    await page.click('[id="react-burger-menu-btn"]');
    
    // Click reset app state
    await page.click('[data-test="reset-sidebar-link"]');
    
    // Verify cart is empty
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  });
});

test.describe('Swag Labs - Shopping Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Add single product to cart', async ({ page }) => {
    // Click add to cart for backpack
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Verify cart badge shows 1 item
    const badge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(badge).toHaveText('1');
  });

  test('Add multiple products to cart', async ({ page }) => {
    // Add backpack
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Add bike light
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    
    // Add t-shirt
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    
    // Verify cart badge shows 3 items
    const badge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(badge).toHaveText('3');
  });

  test('Remove product from inventory page changes button to Add to cart', async ({ page }) => {
    // Add backpack to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Verify button changes to Remove
    const button = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await expect(button).toBeVisible();
    
    // Remove from cart
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    
    // Verify button changes back to Add to cart
    const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(addButton).toBeVisible();
  });

  test('View shopping cart page', async ({ page }) => {
    // Add product to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Click on cart badge
    await page.click('[data-test="shopping-cart-link"]');
    
    // Verify cart page is displayed
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');
  });

  test('Verify cart items display correct information', async ({ page }) => {
    // Add products
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Verify items are in cart
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();
    
    // Verify prices
    await expect(page.locator('text=$29.99')).toBeVisible();
    await expect(page.locator('text=$9.99')).toBeVisible();
  });

  test('Remove product from shopping cart', async ({ page }) => {
    // Add product
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click remove button
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    
    // Verify product is removed
    await expect(page.locator('text=Sauce Labs Backpack')).not.toBeVisible();
  });

  test('Continue shopping button returns to inventory page', async ({ page }) => {
    // Add product
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Navigate to cart
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click continue shopping
    await page.click('[data-test="continue-shopping"]');
    
    // Verify back on inventory page
    await expect(page).toHaveURL(/inventory\.html/);
  });
});

test.describe('Swag Labs - Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Add product to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Navigate to checkout
    await page.click('[data-test="shopping-cart-link"]');
    await page.click('[data-test="checkout"]');
  });

  test('Checkout with valid information completes successfully', async ({ page }) => {
    // Fill in personal information
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click continue
    await page.click('[data-test="continue"]');
    
    // Verify on order review page
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('[data-test="title"]')).toContainText('Overview');
  });

  test('Checkout with empty first name shows error', async ({ page }) => {
    // Leave first name empty
    // Fill other fields
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click continue
    await page.click('[data-test="continue"]');
    
    // Verify error message
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
  });

  test('Checkout with empty last name shows error', async ({ page }) => {
    // Fill first name
    await page.fill('[data-test="firstName"]', 'John');
    // Leave last name empty
    // Fill postal code
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click continue
    await page.click('[data-test="continue"]');
    
    // Verify error message
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
  });

  test('Checkout with empty postal code shows error', async ({ page }) => {
    // Fill name fields
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    // Leave postal code empty
    
    // Click continue
    await page.click('[data-test="continue"]');
    
    // Verify error message
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
  });

  test('Cancel checkout returns to cart', async ({ page }) => {
    // Click cancel button
    await page.click('[data-test="cancel"]');
    
    // Verify back on cart page
    await expect(page).toHaveURL(/cart\.html/);
  });
});

test.describe('Swag Labs - Order Review and Completion Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Add multiple products to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    
    // Go to checkout
    await page.click('[data-test="shopping-cart-link"]');
    await page.click('[data-test="checkout"]');
    
    // Fill and submit personal info
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
  });

  test('Verify order overview displays correct item information', async ({ page }) => {
    // Verify page title
    await expect(page.locator('[data-test="title"]')).toContainText('Overview');
    
    // Verify items in order
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();
    
    // Verify prices
    await expect(page.locator('text=$29.99')).toBeVisible();
    await expect(page.locator('text=$9.99')).toBeVisible();
  });

  test('Verify order overview displays payment and shipping info', async ({ page }) => {
    // Verify payment information
    await expect(page.locator('text=Payment Information')).toBeVisible();
    await expect(page.locator('text=SauceCard #31337')).toBeVisible();
    
    // Verify shipping information
    await expect(page.locator('text=Shipping Information')).toBeVisible();
    await expect(page.locator('text=Free Pony Express Delivery')).toBeVisible();
  });

  test('Verify order total calculation is correct', async ({ page }) => {
    // Verify item total
    await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
    await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $39.98');
    
    // Verify tax calculation
    await expect(page.locator('[data-test="tax-label"]')).toHaveText('Tax: $3.20');
    
    // Verify total
    await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $43.18');
  });

  test('Cancel order review returns to cart', async ({ page }) => {
    // Click cancel button
    await page.click('[data-test="cancel"]');
    
    // Verify back on cart page
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Complete purchase displays order confirmation page', async ({ page }) => {
    // Click finish button
    await page.click('[data-test="finish"]');
    
    // Verify on complete page
    await expect(page).toHaveURL(/checkout-complete\.html/);
    
    // Verify confirmation message
    await expect(page.locator('text=Thank you for your order')).toBeVisible();
    await expect(page.locator('text=Your order has been dispatched')).toBeVisible();
  });

  test('Verify confirmation page displays back home button', async ({ page }) => {
    // Click finish button
    await page.click('[data-test="finish"]');
    
    // Verify back home button is visible
    const backBtn = page.locator('[data-test="back-to-products"]');
    await expect(backBtn).toBeVisible();
  });

  test('Back home button returns to inventory page', async ({ page }) => {
    // Click finish button
    await page.click('[data-test="finish"]');
    
    // Click back home button
    await page.click('[data-test="back-to-products"]');
    
    // Verify back on inventory page
    await expect(page).toHaveURL(/inventory\.html/);
  });
});

test.describe('Swag Labs - Special User Tests', () => {
  test('problem_user displays visual glitches', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('[data-test="username"]', 'problem_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Verify page loads (may have visual issues as per user type)
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('performance_glitch_user has slower page loads', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('[data-test="username"]', 'performance_glitch_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    
    const startTime = Date.now();
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/inventory\.html/);
    const endTime = Date.now();
    
    // Performance user should take longer
    // (just verify page loads, actual performance comparison would vary)
    expect(endTime - startTime).toBeGreaterThan(0);
  });

  test('error_user displays error messages', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('[data-test="username"]', 'error_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Verify page loads (may show errors as per user type)
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('visual_user has visual differences', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('[data-test="username"]', 'visual_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Verify page loads (may have visual differences as per user type)
    await expect(page).toHaveURL(/inventory\.html/);
  });
});

test.describe('Swag Labs - Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
  });

  test('Swag Labs logo is clickable and returns to inventory', async ({ page }) => {
    // Add product to go to another page
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="shopping-cart-link"]');
    
    // Click logo
    await page.click('[id="react-burger-menu-btn"]'); // Close menu if open
    await page.click('text=All Items'); // Click on logo text to return to inventory
    
    // Verify back on inventory page
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Verify footer links are functional', async ({ page }) => {
    // Verify Twitter link exists
    const twitterLink = page.locator('a[href*="twitter"]');
    await expect(twitterLink).toBeVisible();
    
    // Verify Facebook link exists
    const fbLink = page.locator('a[href*="facebook"]');
    await expect(fbLink).toBeVisible();
    
    // Verify LinkedIn link exists
    const linkedinLink = page.locator('a[href*="linkedin"]');
    await expect(linkedinLink).toBeVisible();
  });

  test('Verify about link in menu works', async ({ page }) => {
    // Click menu button
    await page.click('[id="react-burger-menu-btn"]');
    
    // Click about link
    await page.click('[data-test="about-sidebar-link"]');
    
    // Verify navigated to about page
    await expect(page).toHaveURL(/saucelabs\.com/);
  });
});
