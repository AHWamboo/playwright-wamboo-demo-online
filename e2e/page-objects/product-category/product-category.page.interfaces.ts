import { type Locator } from '@playwright/test';

export interface ISingleCategoryProduct {
    image: Locator;
    title: string | null;
    price: string | null;
}
