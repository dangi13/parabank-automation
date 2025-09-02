import { Page, Locator } from '@playwright/test';

export class AtmServicesComponent {
  constructor(private page: Page) {}

  // --- Locators ---
  public getWithdrawFundsLink(): Locator {
    return this.page.locator('ul.services a', { hasText: 'Withdraw Funds' });
  }

  public getTransferFundsLink(): Locator {
    return this.page.locator('ul.services a', { hasText: 'Transfer Funds' });
  }

  public getCheckBalancesLink(): Locator {
    return this.page.locator('ul.services a', { hasText: 'Check Balances' });
  }

  public getMakeDepositsLink(): Locator {
    return this.page.locator('ul.services a', { hasText: 'Make Deposits' });
  }

  // --- Actions ---
  async goToWithdrawFunds() {
    await this.getWithdrawFundsLink().click();
  }

  async goToTransferFunds() {
    await this.getTransferFundsLink().click();
  }

  async goToCheckBalances() {
    await this.getCheckBalancesLink().click();
  }

  async goToMakeDeposits() {
    await this.getMakeDepositsLink().click();
  }
}