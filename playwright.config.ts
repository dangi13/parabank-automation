import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  //workers: process.env.CI ? 1 : undefined,
  workers: 20,
  reporter: 'html',
  timeout: 60000, // Increase global timeout to 60 seconds
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://parabank.parasoft.com',
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});