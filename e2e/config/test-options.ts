import { test as base } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TestOptions = {
    testBaseUrl: string;
    wordpressAdminPanelUrl: string;
};

export const test = base.extend<TestOptions>({
    testBaseUrl: ['https://wamboo-demo.online', { option: true }],
    wordpressAdminPanelUrl: ['https://wamboo-demo.online/wp-admin', { option: true }],
});
