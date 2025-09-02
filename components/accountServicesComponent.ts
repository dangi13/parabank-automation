import { Page } from '@playwright/test';

export class AccountServicesComponent {
  constructor(private page: Page) {}

  async goToOpenNewAccount() {
    await this.page.locator('#leftPanel a', { hasText: 'Open New Account' }).click();
  }
  
  async goToAccountsOverview() {
    await this.page.locator('#leftPanel a', { hasText: 'Accounts Overview' }).click();
  }
  
  async goToTransferFunds() {
    await this.page.locator('#leftPanel a', { hasText: 'Transfer Funds' }).click();
  }
  
  async goToBillPay() {
    await this.page.locator('#leftPanel a', { hasText: 'Bill Pay' }).click();
  }
  
  async goToFindTransactions() {
    await this.page.locator('#leftPanel a', { hasText: 'Find Transactions' }).click();
  }
  
  async goToUpdateContactInfo() {
    await this.page.locator('#leftPanel a', { hasText: 'Update Contact Info' }).click();
  }
  
  async goToRequestLoan() {
    await this.page.locator('#leftPanel a', { hasText: 'Request Loan' }).click();
  }

  async goToLogOut() {
    await this.page.locator('#leftPanel a', { hasText: 'Log Out' }).click();
  }
}