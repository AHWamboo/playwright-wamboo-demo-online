import { test as base } from '@playwright/test';
import { wpLoginSelectors } from '../page-objects/wordpress/wp-login/wp-login.page.selectors';
import 'dotenv/config';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TestOptions = {
    adminPanelFormLogIn: (useName: string, username: string) => Promise<void>;
    logInToDashboardAsAdmin: () => Promise<void>;
    adminUserName: string | undefined;
    adminUserPassword: string | undefined;
    userName: string | undefined;
    userPassword: string | undefined;
    wordpressAdminPanelUrlSlug: string;
};

export const test = base.extend<TestOptions>({
    wordpressAdminPanelUrlSlug: ['/wp-admin', { option: true }],
    adminUserName: [process.env.ADMIN_USERNAME, { option: true }],
    adminUserPassword: [process.env.ADMIN_PASSWORD, { option: true }],
    userName: [process.env.USER_NAME, { option: true }],
    userPassword: [process.env.USER_PASSWORD, { option: true }],

    adminPanelFormLogIn: async ({ page }, use) => {
        await use(async (userName: string, userPassword: string) => {
            await page.waitForSelector(wpLoginSelectors.loginForm.emailInput, { state: 'visible' });
            await page.waitForSelector(wpLoginSelectors.loginForm.passwordInput, { state: 'visible' });
            await page.locator(wpLoginSelectors.loginForm.emailInput).fill(userName);
            await page.locator(wpLoginSelectors.loginForm.passwordInput).fill(userPassword);
            await page.locator(wpLoginSelectors.loginForm.submitButton).click();
        });
    },

    logInToDashboardAsAdmin: async (
        { page, adminUserName, adminUserPassword, baseURL, wordpressAdminPanelUrlSlug },
        use
    ) => {
        await use(async () => {
            await page.goto(wordpressAdminPanelUrlSlug, { timeout: 30000 });

            if (typeof adminUserName === 'undefined')
                throw new Error('The environment variable ADMIN_USERNAME must be defined and not empty');
            if (typeof adminUserPassword === 'undefined')
                throw new Error('The environment variable ADMIN_PASSWORD must be defined and not empty');

            await page.waitForSelector(wpLoginSelectors.loginForm.emailInput, { state: 'visible' });
            await page.waitForSelector(wpLoginSelectors.loginForm.passwordInput, { state: 'visible' });
            await page.locator(wpLoginSelectors.loginForm.emailInput).fill(adminUserName);
            await page.locator(wpLoginSelectors.loginForm.passwordInput).fill(adminUserPassword);
            await page.locator(wpLoginSelectors.loginForm.submitButton).click();

            await page.waitForURL(`${baseURL}${wordpressAdminPanelUrlSlug}/`);
        });
    },
});
