import { expect, type Locator, type Page } from '@playwright/test';
import { topMainMenuSelectors } from './top-main-menu.component.selectors';
import { NAV_ITEMS_URLS } from './top-main-menu.component.constants';

export class TopMainMenuAsserts {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyNavItemsNames(): Promise<void> {
        const navItems: Locator = this.page.locator(topMainMenuSelectors.nav.items);
        const navItemsLabels: string[] = await navItems.allTextContents();

        const allValuesMatch = navItemsLabels.every((value: string) =>
            NAV_ITEMS_URLS.some((item: { name: string; url: string }) => item.name === value)
        );

        expect(allValuesMatch, {
            message: `Elements of top main menu !== list of elements: \n${JSON.stringify(navItemsLabels)}`,
        }).toEqual(true);
    }

    async verifyUrlPath(urlPath: string): Promise<void> {
        for (const menuItem of NAV_ITEMS_URLS) {
            await this.page.locator(topMainMenuSelectors.nav.itemsLinks).getByText(menuItem.name).click();

            await expect(this.page).toHaveURL(`${urlPath}${menuItem.url}/`);
        }
    }
}
