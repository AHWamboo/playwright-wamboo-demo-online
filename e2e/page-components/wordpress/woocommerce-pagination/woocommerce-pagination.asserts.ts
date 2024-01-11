import { type Page } from '@playwright/test';
import { woocommercePaginationSelectors } from './woocommerce-pagination.selectors';

export class WooCommercePaginationAsserts {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyIfPaginationIsVisible(): Promise<boolean> {
        return await this.page.isVisible(woocommercePaginationSelectors.pagination);
    }
}
