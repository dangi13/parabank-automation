import { Page, Locator, expect } from '@playwright/test';
import { Payee } from '../types/payee';

export class BillPaymentPage {
    constructor(public readonly page: Page) {}

    // --- Locators ---
    public getPayeeNameInput(): Locator {
        return this.page.locator('input[name="payee.name"]');
    }

    public getAddressInput(): Locator {
        return this.page.locator('input[name="payee.address.street"]');
    }

    public getCityInput(): Locator {
        return this.page.locator('input[name="payee.address.city"]');
    }

    public getStateInput(): Locator {
        return this.page.locator('input[name="payee.address.state"]');
    }

    public getZipCodeInput(): Locator {
        return this.page.locator('input[name="payee.address.zipCode"]');
    }

    public getPhoneInput(): Locator {
        return this.page.locator('input[name="payee.phoneNumber"]');
    }

    public getAccountInput(): Locator {
        return this.page.locator('input[name="payee.accountNumber"]');
    }

    public getVerifyAccountInput(): Locator {
        return this.page.locator('input[name="verifyAccount"]');
    }

    public getAmountInput(): Locator {
        return this.page.locator('input[name="amount"]');
    }

    public getFromAccountDropdown(): Locator {
        return this.page.locator('select[name="fromAccountId"]');
    }

    public getSendPaymentButton(): Locator {
        return this.page.getByRole('button', { name: 'Send Payment' });
    }

    public getHeader(): Locator {
        return this.page.getByRole('heading', { name: 'Bill Payment Complete' });
    }

    public getPayeeNameResult(): Locator {
        return this.page.locator('#payeeName');
    }

    public getAmountResult(): Locator {
        return this.page.locator('#amount');
    }

    public getFromAccountIdResult(): Locator {
        return this.page.locator('#fromAccountId');
    }

    public getActivityMessage(): Locator {
        return this.page.getByText('See Account Activity for more details.');
    }

    // --- Actions ---
    async navigate(): Promise<void> {
        await this.page.goto('/parabank/billpay.htm');
    }

    async sendPaymentWithDetails(payee: Payee, fromAccountNumber: string): Promise<void> {
        await expect(this.page.getByRole('heading', { name: 'Bill Payment Service' })).toBeVisible();
        await expect(this.page.getByText('Enter payee information')).toBeVisible();

        await this.getPayeeNameInput().fill(payee.name);
        await this.getAddressInput().fill(payee.address);
        await this.getCityInput().fill(payee.city);
        await this.getStateInput().fill(payee.state);
        await this.getZipCodeInput().fill(payee.zipCode);
        await this.getPhoneInput().fill(payee.phone);
        await this.getAccountInput().fill(payee.accountNumber);
        await this.getVerifyAccountInput().fill(payee.accountNumber);
        await this.getAmountInput().fill(payee.amount.toString());
        await this.getFromAccountDropdown().selectOption(fromAccountNumber);
        await this.getSendPaymentButton().click();
    }

    async validatePaymentSuccess(payeeName: string, amount: string, fromAccount: string): Promise<void> {
        await expect(this.getHeader()).toBeVisible();
        await expect(this.getPayeeNameResult()).toHaveText(payeeName);
        await expect(this.getAmountResult()).toHaveText("$" + amount);
        await expect(this.getFromAccountIdResult()).toHaveText(fromAccount);
        const billPaymentSuccessMessage = `Bill Payment to ${payeeName} in the amount of $${amount} from account ${fromAccount} was successful.`;
        await expect(this.page.getByText(billPaymentSuccessMessage)).toBeVisible();
        await expect(this.getActivityMessage()).toBeVisible();
    }
}