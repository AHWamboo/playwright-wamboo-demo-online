import { test } from '@playwright/test';
import { ProductCategoryPageAsserts } from '../../page-objects/product-category';

test.beforeEach(async ({ page }) => {
    await page.goto('/product-category/uncategorised/');
});

test.describe('Product category page - default behavior and default values of the products', () => {
    test('An uncategorised category should not contain any product and should return information to the user', async ({
        page,
    }) => {
        const productCategoryPageAsserts: ProductCategoryPageAsserts = new ProductCategoryPageAsserts(page);
        await productCategoryPageAsserts.verifyIfUncategorisedCategoryIsEmpty();
        await productCategoryPageAsserts.verifyEmptyCategoryPageLabel();
    });
});
