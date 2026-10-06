const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  const fileUrl = 'file://' + path.resolve(__dirname, '..', 'index.html');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });

  console.log('Title:', await page.title());
  console.log('Errors at load:', errors);

  const initialBodyClass = await page.evaluate(() => document.body.className);
  console.log('Initial body class:', initialBodyClass);

  // Click Oat Theme
  await page.click('#themeOatBtn');
  const oatClass = await page.evaluate(() => document.body.className);
  const oatBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('Oat Theme class:', oatClass, 'bg:', oatBg);

  // Click Matcha Theme
  await page.click('#themeMatchaBtn');
  const matchaClass = await page.evaluate(() => document.body.className);
  const matchaBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('Matcha Theme class:', matchaClass, 'bg:', matchaBg);

  // Click Dark Theme
  await page.click('#themeDarkBtn');
  const darkClass = await page.evaluate(() => document.body.className);
  console.log('Dark Theme class:', darkClass);

  await browser.close();
})();
