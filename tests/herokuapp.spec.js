    import {test,expect} from '@playwright/test';


    // Navigation to Site Test
    test.describe('Navigation to Site',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/');
        });

        test('Verify Page Load', async ({page}) => {
            await expect(page).toHaveTitle(/The Internet/);
            await expect(page.getByRole('heading', {name: 'Welcome to the-internet'})).toBeVisible();
        });

        test('Verify Links on Home Page', async ({page}) => {
            const links = [
                {name: 'A/B Testing', url: '/abtest'},
                {name: 'Add/Remove Elements', url: '/add_remove_elements/'},
                //{name: 'Basic Auth', url: '/basic_auth'},
                {name: 'Broken Images', url: '/broken_images'},
                {name: 'Challenging DOM', url: '/challenging_dom'},
                {name: 'Checkboxes', url: '/checkboxes' },
                {name: 'Context Menu', url: '/context_menu'},
            // {name: 'Digest Authentication', url: '/digest_auth'},
                {name: 'Disappearing Elements', url: '/disappearing_elements'},
                {name: 'Drag and Drop', url: '/drag_and_drop'}];
            
                for (const linkText of links) {
                const link = page.getByRole('link', {name: linkText.name});
                await expect(link).toBeVisible();
                link.focus();
                await expect(link).toHaveAttribute('href', linkText.url);
                link.click();
                await expect(page).toHaveURL(`https://the-internet.herokuapp.com${linkText.url}`);
                await page.goBack();   
                }
            });
    });

    // Add/Remove Elements Test
    test.describe('Add/Remove Elements Test',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
        });

        test('Add Element Button Test', async ({page}) => {
            const addButton = page.getByRole('button', {name: 'Add Element'});
            await expect(addButton).toBeVisible();
            await addButton.click();
            const deleteButton = page.getByRole('button', {name: 'Delete'});
            await expect(deleteButton.first()).toBeVisible();
        });

        test('Delete Element Button Test', async ({page}) => {
            const addButton = page.getByRole('button', {name: 'Add Element'});
            await addButton.click();
            await addButton.click();
            await addButton.click();
            const deleteButton = page.getByRole('button', {name: 'Delete'});
            const btnCounts = await page.getByRole('button', {name: 'Delete'}).count();
            expect(btnCounts).toBe(3);
            for(let i=btnCounts-1;i>=0;i--){
                await expect(deleteButton.nth(i)).toBeVisible();
                await deleteButton.nth(i).click();
                await expect(deleteButton.nth(i)).not.toBeVisible();
            }
        });
    });

    // Basic Auth Test
    test.describe('Basic Auth Test',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com');
        });

        test('Enter valid credentials Test', async ({page}) => {
            const username = 'admin';
            const password = 'admin';
            page.on('dialog', dialog => dialog.accept());

        });
    });

    // Broken Images Test
    test.describe('Broken Images',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/broken_images');
        });

        test('Verify Broken Images Page', async ({page}) => {
            await expect(page.getByRole('heading', {name: 'Broken Images'})).toBeVisible();
            const images = page.locator('img');
            const imageCount = await images.count();
            console.log(`Total images found: ${imageCount}`);
            for (let i = 0; i < imageCount; i++) {
                const img = images.nth(i);
                const isImageLoaded = await img.evaluate((image) => image.complete && image.naturalWidth !== 0);
                const imgSrc = await img.getAttribute('src');
                if (isImageLoaded) {
                    console.log(`Image loaded successfully: ${imgSrc}`);
                } else {
                    console.log(`Broken image found: ${imgSrc}`);
                }
            }   

        });
    });

    // Table of Contents
    test.describe('Challenging DOM Tables',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/challenging_dom');
        });

        test('read table rows and cells', async ({ page }) => {
        const rows = page.locator('table tbody tr');
        const cols = page.locator('table thead th');
        const rowCount = await rows.count();
        const colCount = await cols.count();
        const columnValues = [];
        const rowValues = [];
        const tableValues = [];
        console.log(`Total Rows: ${rowCount}`);
        console.log(`Total Columns: ${colCount}`);

        // Store column headers and first row cell values in arrays
        for (let i = 0; i < colCount; i++) {
            const header = await cols.nth(i).innerText();
            console.log(`Column ${i}: ${header}`);
            columnValues.push(header);
            const cell = await rows.nth(0).locator('td').nth(i).innerText();
            rowValues.push(cell);
    
        }console.log(columnValues);
        console.log(rowValues);

        // Create an array of objects for each row in the table
        for (let i = 0; i < rowCount; i++) {
            const rowObject = {};
            const row = rows.nth(i);
            const cells = row.locator('td');
            for (let j = 0; j < colCount; j++) {
                const header = await cols.nth(j).innerText();
                const value = await cells.nth(j).innerText();
                rowObject[header] = value;
            }
            tableValues.push(rowObject);
        }
        console.log(tableValues);
        console.log(tableValues[0]);
        });
    });

    test.describe('Checkboxes Test', async () => {
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/checkboxes');
        });

        test('Verify Checkboxes Functionality', async ({page}) => {

            const checkboxes = page.locator('input[type="checkbox"]');
            const checkboxCount = await checkboxes.count();
            console.log(`Total Checkboxes: ${checkboxCount}`);
            for (let i = 0; i < checkboxCount; i++) {
                const checkbox = checkboxes.nth(i);
                const isChecked = await checkbox.isChecked();
                console.log(`Checkbox ${i + 1} is ${isChecked ? 'checked' : 'unchecked'}`);
                // Toggle the checkbox state
                await checkbox.click();
                const newState = await checkbox.isChecked();
                console.log(`Checkbox ${i + 1} is now ${newState ? 'checked' : 'unchecked'}`);
            }
        }); 
    });

    test.describe('Context Menu Test',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/context_menu');
        });

        test('Right Click Context Menu Test', async ({page}) => {
            const box = page.locator('#hot-spot');
            page.on('dialog', dialog => {
                console.log(`Dialog message: ${dialog.message()}`);
                dialog.accept();
            });
            await box.click({button: 'right'});
        });
    });

    test.describe('Drag and Drop Test',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
        });

        test('Drag and Drop Functionality Test', async ({page}) => {
            const source = page.locator('#column-a');
            const target = page.locator('#column-b');
            const getColumnAText = async () => await source.locator('header').innerText();
            const getColumnBText = async () => await target.locator('header').innerText();

            console.log(`Before Drag and Drop: Column A - ${await getColumnAText()}, Column B - ${await getColumnBText()}`);

            // Perform drag and drop using JavaScript
            await page.evaluate(() => {
                const dataTransfer = new DataTransfer();
                const source = document.getElementById('column-a');
                const target = document.getElementById('column-b');
                source.dispatchEvent(new DragEvent('dragstart', { dataTransfer }));
                target.dispatchEvent(new DragEvent('drop', { dataTransfer }));
                source.dispatchEvent(new DragEvent('dragend', { dataTransfer }));
            });

            console.log(`After Drag and Drop: Column A - ${await getColumnAText()}, Column B - ${await getColumnBText()}`);
        });
    });

    test.describe('Dropdown Test',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/dropdown');
        });

        test('Dropdown Selection Test', async ({page}) => {
            const dropdown = page.locator('#dropdown');
            await expect(dropdown).toBeVisible();

            // Select by visible text
            await dropdown.selectOption({ label: 'Option 1' });
            let selectedOption = await dropdown.inputValue();
            console.log(`Selected Option by Text: ${selectedOption}`);
            expect(selectedOption).toBe('1');

            // Select by value
            await dropdown.selectOption({ value: '2' });
            selectedOption = await dropdown.inputValue();
            console.log(`Selected Option by Value: ${selectedOption}`);
            expect(selectedOption).toBe('2');

            // Select by index
            const options = await dropdown.locator('option').all();
            const indexToSelect = 1; // Selecting the second option (index starts from 0)
            await dropdown.selectOption({ index: indexToSelect });
            selectedOption = await dropdown.inputValue();
            console.log(`Selected Option by Index: ${selectedOption}`);
            expect(selectedOption).toBe('1');
        });
    });


    test.describe('Dyanmic Controls Test',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
        });

        test('Dynamic Controls Functionality Test', async ({page}) => {
            const checkbox = page.locator('#checkbox');
            const removeButton = page.getByRole('button', {name: 'Remove'});
            const addButton = page.getByRole('button', {name: 'Add'});
            const enableButton = page.getByRole('button', {name: 'Enable'});
            const disableButton = page.getByRole('button', {name: 'Disable'});
            const inputField = page.locator('#input-example input');

            // Remove Checkbox
            await removeButton.click();
            await expect(checkbox).toBeHidden();
            await expect(page.getByText("It's gone!")).toBeVisible();
            // Add Checkbox
            await addButton.click();
            await expect(checkbox).toBeVisible();

            // Enable Input Field
            await enableButton.click();
            await expect(inputField).toBeEnabled();
            await expect(page.getByText("It's enabled!")).toBeVisible();
            await inputField.fill('Playwright Test');
            // Disable Input Field
            await disableButton.click();
            await expect(inputField).toBeDisabled();
            await expect(page.getByText("It's disabled!")).toBeVisible();
        });
    });

    test.describe('Dynamic Loading Test',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/dynamic_loading');         
        });

        test('Dynamic Loading Example 1 Test', async ({page}) => {
            const example1Link = page.getByRole('link', {name: 'Example 1: Element on page that is hidden'});
            await example1Link.click();
            const startButton = page.getByRole('button', {name: 'Start'});
            await startButton.click();
            const helloWorldText = page.locator('#finish h4');
            await expect(helloWorldText).toBeVisible({timeout:10000});
            const text = await helloWorldText.innerText();
            console.log(`Loaded Text: ${text}`);
            expect(text).toBe('Hello World!');
        });

        test('Dynamic Loading Example 2 Test', async ({page}) => {
            const example2Link = page.getByRole('link', {name: 'Example 2: Element rendered after the fact'});
            await example2Link.click();
            const startButton = page.getByRole('button', {name: 'Start'});
            await startButton.click();
            const helloWorldText = page.locator('#finish h4');
            await expect(helloWorldText).toBeVisible({timeout:10000});
            const text = await helloWorldText.innerText();
            console.log(`Loaded Text: ${text}`);
            expect(text).toBe('Hello World!');
        });

    });

    test.describe('Entry Ad Test',()=>{
        test.beforeEach(async ({page,browserName}) => {
            test.skip(browserName === 'webkit', 'WebKit modal rendering issue');
            await page.goto('https://the-internet.herokuapp.com/entry_ad');         
        });

        test('Entry Ad Modal Test', async ({page}) => {
            const modal = page.locator('.modal');
            const modalTitle = modal.locator('.modal-title');
            const modalBody = modal.locator('.modal-body p');
            const closeButton = modal.locator('.modal-footer p');

            await expect(modal).toBeVisible();
            await expect(modalTitle).toBeVisible();
            await expect(modalBody).toBeVisible();
            const titleText = await modalTitle.innerText();
            const bodyText = await modalBody.innerText();
            console.log(`Modal Title: ${titleText}`);
            console.log(`Modal Body: ${bodyText}`);
            expect(titleText).toContain('THIS IS A MODAL WINDOW');
            expect(bodyText.length).toBeGreaterThan(0);

            await closeButton.click();
            await expect(modal).toBeHidden();
        });
    });

    test.describe('File Upload Test',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/upload');         
        });

        test('File Upload Functionality Test', async ({page}) => {
            const filePath = 'tests/sampleFile.txt'; // Ensure this file exists in the specified path
            const fileInput = page.locator('#file-upload');
            const uploadButton = page.getByRole('button', {name: 'Upload'});

            await fileInput.setInputFiles(filePath);
            await uploadButton.click();

            const uploadedFiles = page.locator('#uploaded-files');
            await expect(uploadedFiles).toBeVisible();
            const uploadedFileName = await uploadedFiles.innerText();
            console.log(`Uploaded File Name: ${uploadedFileName}`);
            expect(uploadedFileName).toBe('sampleFile.txt');
        });
    });

    test.describe('JAavaScript Alerts Test',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/javascript_alerts');         
        });

        test('JavaScript Alerts Handling Test', async ({page}) => {
            // JS Alert
            page.once('dialog', async dialog => {
                console.log(`Alert message: ${dialog.message()}`);
                expect(dialog.message()).toBe('I am a JS Alert');
                await dialog.accept();
            });
            await page.getByRole('button', {name: 'Click for JS Alert'}).click();
            const result = page.locator('#result');
            await expect(result).toHaveText('You successfully clicked an alert');

            // JS Confirm
            page.once('dialog', async dialog => {
                console.log(`Confirm message: ${dialog.message()}`);
                expect(dialog.message()).toBe('I am a JS Confirm');
                await dialog.dismiss();
            });
            await page.getByRole('button', {name: 'Click for JS Confirm'}).click();
            await expect(result).toHaveText('You clicked: Cancel');

            // JS Prompt
            const promptInput = 'Playwright';
            page.once('dialog', async dialog => {
                console.log(`Prompt message: ${dialog.message()}`);
                expect(dialog.message()).toBe('I am a JS prompt');
                await dialog.accept(promptInput);
            });
            await page.getByRole('button', {name: 'Click for JS Prompt'}).click();
            await expect(result).toHaveText(`You entered: ${promptInput}`);
        });
    });


    test.describe('Multiple Windows Test',()=>{
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/windows');         
        });

        test('Handle Multiple Windows Test', async ({page}) => {
            const newWindowLink = page.getByRole('link', {name: 'Click Here'});
            const [newPage] = await Promise.all([
                page.context().waitForEvent('page'),
                newWindowLink.click(),
            ]);

            await newPage.waitForLoadState();
            await expect(newPage).toHaveURL('https://the-internet.herokuapp.com/windows/new');
            const heading = newPage.getByRole('heading', {name: 'New Window'});
            await expect(heading).toBeVisible();
            console.log(`New window URL: ${newPage.url()}`);
        });
    });