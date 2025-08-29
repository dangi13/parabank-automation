import { test as baseTest, APIRequestContext } from '@playwright/test';
import { ApiHelper } from '../helpers/api.helper';
import { UserApi } from '../api/UserApi';

export type UserApiFixtures = {
  userApi: UserApi;
};

export const apiFixtures = baseTest.extend<UserApiFixtures>({
  userApi: async ({ request }, use) => {
    const apiHelper = new ApiHelper(request);
    await use(new UserApi(apiHelper));
  },
});