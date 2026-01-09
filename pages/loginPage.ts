import{Page,Locator,expect} from '@playwright/test'
export class LogInPage{
    readonly page:Page;
    readonly loginLink:Locator;
    readonly userName:Locator;
    readonly password: Locator;
    readonly logInButton:Locator;
    readonly logoutButton:Locator;
    readonly loginModal: Locator;



    constructor(page:Page){
        this.page = page;
        // this.loginLink =page.getByRole('link',{name:'"Log in"'});
        this.loginLink = page.locator("#login2");
        this.loginModal = page.locator('#logInModal:visible');
        this.userName = this.loginModal.locator('#loginusername');
        this.password = this.loginModal.locator('#loginpassword');
        // this.logInButton = page.getByRole('button',{name:"Log in"});
        // this.logInButton = page.locator('button[onclick="logIn()"]');
        this.logInButton = this.loginModal.getByRole('button', { name: 'Log in' });
        this.logoutButton = page.getByRole('link',{name:"Log out"})

    }

    async login(username: string, password: string) {
        // Open login modal
        await this.loginLink.click();
        await expect(this.loginModal).toBeVisible();

        // Fill credentials
        await this.userName.fill(username);
        await this.password.fill(password);

        // 🔑 Click login AND wait for login API to complete
        await Promise.all([
          this.page.waitForResponse(response =>
            response.url().includes('login') && response.status() === 200
          ),
          this.logInButton.click(),
        ]);

        // ✅ Stable post-login assertions
        await expect(this.page.getByText('Welcome', { exact: false })).toBeVisible();
        await expect(this.logoutButton).toBeVisible();
      }


}