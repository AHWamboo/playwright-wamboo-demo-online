import { type Page, type Locator, expect } from '@playwright/test';
import { wpAdminBarSelectors } from '.';

export class WpAdminBarAsserts {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyIfAdminBarHelpLinkIsVisible(): Promise<void> {
        const adminBarHelpLink: Locator = this.page.locator(wpAdminBarSelectors.adminPanelHelpLink);
        await expect(adminBarHelpLink).toBeVisible();
    }
}
