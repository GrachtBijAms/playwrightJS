# Specs

This is a directory for test plans.

## Test Plan: Login Page

**URL**: https://grachtbijams.github.io/playwrightJS/res/testsite.html

### Test Suite: Login Form

#### Test 1: Successful Login
- **Objective**: Verify that valid credentials result in a success message.
- **Steps**:
  1. Navigate to the login page.
  2. Enter username: `admin`
  3. Enter password: `password123`
  4. Click the "Login" button.
  5. Verify the success message displays: "Login successful!"
- **Expected Result**: Success message is visible with correct text.
- **Selectors Used**: `#username`, `#password`, `#login-btn`, `#login-message`

#### Test 2: Failed Login
- **Objective**: Verify that invalid credentials result in an error message.
- **Steps**:
  1. Navigate to the login page.
  2. Enter username: `bad`
  3. Enter password: `wrong`
  4. Click the "Login" button.
  5. Verify the error message displays: "Invalid credentials."
- **Expected Result**: Error message is visible with correct text.
- **Selectors Used**: `#username`, `#password`, `#login-btn`, `#login-message`

### Implementation
Tests are implemented in `tests/seed.spec.ts` using Playwright TypeScript framework.

## Test Suite: Search Products

#### Test 3: Search with Valid Product Term
- **Objective**: Verify that searching with a valid product term triggers an alert with the search term.
- **Steps**:
  1. Navigate to the login page.
  2. Enter search term: `laptop`
  3. Click the "Search" button.
  4. Verify an alert appears with message: "Search executed for: laptop"
  5. Dismiss the alert.
- **Expected Result**: Alert dialog appears with the correct search term in the message.
- **Selectors Used**: `#search`, `#search-btn`

#### Test 4: Clear Search Button
- **Objective**: Verify that the clear button resets the search input field.
- **Steps**:
  1. Navigate to the login page.
  2. Enter search term: `phone`
  3. Verify the search field contains: `phone`
  4. Click the "Clear" button.
  5. Verify the search field is empty.
- **Expected Result**: Search input field is cleared and empty.
- **Selectors Used**: `#search`, `#clear-search-btn`

#### Test 5: Search with Empty Term
- **Objective**: Verify that searching without a term still triggers an alert.
- **Steps**:
  1. Navigate to the login page.
  2. Leave the search term empty.
  3. Click the "Search" button.
  4. Verify an alert appears with message: "Search executed for:"
  5. Dismiss the alert.
- **Expected Result**: Alert dialog appears with empty search term.
- **Selectors Used**: `#search`, `#search-btn`

## Test Suite: Preferences

#### Test 6: Save Preferences with Tool Selection
- **Objective**: Verify that selecting multiple tools and an experience level saves preferences successfully.
- **Steps**:
  1. Navigate to the login page.
  2. Check "Selenium" and "Playwright" checkboxes.
  3. Select "Intermediate" experience level.
  4. Fill comments: "I prefer Playwright for modern testing"
  5. Click "Save Preferences" button.
  6. Verify confirmation message: "Preferences saved!"
- **Expected Result**: Confirmation message appears indicating preferences were saved.
- **Selectors Used**: `#tool-selenium`, `#tool-playwright`, `input[name="level"][value="intermediate"]`, `#comments`, `#save-pref-btn`, `#pref-message`

#### Test 7: Save Preferences with Beginner Level Only
- **Objective**: Verify that saving preferences with minimal selection (one tool, beginner level, no comments) works correctly.
- **Steps**:
  1. Navigate to the login page.
  2. Check "Cypress" checkbox only.
  3. Select "Beginner" experience level.
  4. Leave comments empty.
  5. Click "Save Preferences" button.
  6. Verify confirmation message: "Preferences saved!"
- **Expected Result**: Confirmation message appears even with minimal selection.
- **Selectors Used**: `#tool-cypress`, `input[name="level"][value="beginner"]`, `#save-pref-btn`, `#pref-message`

#### Test 8: Save Preferences with Advanced Level and All Tools
- **Objective**: Verify that saving preferences with all tools selected and advanced experience level works correctly.
- **Steps**:
  1. Navigate to the login page.
  2. Check all three checkboxes: "Selenium", "Playwright", and "Cypress".
  3. Select "Advanced" experience level.
  4. Fill comments: "Expert in all three frameworks"
  5. Click "Save Preferences" button.
  6. Verify confirmation message: "Preferences saved!"
- **Expected Result**: Confirmation message appears confirming all preferences were saved.
- **Selectors Used**: `#tool-selenium`, `#tool-playwright`, `#tool-cypress`, `input[name="level"][value="advanced"]`, `#comments`, `#save-pref-btn`, `#pref-message`

## Test Suite: Dynamic Content

#### Test 9: Load Button Displays Loading Message Then Dynamic Content
- **Objective**: Verify that clicking the load button shows a loading message and then displays dynamic content after a 2-second delay.
- **Steps**:
  1. Navigate to the login page.
  2. Click the "Load Message (2s delay)" button.
  3. Verify "Loading..." message appears immediately.
  4. Wait for the dynamic content to load.
  5. Verify the final message: "Dynamic content loaded!"
