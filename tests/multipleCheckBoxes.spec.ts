import{test,expect} from '@playwright/test'
test("Select multiple check boxes and check",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    for(const day of days.slice(1,4)){
        const checkBox = page.getByLabel(day,{exact:true});
        await checkBox.check();
        await expect(checkBox).toBeChecked();
    }
    await page.screenshot({path:'screenshots/checkBoxes1.png'});
    

})