import { da } from '@faker-js/faker';
import { test, expect } from '../../fixtures/test';
import { createRandomUser } from '../../helpers/data.helper';

// Use a tag to run only API tests with `npm run test:api`
test.describe('User API', { tag: '@api' }, () => {

  test('should create a new user via API', async ({ userApi }) => {
    const newUser = createRandomUser();
    const response = await userApi.createUser(newUser);

    expect(response.status()).toBe(201); // 201 Created
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
      id: expect.any(String), // Assumes the API returns an ID
      ...newUser,
    });
  });

  test('should retrieve a user by ID', async ({ userApi }) => {
    const userId = '12345';
    const response = await userApi.getUser(userId);

    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.id).toBe(userId);
  });
});