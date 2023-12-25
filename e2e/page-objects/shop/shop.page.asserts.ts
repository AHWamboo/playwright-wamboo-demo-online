import { type Page, expect } from '@playwright/test';

export class ShopPageAsserts {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyStoreHeader(locator: string, shopLabelToVerify: string): Promise<void> {
        const shopHeader: string | null = await this.page.locator(locator).textContent();

        if (shopHeader == null)
            throw new Error('const shopWelcomeHeader in verifyStoreHeader method is empty');

        expect(shopHeader.trim()).toContain(shopLabelToVerify);
    }
}
