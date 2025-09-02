import { Locator, Page } from '@playwright/test';

export class LoginFormComponent {
  constructor(private page: Page) {}

  // --- Locators ---
  public getUsernameInput(): Locator {
    return this.page.locator('input[name="username"]');
  }

  public getPasswordInput(): Locator {
    return this.page.locator('input[name="password"]');
  }

  public getLoginButton(): Locator {
    return this.page.locator('input[value="Log In"]');
  }

  // --- Actions ---
  async login(username: string, password: string) {
    await this.getUsernameInput().fill(username);
    await this.getPasswordInput().fill(password);
    await this.getLoginButton().click();
  }
}