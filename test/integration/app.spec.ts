import puppeteer, {Browser, Page} from 'puppeteer'

describe("app.tsx", () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(() => browser.close());

//   it('does the whole workflow', async () => {

//   })

  it("contains the welcome text", async () => {
    await page.goto("http://localhost:3000/login", {waitUntil: 'load', timeout: 0});
    await page.waitForSelector(".App-welcome-text");
    const text = await page.$eval(".App-welcome-text", (e) => e.textContent);
    expect(text).toContain("Edit src/App.js and save to reload.");
  }, 30000)
});
