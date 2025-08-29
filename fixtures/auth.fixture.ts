import { test as baseTest } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { createRandomUser } from '../helpers/data.helper';
import { User } from '../types/user';

export type MyAuthFixtures = {
  registeredUser: User;
  authenticatedPage: { user: User; page: import('@playwright/test').Page };
};

export const authFixtures = baseTest.extend<MyAuthFixtures>({
  registeredUser: [
    async ({ page }, use) => {
      const registrationPage = new RegistrationPage(page);
      const user = createRandomUser();
      await registrationPage.navigate();
      await registrationPage.register(user);
      await use(user);
    },
    { scope: 'test' }
  ],
  authenticatedPage: [
    async ({ page, registeredUser }, use) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      await loginPage.login(registeredUser.username, registeredUser.password!);
      await use({ user: registeredUser, page });
    },
    { scope: 'test' }
  ],
});