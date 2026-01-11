import{test,expect} from'@playwright/test'
import { ProductPage } from '../pages/productPage.ts';
test("Get all products names by category",async({page})=>{
    await page.goto("https://www.demoblaze.com/index.html#");
    const productsPage = new ProductPage(page);
   const productBycategory = await productsPage.getallnamesIneachCategory();
   console.log(productBycategory)
})