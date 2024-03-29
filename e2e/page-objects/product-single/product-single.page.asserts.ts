import { type Dialog, expect, type Page } from '@playwright/test';
import { type IProductSingleReview, type IApprovedProductSingleReview } from './product-single.page.interfaces';
import { getFormattedCurrentDate } from '../../utils/helpers/dates-and-time';
import { productSinglePageSelectors } from './product-single.page.selectors';
import {
    EMPTY_REVIEW_LABEL,
    EMPTY_REVIEW_TEXT_MESSAGE,
    EMPTY_STAR_RATING_DIALOG,
} from './product-single.page.constants';

export class ProductSinglePageAsserts {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    verifyEmptyStarRatingDialogLabel(dialog: Dialog): void {
        expect(dialog.message()).toEqual(EMPTY_STAR_RATING_DIALOG);
    }

    async verifyProductReviewInLowerReviewTab(
        productReviews: IApprovedProductSingleReview[],
        reviewsToVerify: IProductSingleReview
    ): Promise<void> {
        const date: string = getFormattedCurrentDate();
        const ifReviewExist: boolean = productReviews.some((rev) => {
            return (
                rev.starRaiting === reviewsToVerify.starRaiting?.toString() &&
                rev.reviewText === reviewsToVerify.reviewText &&
                rev.author?.trim() === 'wamboo-demo.online' &&
                rev.publishedDate === date
            );
        });
        expect(ifReviewExist, {
            message: `verifyProductReview() - Product review: ${reviewsToVerify.reviewText} does not exist on single product page`,
        }).toEqual(true);
    }

    async verifyProductReviewStarsUnderProductTitle(starsAndLink: {
        starCounter: string;
        linkCounter: number;
    }): Promise<void> {
        const { starCounter, linkCounter } = starsAndLink;
        const collectedStarsAndLink = {
            stars: await this.page.locator(productSinglePageSelectors.productSummary.productRating.stars).textContent(),
            linkCounter: Number(
                await this.page.locator(productSinglePageSelectors.productSummary.productRating.link).textContent()
            ),
        };
        expect(collectedStarsAndLink.stars).toEqual(starCounter);
        expect(collectedStarsAndLink.linkCounter).toEqual(linkCounter);
    }

    async verifyEmptyReviewTabLabel(): Promise<void> {
        const emptyReviewLabel: string | null = await this.page
            .locator(productSinglePageSelectors.productTabs.reviews.noReviewsLabel)
            .textContent();
        expect(emptyReviewLabel).toEqual(EMPTY_REVIEW_LABEL);
    }

    async verifyEmptyReviewTextMessage(): Promise<void> {
        const emptyCommentTextLabel: string | null = await this.page.getByText(EMPTY_REVIEW_TEXT_MESSAGE).textContent();
        expect(emptyCommentTextLabel).toEqual(EMPTY_REVIEW_TEXT_MESSAGE);
    }
}
