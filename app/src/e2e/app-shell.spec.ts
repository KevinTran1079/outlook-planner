import { expect, test } from '@playwright/test';

test('loads the retirement workspace shell', async ({ page }) => {
  const consoleErrors: string[] = [];
  const unexpectedNetworkRequests = new Set<string>();

  await page.route('**/*', async (route) => {
    const requestUrl = route.request().url();
    if (!isLocalRuntimeUrl(requestUrl)) {
      unexpectedNetworkRequests.add(requestUrl);
      await route.abort();
      return;
    }
    await route.continue();
  });

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });
  page.on('websocket', (webSocket) => {
    const webSocketUrl = webSocket.url();
    if (!isLocalRuntimeUrl(webSocketUrl)) {
      unexpectedNetworkRequests.add(webSocketUrl);
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
  expect([...unexpectedNetworkRequests]).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

function isLocalRuntimeUrl(rawUrl: string): boolean {
  const url = new URL(rawUrl);
  return ['127.0.0.1', 'localhost'].includes(url.hostname);
}
