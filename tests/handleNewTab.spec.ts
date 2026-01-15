import{test,expect} from '@playwright/test';
test("Handle new page and perform actionns",async ({page})=>{
   await page.goto("https://the-internet.herokuapp.com/windows");
   const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: "Click Here" }).click()
   ]);

   await newPage.waitForLoadState();
   await expect(newPage.getByRole('heading', { name: "New Window" })).toBeVisible();
   expect(newPage.url()).toBe("https://the-internet.herokuapp.com/windows/new");
   await newPage.close();
});
test.skip("Handle two popups with page.on listener",async({page})=>{
    //open the website
    await page.goto("https://testautomationpractice.blogspot.com/");
    const [popup1,popup2] = await Promise.all([
        page.waitForEvent('popup'),
        page.waitForEvent('popup'),
        await page.getByRole('button',{name: "Popup Windows"}).click()]);
        await popup1.waitForLoadState();
        expect(popup1.url()).toContain("https://www.selenium.dev/");
        await popup2.waitForLoadState();
        expect(popup2.url()).toContain("https://playwright.dev/");
        await popup1.close();
        await popup2.close()
});
test("Handle multiple popups and perform actions on the new windows", async({page})=>{
    //Open website
    await page.goto("https://testautomationpractice.blogspot.com/");
  const popups: any[]=[];
    page.on('popup',popup=>{
        popups.push(popup)
    });
    // find the locator for the button and click()
    page.getByRole('button',{name: "Popup Windows"}).click();
    // ✅ Wait until expected popups appear
  await expect.poll(() => popups.length).toBeGreaterThan(1);

    //wait for the pages to load
    await page.waitForLoadState();
    expect(popups.length).toBeGreaterThan(1);
    for(const popup of popups){
        await popup.waitForLoadState();
        const url =  popup.url();
        if(url.includes("https://www.selenium.dev/")){
           await popup.getByRole('link',{name:"READ MORE "}).first().click();
             expect(popup.url()).toContain('webdriver/');
             const title = await popup.title();
            console.log(title)
        }
        if(url.includes("https://playwright.dev/")){
            const title = await popup.title();
            console.log(title)
        }
        await popup.close()
    }
})
