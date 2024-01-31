import { expect, type Page } from '@playwright/test';
import { type IProductSingleReview, type IApprovedProductSingleReview } from './product-single.page.interfaces';
import { getFormattedCurrentDate } from '../../utils/helpers/dates-and-time';

export class ProductSinglePageAsserts {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyProductReview(
        productReviews: IApprovedProductSingleReview[],
        reviewsToVerify: IProductSingleReview
    ): Promise<void> {
        const date: string = getFormattedCurrentDate();
        const ifReviewExist: boolean = productReviews.some((rev) => {
            return (
                rev.starRaiting === reviewsToVerify.starRaiting.toString() &&
                rev.reviewText === reviewsToVerify.reviewText &&
                rev.author?.trim() === 'wamboo-demo.online' &&
                rev.publishedDate === date
            );
        });
        expect(ifReviewExist, {
            message: `verifyProductReview() - Product review: ${reviewsToVerify.reviewText} does not exist on single product page`,
        }).toBe(true);
    }
}
