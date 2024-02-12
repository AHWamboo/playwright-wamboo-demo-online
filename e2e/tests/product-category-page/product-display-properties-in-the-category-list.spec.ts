import { test } from '../../config';
import { ProductCategoryPageActions, ProductCategoryPageAsserts } from '../../page-objects/product-category';
import { ProductSinglePageActions, type IProductSingleReview } from '../../page-objects/product-single';
import { faker } from '@faker-js/faker';

test.describe('Properties of displaying the product in the list of categories such as name, price, starred reviews, for example', () => {
    test.describe.configure({ retries: 3 });

    test.beforeEach(async ({ logInToDashboardAsAdmin }) => {
        await logInToDashboardAsAdmin();
    });

    test('A review added to a single product should be displayed as a star counter on the list of products in the category', async ({
        page,
    }) => {
        await page.goto('/product/nanogrip/');
        const productSinglePageActions: ProductSinglePageActions = new ProductSinglePageActions(page);
        const productCategoryPageAction: ProductCategoryPageActions = new ProductCategoryPageActions(page);
        const productCategoryPageAsserts: ProductCategoryPageAsserts = new ProductCategoryPageAsserts(page);

        const productReview: IProductSingleReview = {
            starRaiting: 3,
            reviewText: `e2e review ${faker.number.int({ min: 1, max: 1000 })}`,
            productSlug: '/nanogrip',
        };

        await productSinglePageActions.addReviewToProductForSignInUser({
            starRaiting: productReview.starRaiting,
            reviewText: productReview.reviewText,
            productSlug: productReview.productSlug,
        });

        await page.goto('/product-category/phone-tablet-stand/');

        const singleCategoryProductReviewStarsValue: string | null = (
            await productCategoryPageAction.getSingleVisibleProductContentByItsName('NanoGrip')
        ).reviewStars;

        if (singleCategoryProductReviewStarsValue === null) {
            throw Error('singleCategoryProductReviewStarsValue - is type of null, probably the value is empty');
        }
        productCategoryPageAsserts.verifySingleProductStarReviewRaiting(singleCategoryProductReviewStarsValue, '3.00');
    });
});
