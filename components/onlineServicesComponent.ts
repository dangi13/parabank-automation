import { Page } from '@playwright/test';

export class OnlineServicesComponent {
  constructor(private page: Page) {}

  async goToBillPay() {
    await this.page.locator('ul.servicestwo a', { hasText: 'Bill Pay' }).click();
  }

  async goToAccountHistory() {
    await this.page.locator('ul.servicestwo a', { hasText: 'Account History' }).click();
  }

  async goToTransferFunds() {
    await this.page.locator('ul.servicestwo a', { hasText: 'Transfer Funds' }).click();
  }
}