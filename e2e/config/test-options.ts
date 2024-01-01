import { test as base } from '@playwright/test';
import { wpLoginSelectors } from '../page-objects/wordpress/wp-login/wp-login.page.selectors';
import 'dotenv/config';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TestOptions = {
    testBaseUrl: string;
    wordpressAdminPanelUrlSlug: string;
    adminPanelFormLogIn: (useName: string, username: string) => Promise<void>;
    userName: string | undefined;
    userPassword: string | undefined;
};

export const test = base.extend<TestOptions>({
    testBaseUrl: ['https://wamboo-demo.online', { option: true }],
    wordpressAdminPanelUrlSlug: ['/wp-admin', { option: true }],
    userName: [process.env.USER_NAME, { option: true }],
    userPassword: [process.env.USER_PASSWORD, { option: true }],

    adminPanelFormLogIn: async ({ page }, use) => {
        await use(async (userName: string, userPassword: string) => {
            await page.locator(wpLoginSelectors.loginForm.emailInput).fill(userName);
            await page.locator(wpLoginSelectors.loginForm.passwordInput).fill(userPassword);
            await page.locator(wpLoginSelectors.loginForm.submitButton).click();
        });
    },
});
