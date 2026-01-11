import{test,expect} from '@playwright/test'
import { ProductPage } from '../pages/productPage.ts';
test("add product to the the cart",async({page})=>{
    await page.goto("https://www.demoblaze.com/");
    const produPage = new ProductPage(page);
    await produPage.addToCart('Dell i7 8gb')

})
test("add multiple products to the cart page",async({page})=>{
    const produPage = new ProductPage(page);
    await produPage.addMultipleProductsToCart(['Sony xperia z5','Samsung galaxy s6','Apple monitor 24']);
})