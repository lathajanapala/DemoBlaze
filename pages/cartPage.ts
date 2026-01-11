import{Page,Locator,expect} from '@playwright/test';
export class CartPage{
    readonly page:Page;
    readonly cartLink:Locator
    readonly tableRows:Locator;
    readonly titleColumn:Locator;


constructor(page:Page){
    this.page = page;
    this.tableRows = page.locator('.table tbody tr');
    this.titleColumn = this.tableRows.locator('td:nth-child(2)');
    this.cartLink = page.getByRole('link', { name: "Cart", exact: true });
}
async findRowsIntheCart():Promise<string[]>{
    await this.page.goto('https://www.demoblaze.com/cart.html');
    const rowCount = await this.tableRows.count();
    const rows: string[] = [];
    for (let i = 0; i < rowCount; i++) {
        const rowText = await this.tableRows.nth(i).innerText();
        rows.push(rowText);
    }
    return rows;
}
async productTitleIntheCart(): Promise<string[]> {
    await this.page.goto('https://www.demoblaze.com/cart.html');
    await expect(this.tableRows.first()).toBeVisible();
    const productTitles = await this.titleColumn.allInnerTexts();
    return productTitles.map(t=>t.trim());
}
}