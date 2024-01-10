import { type Page } from '@playwright/test';

export class ProductsEndpoint {
    page: Page;
    endpoint: string = '/wp-json/wc/v3/products/';

    constructor(page: Page, baseUrl: string | undefined) {
        this.page = page;
        this.endpoint = `${baseUrl}${this.endpoint}`;
    }

    async getListOfAllProducts(options: any): Promise<any> {
        const apiResponse = await this.page.request.get(this.endpoint, {
            data: options,
        });
        const categoryProducts = await apiResponse.json();
        return categoryProducts;
    }
}
