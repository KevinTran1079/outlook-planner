import { expect, test } from '@playwright/test';

test('loads the retirement workspace shell', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Retirement workspace' }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Projection' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Accounts' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Canada rules' }),
  ).toBeVisible();
  await expect(page.getByText('CA-2026.1')).toBeVisible();
  await expect(page.getByRole('button', { name: /export/i })).toBeVisible();
  expect(consoleErrors).toEqual([]);
});
