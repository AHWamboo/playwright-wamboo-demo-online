import { test } from '../../config';
import {
    productSinglePageSelectors,
    ProductSinglePageActions,
    type IApprovedProductSingleReview,
    type IProductSingleReview,
} from '../../page-objects/product-single';
import { ProductSinglePageAsserts } from '../../page-objects/product-single/product-single.page.asserts';
import { faker } from '@faker-js/faker';

test.describe('Single product page reviews - available on the product page, basic operation: adding and verifying addition', () => {
    test.describe.configure({ retries: 3 });

    test.beforeEach(async ({ logInToDashboardAsAdmin }) => {
        await logInToDashboardAsAdmin();
    });

    test('Add a review to the product and see if it exists in the lower review tab and in the product under the title', async ({
        page,
    }) => {
        await page.goto('/product/grippro/');
        const productSinglePageActions: ProductSinglePageActions = new ProductSinglePageActions(page);
        const productSinglePageAsserts: ProductSinglePageAsserts = new ProductSinglePageAsserts(page);
        const productReview: IProductSingleReview = {
            starRaiting: 4,
            reviewText: `e2e review ${faker.number.int({ min: 1, max: 1000 })}`,
            productSlug: '/grippro',
        };

        await productSinglePageActions.addReviewToProductForSignInUser({
            starRaiting: productReview.starRaiting,
            reviewText: productReview.reviewText,
            productSlug: productReview.productSlug,
        });
        await page.waitForSelector(productSinglePageSelectors.productTabs.reviews.authorLabel, { state: 'visible' });

        const productReviews: IApprovedProductSingleReview[] = await productSinglePageActions.getProductReviews();
        await productSinglePageAsserts.verifyProductReviewInLowerReviewTab(productReviews, productReview);
        await productSinglePageAsserts.verifyProductReviewStarsUnderProductTitle({
            starCounter: '4.00',
            linkCounter: productReviews.length,
        });
    });

    test('The empty Review tab should contain the appropriate label and description', async ({ page }) => {
        await page.goto('/product/elevate-tech-stand/');
        await page.locator(productSinglePageSelectors.productTabs.reviews.tabTitleLabel).click();
        const productSinglePageAsserts: ProductSinglePageAsserts = new ProductSinglePageAsserts(page);
        await productSinglePageAsserts.verifyEmptyReviewTabLabel();
    });
});
