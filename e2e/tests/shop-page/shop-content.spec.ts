import { test } from '@playwright/test';
import {
    ShopPageAsserts,
    shopPageSelectors,
    WELCOME_HEADER_LABEL,
    PROMO_HEADER_ONE,
    PROMO_HEADER_TWO,
} from '../../page-objects/shop';

test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
});

test.describe('Store promotional headlines should match seson', () => {
    test('The headings for: main header and two promotional cameras should have the correct values.', async ({
        page,
    }) => {
        const shopPageAsserts: ShopPageAsserts = new ShopPageAsserts(page);
        await shopPageAsserts.verifyStoreHeader(shopPageSelectors.welcomeHeaderLocator, WELCOME_HEADER_LABEL);

        const promoHeadersOne = Object.entries(shopPageSelectors.promoHeaderOne);
        const promoHeadersOneLabels = Object.entries(PROMO_HEADER_ONE);
        for (let i = 0; i < promoHeadersOne.length; i++) {
            await shopPageAsserts.verifyStoreHeader(promoHeadersOne[i][1], promoHeadersOneLabels[i][1]);
        }

        const promoHeadersTwo = Object.entries(shopPageSelectors.promoHeaderTwo);
        const promoHeadersTwoLabels = Object.entries(PROMO_HEADER_TWO);
        for (let i = 0; i < promoHeadersTwo.length; i++) {
            await shopPageAsserts.verifyStoreHeader(promoHeadersTwo[i][1], promoHeadersTwoLabels[i][1]);
        }
    });
});
