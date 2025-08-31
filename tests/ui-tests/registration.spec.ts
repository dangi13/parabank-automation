import { test, expect } from '../../fixtures/test';
import {  createRandomPayee } from '../../helpers/data.helper';

test.describe.configure({ mode: 'parallel' });

test.describe('Parabank e2e Flow', () => {
  test('should successfully register a new user do transfer and bill payments', async ({ registrationPage, registeredUser, homePage, openNewAccountPage, accountsOverviewPage, transferFundsPage, billPaymentsPage }) => {

    //1. Verify successful registration (already done in auth fixture)
    const welcomeMessage = `Welcome ${registeredUser.username}`;
    const successMessage = 'Your account was created successfully. You are now logged in.';
    await expect(registrationPage.page.getByText(welcomeMessage, { exact: true })).toBeVisible();
    await expect(registrationPage.page.getByText(successMessage, { exact: true })).toBeVisible();

    //2. Open new Savings account
    await homePage.navigate()
    await homePage.clickOpenNewAccountLink()
    await expect(registrationPage.page.getByRole('heading', { name: 'Open New Account' })).toBeVisible();
    await openNewAccountPage.selectAccountType('SAVINGS');
    await openNewAccountPage.openNewAccountButton.click({delay: 2000, });
    const newAccountNumber = await openNewAccountPage.getNewAccountNumber();
    console.log(`New account created with account number: ${newAccountNumber}`);
    await expect(openNewAccountPage.page.getByRole('heading', { name: 'Account Opened!' })).toBeVisible();
    await expect(openNewAccountPage.page.getByText('Congratulations, your account is now open.')).toBeVisible();
    await expect(openNewAccountPage.page.getByText('Your new account number:')).toBeVisible();

    //3. Validate accounts overview page
    await accountsOverviewPage.navigate();
    const accounts = await accountsOverviewPage.getAccountOverview();
    console.log('Account Overview Data:', accounts);
    console.log(`Total is ${await accountsOverviewPage.getTotalBalance()} `);

    const accountToTransferFrom = accounts.find(account => account.accountNumber === newAccountNumber);
    console.log(`Account to transfer from details: ${JSON.stringify(accountToTransferFrom)}`);
    expect(accountToTransferFrom).toBeDefined();
    expect(accountToTransferFrom?.balance).not.toBe('$0.00');
    expect(accountToTransferFrom?.availableAmount).not.toBe('$0.00');

    const accountToTransferTo = accounts.find(account => account.accountNumber !== newAccountNumber);
    console.log(`Account to transfer to details: ${JSON.stringify(accountToTransferTo)}`);
    expect(accountToTransferTo).toBeDefined();
    expect(accountToTransferTo?.balance).not.toBe('$0.00');
    expect(accountToTransferTo?.availableAmount).not.toBe('$0.00');
    const transferAmount = await accountsOverviewPage.calculateTransferAmount(accountToTransferFrom!.accountNumber);

    // Transfer funds
    await transferFundsPage.navigate();
    await transferFundsPage.transferFunds(
      transferAmount,
      accountToTransferFrom!.accountNumber,
      accountToTransferTo!.accountNumber
    );
    await transferFundsPage.validateTransfer(transferAmount, accountToTransferFrom!.accountNumber, accountToTransferTo!.accountNumber);

    // Pay bills
    billPaymentsPage.navigate();
    const payeeWithCustomAmount = createRandomPayee({ amount: transferAmount });
    await billPaymentsPage.sendPaymentWithDetails(payeeWithCustomAmount, newAccountNumber);
    await billPaymentsPage.validatePaymentSuccess( payeeWithCustomAmount.name, payeeWithCustomAmount.amount, newAccountNumber );
  });

});