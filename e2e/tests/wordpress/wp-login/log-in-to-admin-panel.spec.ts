import { type Locator, expect } from '@playwright/test';
import { test } from '../../../config';
import { wpAdminBarSelectors } from '../../../page-components/wordpress/wp-admin-bar';

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
        await adminPanelFormLogIn(userName, userPassword);

        const adminBarHelpLink: Locator = page.locator(wpAdminBarSelectors.adminPanelHelpLink);
        await page.waitForURL(`${baseURL}${wordpressAdminPanelUrlSlug}/`);
        await expect(adminBarHelpLink).toBeVisible();
    });
});
