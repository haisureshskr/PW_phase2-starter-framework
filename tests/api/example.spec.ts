import { test, expect } from '@playwright/test';

test('API test', async ({ request }) => {
  const response = await request.get('/');

  expect(response.ok()).toBeTruthy();
});