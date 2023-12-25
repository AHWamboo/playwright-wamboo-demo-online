import { test } from '@playwright/test';
import { ShopPageAsserts } from '../../page-objects/shop/shop.page.asserts';
import { shopPageSelectors } from '../../page-objects/shop/shop.page.selectors';
import { WELCOME_HEADER_LABEL } from '../../page-objects/shop/shop.pages.constants';

test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
});

test.describe('Store promotional headlines should match seson', () => {
    test('The headings for: main header, two promotional cameras, a sale and a newsletter should have the correct values.', async ({
        page,
    }) => {
        const shopPageAsserts: ShopPageAsserts = new ShopPageAsserts(page);
        await shopPageAsserts.verifyStoreHeader(
            shopPageSelectors.welcomeHeaderLocator,
            WELCOME_HEADER_LABEL
        );
    });
});
