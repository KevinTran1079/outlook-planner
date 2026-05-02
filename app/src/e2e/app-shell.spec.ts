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
  await expect(page.getByText('Projection preview')).toBeVisible();
  await expect(page.getByRole('button', { name: /export/i })).toBeVisible();
  expect(consoleErrors).toEqual([]);
});
