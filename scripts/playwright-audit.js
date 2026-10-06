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
  console.log('Page errors count:', errors.length);
  if (errors.length > 0) {
    console.error('Errors found:', errors);
  }

  console.log('--- 2. Testing Flavor Switcher (Original / Almond / Duo) ---');
  // Click Almond
  await page.click('.color-dot[data-flavor="almond"]');
  await page.waitForTimeout(300);
  const activeFlavorText = await page.textContent('#flavorActiveName');
  console.log('Active Flavor Text after clicking Almond:', activeFlavorText.trim());

  // Click Duo
  await page.click('.color-dot[data-flavor="duo"]');
  await page.waitForTimeout(300);
  const duoFlavorText = await page.textContent('#flavorActiveName');
  console.log('Active Flavor Text after clicking Duo:', duoFlavorText.trim());

  // Click Original
  await page.click('.color-dot[data-flavor="original"]');
  await page.waitForTimeout(300);

  console.log('--- 3. Testing 3D vs Studio Photo Toggle ---');
  await page.click('#view3dBtn');
  await page.waitForTimeout(300);
  const pack3dVisible = await page.isVisible('#heroPack3d');
  console.log('3D Pack Visible:', pack3dVisible);

  await page.click('#viewPhotoBtn');
  await page.waitForTimeout(300);
  const photoVisible = await page.isVisible('#heroPhotoStage');
  console.log('Studio Photo Stage Visible:', photoVisible);

  console.log('--- 4. Testing Theme Switcher ---');
  // Switch to Oat theme
  await page.click('#themeOatBtn');
  await page.waitForTimeout(300);
  const oatClass = await page.evaluate(() => document.body.className);
  console.log('Oat Theme className:', oatClass);

  // Switch to Matcha theme
  await page.click('#themeMatchaBtn');
  await page.waitForTimeout(300);
  const matchaClass = await page.evaluate(() => document.body.className);
  console.log('Matcha Theme className:', matchaClass);

  // Switch back to Dark theme
  await page.click('#themeDarkBtn');
  await page.waitForTimeout(300);
  const darkClass = await page.evaluate(() => document.body.className);
  console.log('Dark Theme className:', darkClass);

  console.log('--- 5. Testing Financial Simulator Interactivity ---');
  const initialRevenue = await page.textContent('#kpiRevenue');
  console.log('Initial Revenue KPI:', initialRevenue);

  // Set slider value via page.evaluate
  await page.evaluate(() => {
    const slider = document.getElementById('sliderVelocity');
    slider.value = '2.0';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.waitForTimeout(300);
  const updatedRevenue = await page.textContent('#kpiRevenue');
  const updatedEbitda = await page.textContent('#kpiEbitda');
  console.log('Updated Revenue at 2.0 bottles/store/day:', updatedRevenue, '| EBIT:', updatedEbitda);

  // Reset velocity to 1.4
  await page.evaluate(() => {
    const slider = document.getElementById('sliderVelocity');
    slider.value = '1.4';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.waitForTimeout(300);

  console.log('--- 6. Testing 7-Eleven Shelf Simulator ---');
  const heroShelfVisible = await page.isVisible('#shelfHeroItem');
  const almondShelfVisible = await page.isVisible('#shelfAlmondItem');
  console.log('Original Oat on shelf:', heroShelfVisible, '| Oat+Almond on shelf:', almondShelfVisible);

  await page.click('#shelfPulseBtn');
  await page.waitForTimeout(300);
  console.log('Shelf Pulse Highlight tested.');

  console.log('--- 7. Testing CEO Executive Deck Modal ---');
  await page.click('#deckBtn');
  await page.waitForTimeout(300);
  const deckModalVisible = await page.isVisible('#deckModal');
  const slide1Title = await page.locator('#deckSlideCard h2').first().textContent();
  console.log('Deck Modal Visible:', deckModalVisible, '| Slide 1 Title:', slide1Title ? slide1Title.trim() : 'N/A');

  // Click Next Slide
  await page.click('#deckNextBtn');
  await page.waitForTimeout(300);
  const slide2Title = await page.locator('#deckSlideCard h2').first().textContent();
  console.log('Slide 2 Title:', slide2Title ? slide2Title.trim() : 'N/A');

  // Close Deck
  await page.click('#closeDeckBtn');
  await page.waitForTimeout(300);
  const deckModalClosed = !(await page.isVisible('#deckModal'));
  console.log('Deck Modal Closed:', deckModalClosed);

  console.log('--- 8. Capturing Visual Screenshots ---');
  const screenshotDir = path.resolve(__dirname, '../screenshots');
  fs.mkdirSync(screenshotDir, { recursive: true });

  // Hero Section
  await page.screenshot({ path: path.join(screenshotDir, '1-hero-brief-230ml.png'), fullPage: false });
  console.log('Saved screenshots/1-hero-brief-230ml.png');

  // Brief Dimensions Section
  const briefDimensions = await page.$('#brief-dimensions');
  if (briefDimensions) {
    await briefDimensions.screenshot({ path: path.join(screenshotDir, '2-brief-7-dimensions.png') });
    console.log('Saved screenshots/2-brief-7-dimensions.png');
  }

  // Dual SKUs Section
  const skusSection = await page.$('#skus');
  if (skusSection) {
    await skusSection.screenshot({ path: path.join(screenshotDir, '3-dual-skus-230ml.png') });
    console.log('Saved screenshots/3-dual-skus-230ml.png');
  }

  // Shelf Section
  const shelfSection = await page.$('#shelf');
  if (shelfSection) {
    await shelfSection.screenshot({ path: path.join(screenshotDir, '4-shelf-simulator.png') });
    console.log('Saved screenshots/4-shelf-simulator.png');
  }

  // P&L Simulator Section
  const simSection = await page.$('#simulator');
  if (simSection) {
    await simSection.screenshot({ path: path.join(screenshotDir, '5-pl-100m-simulator.png') });
    console.log('Saved screenshots/5-pl-100m-simulator.png');
  }

  console.log('=== Playwright audit finished successfully with ' + errors.length + ' page errors! ===');
  await browser.close();

  if (errors.length > 0) {
    process.exit(1);
  }
})();
