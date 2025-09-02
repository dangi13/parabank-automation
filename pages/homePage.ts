import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly profileLink: Locator;
  readonly logoutButton: Locator;
  readonly openNewAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.getByText('Welcome,');
    this.profileLink = page.locator('#profile-link');
    this.logoutButton = page.locator('#logout-button');
    this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
  }

  async navigate(): Promise<void> {
    await this.page.goto('/parabank/index.htm');
  }

  async clickOpenNewAccountLink(): Promise<void> {
    await this.openNewAccountLink.click();
  }
}