import { Page, Locator } from '@playwright/test';
import { User } from '../types/user';

export class RegistrationPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator("input[id='customer.firstName']");
    this.lastNameInput = page.locator("input[id='customer.lastName']");
    this.addressInput = page.locator("input[id='customer.address.street']");
    this.cityInput = page.locator("input[id='customer.address.city']");
    this.stateInput = page.locator("input[id='customer.address.state']");
    this.zipCodeInput = page.locator("input[id='customer.address.zipCode']");
    this.phoneInput = page.locator("input[id='customer.phoneNumber']");
    this.ssnInput = page.locator("input[id='customer.ssn']");
    this.usernameInput = page.locator("input[id='customer.username']");
    this.passwordInput = page.locator("input[id='customer.password']");
    this.confirmInput = page.locator("input[id='repeatedPassword']");
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async navigate(): Promise<void> {
    await this.page.goto('/parabank/register.htm');
  }

  async register(user: User): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.addressInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.zipCodeInput.fill(user.zipCode);
    await this.phoneInput.fill(user.phone);
    await this.ssnInput.fill(user.ssn);
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password!);
    await this.confirmInput.fill(user.password!);     
    await this.registerButton.click();
  }
}