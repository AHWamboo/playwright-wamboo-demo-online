import { type Page } from '@playwright/test';
import { contactPageSelectors } from './contact.page.selectors';
import { type IEmailShopContactForm } from './contact.page.interfaces';
import { check } from '../../utils/helpers/element-state';

export class ContactPageActions {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async sendEmailMessage(emailData: IEmailShopContactForm): Promise<void> {
        await this.page.locator(contactPageSelectors.contactForm.nameInput).fill(emailData.name);
        await this.page.locator(contactPageSelectors.contactForm.surnameInput).fill(emailData.surname);
        await this.page.locator(contactPageSelectors.contactForm.emailInput).fill(emailData.email);
        await this.page.locator(contactPageSelectors.contactForm.phoneInput).fill(emailData.phone);
        await this.page.locator(contactPageSelectors.contactForm.messageTextArea).fill(emailData.message);
        await check(this.page.locator(contactPageSelectors.contactForm.emailAgreeChbk), emailData.chbkEmail);
        await check(this.page.locator(contactPageSelectors.contactForm.phoneAgreeChbk), emailData.chbkPhone);
        await check(this.page.locator(contactPageSelectors.contactForm.textAgreeChbk), emailData.chbkText);
        await check(this.page.locator(contactPageSelectors.contactForm.termsChbk), emailData.chbkTerms);
        await this.page
            .locator(contactPageSelectors.contactForm.fevCategoryDropDown)
            .selectOption(emailData.fevDropOption);
        await this.page.locator(contactPageSelectors.contactForm.submitButton).click();
    }
}
