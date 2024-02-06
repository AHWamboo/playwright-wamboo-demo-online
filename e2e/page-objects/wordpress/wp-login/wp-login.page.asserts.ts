import { expect, type Page } from '@playwright/test';
import { wpLoginSelectors } from './wp-login.page.selectors';

export class WpLoginPageAsserts {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyLoginErrorLabel(userName: string): Promise<void> {
        const erroLabel: string | null = await this.page
            .locator(wpLoginSelectors.loginForm.loginErrorLabel)
            .textContent();
        expect(erroLabel).toContain(userName + 'a');
    }
}
