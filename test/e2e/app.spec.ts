import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { preview } from 'vite'
import type { PreviewServer } from 'vite'
import puppeteer from 'puppeteer'
import type { Browser, Page } from 'puppeteer'

import { sleep } from '../utils'

const port = 3142 // Unlike in life, where there is no such thing as free PI, servers usually don't run on it
const BASE_URL = `http://localhost:${port}`
const PAGES = {
  login: `${BASE_URL}/login`,
  createAccount: `${BASE_URL}/create-account`
}

describe("app.tsx", () => {
  let server: PreviewServer
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    server = await preview({ preview: { port } })
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(() => browser.close());

  test("should navigate to the create-account page", async () => {
    await page.goto(PAGES.login);
    const createAccountBtn = await page.waitForSelector("#create-account-btn");
    await createAccountBtn.click()

    await sleep(100) // just to be sure, sometimes it failed as the click handler is async
    const createAccountBtnText = await createAccountBtn.evaluate(el => el.textContent)

    expect(createAccountBtnText).toBe('Create account')
    const url = page.url()
    expect(url).toEqual(PAGES.createAccount)
  })
});
