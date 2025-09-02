import { AccountOverview } from '../types/accountOverview';
import { Page, Locator, expect } from '@playwright/test';

export class AccountsOverviewPage {
    constructor(public readonly page: Page) {}

    // --- Locators ---
    public getAccountsOverviewLink(): Locator {
        return this.page.getByRole('link', { name: 'Accounts Overview' });
    }

    public getAccountRows(): Locator {
        return this.page.locator('#accountTable tbody tr');
    }

    public getTableContainer(): Locator {
        return this.page.locator('#accountTable');
    }

    public getTotalRow(): Locator {
        return this.page.locator('tr', { hasText: 'Total' });
    }

    // --- Actions ---
    async navigate(): Promise<void> {
        await this.page.goto('/parabank/overview.htm');
    }

    async getAccountOverview(): Promise<AccountOverview[]> {
        await this.getTableContainer().waitFor();
        await expect(this.getTotalRow()).toBeVisible();
        
        const accounts: AccountOverview[] = [];
        const rows = await this.getAccountRows().all();

        for (const row of rows) {
            const accountLink = row.locator('td').first().locator('a');
            const isAccountRow = await accountLink.isVisible();

            if (isAccountRow) {
                const accountNumberText = await accountLink.textContent();
                const balance = await row.locator('td').nth(1).textContent();
                const availableAmount = await row.locator('td').nth(2).textContent();

                accounts.push({
                    accountNumber: accountNumberText ?? ''.trim(),
                    balance: balance ?? ''.trim(),
                    availableAmount: availableAmount ?? ''.trim(),
                });
            }
        }
        return accounts;
    }

    async getTotalBalance(): Promise<string> {
        await this.getTableContainer().waitFor();
        const totalRow = this.getTotalRow();
        const totalBalanceCell = totalRow.locator('td').nth(1);
        const totalBalance = await totalBalanceCell.textContent();

        return totalBalance?.trim() || '';
    }

    async calculateTransferAmount(accountNumber: string): Promise<string> {
        const allAccounts = await this.getAccountOverview();
        const targetAccount = allAccounts.find(account => account.accountNumber.toString() === accountNumber);
        if (!targetAccount) {
            throw new Error(`Account number ${accountNumber} not found.`);
        }

        const currentBalance = parseFloat(targetAccount.balance.replace(/[$,]/g, ''));
        if (currentBalance <= 1.00) {
            throw new Error(`Insufficient funds in account ${accountNumber} for transfer.`);
        }
        const transferAmount = (currentBalance - 1.00).toFixed(2);

        console.log(`Calculated transfer amount from account ${accountNumber}: $${transferAmount}`);
        return transferAmount.toString();
    }
}