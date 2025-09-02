import { Page, Locator } from '@playwright/test';
import { OpenNewAccountPage } from '../pages/openNewAccountPage';
import { AccountsOverviewPage } from '../pages/accountsOverviewPage';
import { TransferFundsPage } from '../pages/transferFundsPage';
import { BillPaymentPage } from '../pages/billPaymentsPage';
import { FindTransactionsPage } from '../pages/findTransactionsPage';

export class AccountServicesComponent {
  constructor(private page: Page) { }

  // --- Locators ---
  public getOpenNewAccountLink(): Locator {
    return this.page.locator('#leftPanel a', { hasText: 'Open New Account' });
  }

  public getAccountsOverviewLink(): Locator {
    return this.page.locator('#leftPanel a', { hasText: 'Accounts Overview' });
  }

  public getTransferFundsLink(): Locator {
    return this.page.locator('#leftPanel a', { hasText: 'Transfer Funds' });
  }

  public getBillPayLink(): Locator {
    return this.page.locator('#leftPanel a', { hasText: 'Bill Pay' });
  }

  public getFindTransactionsLink(): Locator {
    return this.page.locator('#leftPanel a', { hasText: 'Find Transactions' });
  }

  public getUpdateContactInfoLink(): Locator {
    return this.page.locator('#leftPanel a', { hasText: 'Update Contact Info' });
  }

  public getRequestLoanLink(): Locator {
    return this.page.locator('#leftPanel a', { hasText: 'Request Loan' });
  }

  public getLogOutLink(): Locator {
    return this.page.locator('#leftPanel a', { hasText: 'Log Out' });
  }

  // --- Actions ---
  async goToOpenNewAccount(): Promise<OpenNewAccountPage> {
    return await this.getOpenNewAccountLink().click().then(() => new OpenNewAccountPage(this.page));
  }

  async goToAccountsOverview() {
    return await this.getAccountsOverviewLink().click().then(() => new AccountsOverviewPage(this.page)) ;
  }

  async goToTransferFunds() {
    return await this.getTransferFundsLink().click().then(() => new TransferFundsPage(this.page));
  }

  async goToBillPay() {
    return await this.getBillPayLink().click().then(() => new BillPaymentPage(this.page));
  }

  async goToFindTransactions() {
    return await this.getFindTransactionsLink().click().then(() => new FindTransactionsPage(this.page));
  }

  async goToUpdateContactInfo() {
    await this.getUpdateContactInfoLink().click();
  }

  async goToRequestLoan() {
    await this.getRequestLoanLink().click();
  }

  async goToLogOut() {
    await this.getLogOutLink().click();
  }
}