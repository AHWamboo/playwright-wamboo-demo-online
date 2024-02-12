import { type Locator, type Page } from '@playwright/test';
import { productCategoryPageSelectors } from './product-category.page.selectors';
import { type ISingleCategoryProduct } from './product-category.page.interfaces';

export class ProductCategoryPageActions {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getAllAvaliableVisibleProductContent(): Promise<ISingleCategoryProduct[]> {
        const allVisibleCategoryProducts: Locator[] = await this.page
            .locator(productCategoryPageSelectors.product.list)
            .all();
        const productCategoryObjects: ISingleCategoryProduct[] = [];

        for (const product of allVisibleCategoryProducts) {
            productCategoryObjects.push({
                image: product.locator(productCategoryPageSelectors.product.image),
                title: await product.locator(productCategoryPageSelectors.product.title).textContent(),
                reviewStars:
                    (await product.locator(productCategoryPageSelectors.product.starRating).textContent()) ?? null,
                price: await product.locator(productCategoryPageSelectors.product.price).textContent(),
            });
        }
        return productCategoryObjects;
    }

    async getSingleVisibleProductContentByItsName(productName: string): Promise<ISingleCategoryProduct> {
        const singleProductContent: Locator = this.page.locator(productCategoryPageSelectors.product.listLink, {
            hasText: productName,
        });

        const singleCategoryProductDetails: ISingleCategoryProduct = {
            image: singleProductContent.locator(productCategoryPageSelectors.product.image),
            title: await singleProductContent.locator(productCategoryPageSelectors.product.title).textContent(),
            reviewStars: await singleProductContent
                .locator(productCategoryPageSelectors.product.starRating)
                .textContent(),
            price: await singleProductContent.locator(productCategoryPageSelectors.product.price).textContent(),
        };
        return singleCategoryProductDetails;
    }
}
