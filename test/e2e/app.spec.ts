import puppeteer, {Browser, Page} from 'puppeteer'

import { sleep } from '../utils'

const BASE_URL = 'http://localhost:3000'
const PAGES = {
  login: `${BASE_URL}/login`,
  createAccount: `${BASE_URL}/create-account`
}

describe("app.tsx", () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(() => browser.close());

  it("should navigate to the create-account page", async () => {
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
