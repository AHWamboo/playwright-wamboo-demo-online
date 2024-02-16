import { type Locator, type Page } from '@playwright/test';
import { type IProductSingleReview, productSinglePageSelectors, type IApprovedProductSingleReview } from '.';

export class ProductSinglePageActions {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addReviewToProductForSignInUser(productReview: IProductSingleReview): Promise<void> {
        await this.page.locator(productSinglePageSelectors.productTabs.reviews.tabTitleLabel).click();
        if (productReview.starRaiting !== null)
            await this.page
                .locator(productSinglePageSelectors.productTabs.reviews.stars)
                .nth(productReview.starRaiting - 1)
                .click();
        await this.page
            .locator(productSinglePageSelectors.productTabs.reviews.reviewCommentTextArea)
            .fill(productReview.reviewText ?? '');
        if (productReview.productSlug !== null) {
            const requestPromise = this.page.waitForResponse(
                (response) => response.url().includes(productReview.productSlug ?? '') && response.status() === 200
            );
            await this.page.locator(productSinglePageSelectors.productTabs.reviews.submitButton).click();
            await requestPromise;
        } else {
            await this.page.locator(productSinglePageSelectors.productTabs.reviews.submitButton).click();
        }
    }

    async getProductReviews(): Promise<IApprovedProductSingleReview[]> {
        const allReviews: Locator[] = await this.page
            .locator(productSinglePageSelectors.productTabs.reviews.raviewContainer)
            .all();

        const reviews: IApprovedProductSingleReview[] = [];
        for (const review of allReviews) {
            reviews.push({
                starRaiting: await review
                    .locator(productSinglePageSelectors.productTabs.reviews.starRating)
                    .textContent(),
                author: await review.locator(productSinglePageSelectors.productTabs.reviews.authorLabel).textContent(),
                publishedDate: await review
                    .locator(productSinglePageSelectors.productTabs.reviews.publishedDateLabel)
                    .textContent(),
                reviewText: await review
                    .locator(productSinglePageSelectors.productTabs.reviews.reviewDescription)
                    .textContent(),
            });
        }
        return reviews;
    }
}
