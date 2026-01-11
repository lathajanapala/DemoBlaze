import { test, expect } from '@playwright/test'
import path from 'path';
test("upload text file and validate uploaded information text", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    const filePath = path.join(__dirname, '../test-data/text1.txt')
    await page.locator('#singleFileInput').setInputFiles(filePath);

    await page.getByRole('button', { name: "Upload Single File" }).click();
    await expect(page.locator("#singleFileStatus")).toContainText("Single file selected: text1.txt")
})
test("upload multiple file and validate text after upload", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const files = [path.join(__dirname, '../test-data/text1.txt'), path.join(__dirname, '../test-data/text2.txt')];
    await page.locator('#multipleFilesInput').setInputFiles(files);

    await page.getByRole('button', { name: "Upload Multiple Files" }).click();
    const status = page.locator('#multipleFilesStatus');

    await expect(status).toContainText('Multiple files selected');
    await expect(status).toContainText('text1.txt');
    await expect(status).toContainText('text2.txt');
})
