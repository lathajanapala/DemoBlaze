import { Page, Locator, expect } from '@playwright/test'
export class ProductPage {
    readonly page: Page;
    readonly itemsIncatogery: Locator;
    readonly productTitles: Locator;
    readonly category:Locator;
    readonly nextButton:Locator;
    readonly addToCartButton:Locator;





    constructor(page: Page) {
        this.page = page;
        this.itemsIncatogery = page.locator('.list-group #itemc');
        this.productTitles = page.locator('#tbodyid .card-title a');
        this.category = page.locator('a#cat',{hasText:'CATEGORIES'});
        this.nextButton = page.locator(".pagination #next2");
        this.addToCartButton = page.getByRole('link',{name:"Add to cart"});


    }

    async getallnamesIneachCategory() {
        const categoryCount = await this.itemsIncatogery.count();
        const result: Record<string, string[]> = {};
        for (let i = 0; i < categoryCount; i++) {
            const category = this.itemsIncatogery.nth(i);
            const categoryName = (await category.textContent())?.trim() || "";
            const previousCount = await this.productTitles.count();
            await category.click();
            await expect
                .poll(async () => await this.productTitles.count())
                .not.toBe(previousCount);
            await this.productTitles.first().waitFor({ state: 'visible' });
            const titles = await this.productTitles.allInnerTexts();
            result[categoryName] = titles.map(t => t.trim());

        }
        return result;
    }
    async addToCart(producttitle:string){
        while(true){
        const product =  this.productTitles.filter({hasText: new RegExp(`^${producttitle}$`, 'i')});
        if(await product.count()>0){
            const firstProduct = product.first();
            await firstProduct.scrollIntoViewIfNeeded();
            await firstProduct.click();
            await Promise.all([
                this.page.waitForEvent('dialog').then(async dialog => {
                  expect(dialog.message()).toContain('Product added');
                  await dialog.accept();
                }),
                this.page.getByRole('link', { name: 'Add to cart' }).click(),
              ]);
            return;
        }
        if (await this.nextButton.isVisible()) {
            const previousTitles = await this.productTitles.allInnerTexts();

            await this.nextButton.scrollIntoViewIfNeeded();
            await this.nextButton.click();

            // ✅ Wait until products actually change
            await expect
              .poll(async () => await this.productTitles.allInnerTexts())
              .not.toEqual(previousTitles);

          } else {
            throw new Error(`Product "${producttitle}" is not visible on any page`);
    }
}
}
async addMultipleProductsToCart(products: string[]) {
    const addedProducts: string[] = [];
    for (const title of products) {
      // Always start from a known state
      await this.page.goto('https://www.demoblaze.com/index.html');
      await expect(this.productTitles.first()).toBeVisible();

      await this.addToCart(title);
      addedProducts.push(title)
    }
    return addedProducts;
  }
}