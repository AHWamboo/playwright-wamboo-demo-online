import { type Locator } from '@playwright/test';

export async function check(locator: Locator, state: boolean): Promise<void> {
    if (state) await locator.check();
}
