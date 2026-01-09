import{test,expect} from '@playwright/test'
import { ProductPage } from '../pages/ProductsPage';
test("add product to the the cart",async({page})=>{
    await page.goto("https://www.demoblaze.com/");
    const produPage = new ProductPage(page);
    await produPage.addToCart('Dell i7 8gb')

})