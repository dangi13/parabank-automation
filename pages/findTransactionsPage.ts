import { Page, Locator } from '@playwright/test';

export class FindTransactionsPage {
  constructor(public readonly page: Page) {}

  // --- Locators ---
  public getFindTransactionsLink(): Locator {
    return this.page.getByRole('link', { name: 'Find Transactions' });
  }

  public getAccountDropdown(): Locator {
    return this.page.locator('select[name="accountId"]');
  }

  public getTransactionIdInput(): Locator {
    return this.page.locator('input[name="criteria.transactionId"]');
  }

  public getDateInput(): Locator {
    return this.page.locator('input[name="criteria.onDate"]');
  }

  public getFindTransactionsButton(): Locator {
    return this.page.getByRole('button', { name: 'FIND TRANSACTIONS' });
  }

  // --- Actions ---
  async navigate(): Promise<void> {
    await this.page.goto('/parabank/findtrans.htm');
  }

  async findTransactionById(accountId: string, transactionId: string): Promise<void> {
    await this.getAccountDropdown().selectOption({ value: accountId });
    await this.getTransactionIdInput().fill(transactionId);
    await this.getFindTransactionsButton().click();
  }

  async findTransactionByDate(accountId: string, date: string): Promise<void> {
    await this.getAccountDropdown().selectOption({ value: accountId });
    await this.getDateInput().fill(date);
    await this.getFindTransactionsButton().click();
  }
}