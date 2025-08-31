import { Page, Locator, expect } from '@playwright/test';
import { Payee } from '../types/payee';

export class BillPaymentPage {
    readonly page: Page;
    readonly payeeNameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipCodeInput: Locator;
    readonly phoneInput: Locator;
    readonly accountInput: Locator;
    readonly verifyAccountInput: Locator;
    readonly amountInput: Locator;
    readonly fromAccountDropdown: Locator;
    readonly sendPaymentButton: Locator;
    readonly header: Locator;
    readonly payeeNameResult: Locator;
    readonly amountResult: Locator;
    readonly fromAccountIdResult: Locator;
    readonly activityMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.payeeNameInput = page.locator('input[name="payee.name"]');
        this.addressInput = page.locator('input[name="payee.address.street"]');
        this.cityInput = page.locator('input[name="payee.address.city"]');
        this.stateInput = page.locator('input[name="payee.address.state"]');
        this.zipCodeInput = page.locator('input[name="payee.address.zipCode"]');
        this.phoneInput = page.locator('input[name="payee.phoneNumber"]');
        this.accountInput = page.locator('input[name="payee.accountNumber"]');
        this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
        this.amountInput = page.locator('input[name="amount"]');
        this.fromAccountDropdown = page.locator('select[name="fromAccountId"]');
        this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
        this.header = page.getByRole('heading', { name: 'Bill Payment Complete' });
        this.payeeNameResult = page.locator('#payeeName');
        this.amountResult = page.locator('#amount');
        this.fromAccountIdResult = page.locator('#fromAccountId');
        this.activityMessage = page.getByText('See Account Activity for more details.');

    }

    async navigate(): Promise<void> {
        await this.page.goto('/parabank/billpay.htm');
    }

    async sendPaymentWithDetails(payee: Payee, fromAccountNumber: string): Promise<void> {
        await expect(this.page.getByRole('heading', { name: 'Bill Payment Service' })).toBeVisible();
        await expect(this.page.getByText('Enter payee information')).toBeVisible();

        await this.payeeNameInput.fill(payee.name);
        await this.addressInput.fill(payee.address);
        await this.cityInput.fill(payee.city);
        await this.stateInput.fill(payee.state);
        await this.zipCodeInput.fill(payee.zipCode);
        await this.phoneInput.fill(payee.phone);
        await this.accountInput.fill(payee.accountNumber);
        await this.verifyAccountInput.fill(payee.accountNumber);
        await this.amountInput.fill(payee.amount.toString());
        await this.fromAccountDropdown.selectOption(fromAccountNumber);
        await this.sendPaymentButton.click();
    }

    async validatePaymentSuccess(payeeName: string, amount: string, fromAccount: string): Promise<void> {
        await expect(this.header).toBeVisible();
        await expect(this.payeeNameResult).toHaveText(payeeName);
        await expect(this.amountResult).toHaveText("$" + amount);
        await expect(this.fromAccountIdResult).toHaveText(fromAccount);
        const billPaymentSuccessMessage = `Bill Payment to ${payeeName} in the amount of $${amount} from account ${fromAccount} was successful.`;
        await expect(this.page.getByText(billPaymentSuccessMessage)).toBeVisible();
        await expect(this.activityMessage).toBeVisible();
    }
}
