import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/productPage.ts'; // Adjust the path as needed
import { CartPage } from '../pages/cartPage.ts'; // Adjust the path as needed

test("add multiple products and validate cart", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/")

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const productsToAdd = [
        'Sony xperia z5',
        'MacBook air',
        'Apple monitor 24'
      ];

      const addedProducts =
        await productPage.addMultipleProductsToCart(productsToAdd);

      const cartProducts =
        await cartPage.productTitleIntheCart();

      // ✅ Assertion (order-safe)
      expect(cartProducts).toEqual(
        expect.arrayContaining(addedProducts)
      )

});