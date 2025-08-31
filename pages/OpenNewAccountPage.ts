import { Page, Locator } from '@playwright/test';

export class OpenNewAccountPage {
    readonly page: Page;
    readonly typeOfAccountDropdown: Locator;
    readonly typeOfAccountLabel: Locator;
    readonly existingAccountDropdown: Locator;
    readonly openNewAccountButton: Locator;
    readonly newAccountNumberLink: Locator;
    ;

    constructor(page: Page) {
        this.page = page;
        this.typeOfAccountLabel = page.getByLabel('What type of Account would you like to open?');
        this.typeOfAccountDropdown = page.locator('#type');
        this.existingAccountDropdown = page.locator('#fromAccountId');
        this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
        this.newAccountNumberLink = page.locator('#newAccountId');
    }

    async navigate(): Promise<void> {
        await this.page.goto('/parabank/openaccount.htm');
    }

    async selectAccountType(accountType: string): Promise<void> {
        await this.typeOfAccountDropdown.selectOption({ label: accountType });
    }

    async selectExistingAccount(accountNumber: string): Promise<void> {
        await this.existingAccountDropdown.selectOption({ label: accountNumber });
    }

  async getNewAccountNumber(): Promise<string> {
    await this.page.waitForFunction(selector => {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent;
        return text && /^\d+$/.test(text);
      }
      return false;
    }, '#newAccountId');

    return (await this.newAccountNumberLink.textContent()) || '';
  }
}