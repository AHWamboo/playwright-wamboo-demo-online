import { expect, test } from '@playwright/test';
import {
    type ISingleCategoryProduct,
    ProductCategoryPageActions,
    productCategoryPageSelectors,
} from '../../page-objects/product-category';
import { ProductsEndpoint } from '../../api/productsEndpoint';
import {
    WooCommercePaginationActions,
    WooCommercePaginationAsserts,
} from '../../page-components/wordpress/woocommerce-pagination';
import { ProductCategoriesEndpoint } from '../../api/productCategoriesEndpoint';

test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
});

test.describe('Product category page - default behavior and default values of the products', () => {
    test('All available categories should display the correct number of products previously added to categories', async ({
        page,
        baseURL,
    }) => {
        const productCategoryPageActions: ProductCategoryPageActions = new ProductCategoryPageActions(page);
        const productEndpoint: ProductsEndpoint = new ProductsEndpoint(page, baseURL);
        const productCategorisEndpoint: ProductCategoriesEndpoint = new ProductCategoriesEndpoint(page, baseURL);
        const woocommercePaginationActions: WooCommercePaginationActions = new WooCommercePaginationActions(page);
        const woocommercePaginationAsserts: WooCommercePaginationAsserts = new WooCommercePaginationAsserts(page);

        const allProductCategories = await productCategorisEndpoint.getListOfAllProductCategories();
        for (const category of allProductCategories) {
            await page.goto(`/product-category/${category.slug}`);

            const visibleProductContent: ISingleCategoryProduct[] = [];
            if (await woocommercePaginationAsserts.verifyIfPaginationIsVisible()) {
                const paginationValues: Array<string | null> =
                    await woocommercePaginationActions.getAllPaginationValues();
                for (const value of paginationValues) {
                    if (value !== null) await woocommercePaginationActions.clickPaginationNumber(value);
                    await page.waitForSelector(productCategoryPageSelectors.product.image);
                    const visibleProducts: ISingleCategoryProduct[] =
                        await productCategoryPageActions.getAllAvaliableVisibleProductContent();
                    visibleProductContent.push(...visibleProducts);
                }
            } else {
                const visibleProducts: ISingleCategoryProduct[] =
                    await productCategoryPageActions.getAllAvaliableVisibleProductContent();
                visibleProductContent.push(...visibleProducts);
            }

            const categoryProducts: any = await productEndpoint.getListOfAllProducts({
                category: category.id.toString(),
            });
            const allValuesMatch: boolean = visibleProductContent.every(async (value: ISingleCategoryProduct) =>
                categoryProducts.some((product: any) => product.name === value.price)
            );

            expect(visibleProductContent.length).toEqual(categoryProducts.length);
            expect(allValuesMatch).toBe(true);
        }
    });
});
