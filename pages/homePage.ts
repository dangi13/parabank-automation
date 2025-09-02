import { Page } from '@playwright/test';
import { MainNavigationComponent } from '../components/mainNavigationComponent';
import { AccountServicesComponent } from '../components/accountServicesComponent';
import { AtmServicesComponent } from '../components/atmServicesComponent';
import { OnlineServicesComponent } from '../components/onlineServicesComponent';

export class HomePage {
  public mainNavigation: MainNavigationComponent;
  public accountServices: AccountServicesComponent;
  public atmServices: AtmServicesComponent;
  public onlineServices: OnlineServicesComponent;

  constructor(private page: Page) {
    this.mainNavigation = new MainNavigationComponent(this.page);
    this.accountServices = new AccountServicesComponent(this.page);
    this.atmServices = new AtmServicesComponent(this.page);
    this.onlineServices = new OnlineServicesComponent(this.page);
  }

  async navigate() {
    await this.page.goto('/parabank/index.htm');
  }
}