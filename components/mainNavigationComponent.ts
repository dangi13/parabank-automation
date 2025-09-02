import { Page } from '@playwright/test';

export class MainNavigationComponent {
  constructor(private page: Page) {}

  // "Solutions" is not a link, but we can locate it to verify its presence
  async getSolutionsLink() {
    return this.page.locator('ul.leftmenu li.Solutions');
  }

  async goToAboutUs() {
    await this.page.locator('ul.leftmenu a', { hasText: 'About Us' }).click();
  }

  async goToServices() {
    await this.page.locator('ul.leftmenu a', { hasText: 'Services' }).click();
  }

  async goToProducts() {
    await this.page.locator('ul.leftmenu a', { hasText: 'Products' }).click();
  }
}