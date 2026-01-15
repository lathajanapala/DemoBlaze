import{test,expect} from '@playwright/test'
test("Handle Mouse Hover and click one of the link",async ({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByRole('button',{name: "Point Me"}).hover()
  const hoverLinks =page.locator(".dropdown-content a:visible");
  await expect(hoverLinks).toHaveCount(2);
  await hoverLinks.filter({hasText:'Mobiles'}).click();
})