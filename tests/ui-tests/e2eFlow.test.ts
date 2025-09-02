import { Cookie } from '@playwright/test';
import { test, expect } from '../../fixtures/test';
import { createRandomPayee } from '../../helpers/data.helper';
import { Transaction } from '../../types/transaction';
import { DateHelper } from '../../helpers/date.helper';

test.describe('Parabank e2e Flow', () => {
  test('Should successfully register a new user do transfer and bill payments', async ({ registeredUser, registrationPage, homePage, bankApi }) => {
    //1. Verify successful registration (already done in auth fixture)
    await registrationPage.validateRegistrationSuccess(registeredUser);

    //2. Open new Savings account
    const openNewAccountPage = await homePage.accountServices.goToOpenNewAccount();
    const newAccountNumber = await openNewAccountPage.createNewAccount('SAVINGS');
    console.log(`New account created with account number: ${newAccountNumber}`);
    await expect(openNewAccountPage.page.getByRole('heading', { name: 'Account Opened!' })).toBeVisible();
    await expect(openNewAccountPage.page.getByText('Congratulations, your account is now open.')).toBeVisible();
    await expect(openNewAccountPage.page.getByText('Your new account number:')).toBeVisible();

    //3. Validate accounts overview page
    const accountsOverviewPage = await homePage.accountServices.goToAccountsOverview();
    const accounts = await accountsOverviewPage.getAccountOverview();
    const accountToTransferFrom = accounts.find(account => account.accountNumber === newAccountNumber);
    console.log(`Account to transfer from details: ${JSON.stringify(accountToTransferFrom)}`);
    expect(accountToTransferFrom).toBeDefined();
    expect(accountToTransferFrom?.balance).not.toBe('$0.00');
    expect(accountToTransferFrom?.availableAmount).not.toBeUndefined();
    const accountToTransferTo = accounts.find(account => account.accountNumber !== newAccountNumber);
    console.log(`Account to transfer to details: ${JSON.stringify(accountToTransferTo)}`);
    expect(accountToTransferTo).toBeDefined();
    expect(accountToTransferTo?.balance).not.toBe('$0.00');
    expect(accountToTransferTo?.availableAmount).not.toBeUndefined();
    const transferAmount = await accountsOverviewPage.calculateTransferAmount(accountToTransferFrom!.accountNumber);

    // Transfer funds
    const transferFundsPage = await homePage.accountServices.goToTransferFunds();
    await transferFundsPage.transferFunds(
      transferAmount,
      accountToTransferFrom!.accountNumber,
      accountToTransferTo!.accountNumber
    );
    await transferFundsPage.validateTransfer(transferAmount, accountToTransferFrom!.accountNumber, accountToTransferTo!.accountNumber);

    // Pay bills
    const billPaymentsPage = await homePage.accountServices.goToBillPay();
    const payeeWithCustomAmount = createRandomPayee({ amount: transferAmount });
    await billPaymentsPage.sendPaymentWithDetails(payeeWithCustomAmount, newAccountNumber);
    await billPaymentsPage.validatePaymentSuccess(payeeWithCustomAmount.name, payeeWithCustomAmount.amount, newAccountNumber);

    // Find Bill payment transaction through API
    await homePage.accountServices.goToFindTransactions(); 
    const cookies: Cookie[] = await billPaymentsPage.page.context().cookies();
    const jsessionIdCookie = cookies.find(cookie => cookie.name === 'JSESSIONID');
    const transactions = await bankApi.getTransactionsByAmount(jsessionIdCookie?.value as string, newAccountNumber, parseFloat(transferAmount)) as Transaction[];
    console.log('Transactions fetched from API:', JSON.stringify(transactions));
    expect(Array.isArray(transactions)).toBeTruthy();
    expect(transactions.length).toBeGreaterThan(0);
    
    // Find the specific transaction that matches the bill payment details.
    const billPaymentTransaction = transactions.find(t =>
      t.description.includes('Bill Payment to') &&
      t.description.includes(payeeWithCustomAmount.name) &&
      t.amount === parseFloat(transferAmount)
    );
    expect(typeof billPaymentTransaction?.id).toBe('number');
    new DateHelper().validateApiTimestampIsCurrentDayUTC(billPaymentTransaction?.date as number);
    expect(billPaymentTransaction).toBeDefined();
    expect(billPaymentTransaction?.type).toBe('Debit');
    expect(billPaymentTransaction?.accountId).toBe(parseInt(newAccountNumber));
  });

});