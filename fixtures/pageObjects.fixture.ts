import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { RegistrationPage } from '../pages/registrationPage';
import { HomePage } from '../pages/homePage';
import { OpenNewAccountPage } from '../pages/openNewAccountPage';
import { AccountsOverviewPage } from '../pages/accountsOverviewPage';
import { TransferFundsPage } from '../pages/transferFundsPage';
import { BillPaymentPage } from '../pages/billPaymentsPage';
import { FindTransactionsPage } from '../pages/findTransactionsPage';

export type MyPageObjects = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  homePage: HomePage;
  openNewAccountPage: OpenNewAccountPage;
  accountsOverviewPage: AccountsOverviewPage;
  transferFundsPage: TransferFundsPage;
  billPaymentsPage: BillPaymentPage;
  findTransactionsPage: FindTransactionsPage;
};

export const pageObjectFixtures = baseTest.extend<MyPageObjects>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
    openNewAccountPage: async ({ page }, use) => {
    await use(new OpenNewAccountPage(page));
  },
  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },
  transferFundsPage: async ({ page }, use) => {
    await use(new TransferFundsPage(page));
  },
  billPaymentsPage: async ({ page }, use) => {
    await use(new BillPaymentPage(page));
  },
  findTransactionsPage: async ({ page }, use) => {
    await use(new FindTransactionsPage(page));
  },
});