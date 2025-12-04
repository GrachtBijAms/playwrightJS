# Playwright Self-Learning Project

## Overview
This project is created for self-learning and practice with [Playwright](https://playwright.dev/), a modern end-to-end testing framework for web applications. The goal is to explore key Playwright features, experiment with browser automation, and build reliable and maintainable test scripts.

## Objectives
- Learn Playwright installation and setup
- Write tests for various browser interactions
- Handle waits, selectors, and different element states
- Use Playwright’s built-in test runner to organize and run tests
- Explore cross-browser testing with Chromium, Firefox, and WebKit
- Integrate test reporting and debugging techniques

## Project Structure
/tests         - Contains Playwright test scripts
/pages         - Page Object Model representations (if used)
/utils         - Helper utilities and reusable functions
/playwright.config.ts - Playwright configuration file
/package.json  - Project dependencies and scripts
/README.md     - This file


## Getting Started

### Prerequisites
- Node.js (>= 14.x) installed on your machine
- Basic familiarity with JavaScript or TypeScript

### Installation
1. Clone the repository:
2. git clone https://github.com/yourusername/playwright-self-learning.git
3. cd playwright-self-learning
4. Install dependencies: npm install
5. Install Playwright browsers: npx playwright install

### Running Tests
1. Use the Playwright test runner to execute tests: npx playwright test
2. To run tests in headed mode (visible browser): npx playwright test --headed
3. To run tests on a specific browser: npx playwright test --project=firefox
4. To run tests in UI mode: npx playwright test --ui


## Learning Resources
- [Playwright Official Documentation](https://playwright.dev/docs/intro)
- [Playwright GitHub Repository](https://github.com/microsoft/playwright)
- Tutorials and videos on end-to-end testing with Playwright

## Notes
- This project is focused on experimenting and learning; test cases are examples and may be expanded over time.
- The repository can be used as a sandbox to try new Playwright features and best practices.

---

Feel free to contribute or raise issues if you find improvements or bugs.








