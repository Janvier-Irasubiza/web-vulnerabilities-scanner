import puppeteer from "puppeteer";

export async function launchBrowser(headless = true) {
  const browser = await puppeteer.launch({
    headless: headless,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  return browser;
}

import type { Browser } from "puppeteer";

export async function closeBrowser(browser: Browser) {
  await browser.close();
}
