import { type Locator } from '@playwright/test';

export interface ISingleCategoryProduct {
    image: Locator | null;
    title: string | null;
    reviewStars: string | null;
    price: string | null;
}
