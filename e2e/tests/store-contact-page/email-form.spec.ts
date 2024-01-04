import { test } from '../../config';
import { ContactPageActions, ContactPageAsserts, SUCCESS_LABEL } from '../../page-objects/contact';

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
});
