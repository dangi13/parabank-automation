import { test, expect } from '../../fixtures/test';

test.describe.configure({ mode: 'parallel' });

test.describe('Registration Flow', () => {
  test('should successfully register a new user and display a welcome message', async ({ registrationPage, registeredUser, homePage }) => {

    // Verify the successful registration message
    const welcomeMessage = `Welcome ${registeredUser.username}`;
    const successMessage = 'Your account was created successfully. You are now logged in.';
    
    // Assert that the welcome message and success message are visible
    await expect(registrationPage.page.getByText(welcomeMessage, { exact: true })).toBeVisible();
    await expect(registrationPage.page.getByText(successMessage, { exact: true })).toBeVisible();
    
    await homePage.navigate()
    await homePage.clickOpenNewAccountLink()
    await expect(registrationPage.page.getByRole('heading', { name: 'Open New Account' })).toBeVisible();
  });
});