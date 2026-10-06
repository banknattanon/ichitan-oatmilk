const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
  });

  const fileUrl = 'file://' + path.resolve(__dirname, '..', 'index.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  console.log('--- 1. Testing Page Load ---');
  console.log('Title:', await page.title());
  console.log('Errors:', errors);

  console.log('--- 2. Testing Theme Switching ---');
  // Initial Dark Theme
  const initialBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('Dark default bg:', initialBg);

  // Switch to Golden Oat
  await page.click('#themeOatBtn');
  await page.waitForTimeout(400);
  const oatBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const oatClass = await page.evaluate(() => document.body.className);
  console.log('Oat Theme bg:', oatBg, 'className:', oatClass);

  // Switch to Kyoto Matcha
  await page.click('#themeMatchaBtn');
  await page.waitForTimeout(400);
  const matchaBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const matchaClass = await page.evaluate(() => document.body.className);
  console.log('Matcha Theme bg:', matchaBg, 'className:', matchaClass);

  // Switch back to Dark
  await page.click('#themeDarkBtn');
  await page.waitForTimeout(400);
  const darkClass = await page.evaluate(() => document.body.className);
  console.log('Dark Theme className:', darkClass);

  console.log('--- 3. Testing 3D / Studio Photo Toggle ---');
  await page.click('#viewPhotoBtn');
  await page.waitForTimeout(400);
  const photoVisible = await page.isVisible('#heroPhotoStage');
  const pack3dVisible = await page.isVisible('#heroPack3d');
  console.log('Studio Photo visible:', photoVisible, '| 3D pack visible:', pack3dVisible);

  await page.click('#view3dBtn');
  await page.waitForTimeout(400);
  const photoVisibleAfter = await page.isVisible('#heroPhotoStage');
  const pack3dVisibleAfter = await page.isVisible('#heroPack3d');
  console.log('Back to 3D: Photo visible:', photoVisibleAfter, '| 3D pack visible:', pack3dVisibleAfter);

  console.log('--- 4. Testing Concept Tab Switching ---');
  await page.click('.concept-tab-btn[data-concept="concept-b"]');
  await page.waitForTimeout(400);
  const conceptBVisible = await page.isVisible('#concept-b-panel');
  console.log('Concept B Panel visible:', conceptBVisible);

  await page.click('.concept-tab-btn[data-concept="concept-c"]');
  await page.waitForTimeout(400);
  const conceptCVisible = await page.isVisible('#concept-c-panel');
  console.log('Concept C Panel visible:', conceptCVisible);

  console.log('--- 5. Capturing Screenshots ---');
  fs.mkdirSync(path.resolve(__dirname, '../screenshots'), { recursive: true });
  
  // Hero screenshot
  await page.screenshot({ path: path.resolve(__dirname, '../screenshots/hero-desktop.png'), fullPage: false });
  console.log('Saved hero-desktop.png');

  // Shelf simulator screenshot
  const shelfElement = await page.$('.shelf-simulation-wrapper');
  if (shelfElement) {
    await shelfElement.screenshot({ path: path.resolve(__dirname, '../screenshots/shelf-simulation.png') });
    console.log('Saved shelf-simulation.png');
  }

  // Concept C screenshot
  const conceptCard = await page.$('#conceptCardWrapper');
  if (conceptCard) {
    await conceptCard.screenshot({ path: path.resolve(__dirname, '../screenshots/concept-c.png') });
    console.log('Saved concept-c.png');
  }

  // Oat Theme fullpage
  await page.click('#themeOatBtn');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.resolve(__dirname, '../screenshots/theme-oat-full.png'), fullPage: false });
  console.log('Saved theme-oat-full.png');

  console.log('All Playwright tests passed!');
  await browser.close();
})();
