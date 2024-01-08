import { expect, type Locator, type Page } from '@playwright/test';
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

    async verifyAppearanceOfFormWithAllRequiredDataMissing(): Promise<void> {
        await this.page.locator(contactPageSelectors.contactForm.submitButton).click();
        const contactForm: Locator = this.page.locator(contactPageSelectors.contactForm.form);

        [
            this.page.locator(contactPageSelectors.contactForm.nameInput),
            this.page.locator(contactPageSelectors.contactForm.surnameInput),
            this.page.locator(contactPageSelectors.contactForm.emailInput),
            this.page.locator(contactPageSelectors.contactForm.phoneInput),
            this.page.locator(contactPageSelectors.contactForm.messageTextArea),
            this.page.locator(contactPageSelectors.contactForm.fevCategoryDropDown),
        ].every(async (inputElement) => {
            await expect(inputElement).toHaveClass(/et_contact_error/);
            await expect(inputElement).toHaveCSS('border', '1px solid rgb(255, 0, 0)');
        });

        await expect(this.page.locator(contactPageSelectors.contactForm.termsLabel)).toHaveCSS(
            'color',
            'rgb(255, 0, 0)'
        );

        await expect(contactForm).toHaveScreenshot({ maxDiffPixels: 10 });
    }
}
