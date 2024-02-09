export const productSinglePageSelectors = {
    productTabs: {
        reviews: {
            // selectors to add new review
            tabTitleLabel: '.reviews_tab',
            stars: '.stars a',
            reviewCommentTextArea: '.comment-form-comment #comment',
            submitButton: '.form-submit .submit',
            // selectors already existed review
            titleLabel: '.woocommerce-Reviews-title',
            raviewContainer: '.comment-text',
            starRating: '.star-rating .rating',
            authorLabel: '.woocommerce-review__author',
            publishedDateLabel: '.woocommerce-review__published-date',
            reviewDescription: '.description p',
        },
    },
    productSummary: {
        productRating: {
            stars: '.woocommerce-product-rating .star-rating strong.rating',
            link: '.woocommerce-review-link .count',
        },
    },
};
