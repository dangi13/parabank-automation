import { Page, Locator } from '@playwright/test';

export class OnlineServicesComponent {
  constructor(private page: Page) {}

  // --- Locators ---
  public getBillPayLink(): Locator {
    return this.page.locator('ul.servicestwo a', { hasText: 'Bill Pay' });
  }

  public getAccountHistoryLink(): Locator {
    return this.page.locator('ul.servicestwo a', { hasText: 'Account History' });
  }

  public getTransferFundsLink(): Locator {
    return this.page.locator('ul.servicestwo a', { hasText: 'Transfer Funds' });
  }

  // --- Actions ---
  async goToBillPay() {
    await this.getBillPayLink().click();
  }

  async goToAccountHistory() {
    await this.getAccountHistoryLink().click();
  }

  async goToTransferFunds() {
    await this.getTransferFundsLink().click();
  }
}