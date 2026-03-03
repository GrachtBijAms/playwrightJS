# Swag Labs (saucedemo.com) - Website Overview & Test Cases

## Website Description

**Website Name:** Swag Labs  
**URL:** https://www.saucedemo.com  
**Purpose:** E-commerce website for testing and learning automation testing  
**Technology:** Modern web application with React-based frontend

### Website Overview

Swag Labs is a practice website specifically designed for automation testing. It's commonly used by QA engineers and automation testers to learn and practice test automation skills. The website simulates a real e-commerce application with multiple user types, each designed to test specific scenarios.

---

## Key Features

### 1. **User Authentication**
- Multiple test user accounts with different behaviors
- Secure login page with username and password fields
- Session management and logout functionality

### 2. **Product Catalog**
- 6 available products (Sauce Labs branded merchandise)
- Product images, descriptions, and prices
- Product details page for each item
- Multiple sorting options (Name A-Z, Name Z-A, Price Low-High, Price High-Low)

### 3. **Shopping Cart**
- Add/remove products functionality
- Cart badge showing number of items
- Cart summary page with product details
- Continue shopping option

### 4. **Checkout Process**
- Multi-step checkout (2 steps)
- Step 1: Customer information collection (First Name, Last Name, Zip/Postal Code)
- Step 2: Order review with payment and shipping information
- Order completion confirmation

### 5. **Special Features**
- Reset app state functionality
- Menu navigation with logout option
- Footer with social media links
- Product search and filtering

---

## Test Users & Their Behaviors

| Username | Password | Behavior |
|----------|----------|----------|
| **standard_user** | secret_sauce | Normal user - all features work correctly |
| **locked_out_user** | secret_sauce | Cannot login - receives error message |
| **problem_user** | secret_sauce | Has visual glitches on product page |
| **performance_glitch_user** | secret_sauce | Slower page load times |
| **error_user** | secret_sauce | Displays error messages during interactions |
| **visual_user** | secret_sauce | Has visual rendering differences |

---

## Website Pages

### 1. **Login Page** (`https://www.saucedemo.com/`)
- Username input field
- Password input field
- Login button
- Information display with accepted usernames and password
- Error message display for failed login attempts

### 2. **Products/Inventory Page** (`/inventory.html`)
- Header with Swag Labs logo
- Menu button (Open Menu)
- Shopping cart badge
- Product sort dropdown
- Product grid displaying:
  - Product image
  - Product name
  - Product description
  - Product price
  - "Add to cart" / "Remove" button
- Footer with social media links

### 3. **Shopping Cart Page** (`/cart.html`)
- Cart header with item count badge
- Products table with:
  - Quantity column
  - Description column
  - Price
  - Remove button
- "Continue Shopping" button
- "Checkout" button

### 4. **Checkout Step One** (`/checkout-step-one.html`)
- Form fields:
  - First Name
  - Last Name
  - Zip/Postal Code
- "Cancel" button
- "Continue" button

### 5. **Checkout Step Two** (`/checkout-step-two.html`)
- Order summary with:
  - Product details
  - Quantity
  - Price
