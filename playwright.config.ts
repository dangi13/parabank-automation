import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.BUILD_NUMBER;
console.log(`Running in CI: ${isCI}`);
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  //workers: process.env.CI ? 1 : undefined,
  workers: 20,
  reporter: [
    ['html', {
      // If running on CI, never open the report.
      // Otherwise, open it only if a test fails.
      open: isCI ? 'never' : 'always'
    }]
  ],
  timeout: 60000,
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://parabank.parasoft.com',
    headless: isCI,
    video: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});