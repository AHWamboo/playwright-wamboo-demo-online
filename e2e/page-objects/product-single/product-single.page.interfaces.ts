export interface IProductSingleReview {
    starRaiting: 1 | 2 | 3 | 4 | 5;
    reviewText: string;
    productSlug: string;
}

export interface IApprovedProductSingleReview {
    starRaiting: string | null;
    author: string | null;
    publishedDate: string | null;
    reviewText: string | null;
}
