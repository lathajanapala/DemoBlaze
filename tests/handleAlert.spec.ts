import{test,expect} from '@playwright/test'
test("Validate simple alert",async({page})=>{
 await page.goto("https://testautomationpractice.blogspot.com/");
 page.on('dialog',async dialog=>{
  expect(dialog.message()).toBe('I am an alert box!');
  await dialog.accept()
 })
 await page.getByRole('button',{name: "Simple Alert"}).click();
})
test("Validate confirmation alert",async({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  page.on('dialog',async dialog=>{
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('Press a button!');
    await dialog.accept()
  })
  await page.getByRole('button',{name: "Confirmation Alert"}).click();
  expect(page.locator('#demo')).toHaveText('You pressed OK!')
});
test("Validate propmpt alert button and enter name and assert after click message",async({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
 page.on('dialog', async dialog=>{
  expect(dialog.type()).toBe('prompt');
  expect(dialog.message()).toBe("Please enter your name:");
  await dialog.accept('xyz')
 })

  await page.getByRole('button',{name: "Prompt Alert"}).click();
  await expect(page.locator("#demo")).toHaveText('Hello xyz! How are you today?')


})