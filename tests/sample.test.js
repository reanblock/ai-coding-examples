const puppeteer = require('puppeteer');
const path = require('path');

describe('Checkbox Interaction Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    const filePath = `file:${path.join(__dirname, '../index.html')}`;
    await page.goto(filePath);
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should display welcome message when checkbox is checked', async () => {
    const checkboxSelector = '#welcome-checkbox';
    const welcomeMessageSelector = '#welcome-message';

    // Check the checkbox
    await page.click(checkboxSelector);

    // Verify the welcome message is displayed
    const isVisible = await page.$eval(welcomeMessageSelector, el => el.style.display !== 'none');
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
