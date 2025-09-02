import { Page, Locator, expect } from '@playwright/test';

export class TransferFundsPage {
  constructor(public readonly page: Page) {}

  // --- Locators ---
  public getTransferFundsLink(): Locator {
    return this.page.getByRole('link', { name: 'Transfer Funds' });
  }

  public getAmountInput(): Locator {
    return this.page.locator('#amount');
  }

  public getFromAccountDropdown(): Locator {
    return this.page.locator('#fromAccountId');
  }

  public getToAccountDropdown(): Locator {
    return this.page.locator('#toAccountId');
  }

  public getTransferButton(): Locator {
    return this.page.getByRole('button', { name: 'Transfer' });
  }

  public getHeader(): Locator {
    return this.page.getByRole('heading', { name: 'Transfer Complete!' });
  }

  public getAmountResult(): Locator {
    return this.page.locator('#amountResult');
  }

  public getFromAccountIdResult(): Locator {
    return this.page.locator('#fromAccountIdResult');
  }

  public getToAccountIdResult(): Locator {
    return this.page.locator('#toAccountIdResult');
  }

  public getActivityDetailsMessage(): Locator {
    return this.page.getByText('See Account Activity for more details.');
  }

  // --- Actions ---
  async navigate(): Promise<void> {
    await this.page.goto('/parabank/transfer.htm');
  }

  async transferFunds(amount: string, fromAccount: string, toAccount: string): Promise<void> {
    await this.getAmountInput().fill(amount);
    await this.getFromAccountDropdown().selectOption(fromAccount);
    await this.getToAccountDropdown().selectOption(toAccount);
    await this.getTransferButton().click();
  }

  async validateTransfer(amount: string, fromAccount: string, toAccount: string): Promise<void> {
    await expect(this.getHeader()).toBeVisible();
    await expect(this.getHeader()).toHaveText('Transfer Complete!');
    await expect(this.getActivityDetailsMessage()).toHaveText('See Account Activity for more details.');

    await expect(this.getAmountResult()).toHaveText("$" + amount);
    await expect(this.getFromAccountIdResult()).toHaveText(fromAccount);
    await expect(this.getToAccountIdResult()).toHaveText(toAccount);

    const transferMessage = new RegExp(`${amount} has been transferred from account #${fromAccount} to account #${toAccount}.`);
    await expect(this.page.getByText(transferMessage)).toBeVisible();
    await expect(this.getActivityDetailsMessage()).toBeVisible();
  }
}