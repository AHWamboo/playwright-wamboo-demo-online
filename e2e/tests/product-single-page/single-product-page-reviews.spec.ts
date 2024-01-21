import { test } from '@playwright/test';
import { ProductSinglePageActions } from '../../page-objects/product-single';

test.beforeEach(async ({ page }) => {
    await page.goto('/product/360reach/');
});

test.describe('Single product page reviews - available on the product page, basic operation: adding and verifying addition', () => {
    test('Add a review to the product and see if it exists', async ({ page }) => {
        const productSinglePageActions: ProductSinglePageActions = new ProductSinglePageActions(page);
        await productSinglePageActions.addReviewToProduct({ starRaiting: 2, reviewText: 'aaa' });
    });
});
