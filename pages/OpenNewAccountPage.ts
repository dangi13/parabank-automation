import { Page, Locator } from '@playwright/test';

export class OpenNewAccountPage {
  readonly page: Page;
  readonly openNewAccountLink: Locator;
  readonly savingsRadioButton: Locator;
  readonly openAccountButton: Locator;
  readonly newAccountNumberLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
    this.savingsRadioButton = page.locator('input[value="10165"]'); // Example value for Savings
    this.openAccountButton = page.getByRole('button', { name: 'Open New Account' });
    this.newAccountNumberLink = page.locator('#newAccountId');
  }

  async navigate(): Promise<void> {
    await this.openNewAccountLink.click();
  }

  async createSavingsAccount(): Promise<void> {
    await this.savingsRadioButton.click();
    await this.openAccountButton.click();
  }

  async getNewAccountNumber(): Promise<string> {
    await this.page.waitForLoadState('domcontentloaded');
    return (await this.newAccountNumberLink.textContent()) || '';
  }
}