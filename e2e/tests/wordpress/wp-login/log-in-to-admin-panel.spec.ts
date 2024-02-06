import { test } from '../../../config';
import { WpAdminBarAsserts } from '../../../page-components/wordpress/wp-admin-bar/wp-admin-bar.component.asserts';
import { WpLoginPageAsserts } from '../../../page-objects/wordpress/wp-login';
import { BaseError } from '../../../utils/errors';
// test commit a
test.beforeEach(async ({ page, wordpressAdminPanelUrlSlug }) => {
    await page.goto(`${wordpressAdminPanelUrlSlug}`);
});

test.describe('Wordpress log in website - user log in options', () => {
    test('User can log in using the wordpress login form', async ({
        page,
        adminPanelFormLogIn,
        userName,
        userPassword,
        baseURL,
        wordpressAdminPanelUrlSlug,
    }) => {
        if (typeof userName === 'undefined')
            throw new Error('The environment variable USER_NAME must be defined and not empty');
        if (typeof userPassword === 'undefined')
            throw new Error('The environment variable USER_PASSWORD must be defined and not empty');

        const wpAdminBarAsserts: WpAdminBarAsserts = new WpAdminBarAsserts(page);
        await adminPanelFormLogIn(userName, userPassword);
        await page.waitForURL(`${baseURL}${wordpressAdminPanelUrlSlug}/`);
        await wpAdminBarAsserts.verifyIfAdminBarHelpLinkIsVisible();
    });
    test('User can not log in using wordpress login form, the wrong user should display the correct error label', async ({
        page,
        adminPanelFormLogIn,
        userName,
    }) => {
        if (typeof userName === 'undefined')
            throw new BaseError({
                errorName: 'MISSING_ENV_VARIABLE',
                message: 'The environment variable USER_NAME must be defined and not empty',
            });

        const wpLoginAsserts: WpLoginPageAsserts = new WpLoginPageAsserts(page);
        await adminPanelFormLogIn(userName, 'wrongPassword');
        await wpLoginAsserts.verifyLoginErrorLabel(userName);
    });
});
