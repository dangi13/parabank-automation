import { Page, Locator, expect } from '@playwright/test';
import { User } from '../types/user';

export class RegistrationPage {
  constructor(public readonly page: Page) { }

  // --- Locators ---
  public getFirstNameInput(): Locator {
    return this.page.locator("input[id='customer.firstName']");
  }

  public getLastNameInput(): Locator {
    return this.page.locator("input[id='customer.lastName']");
  }

  public getAddressInput(): Locator {
    return this.page.locator("input[id='customer.address.street']");
  }

  public getCityInput(): Locator {
    return this.page.locator("input[id='customer.address.city']");
  }

  public getStateInput(): Locator {
    return this.page.locator("input[id='customer.address.state']");
  }

  public getZipCodeInput(): Locator {
    return this.page.locator("input[id='customer.address.zipCode']");
  }

  public getPhoneInput(): Locator {
    return this.page.locator("input[id='customer.phoneNumber']");
  }

  public getSsnInput(): Locator {
    return this.page.locator("input[id='customer.ssn']");
  }

  public getUsernameInput(): Locator {
    return this.page.locator("input[id='customer.username']");
  }

  public getPasswordInput(): Locator {
    return this.page.locator("input[id='customer.password']");
  }

  public getConfirmInput(): Locator {
    return this.page.locator("input[id='repeatedPassword']");
  }

  public getRegisterButton(): Locator {
    return this.page.getByRole('button', { name: 'Register' });
  }

  // --- Actions ---
  async navigate(): Promise<void> {
    await this.page.goto('/parabank/register.htm');
  }

  async register(user: User): Promise<void> {
    await this.getFirstNameInput().fill(user.firstName);
    await this.getLastNameInput().fill(user.lastName);
    await this.getAddressInput().fill(user.address);
    await this.getCityInput().fill(user.city);
    await this.getStateInput().fill(user.state);
    await this.getZipCodeInput().fill(user.zipCode);
    await this.getPhoneInput().fill(user.phone);
    await this.getSsnInput().fill(user.ssn);
    await this.getUsernameInput().fill(user.username);
    await this.getPasswordInput().fill(user.password!);
    await this.getConfirmInput().fill(user.password!);
    await this.getRegisterButton().click();
  }

  async validateRegistrationSuccess(registeredUser: User): Promise<void> {
    const welcomeMessage = `Welcome ${registeredUser.username}`;
    const successMessage = 'Your account was created successfully. You are now logged in.';
    await expect(this.page.getByText(welcomeMessage, { exact: true })).toBeVisible();
    await expect(this.page.getByText(successMessage, { exact: true })).toBeVisible();
  }

}