- Payment information (SauceCard #31337)
- Shipping information (Free Pony Express Delivery)
- Price breakdown:
  - Item total
  - Tax
  - Total amount
- "Cancel" button
- "Finish" button

### 6. **Order Confirmation Page** (`/checkout-complete.html`)
- Confirmation message ("Thank you for your order!")
- Order status message
- Pony Express image
- "Back Home" button

---

## Test Coverage

### Test Suites Implemented

#### 1. **Login Tests**
- ✅ Successful login with standard_user
- ✅ Locked out user receives error message
- ✅ Invalid credentials show error
- ✅ Empty username validation
- ✅ Empty password validation
- ✅ Verify login page displays user credentials

**Total Tests: 6**

#### 2. **Product Inventory Tests**
- ✅ Verify all 6 products are displayed
- ✅ Verify product prices are displayed correctly
- ✅ Sort products by Name (A to Z)
- ✅ Sort products by Name (Z to A)
- ✅ Sort products by Price (Low to High)
- ✅ Sort products by Price (High to Low)
- ✅ Click on product to view details
- ✅ Logout functionality
- ✅ Reset app state functionality

**Total Tests: 9**

#### 3. **Shopping Cart Tests**
- ✅ Add single product to cart
- ✅ Add multiple products to cart
- ✅ Remove product from inventory page
- ✅ View shopping cart page
- ✅ Verify cart items display correct information
- ✅ Remove product from shopping cart
- ✅ Continue shopping button returns to inventory

**Total Tests: 7**

#### 4. **Checkout Tests**
- ✅ Checkout with valid information completes successfully
- ✅ Checkout with empty first name shows error
- ✅ Checkout with empty last name shows error
- ✅ Checkout with empty postal code shows error
- ✅ Cancel checkout returns to cart

**Total Tests: 5**

#### 5. **Order Review and Completion Tests**
- ✅ Verify order overview displays correct item information
- ✅ Verify order overview displays payment and shipping info
- ✅ Verify order total calculation is correct
- ✅ Cancel order review returns to cart
- ✅ Complete purchase displays order confirmation page
- ✅ Verify confirmation page displays back home button
- ✅ Back home button returns to inventory page

**Total Tests: 7**

#### 6. **Special User Tests**
- ✅ problem_user displays visual glitches
- ✅ performance_glitch_user has slower page loads
- ✅ error_user displays error messages
- ✅ visual_user has visual differences

**Total Tests: 4**

#### 7. **Navigation Tests**
- ✅ Swag Labs logo is clickable and returns to inventory
- ✅ Verify footer links are functional
- ✅ Verify about link in menu works

**Total Tests: 3**

---

## Total Test Cases: 41

---

## Test Scenario Examples

### Scenario 1: Complete Purchase Flow
1. Login with standard_user / secret_sauce
2. Browse products
3. Sort products by price
4. Add 2-3 products to cart
5. View shopping cart
6. Verify cart total and items
7. Proceed to checkout
8. Enter customer information (First Name, Last Name, Zip)
9. Review order summary
10. Verify payment and shipping information
11. Complete purchase
12. Verify order confirmation message

### Scenario 2: Error Handling
1. Attempt login with locked_out_user
2. Verify error message displayed
3. Clear form
4. Attempt login with invalid credentials
5. Verify error message displayed
6. Attempt checkout with incomplete form
7. Verify validation errors displayed

### Scenario 3: Cart Management
1. Login successfully
2. Add single product to cart
3. Verify cart badge updates
4. Add more products
5. Verify cart count increases
6. Remove a product
7. Verify cart count decreases
8. Clear cart completely
9. Verify empty cart state

### Scenario 4: Product Sorting
1. Login successfully
2. Sort products A to Z
3. Verify order
4. Sort products Z to A
5. Verify order
6. Sort by Price Low to High
7. Verify lowest price is first
8. Sort by Price High to Low
9. Verify highest price is first

---

## Products Available

1. **Sauce Labs Backpack** - $29.99
   - Description: carry.allTheThings() with the sleek, streamlined Sly Pack

2. **Sauce Labs Bike Light** - $9.99
   - Description: A red light isn't the desired state in testing but it sure helps

3. **Sauce Labs Bolt T-Shirt** - $15.99
   - Description: Get your testing superhero on with the Sauce Labs bolt T-shirt

4. **Sauce Labs Fleece Jacket** - $49.99
   - Description: Midweight quarter-zip fleece jacket

5. **Sauce Labs Onesie** - $7.99
   - Description: Rib snap infant onesie for the junior automation engineer

6. **Test.allTheThings() T-Shirt (Red)** - $15.99
   - Description: Perfect to wear when cozying up to your keyboard to automate

---

## Key Testing Areas

### Functionality Testing
- User authentication and authorization
- Product browsing and filtering
- Shopping cart operations
- Checkout process validation
- Order completion

### UI/UX Testing
- Page layout and responsiveness
- Button functionality
- Form validation
- Error message display
- Navigation flow

### Data Validation
- Required field validation
- Price calculations
- Cart item counts
- Order total accuracy

### Cross-browser Compatibility
- Test across Chrome, Firefox, Safari, Edge

### Performance Testing
- Page load times
- Special testing with performance_glitch_user
- Cart update responsiveness

---

## Test Execution

### Running All Tests
```bash
npm run test:e2e
```

### Running Tests in Headed Mode (UI Visible)
```bash
npm run test:e2e:dev
```

### Running Specific Test Suite
```bash
npx playwright test tests/saucedemo.spec.js --grep "Login Tests"
```

### Running Single Test
```bash
npx playwright test tests/saucedemo.spec.js -g "Successful login with standard_user"
```

---

## Best Practices for Testing

1. **Data Integrity**: Always test with fresh data by using the "Reset App State" option
2. **User Types**: Test with different user types to understand edge cases
3. **Error Scenarios**: Test validation by deliberately entering invalid data
4. **Cart Management**: Test adding, removing, and updating cart items
5. **Checkout Flow**: Test complete checkout flow with valid and invalid data
6. **Navigation**: Test all navigation paths

---

## Common Assertions

```javascript
// URL assertions
await expect(page).toHaveURL(/inventory\.html/);

// Element visibility
await expect(page.locator('text=Sauce Labs')).toBeVisible();

// Text content
await expect(page.locator('[data-test="title"]')).toContainText('Products');

// Button states
await expect(page.locator('[data-test="checkout"]')).toBeEnabled();
await expect(page.locator('[data-test="upload-btn"]')).toBeDisabled();

// Form input values
await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');

// Element count
await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
```

---

## Known Test Selectors

- `[data-test="username"]` - Username input field
- `[data-test="password"]` - Password input field
- `[data-test="login-button"]` - Login button
- `[data-test="shopping-cart-badge"]` - Cart badge with count
- `[data-test="shopping-cart-link"]` - Shopping cart link
- `[data-test="add-to-cart-*"]` - Add to cart buttons
- `[data-test="remove-*"]` - Remove buttons
- `[data-test="checkout"]` - Checkout button
- `[data-test="firstName"]` - First name input
- `[data-test="lastName"]` - Last name input
- `[data-test="postalCode"]` - Zip/Postal code input
- `[data-test="continue"]` - Continue button
- `[data-test="finish"]` - Finish button
- `[data-test="bm-menu-button"]` - Menu button
- `[data-test="logout-sidebar-link"]` - Logout link
- `[data-test="reset-sidebar-link"]` - Reset app state link

---

## Conclusion

Swag Labs is an excellent practice website for learning and implementing automation testing. The comprehensive test suite provided covers all major functionality and user interactions, making it suitable for both beginners and experienced automation testers.
