# Playwright E2E Test Automation Framework

![Playwright CI](https://github.com/GrachtBijAms/playwrightJS/actions/workflows/playwright.yml/badge.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)

A professional end-to-end test automation framework built with Playwright and JavaScript, following the Page Object Model design pattern.


## Objectives
- Learn Playwright installation and setup
- Write tests for various browser interactions
- Handle waits, selectors, and different element states
- Use Playwright’s built-in test runner to organize and run tests
- Explore cross-browser testing with Chromium, Firefox, and WebKit
- Integrate test reporting and debugging techniques

## Framework Structure
```
├── .github/workflows/    # CI/CD pipeline (GitHub Actions)
├── pages/                # Page Object Model classes
├── specs/                # Test specifications
├── tests/                # Playwright test files
├── res/                  # Test site and resources
├── playwright.config.js  # Playwright configuration
└── package.json          # Dependencies and scripts
```

## Tech Stack

- **Playwright** — cross-browser end-to-end testing
- **JavaScript** — test scripting language
- **Page Object Model** — maintainable, scalable test design
- **GitHub Actions** — CI/CD pipeline on every push

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Installation

```bash
git clone https://github.com/GrachtBijAms/playwrightJS.git
cd playwrightJS
npm install
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run in headed mode
npx playwright test --headed

# Run specific browser
npx playwright test --project=firefox

# Run with UI mode
npx playwright test --ui

# View test report
npx playwright show-report
```

## CI/CD

Tests run automatically on every push and pull request to `main` via GitHub Actions across Chromium, Firefox, and WebKit.

## Learning Resources
- [Playwright Official Documentation](https://playwright.dev/docs/intro)
- [Playwright GitHub Repository](https://github.com/microsoft/playwright)
- Tutorials and videos on end-to-end testing with Playwright

## Notes
- This project is focused on experimenting and learning; test cases are examples and may be expanded over time.
- The repository can be used as a sandbox to try new Playwright features and best practices.

---

Feel free to contribute or raise issues if you find improvements or bugs.








