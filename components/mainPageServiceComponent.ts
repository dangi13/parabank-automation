import { Page } from '@playwright/test';
import { AtmServicesComponent } from './atmServicesComponent';
import { OnlineServicesComponent } from './onlineServicesComponent';

export class MainPageServicesComponent {
  public atmServices: AtmServicesComponent;
  public onlineServices: OnlineServicesComponent;

  constructor(private page: Page) {
    this.atmServices = new AtmServicesComponent(this.page);
    this.onlineServices = new OnlineServicesComponent(this.page);
  }
}