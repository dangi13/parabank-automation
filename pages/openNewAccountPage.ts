import { Page, Locator, expect } from '@playwright/test';

export class OpenNewAccountPage {
  constructor(public readonly page: Page) {}

  // --- Locators ---
  public getTypeOfAccountLabel(): Locator {
    return this.page.getByLabel('What type of Account would you like to open?');
  }

  public getTypeOfAccountDropdown(): Locator {
    return this.page.locator('#type');
  }

  public getExistingAccountDropdown(): Locator {
    return this.page.locator('#fromAccountId');
  }

  public getOpenNewAccountButton(): Locator {
    return this.page.getByRole('button', { name: 'Open New Account' });
  }

  public getNewAccountNumberLink(): Locator {
    return this.page.locator('#newAccountId');
  }

  // --- Actions ---
  async navigate(): Promise<void> {
    await this.page.goto('/parabank/openaccount.htm');
  }

  async createNewAccount(accountType: string): Promise<string> {
    await expect(this.page.getByRole('heading', { name: 'Open New Account' })).toBeVisible();
    await this.getTypeOfAccountDropdown().selectOption({ label: accountType });
    await this.getOpenNewAccountButton().click({ delay: 2000 });
    
    // Wait for the new account number link to have valid text
    await this.page.waitForFunction(selector => {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent;
        return text && /^\d+$/.test(text);
      }
      return false;
    }, '#newAccountId');

    const newAccountNumber = (await this.getNewAccountNumberLink().textContent()) || '';
    return newAccountNumber;
  }
}