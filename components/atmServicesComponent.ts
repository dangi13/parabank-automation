import { Page } from '@playwright/test';

export class AtmServicesComponent {
  constructor(private page: Page) {}

  async goToWithdrawFunds() {
    await this.page.locator('ul.services a', { hasText: 'Withdraw Funds' }).click();
  }

  async goToTransferFunds() {
    await this.page.locator('ul.services a', { hasText: 'Transfer Funds' }).click();
  }

  async goToCheckBalances() {
    await this.page.locator('ul.services a', { hasText: 'Check Balances' }).click();
  }

  async goToMakeDeposits() {
    await this.page.locator('ul.services a', { hasText: 'Make Deposits' }).click();
  }
}