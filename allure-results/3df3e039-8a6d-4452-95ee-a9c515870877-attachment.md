# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: helpers\auth.setup.ts >> authenticate and save session
- Location: helpers\auth.setup.ts:23:6

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByLabel('Account pages').getByRole('link', { name: 'Log out' })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByLabel('Account pages').getByRole('link', { name: 'Log out' }) with timeout 40000ms
  - waiting for getByLabel('Account pages').getByRole('link', { name: 'Log out' })
  - Target page, context or browser has been closed

```

```yaml
- complementary "Store notice":
  - text: This is a test demo store created for QA automation, API testing, and performance testing practice. Visit
  - link "anuradhaagarwal.com":
    - /url: https://anuradhaagarwal.com
  - text: to learn more about qa courses. No orders will be fulfilled.
- link "Skip to content":
  - /url: "#content"
- banner:
  - link "TEST AUTOMATION DEMOSTORE":
    - /url: https://qa-cart.com/
    - img "TEST AUTOMATION DEMOSTORE"
  - link "QA Automation Test Demo Store":
    - /url: https://qa-cart.com/
  - paragraph
  - navigation "Primary Site Navigation":
    - list:
      - listitem:
        - link "DemoShop":
          - /url: https://qa-cart.com/demoshop/
      - listitem:
        - link "My account":
          - /url: https://qa-cart.com/
      - listitem:
        - link "QA Automation Courses | Training":
          - /url: https://anuradhaagarwal.com
  - link "View Shopping Cart, empty":
    - /url: https://qa-cart.com/mycart/
    - text: $0.00
    - img
    - text: "0"
  - link "Account icon link":
    - /url: https://qa-cart.com/customer/
- main:
  - article:
    - heading "My account" [level=1]
    - alert:
      - text: 
      - listitem:
        - strong: "Error:"
        - text: The password you entered for the email address
        - strong: anuradha.learn@gmail.com
        - text: is incorrect.
        - link "Lost your password?":
          - /url: https://qa-cart.com/lost-password/
    - heading "Login" [level=2]
    - paragraph:
      - text: Username or email address Required
      - textbox "Username or email address Required": anuradha.learn@gmail.com
    - paragraph:
      - text: Password Required
      - textbox "Password Required"
      - button "Show password": 
    - paragraph:
      - checkbox "Remember me"
      - text: Remember me
      - button "Log in"
    - paragraph:
      - link "Lost your password?":
        - /url: https://qa-cart.com/lost-password/
    - heading "Register" [level=2]
    - paragraph:
      - text: Email address Required
      - textbox "Email address Required"
    - paragraph: A link to set a new password will be sent to your email address.
    - paragraph:
      - text: Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our
      - link "privacy policy":
        - /url: https://qa-cart.com/?page_id=3
      - text: .
    - paragraph:
      - button "Register"
- contentinfo:
  - paragraph: Copyright © anuradhaagarwal.com
  - link "Yelp":
    - /url: "#"
  - link "Facebook":
    - /url: "#"
  - link "Twitter":
    - /url: "#"
  - link "Instagram":
    - /url: "#"
- status
```

# Test source

```ts
  1  | import { test as setup, expect } from '@playwright/test'
  2  | import path from 'path';
  3  | 
  4  | 
  5  | // ─────────────────────────────────────────────
  6  | // Auth state output path
  7  | // ─────────────────────────────────────────────
  8  | const authFile = path.join(__dirname, '..', 'auth', 'storageState.json');
  9  | 
  10 | //Login Credentials
  11 | 
  12 | const loginData = {
  13 |     user: process.env.DEMO_USER!,
  14 |     password: process.env.DEMO_PASS!,
  15 |     baseUrl:process.env.BASE_URL!
  16 | };
  17 | 
  18 | 
  19 | // ─────────────────────────────────────────────
  20 | // Setup: authenticate once and save session
  21 | // ─────────────────────────────────────────────
  22 | 
  23 | setup('authenticate and save session', async ({ page, context }) => {
  24 | 
  25 |     // Navigate to application
  26 |     await page.goto(loginData.baseUrl);
  27 | 
  28 |     // Enter username
  29 |     await page.getByRole('textbox', {
  30 |         name: 'Username or email address'
  31 |     }).fill(loginData.user);
  32 | 
  33 |     // Enter password
  34 |     await page.getByRole('textbox', {
  35 |         name: 'Password'
  36 |     }).fill(loginData.password);
  37 | 
  38 |     // Click Login button
  39 |     await page.getByRole('button', {
  40 |         name: 'Log in'
  41 |     }).click();
  42 | 
  43 |     // Verify successful login
  44 |     await expect(
  45 |         page.getByLabel('Account pages')
  46 |             .getByRole('link', { name: 'Log out' })
> 47 |     ).toBeVisible();
     |       ^ Error: expect(locator).toBeVisible() failed
  48 | 
  49 |     await context.storageState({path:authFile})
  50 |     console.log(`Auth state saved to ${authFile}`);
  51 | 
  52 | }
  53 | )
  54 | 
```