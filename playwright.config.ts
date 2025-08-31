import { tr } from '@faker-js/faker';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  //workers: process.env.CI ? 1 : undefined,
  workers: 20,
  reporter: [
    ['html', {
      // If running on CI, never open the report.
      // Otherwise, open it only if a test fails.
      open: process.env.CI ? 'never' : 'always'
    }]
  ],
  timeout: 60000,
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://parabank.parasoft.com',
    headless: true,
    video: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});