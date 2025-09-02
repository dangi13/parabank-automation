import { Locator, Page } from '@playwright/test';

export class LoginFormComponent {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.locator('input[name="username"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.loginButton = page.locator('input[value="Log In"]')
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}