- **Expected Result**: Loading message appears first, then is replaced with the dynamic content after 2 seconds.
- **Selectors Used**: `#load-btn`, `#dynamic-text`

## Test Suite: Modal Popup

#### Test 10: Open Modal Displays Modal and Close Button Works
- **Objective**: Verify that the modal popup can be opened and closed properly.
- **Steps**:
  1. Navigate to the login page.
  2. Verify modal is initially hidden (has `hidden` class).
  3. Click "Open Modal" button.
  4. Verify modal is visible and displays: "This is a modal dialog."
  5. Click "Close" button.
  6. Verify modal is hidden again (has `hidden` class).
- **Expected Result**: Modal opens on button click, displays content, and closes when close button is clicked.
- **Selectors Used**: `#open-modal-btn`, `#modal`, `#modal-text`, `#close-modal-btn`

## Test Suite: File Upload

#### Test 11: Upload Button Is Disabled Until File Is Selected
- **Objective**: Verify that the upload button is initially disabled and becomes enabled only when a file is selected.
- **Steps**:
  1. Navigate to the login page.
  2. Verify upload button is disabled.
  3. Select a file using the file input.
  4. Verify upload button becomes enabled.
  5. Click the upload button.
  6. Verify success message: "File upload simulated."
- **Expected Result**: Upload button is disabled initially, enabled after file selection, and shows success message on click.
- **Selectors Used**: `#file-input`, `#upload-btn`, `#upload-message`

## Test Suite: Iframe Example

#### Test 12: Interact with Content Inside Iframe
- **Objective**: Verify that we can interact with elements inside an iframe and verify the content changes.
- **Steps**:
  1. Navigate to the login page.
  2. Access the iframe with id `info-frame`.
  3. Verify the iframe title: "Iframe Content"
  4. Click the button inside the iframe.
  5. Verify the title changes to: "Clicked inside iframe!"
- **Expected Result**: Successfully interact with iframe elements and verify content updates.
- **Selectors Used**: `#info-frame`, `#frame-title`, `#frame-btn`

## Test Suite: Slider

#### Test 13: Slider Updates Value Display When Moved
- **Objective**: Verify that moving the slider updates the displayed value correctly.
- **Steps**:
  1. Navigate to the login page.
  2. Verify initial slider value is 50.
  3. Move slider to 75.
  4. Verify value display shows 75.
  5. Move slider to 25.
  6. Verify value display shows 25.
  7. Move slider to 100 (max).
  8. Verify value display shows 100.
- **Expected Result**: Slider value display updates correctly as the slider is moved to different positions.
- **Selectors Used**: `#volume-slider`, `#volume-value`

## Test Suite: Drag & Drop Kanban

#### Test 14: Drag Card from To-Do to In-Progress Column
- **Objective**: Verify that dragging a card from the to-do column to the in-progress column works correctly.
- **Steps**:
  1. Navigate to the login page.
  2. Verify the "Write tests" card is visible in the to-do column.
  3. Drag the "Write tests" card to the in-progress column.
  4. Verify the card appears in the in-progress column.
- **Expected Result**: Card successfully moves from to-do to in-progress column.
- **Selectors Used**: `#todo-column`, `#progress-column`, `.kanban-card[data-id="t1"]`

#### Test 15: Drag Multiple Cards Between Kanban Columns
- **Objective**: Verify that multiple drag and drop operations work correctly across different columns.
- **Steps**:
  1. Navigate to the login page.
  2. Drag the "Fix bugs" card from to-do column to in-progress column.
  3. Verify the card is in the in-progress column.
  4. Drag the "Fix bugs" card from in-progress to done column.
  5. Verify the card is now in the done column.
- **Expected Result**: Card successfully moves through multiple columns (to-do → in-progress → done).
- **Selectors Used**: `#todo-column`, `#progress-column`, `#done-column`, `.kanban-card[data-id="t2"]`

#### Test 16: Drag Card Back to Original Column
- **Objective**: Verify that cards can be moved back to their original column.
- **Steps**:
  1. Navigate to the login page.
  2. Drag the "Write tests" card from to-do column to in-progress column.
  3. Verify the card is in the in-progress column.
  4. Drag the card back to the to-do column.
  5. Verify the card is back in the to-do column.
- **Expected Result**: Card can be moved between columns and back to the original location.
- **Selectors Used**: `#todo-column`, `#progress-column`, `.kanban-card[data-id="t1"]`

### Implementation
Tests are implemented in `tests/seed.spec.ts` using Playwright TypeScript framework.

### How to Run
```bash
# Run all tests in seed.spec.ts
npx playwright test tests/seed.spec.ts

# Run with UI mode (interactive)
npx playwright test tests/seed.spec.ts --ui

# Run a specific test
npx playwright test tests/seed.spec.ts -g "successful login"
```
