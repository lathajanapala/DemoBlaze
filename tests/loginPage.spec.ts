import{test,expect} from '@playwright/test'
import { LogInPage } from '../pages/loginPage';
test("enter userrname and password and login",async({page})=>{
    await page.goto("https://www.demoblaze.com/");
    await page.waitForTimeout(3000);
    const loginPage =new LogInPage(page);
    await loginPage.login('Pushpa.Janapal','asdf1234!');
})