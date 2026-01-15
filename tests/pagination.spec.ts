import{test,expect} from '@playwright/test'
//first find the locator for number of rows
//find locator for next button
// find locator for the search cell like find the nameof xyz
//let find is false and while is true while(true); if it is true break
//and also put the condition like if next is not visible break

test("find the Shou Itou name if not found in first page click on next until find or next is not visible",async({page})=>{
    await page.goto("https://datatables.net/examples/data_sources/ajax.html");
     const nextButton = page.locator('button[aria-label="Next"]')


    let found =false;
    while(true){
        const rows = page.locator("#example.display tbody tr");
        const shouName= rows.filter({has: page.locator('td:nth-child(1)'),hasText:'Shou Itou'});
        if(await shouName.count()>0){
            console.log("found Shou Itou");
            expect(shouName.first()).toBeVisible();
            found = true;
            break;
        }

     const nextButtonClass = await nextButton.getAttribute('class');
     if (nextButtonClass?.includes('disabled')){
        console.log('Shou Itou name did not found');
        break;
     }
     await nextButton.click();
     await page.waitForTimeout(600)

    }
    expect(found).toBeTruthy()

})