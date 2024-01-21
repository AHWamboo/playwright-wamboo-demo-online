import { type Page } from '@playwright/test';
import { type IProductSingleReview, productSinglePageSelectors } from '.';

export class ProductSinglePageActions {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addReviewToProduct(productReview: IProductSingleReview): Promise<void> {
        await this.page.locator(productSinglePageSelectors.productTabs.reviews.tabTitleLabel).click();
        await this.page
            .locator(productSinglePageSelectors.productTabs.reviews.stars)
            .nth(productReview.starRaiting)
            .click();
        await this.page
            .locator(productSinglePageSelectors.productTabs.reviews.reviewCommentTextArea)
            .fill(productReview.reviewText);
    }
}
