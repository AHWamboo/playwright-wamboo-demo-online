import { test } from '../../config';
import {
    productSinglePageSelectors,
    ProductSinglePageActions,
    type IApprovedProductSingleReview,
    type IProductSingleReview,
} from '../../page-objects/product-single';
import { ProductSinglePageAsserts } from '../../page-objects/product-single/product-single.page.asserts';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ logInToDashboardAsAdmin }) => {
    await logInToDashboardAsAdmin();
});

test.describe('Single product page reviews - available on the product page, basic operation: adding and verifying addition', () => {
    test('Add a review to the product and see if it exists', async ({ page }) => {
        await page.goto('/product/360reach/');
        const productSinglePageActions: ProductSinglePageActions = new ProductSinglePageActions(page);
        const productSinglePageAsserts: ProductSinglePageAsserts = new ProductSinglePageAsserts(page);
        const productReview: IProductSingleReview = {
            starRaiting: faker.number.int({ min: 1, max: 5 }) as 1 | 2 | 3 | 4 | 5,
            reviewText: `e2e review ${faker.number.int({ min: 1, max: 1000 })}`,
        };

        await productSinglePageActions.addReviewToProductForSignInUser({
            starRaiting: productReview.starRaiting,
            reviewText: productReview.reviewText,
        });
        await page.waitForSelector(productSinglePageSelectors.productTabs.reviews.authorLabel, { state: 'visible' });

        const productReviews: IApprovedProductSingleReview[] = await productSinglePageActions.getProductReviews();
        await productSinglePageAsserts.verifyProductReview(productReviews, productReview);
    });
});
