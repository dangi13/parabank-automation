# 🏦 Parabank Automation Framework

This project is an end-to-end automation framework for Parabank application using Playwright with TypeScript, following a component-based Page Object Model architecture.

## 🏗️ Architecture

The framework follows a component-based architecture where UI elements and their associated actions are organized into reusable components. This approach:
- ♻️ Promotes code reusability
- 🎯 Reduces code duplication
- 🔍 Makes test maintenance easier
- 📦 Provides better encapsulation

## 🛠️ Tech Stack

- 🎭 Playwright
- 📝 TypeScript
- 🔄 Jenkins CI/CD
- 🎯 ESLint
- 🎪 Faker.js for test data generation

## 🚀 Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## 📥 Installation

1. Clone the repository:
```bash
git clone https://github.com/dangi13/parabank-automation.git
cd parabank-automation
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🏃‍♂️ Running Tests

### UI Tests
```bash
npm run test:ui              # Run UI tests in Chromium
```

### API Tests
```bash
npm run test:api             # Run API tests
```

### All Tests
```bash
npm test                     # Run all tests
```

### Lint Check
```bash
npm run lint                 # Run ESLint
```

## 📁 Project Structure

```
├── api/                    # API endpoints implementation
├── components/            # Reusable UI Components
├── fixtures/              # Test fixtures and data
├── helpers/              # Utility functions and helpers
├── pages/                # Page Objects (composed of components)
├── tests/                # Test files
│   ├── api-tests/        # API test specs
│   └── ui-tests/         # UI test specs
└── types/                # TypeScript type definitions
```

## 🔧 Configuration

### Playwright Configuration (playwright.config.ts)
- Base URL: https://parabank.parasoft.com
- Parallel execution enabled
- Video recording on
- HTML reporter configured

### Environment Variables
- `BUILD_NUMBER`: CI environment detection
- `HEADLESS`: Run tests in headless mode (default: true in CI)

## 🔄 CI/CD Pipeline

The project uses Jenkins for continuous integration. Pipeline stages include:

1. Checkout
2. Install Dependencies
4. Run Tests
5. Generate Reports

### Jenkins Configuration
- Configure the Jenkinsfile with required parameters
- Set up necessary environment variables
- Configure test execution triggers

## 📊 Test Reports

- HTML reports are generated after test execution
- Reports can be found in `playwright-report/` directory
- Videos and screenshots are captured for failed tests

## 🗂️ Best Practices

### Component Development
1. Create new components in `components/` directory for reusable UI elements
2. Define component-specific locators and actions
3. Keep components focused and single-responsibility
4. Make components reusable across different pages

### Adding New Tests
1. Create/reuse components in `components/` directory
2. Compose page objects in `pages/` directory using components
3. Add fixtures in `fixtures/`
4. Implement helper functions in `helpers/`
5. Write tests in `tests/` directory

### Code Style
- Follow TypeScript best practices
- Use ESLint for code quality
- Maintain page object pattern
- Add appropriate comments and documentation

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests locally
4. Submit a pull request