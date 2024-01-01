import { test } from '../../config';
import { TopMainMenuAsserts } from '../../page-components/top-main-menu';

test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
});

test.describe('Navigation elements of the top main menu - default behavior', () => {
    test('The top main menu should contain the appropriate number of items and their names', async ({
        page,
    }) => {
        const topMainMenuAsserts: TopMainMenuAsserts = new TopMainMenuAsserts(page);
        await topMainMenuAsserts.verifyNavItemsNames();
    });
    test('Each top main menu item should redirect to the page of your choice when you click on it', async ({
        page,
        testBaseUrl,
    }) => {
        const topMainMenuAsserts: TopMainMenuAsserts = new TopMainMenuAsserts(page);
        await topMainMenuAsserts.verifyUrlPath(testBaseUrl);
    });
});
