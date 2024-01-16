import { expect, type Locator, type Page } from '@playwright/test';
import { ProductCategoryPageActions } from './product-category.page.actions';
import { type ISingleCategoryProduct } from './product-category.page.interfaces';
import { EMPTY_PRODUCT_CATEGORY_LABEL } from './product-category.page.constants';

export class ProductCategoryPageAsserts {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyIfUncategorisedCategoryIsEmpty(): Promise<void> {
        const productCategoryPageActions: ProductCategoryPageActions = new ProductCategoryPageActions(this.page);
        const avaliableProducts: ISingleCategoryProduct[] =
            await productCategoryPageActions.getAllAvaliableVisibleProductContent();

        expect(avaliableProducts.length, { message: 'Uncategorised product category is not empty' }).toEqual(0);
    }

    async verifyEmptyCategoryPageLabel(): Promise<void> {
        const noProductsLabel: Locator | undefined = this.page.getByText(EMPTY_PRODUCT_CATEGORY_LABEL);

        await expect(noProductsLabel).toContainText(EMPTY_PRODUCT_CATEGORY_LABEL);
    }
}
