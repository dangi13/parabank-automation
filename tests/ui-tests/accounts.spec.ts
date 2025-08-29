import { test, expect } from '../../fixtures/test';

test.describe('Account Management', () => {
  test('should successfully create a savings account and validate its balance', async ({ authenticatedPage, homePage, openNewAccountPage, accountsOverviewPage }) => {
    const { page, user } = authenticatedPage;
    
    // 5. Create a Savings account from “Open New Account Page” and capture the account number.
    // ------------------------------------------------------------------------------------------
    // Navigate to the Open New Account page from the Home Page
    await homePage.navigate();
    await openNewAccountPage.navigate();

    // Create a new savings account
    await openNewAccountPage.createSavingsAccount();

    // Capture the new account number from the success page
    const newAccountNumber = await openNewAccountPage.getNewAccountNumber();
    console.log(`Successfully created a new account with number: ${newAccountNumber}`);

    // Validate that the account number is displayed and is a number
    await expect(openNewAccountPage.newAccountNumberLink).toBeVisible();
    await expect(newAccountNumber).toMatch(/^\d+$/);

    // 6. Validate if Accounts overview page is displaying the balance details as expected.
    // ----------------------------------------------------------------------------------
    // Navigate to the Accounts Overview page
    await accountsOverviewPage.navigate();

    // Validate the new account's balance
    const newAccountBalance = await accountsOverviewPage.getBalanceForAccount(newAccountNumber);

    // Expect the balance to be 0.00 for a newly created savings account
    await expect(newAccountBalance).toBe('$0.00');

    console.log(`Validated new account balance: ${newAccountBalance}`);
  });
});