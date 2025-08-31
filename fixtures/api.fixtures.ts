import { test as baseTest, APIRequestContext } from '@playwright/test';
import { ApiHelper } from '../helpers/api.helper';
import { BankApi } from '../api/bankApi';

export type BankApiFixtures = {
  bankApi: BankApi;
};

export const apiFixtures = baseTest.extend<BankApiFixtures>({
  bankApi: async ({ request }, use) => {
    const apiHelper = new ApiHelper(request);
    await use(new BankApi(apiHelper));
  },
});
