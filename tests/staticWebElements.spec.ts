import { test, expect } from '@playwright/test'
test("validate static webelements", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const tabeleRows = page.locator("table[name='BookTable'] tbody tr");
    const rowCount = await tabeleRows.count();
    expect(rowCount).toBeGreaterThan(6);
})
test("column index of the price column", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const headerText = page.locator("table[name='BookTable'] tbody tr th");
    const headerTexts = headerText.allInnerTexts();
    const priceColumnIndex = (await headerTexts).findIndex(text => text.trim() === 'Price') + 1;
    console.log("Price column index:", priceColumnIndex);
    const priceCells = page.locator(`table[name='BookTable'] tbody tr td:nth-child(${priceColumnIndex})`);
    console.log(await priceCells.allInnerTexts());

})
test("get only book name column", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const rows = page.locator("table[name='BookTable'] tbody tr");
    const bookNameColumnRows = rows.locator("td:nth-child(1)")
    const bookNamesTexts = await bookNameColumnRows.allInnerTexts();
    console.log(bookNamesTexts);
})
test("extract all book name in to an array", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const rows = page.locator("table[name='BookTable'] tbody tr ");
    const allNamesArray: string[] = [];
    const allBookNames = rows.locator("td:nth-child(1)");
    const bookNames = await allBookNames.allInnerTexts();
    for (const bookName of bookNames) {
        allNamesArray.push(bookName)
    }
    console.log(allNamesArray)

})
test("get Author and Subject for “Learn JS” from the table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const row = page.locator("table[name='BookTable'] tbody tr").filter({ hasText: "Learn JS" });
    const author = await row.locator("td:nth-child(2)").innerText();
    const subject = await row.locator("td:nth-child(3)").innerText();
    console.log(`Author is : ${author} and subject is:${subject}`)

})
test("Extract price as numbers instead of strings", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const rows = page.locator("table[name='BookTable'] tbody tr");
    const priceColumn = rows.locator("td:nth-child(4)");
    const priceCells = await priceColumn.allInnerTexts();
    const priceNumbers = priceCells.map(price => Number(price.trim()));
    expect(priceNumbers).toEqual([300, 500, 300, 3000, 2000, 1000])
})
test("assert that “Mukesh” appears exactly twice in the Author column",async({page})=>{
    page.goto("https://testautomationpractice.blogspot.com/");
   const allNames = await page.locator("table[name='BookTable'] tbody tr td:nth-child(2)").allInnerTexts();
   const mukeshCount = allNames.filter(name => name.trim() === 'Mukesh').length;
   expect(mukeshCount).toBe(2);
})
test("Verify that all prices are greater than 0",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const rows = page.locator("table[name='BookTable'] tbody tr");
    const priceColumn = rows.locator("td:nth-child(4)");
    const priceCells = await priceColumn.allInnerTexts();
    const priceNumbers = priceCells.map(price => Number(price.trim()));
    for(const price of priceNumbers){
     expect(price).toBeGreaterThan(0)
    }
});
test("Assert that Master In Selenium has price 3000",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const masterInSeleniumRow = page.locator("table[name='BookTable'] tbody tr").filter({hasText:'Master In Selenium'})
    const priceText = await masterInSeleniumRow.locator("td:nth-child(4)").innerText();
    const price = Number(priceText.trim())
    expect(price).toBe(3000);
    console.log(price)
})
test("verify that BookName values are unique",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const bookNames = await page.locator("table[name='BookTable'] tbody tr td:nth-child(1)").allInnerTexts();
    const uniqueNames = new Set(bookNames);
    expect(uniqueNames.size).toBe(bookNames.length)
})
test(" validate that Subject column contains only valid subjects (Java, Selenium, Javascript)",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const subjectTexts = (await page.locator("table[name='BookTable'] tbody tr td:nth-child(3)").allInnerTexts()).map(text => text.trim().toLowerCase());
    const validSubjects = ['java', 'selenium', 'javascript'];
    const allValid = subjectTexts.every(subject => validSubjects.includes(subject));
    expect(allValid).toBe(true);
})
