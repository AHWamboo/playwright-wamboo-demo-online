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

test.beforeEach(async ({ page }) => {
    await page.goto('/product-category/phone-tablet-stand');
});

test.describe('Product category page - default behavior and default values of the products', () => {
    test('On the Phone/tablet stand category page, ID: 30, there should be a sufficient number of available and previously added products', async ({
        page,
        baseURL,
    }) => {
        const productCategoryPageActions: ProductCategoryPageActions = new ProductCategoryPageActions(page);
        const productEndpoint: ProductsEndpoint = new ProductsEndpoint(page, baseURL);
        const woocommercePaginationActions: WooCommercePaginationActions = new WooCommercePaginationActions(page);
        const woocommercePaginationAsserts: WooCommercePaginationAsserts = new WooCommercePaginationAsserts(page);

        const visibleProductContent: ISingleCategoryProduct[] = [];
        if (await woocommercePaginationAsserts.verifyIfPaginationIsVisible()) {
            const paginationValues: Array<string | null> = await woocommercePaginationActions.getAllPaginationValues();
            for (const value of paginationValues) {
                if (value !== null) await woocommercePaginationActions.clickPaginationNumber(value);
                await page.waitForSelector(productCategoryPageSelectors.product.image);
                const visibleProducts = await productCategoryPageActions.getAllAvaliableVisibleProductContent();
                visibleProductContent.push(...visibleProducts);
            }
        }

        const categoryProducts: any = await productEndpoint.getListOfAllProducts({ category: '30' });
        const allValuesMatch: boolean = visibleProductContent.every(async (value: ISingleCategoryProduct) =>
            categoryProducts.some((product: any) => product.name === value.price)
        );

        expect(visibleProductContent.length).toEqual(categoryProducts.length);
        expect(allValuesMatch).toBe(true);
    });
});
