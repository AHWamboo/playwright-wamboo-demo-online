import { type Page } from '@playwright/test';

export class ShopPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
