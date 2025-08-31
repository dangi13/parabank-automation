import { tr } from '@faker-js/faker';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  //workers: process.env.CI ? 1 : undefined,
  workers: 20,
  reporter: 'html',
  timeout: 60000,
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://parabank.parasoft.com',
    headless: process.env.CI ? true : false,
    video: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});