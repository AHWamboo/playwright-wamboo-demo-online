import { test } from '../../config';
import {
    ContactPageActions,
    ContactPageAsserts,
    FORM_VALIDATION_ERROR,
    SUCCESS_LABEL,
    contactPageSelectors,
} from '../../page-objects/contact';

test.beforeEach(async ({ page }) => {
    await page.goto('/store-contact');
});

test.describe('Sending emails from the contact page and validating the form', () => {
    test('Sending an email with all fields filled in', async ({ page }) => {
        const contactPageActions: ContactPageActions = new ContactPageActions(page);
        const contactPageAsserts: ContactPageAsserts = new ContactPageAsserts(page);

        await contactPageActions.sendEmailMessage({
            name: 'e2e-user-name',
            surname: 'e2e-user-surname',
            email: 'e2e@email.com',
            phone: '111222333',
            message: 'Message from e2e test user',
            chbkEmail: true,
            chbkPhone: true,
            chbkText: true,
            chbkTerms: true,
            fevDropOption: 'Backpacks',
        });
        await contactPageAsserts.verifyContactFormLabel(SUCCESS_LABEL);
    });
    test('Contact form should display validation errors correctly when required fields are blank', async ({ page }) => {
        const contactPageAsserts: ContactPageAsserts = new ContactPageAsserts(page);

        await page.locator(contactPageSelectors.contactForm.submitButton).click();
        await contactPageAsserts.verifyContactFormLabel(FORM_VALIDATION_ERROR.validationLabel);
        await contactPageAsserts.verifyContactFormValidationMessages(FORM_VALIDATION_ERROR.validationMessages);
    });
    test('Contact form input fields should display a red validation box when submitted without all required fields', async ({
        page,
    }) => {
        const contactPageAsserts: ContactPageAsserts = new ContactPageAsserts(page);
        await contactPageAsserts.verifyAppearanceOfFormWithAllRequiredDataMissing();
    });
});
