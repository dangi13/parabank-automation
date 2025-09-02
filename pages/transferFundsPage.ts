import { Page, Locator, expect } from '@playwright/test';

export class TransferFundsPage {
  readonly page: Page;
  readonly transferFundsLink: Locator;
  readonly amountInput: Locator;
  readonly fromAccountDropdown: Locator;
  readonly toAccountDropdown: Locator;
  readonly transferButton: Locator;
  readonly header: Locator;
  readonly amountResult: Locator;
  readonly fromAccountIdResult: Locator;
  readonly toAccountIdResult: Locator;
  readonly activityDetailsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
    this.amountInput = page.locator('#amount');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.toAccountDropdown = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.header = page.getByRole('heading', { name: 'Transfer Complete!' });
    this.amountResult = page.locator('#amountResult');
    this.fromAccountIdResult = page.locator('#fromAccountIdResult');
    this.toAccountIdResult = page.locator('#toAccountIdResult');
    this.activityDetailsMessage = page.getByText('See Account Activity for more details.');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/parabank/transfer.htm');
  }

  async transferFunds(amount: string, fromAccount: string, toAccount: string): Promise<void> {
    await this.amountInput.fill(amount);
    await this.fromAccountDropdown.selectOption(fromAccount);
    await this.toAccountDropdown.selectOption(toAccount);
    await this.transferButton.click();
  }

    async validateTransfer(amount: string, fromAccount: string, toAccount: string): Promise<void> {
    await expect(this.header).toBeVisible();
     await expect(this.header).toHaveText('Transfer Complete!');
    await expect(this.activityDetailsMessage).toHaveText('See Account Activity for more details.');

    await expect(this.amountResult).toHaveText("$"+ amount);
    await expect(this.fromAccountIdResult).toHaveText(fromAccount);
    await expect(this.toAccountIdResult).toHaveText(toAccount);

    const transferMessage = new RegExp(`${amount} has been transferred from account #${fromAccount} to account #${toAccount}.`);
    await expect(this.page.getByText(transferMessage)).toBeVisible();
    await expect(this.activityDetailsMessage).toBeVisible();
  }
}