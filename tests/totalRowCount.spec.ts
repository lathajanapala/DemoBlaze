import { test,expect } from "@playwright/test";

test("Write logic to count total rows across all pages.", async ({ page }) => {
  await page.goto("https://datatables.net/examples/data_sources/ajax.html");

  const rows = page.locator("#example tbody tr");
  const nextButton = page.getByRole("link", { name: "Next" });
  const info = page.locator("#example_info");

  // ✅ CRITICAL: wait for real data, not placeholder
  await expect(page.locator("#example_info"))
  .toHaveText(/Showing 1 to/);

  let totalCount = 0;

  while (true) {
    const rowCount = await rows.count();


    totalCount += rowCount;

    if (await nextButton.isDisabled()) {

      break;
    }

    await nextButton.click();


  }

  console.log("Number of rows in the table are", totalCount); // ✅ 57
});


