import { test } from '../../../config';
import { WpAdminBarAsserts } from '../../../page-components/wordpress/wp-admin-bar/wp-admin-bar.component.asserts';

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
});
