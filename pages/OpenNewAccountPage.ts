import { Page, Locator, expect } from '@playwright/test';

export class OpenNewAccountPage {
    readonly page: Page;
    readonly typeOfAccountDropdown: Locator;
    readonly typeOfAccountLabel: Locator;
    readonly existingAccountDropdown: Locator;
    readonly openNewAccountButton: Locator;
    readonly newAccountNumberLink: Locator;
    
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

  async createNewAccount(accountType: string): Promise<string> {
     await expect(this.page.getByRole('heading', { name: 'Open New Account' })).toBeVisible();
      await this.typeOfAccountDropdown.selectOption({ label: accountType });
      await this.openNewAccountButton.click({ delay: 2000, });
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