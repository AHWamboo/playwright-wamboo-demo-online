import { type Locator, type Page } from '@playwright/test';
import { woocommercePaginationSelectors } from './woocommerce-pagination.selectors';

export class WooCommercePaginationActions {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getAllPaginationValues(): Promise<Array<string | null>> {
        const pagination: Locator[] = await this.page
            .locator(woocommercePaginationSelectors.paginationListElements)
            .all();

        const paginationValues: Array<string | null> = await Promise.all(
            pagination.map(async (value: Locator) => {
                return await value.textContent();
            })
        );
        paginationValues.pop();
        return paginationValues;
    }

    async clickPaginationNumber(paginationNumber: string): Promise<void> {
        await this.page
            .locator(woocommercePaginationSelectors.paginationListElements)
            .getByText(paginationNumber)
            .click();
    }
}
