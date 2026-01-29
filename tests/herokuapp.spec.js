import {test,expect} from '@playwright/test';



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