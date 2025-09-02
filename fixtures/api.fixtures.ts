import { test as baseTest } from '@playwright/test';
import { ApiHelper } from '../helpers/api.helper';
import { BankApi } from '../api/bankApi';
import { User } from '../types/user';

export type BankApiFixtures = {
  bankApi: BankApi;
  registeredUser: User;
};

export const apiFixtures = baseTest.extend<BankApiFixtures>({
  bankApi: async ({ request }, use) => {
    const apiHelper = new ApiHelper(request);
    await use(new BankApi(apiHelper));
  },
});
