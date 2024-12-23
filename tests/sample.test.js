const puppeteer = require('puppeteer');
const path = require('path');

describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com');
  });

  it('should be titled "Google"', async () => {
    // await page.screenshot({ path: 'screenshot-google.png' });
    await expect(page.title()).resolves.toMatch('Google');
  });
});


describe('Checkbox Interaction Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    const filePath = `file:${path.join(__dirname, '../index.html')}`;
    await page.goto(filePath, { waitUntil: 'domcontentloaded' });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should display welcome message when checkbox is checked', async () => {
    const checkboxSelector = '#welcome-checkbox';
    const welcomeMessageSelector = '#welcome-message';
    const twitterLoginButtonSelector = '.twitter-login';

    // Wait for the script to be ready
    // await page.waitForSelector(twitterLoginButtonSelector);

    // Check the checkbox
    await page.click(checkboxSelector);

    // Click the Twitter login button
    await page.click(twitterLoginButtonSelector);

    await page.screenshot({ path: 'screenshot-login.png' });

    // Verify the welcome message is displayed
    const isVisible = await page.$eval(welcomeMessageSelector, el => {
      const style = window.getComputedStyle(el);
      return style && style.display !== 'none';
    });
    expect(isVisible).toBe(true);
  });

  test('should hide welcome message when checkbox is unchecked', async () => {
    const checkboxSelector = '#welcome-checkbox';
    const welcomeMessageSelector = '#welcome-message';

    // Uncheck the checkbox
    await page.click(checkboxSelector);

    // Verify the welcome message is hidden
    const isVisible = await page.$eval(welcomeMessageSelector, el => el.style.display === 'none');
    expect(isVisible).toBe(true);
  });
});
