import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { HomePage } from '../pages/HomePage';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';

export type MyPageObjects = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  homePage: HomePage;
   openNewAccountPage: OpenNewAccountPage;
  accountsOverviewPage: AccountsOverviewPage;
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
});