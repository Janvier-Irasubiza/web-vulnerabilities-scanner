import { launchBrowser, closeBrowser } from '../../src/utils/browserUtils';

describe('Browser Utility Functions', () => {
  let browser;

  beforeAll(async () => {
    browser = await launchBrowser();
  });

  afterAll(async () => {
    await closeBrowser(browser);
  });

  test('launchBrowser should return a browser instance', async () => {
    expect(browser).toBeDefined();
    expect(typeof browser.newPage).toBe('function');
  });

  test('closeBrowser should close the browser instance', async () => {
    const page = await browser.newPage();
    await closeBrowser(browser);
    // Check if the browser is closed by attempting to create a new page
    await expect(browser.newPage()).rejects.toThrow();
  });
});