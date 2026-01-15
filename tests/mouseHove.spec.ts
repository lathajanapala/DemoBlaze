import{test,expect} from '@playwright/test'
test("Handle Mouse Hover and click one of the link",async ({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  page.getByRole('button',{name: "Point Me"}).hover()
  const hoverLinks =page.locator(".dropdown-content a:visible");
  expect(hoverLinks).toBe(2);
  await hoverLinks.filter({hasText:'Mobiles'}).click();
})