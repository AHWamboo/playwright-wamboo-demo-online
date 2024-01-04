import { expect, type Page } from '@playwright/test';
import { contactPageSelectors } from './contact.page.selectors';

export class ContactPageAsserts {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyContactFormLabel(expectedLabel: string): Promise<void> {
        const labelText: string | null = await this.page
            .locator(contactPageSelectors.contactForm.successLabel)
            .textContent();
        expect(labelText).toEqual(expectedLabel);
    }
}
