import { Page } from '@playwright/test';
import { LoginFormComponent } from '../components/loginFormComponent';

export class LoginPage {
  readonly loginForm: LoginFormComponent;
  
  constructor(private page: Page) {
    this.loginForm = new LoginFormComponent(this.page);
  }

  async navigate() {
    await this.page.goto('/parabank/index.htm');
  }
}