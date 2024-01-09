import { test } from '@playwright/test';
import { ProductCategoryPageActions } from '../../page-objects/product-category';

test.beforeEach(async ({ page }) => {
    await page.goto('/product-category/phone-tablet-stand');
});

test.describe('Product category page - default behavior and default values of the products', () => {
    test('On the designated category page, there should be a sufficient number of available and previously added products', async ({
        page,
    }) => {
        const productCategoryPageActions: ProductCategoryPageActions = new ProductCategoryPageActions(page);
        await productCategoryPageActions.getAllAvaliableVisibleProductContent();
    });
});
