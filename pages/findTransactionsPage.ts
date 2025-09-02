import { Page, Locator } from '@playwright/test';

export class FindTransactionsPage {
  readonly page: Page;
  readonly findTransactionsLink: Locator;
  readonly accountDropdown: Locator;
  readonly transactionIdInput: Locator;
  readonly findTransactionsButton: Locator;
  readonly dateInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.findTransactionsLink = page.getByRole('link', { name: 'Find Transactions' });
    this.accountDropdown = page.locator('select[name="accountId"]');
    this.transactionIdInput = page.locator('input[name="criteria.transactionId"]');
    this.dateInput = page.locator('input[name="criteria.onDate"]');
    this.findTransactionsButton = page.getByRole('button', { name: 'FIND TRANSACTIONS' });
  }

  async navigate(): Promise<void> {
     await this.page.goto('/parabank/findtrans.htm');
  }
}