import { type APIResponse, type Page } from '@playwright/test';

export class ProductCategoriesEndpoint {
    page: Page;
    endpoint: string = '/wp-json/wc/v3/products/categories/';

    constructor(page: Page, baseUrl: string | undefined) {
        this.page = page;
        this.endpoint = `${baseUrl}${this.endpoint}`;
    }

    async getListOfAllProductCategories(): Promise<any> {
        const apiResponse: APIResponse = await this.page.request.get(this.endpoint);
        const allProductCategories: any = await apiResponse.json();
        return allProductCategories;
    }
}
