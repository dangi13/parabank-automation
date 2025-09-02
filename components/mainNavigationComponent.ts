import { Page, Locator } from '@playwright/test';

export class MainNavigationComponent {
  constructor(private page: Page) {}

  // --- Locators ---
  public getAboutUsLink(): Locator {
    return this.page.locator('ul.leftmenu a', { hasText: 'About Us' });
  }

  public getServicesLink(): Locator {
    return this.page.locator('ul.leftmenu a', { hasText: 'Services' });
  }

  public getProductsLink(): Locator {
    return this.page.locator('ul.leftmenu a', { hasText: 'Products' });
  }

  // --- Actions ---
  async goToAboutUs() {
    await this.getAboutUsLink().click();
  }

  async goToServices() {
    await this.getServicesLink().click();
  }

  async goToProducts() {
    await this.getProductsLink().click();
  }
}