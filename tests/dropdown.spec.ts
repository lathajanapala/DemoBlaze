import{test,expect}from'@playwright/test'
test("select options index,lebel one by one and validate",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const selectedOption = await page.locator('#country').selectOption({label:'United States'});
   expect(selectedOption).toContain('usa');
   await page.screenshot({path:'screenshots/options.png'})
    const selectedOption1 = await page.locator('#country').selectOption({value:'australia'});
    expect(selectedOption1).toContain('australia');
    await page.screenshot({path:'screenshots/options1.png'})
    const selectedOption2 = await page.locator('#country').selectOption({index:7});
    expect(selectedOption2).toContain('china');
    await page.screenshot({path:'screenshots/options2.png'})
})
test("select multiple options and validate all selected options are selected",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
   const selectedOptions =await page.locator("#animals").selectOption([{label:'Cheetah'},{label:'Elephant'},{label:'Rabbit'}]);
   expect(selectedOptions).toEqual(expect.arrayContaining(['cheetah','elephant','rabbit']))
})