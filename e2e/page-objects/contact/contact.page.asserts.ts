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

    async verifyContactFormValidationMessages(expectedMessages: string[]): Promise<void> {
        const formMessages: string[] = await this.page
            .locator(contactPageSelectors.contactForm.validationMessages)
            .allTextContents();

        const matchMessagesValues = expectedMessages.every((value: string) =>
            formMessages.some((item: string) => item === value)
        );

        expect(matchMessagesValues, {
            message: `Contact form validation messages error: \n expected validation messages = ${JSON.stringify(
                expectedMessages
            )} \n !== \n contact form validation messages = ${JSON.stringify(formMessages)}`,
        }).toEqual(true);
    }
}
