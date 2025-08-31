import { test as baseTest, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';
import { LoginPage } from '../pages/loginPage';
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
      let user = createRandomUser();
      const maxRetries = 2;
      let attempt = 0;
      let registered = false;

      while (attempt < maxRetries && !registered) {
        if (attempt > 0) {
          user = createRandomUser(); // Create a new user for each retry
          console.log(`Retrying registration with a new user: ${user.username}`);
        }

        try {
          await registrationPage.navigate();
          await registrationPage.register(user);
          await expect(page.locator('body')).not.toContainText('This username already exists.');          
          registered = true;
        } catch (error) {
          console.error(`Attempt ${attempt + 1} failed: ${error}`);
          if (attempt === maxRetries - 1) {
            console.error('Registration attempt failed.');
            throw new Error(`Failed to register user after ${maxRetries} attempts.`);
          }
        }
        attempt++;
      }

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