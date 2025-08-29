import { Page, Locator } from '@playwright/test';

export class AccountsOverviewPage {
  readonly page: Page;
  readonly accountsOverviewLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
  }

  async navigate(): Promise<void> {
    await this.accountsOverviewLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getBalanceForAccount(accountNumber: string): Promise<string | null> {
    const accountRow = this.page.locator(`text=${accountNumber}`).locator('..');
    const balanceCell = accountRow.locator('.ng-binding').nth(1); // Assuming the balance is the second .ng-binding in the row
    return balanceCell.textContent();
  }
}