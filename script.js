/**
 * ICHITAN OAT MILK 230ml — CEO Strategic Pitch & 100M Launch Portal
 * Master Application Controller & Interactive Logic
 * Aligned with New Brief: 230ml, 8฿ COGS, 100M THB Target, Original Oat & Oat+Almond
 */

document.addEventListener('DOMContentLoaded', () => {

  // Web Audio Synthesizer (Zero External Audio Files)
  let soundEnabled = true;
  let audioCtx = null;
  function playUiSound(type = 'click') {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      if (type === 'click') {
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'pop') {
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'chime') {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (e) {}
  }

  // ==========================================
  // 1. FLAVOR & HERO PACKSHOT LOGIC (NEW BRIEF)
  // ==========================================
  const flavors = {
    original: {
      name: "ORIGINAL OAT",
      sub: "100% Australian Oats 230ml",
      price: "20.-",
      graphic: "🌾",
      badges: "<span>🌱 0% SUGAR</span> • <span>🥛 BETA-GLUCAN</span>",
      gradient: "linear-gradient(135deg, #FDFBF7 0%, #EED7A1 50%, #C4A468 100%)",
      capColor: "linear-gradient(180deg, #D97706 0%, #92400E 100%)",
      photoSrc: "assets/generated/original-oat-230ml.jpg",
      fullName: "1) Original Oat 230ml — ข้าวโอ๊ตออสเตรเลียแท้ ไม่เติมน้ำตาลทราย",
      sensory: { sweet: "20%", sweetVal: "1.5/5", creamy: "88%", creamyVal: "4.5/5", aroma: "75%", aromaVal: "4/5", body: "82%", bodyVal: "4.2/5", kcal: "~75 kcal / 230ml" }
    },
    almond: {
      name: "OAT + ALMOND",
      sub: "Roasted California Almond 230ml",
      price: "22.-",
      graphic: "🌰",
      badges: "<span>✨ VITAMIN E 50%</span> • <span>🥜 นัวคูณสอง</span>",
      gradient: "linear-gradient(135deg, #FFF7ED 0%, #EA580C 50%, #9A3412 100%)",
      capColor: "linear-gradient(180deg, #C2410C 0%, #7C2D12 100%)",
      photoSrc: "assets/generated/oat-almond-230ml.jpg",
      fullName: "2) Oat + Almond Blend 230ml — โอ๊ตผสานอัลมอนด์คั่ว นัวเข้มข้นระดับบาริสต้า",
      sensory: { sweet: "25%", sweetVal: "2/5", creamy: "95%", creamyVal: "5/5", aroma: "92%", aromaVal: "4.8/5", body: "90%", bodyVal: "4.6/5", kcal: "~95 kcal / 230ml" }
    },
    duo: {
      name: "DUO LAUNCH",
      sub: "Everyday Goodness 230ml",
      price: "20-22.-",
      graphic: "🌾🌰",
      badges: "<span>🎯 100M THB TARGET</span> • <span>🏪 14,000 7-ELEVEN</span>",
      gradient: "linear-gradient(135deg, #FFFBEB 0%, #D97706 50%, #B45309 100%)",
      capColor: "linear-gradient(180deg, #EA580C 0%, #9A3412 100%)",
      photoSrc: "assets/generated/duo-launch-banner.jpg",
      fullName: "Duo Launch Portfolio — 2 รสชาติคู่บุกตู้แช่ 7-Eleven ทั่วประเทศ",
      sensory: { sweet: "22%", sweetVal: "1.8/5", creamy: "92%", creamyVal: "4.8/5", aroma: "85%", aromaVal: "4.5/5", body: "86%", bodyVal: "4.4/5", kcal: "75-95 kcal / 230ml" }
    }
  };

  const heroPhotoImg = document.getElementById('heroPhotoImg');
  const heroPhotoStage = document.getElementById('heroPhotoStage');
  const heroPack3d = document.getElementById('heroPack3d');
  const viewPhotoBtn = document.getElementById('viewPhotoBtn');
  const view3dBtn = document.getElementById('view3dBtn');
  const flavorActiveName = document.getElementById('flavorActiveName');
  const colorDots = document.querySelectorAll('.color-dot');

  // Sensory metric elements
  const barSweet = document.getElementById('barSweet');
  const valSweet = document.getElementById('valSweet');
  const barCreamy = document.getElementById('barCreamy');
  const valCreamy = document.getElementById('valCreamy');
  const barAroma = document.getElementById('barAroma');
  const valAroma = document.getElementById('valAroma');
  const barBody = document.getElementById('barBody');
  const valBody = document.getElementById('valBody');
  const flavorKcal = document.getElementById('flavorKcal');

  function updateFlavor(key) {
    const f = flavors[key];
    if (!f) return;

    flavorActiveName.textContent = f.fullName;
    if (heroPhotoImg) heroPhotoImg.src = f.photoSrc;

    // Update sensory meters
    if (f.sensory) {
      if (barSweet) barSweet.style.width = f.sensory.sweet;
      if (valSweet) valSweet.textContent = f.sensory.sweetVal;
      if (barCreamy) barCreamy.style.width = f.sensory.creamy;
      if (valCreamy) valCreamy.textContent = f.sensory.creamyVal;
      if (barAroma) barAroma.style.width = f.sensory.aroma;
      if (valAroma) valAroma.textContent = f.sensory.aromaVal;
      if (barBody) barBody.style.width = f.sensory.body;
      if (valBody) valBody.textContent = f.sensory.bodyVal;
      if (flavorKcal) flavorKcal.textContent = f.sensory.kcal;
    }

    colorDots.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.flavor === key);
    });
  }

  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      playUiSound('pop');
      updateFlavor(dot.dataset.flavor);
    });
  });

  // 3D vs Photo View Toggle
  if (viewPhotoBtn && view3dBtn && heroPhotoStage && heroPack3d) {
    viewPhotoBtn.addEventListener('click', () => {
      viewPhotoBtn.classList.add('active');
      view3dBtn.classList.remove('active');
      heroPhotoStage.style.display = 'block';
      heroPack3d.style.display = 'none';
      playUiSound('click');
      showToast('สลับสู่มุมมองภาพถ่าย Commercial Studio Photo 230ml', '📸');
    });

    view3dBtn.addEventListener('click', () => {
      view3dBtn.classList.add('active');
      viewPhotoBtn.classList.remove('active');
      heroPhotoStage.style.display = 'none';
      heroPack3d.style.display = 'block';
      playUiSound('click');
      showToast('สลับสู่โหมด 3D Interactive Simulation', '🧊');
    });
  }

  // ==========================================
  // 2. CHARTS RENDERING (CANVAS)
  // ==========================================
  function renderMarketGrowthChart() {
    const canvas = document.getElementById('marketGrowthChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement.clientWidth;
    const height = 250;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const data = [
      { year: "2024", soy: 17200, oat: 1781 },
      { year: "2025F", soy: 17500, oat: 2600 },
      { year: "2026F", soy: 17800, oat: 4200 },
      { year: "2027F", soy: 18000, oat: 6100 },
      { year: "2028F", soy: 18200, oat: 8500 }
    ];

    const padLeft = 45;
    const padRight = 20;
    const padTop = 30;
    const padBottom = 35;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;
    const maxVal = 20000;

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padTop + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();

      const val = Math.round(maxVal - (maxVal / 4) * i);
      ctx.fillStyle = '#64748B';
      ctx.font = '10px Kanit, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${val / 1000}k`, padLeft - 8, y + 3);
    }

    const colW = chartW / data.length;
    data.forEach((d, i) => {
      const x = padLeft + colW * i + colW / 2;

      // Soy bar
      const soyH = (d.soy / maxVal) * chartH;
      ctx.fillStyle = 'rgba(100, 116, 139, 0.4)';
      ctx.beginPath();
      ctx.roundRect(x - 22, padTop + chartH - soyH, 18, soyH, [4, 4, 0, 0]);
      ctx.fill();

      // Oat bar (Highlight)
      const oatH = (d.oat / maxVal) * chartH;
      const grad = ctx.createLinearGradient(0, padTop + chartH - oatH, 0, padTop + chartH);
      grad.addColorStop(0, '#F59E0B');
      grad.addColorStop(1, '#D97706');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x + 2, padTop + chartH - oatH, 18, oatH, [4, 4, 0, 0]);
      ctx.fill();

      // Year label
      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px Prompt, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.year, x, padTop + chartH + 20);
    });
  }

  function renderPriceBenchmarkChart() {
    const canvas = document.getElementById('priceBenchmarkChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement.clientWidth;
    const height = 250;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const brands = [
      { name: "Oatly (นำเข้า)", price100ml: 16.8, color: "#64748B" },
      { name: "137 Degrees", price100ml: 16.1, color: "#64748B" },
      { name: "Goodmate", price100ml: 15.7, color: "#94A3B8" },
      { name: "UFC Velvet", price100ml: 12.8, color: "#94A3B8" },
      { name: "⭐ ICHITAN (22฿)", price100ml: 9.6, color: "#F59E0B", highlight: true },
      { name: "⭐ ICHITAN (20฿)", price100ml: 8.7, color: "#EA580C", highlight: true }
    ];

    const padLeft = 135;
    const padRight = 65;
    const padTop = 20;
    const padBottom = 15;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;
    const maxVal = 20;
    const rowH = chartH / brands.length;

    brands.forEach((b, i) => {
      const y = padTop + rowH * i + rowH / 2;
      const barH = 18;
      const barW = (b.price100ml / maxVal) * chartW;

      ctx.fillStyle = b.highlight ? '#FDE68A' : '#CBD5E1';
      ctx.font = b.highlight ? 'bold 11px Prompt, sans-serif' : '10.5px Kanit, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(b.name, padLeft - 12, y + 4);

      if (b.highlight) {
        const grad = ctx.createLinearGradient(padLeft, 0, padLeft + barW, 0);
        grad.addColorStop(0, '#EA580C');
        grad.addColorStop(1, '#F59E0B');
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = b.color;
      }

      ctx.beginPath();
      ctx.roundRect(padLeft, y - barH / 2, barW, barH, [0, 5, 5, 0]);
      ctx.fill();

      ctx.fillStyle = b.highlight ? '#FDE68A' : '#94A3B8';
      ctx.font = 'bold 10.5px Prompt, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(b.price100ml.toFixed(1) + ' ฿/100ml', padLeft + barW + 8, y + 4);
    });
  }

  renderMarketGrowthChart();
  renderPriceBenchmarkChart();
  window.addEventListener('resize', () => {
    renderMarketGrowthChart();
    renderPriceBenchmarkChart();
  });

  // ==========================================
  // 3. P&L FINANCIAL SIMULATOR (100M TARGET, COGS 8฿)
  // ==========================================
  const sliderPrice = document.getElementById('sliderPrice');
  const sliderVelocity = document.getElementById('sliderVelocity');
  const sliderStores = document.getElementById('sliderStores');
  const sliderMultiplier = document.getElementById('sliderMultiplier');

  const valPrice = document.getElementById('valPrice');
  const valVelocity = document.getElementById('valVelocity');
  const valStores = document.getElementById('valStores');
  const valMultiplier = document.getElementById('valMultiplier');

  const kpiRevenue = document.getElementById('kpiRevenue');
  const kpiRevenueDesc = document.getElementById('kpiRevenueDesc');
  const kpiVolume = document.getElementById('kpiVolume');
  const kpiGrossProfit = document.getElementById('kpiGrossProfit');
  const kpiMarginPercent = document.getElementById('kpiMarginPercent');
  const kpiMarketing = document.getElementById('kpiMarketing');
  const kpiEbitda = document.getElementById('kpiEbitda');

  function updateFinancialSimulator() {
    const price = parseFloat(sliderPrice.value);
    const velocity = parseFloat(sliderVelocity.value);
    const stores = parseInt(sliderStores.value, 10);
    const multiplier = parseInt(sliderMultiplier.value, 10);

    valPrice.textContent = `${price} บาท`;
    valVelocity.textContent = `${velocity.toFixed(1)} ขวด/วัน`;
    valStores.textContent = `${stores.toLocaleString()} สาขา`;
    valMultiplier.textContent = `+${multiplier}% ของยอด 7-11`;

    // 7-Eleven daily & annual bottles
    const daily711 = stores * velocity;
    const totalDaily = daily711 * (1 + multiplier / 100);
    const annualBottles = totalDaily * 365;
    const annualBottlesM = annualBottles / 1000000;

    // Financial Model based on Brief:
    // Retail Price (e.g. 22฿) -> Ex-VAT is ~20.56฿ -> Trade Margin ~31.9% -> Net Invoiced to Ichitan = 14.00฿
    const wholesaleNetPrice = price * (14.0 / 22.0); // Ratio preserves 14฿ net at 22฿ RSP
    const cogsUnit = 8.00; // Fixed 8.00 THB COGS per brief
    const grossProfitUnit = wholesaleNetPrice - cogsUnit;
    const grossMarginPercent = (grossProfitUnit / wholesaleNetPrice) * 100;

    const netSalesM = (annualBottles * wholesaleNetPrice) / 1000000;
    const grossProfitM = (annualBottles * grossProfitUnit) / 1000000;
    const retailValueM = (annualBottles * price) / 1000000;

    // A&P budget is 18% of net sales
    const marketingM = netSalesM * 0.18;
    // Logistics & SG&A is 8% of net sales
    const sgaM = netSalesM * 0.08;
    const ebitM = Math.max(0, grossProfitM - marketingM - sgaM);

    // Update KPIs
    kpiRevenue.textContent = `${netSalesM.toFixed(1)} M฿`;
    if (netSalesM >= 100) {
      kpiRevenueDesc.textContent = `🎉 บรรลุเป้าหมาย 100 ล้านบาท! (มูลค่าขายปลีกหน้าร้าน ~${retailValueM.toFixed(1)} ล้านบาท)`;
    } else {
      kpiRevenueDesc.textContent = `ต้องการอีก ${(100 - netSalesM).toFixed(1)} ล้านบาท เพื่อบรรลุเป้าหมาย 100M`;
    }

    kpiVolume.textContent = `${annualBottlesM.toFixed(1)} M`;
    kpiGrossProfit.textContent = `${grossProfitM.toFixed(1)} M฿`;
    kpiMarginPercent.textContent = `Gross Margin ~${grossMarginPercent.toFixed(1)}% (COGS 8.00฿)`;
    kpiMarketing.textContent = `${marketingM.toFixed(1)} M฿`;
    kpiEbitda.textContent = `${ebitM.toFixed(1)} M฿`;
  }

  [sliderPrice, sliderVelocity, sliderStores, sliderMultiplier].forEach(sl => {
    if (sl) sl.addEventListener('input', updateFinancialSimulator);
  });
  updateFinancialSimulator();

  // ==========================================
  // 4. SHELF PULSE SIMULATION
  // ==========================================
  const shelfPulseBtn = document.getElementById('shelfPulseBtn');
  const shelfHeroItem = document.getElementById('shelfHeroItem');
  const shelfAlmondItem = document.getElementById('shelfAlmondItem');

  if (shelfPulseBtn && shelfHeroItem && shelfAlmondItem) {
    shelfPulseBtn.addEventListener('click', () => {
      playUiSound('chime');
      shelfHeroItem.style.transform = 'translateY(-16px) scale(1.12)';
      shelfHeroItem.style.filter = 'drop-shadow(0 0 20px #EA580C)';
      shelfAlmondItem.style.transform = 'translateY(-16px) scale(1.12)';
      shelfAlmondItem.style.filter = 'drop-shadow(0 0 20px #C2410C)';
      showToast('จำลองมุมมองสะดุดตา: ขวดอิชิตัน 230ml แย่งสายตาตู้แช่เซเว่นได้ทันที!', '🔥');

      setTimeout(() => {
        shelfHeroItem.style.transform = '';
        shelfHeroItem.style.filter = '';
        shelfAlmondItem.style.transform = '';
        shelfAlmondItem.style.filter = '';
      }, 2000);
    });
  }

  // ==========================================
  // 5. THEME SWITCHER (DARK, OAT, MATCHA)
  // ==========================================
  const themeDarkBtn = document.getElementById('themeDarkBtn');
  const themeOatBtn = document.getElementById('themeOatBtn');
  const themeMatchaBtn = document.getElementById('themeMatchaBtn');
  const navThemeDarkBtn = document.getElementById('navThemeDarkBtn');
  const navThemeOatBtn = document.getElementById('navThemeOatBtn');
  const navThemeMatchaBtn = document.getElementById('navThemeMatchaBtn');

  function setActiveTheme(themeName) {
    document.body.classList.remove('theme-oat', 'theme-matcha');
    if (themeName !== 'dark') {
      document.body.classList.add(`theme-${themeName}`);
    }

    [themeDarkBtn, navThemeDarkBtn].forEach(b => b && b.classList.toggle('active', themeName === 'dark'));
    [themeOatBtn, navThemeOatBtn].forEach(b => b && b.classList.toggle('active', themeName === 'oat'));
    [themeMatchaBtn, navThemeMatchaBtn].forEach(b => b && b.classList.toggle('active', themeName === 'matcha'));

    const labels = {
      dark: '🌑 Dark Luxury (บอร์ดรูมพรีเมียม)',
      oat: '🌾 Golden Oat (มู้ดคลีนธรรมชาติ)',
      matcha: '🍵 Kyoto Matcha (มู้ดชาเขียวสดชื่น)'
    };
    playUiSound('click');
    showToast(`เปลี่ยนธีม: ${labels[themeName] || themeName}`, '🎨');
  }

  if (themeDarkBtn) themeDarkBtn.addEventListener('click', () => setActiveTheme('dark'));
  if (themeOatBtn) themeOatBtn.addEventListener('click', () => setActiveTheme('oat'));
  if (themeMatchaBtn) themeMatchaBtn.addEventListener('click', () => setActiveTheme('matcha'));
  if (navThemeDarkBtn) navThemeDarkBtn.addEventListener('click', () => setActiveTheme('dark'));
  if (navThemeOatBtn) navThemeOatBtn.addEventListener('click', () => setActiveTheme('oat'));
  if (navThemeMatchaBtn) navThemeMatchaBtn.addEventListener('click', () => setActiveTheme('matcha'));

  // ==========================================
  // 6. FULLSCREEN PITCH DECK SLIDES (100M BRIEF)
  // ==========================================
  const deckModal = document.getElementById('deckModal');
  const deckBtn = document.getElementById('deckBtn');
  const closeDeckBtn = document.getElementById('closeDeckBtn');
  const deckPrevBtn = document.getElementById('deckPrevBtn');
  const deckNextBtn = document.getElementById('deckNextBtn');
  const deckCounter = document.getElementById('deckCounter');
  const deckSlideCard = document.getElementById('deckSlideCard');

  let currentSlide = 0;
  const slides = [
    {
      title: "1. The Business Challenge & Market Opportunity",
      badge: "EXECUTIVE BRIEF",
      content: `
        <h2 style="font-size: 2.2rem; color: #F59E0B; margin-bottom: 1rem;">ช่องว่างตลาดนมพืชไทยสู่เป้าหมาย 100 ล้านบาท</h2>
        <p style="font-size: 1.1rem; color: #CBD5E1; margin-bottom: 1.5rem;">
          ตลาดนมพืชที่ไม่ใช่นมถั่วเหลืองเติบโตกว่า <strong>+45% YoY</strong> สู่ 4,200 ล้านบาทในปี 2026 คนไทยกว่า <strong>90% แพ้นมวัว</strong> แต่นมโอ๊ตปัจจุบันขายแพงเกินไป (28–42฿)
        </p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 1.5rem;">
          <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border-left: 3px solid #F59E0B;">
            <h4 style="color:#FFF; margin-bottom:6px;">จุดอ่อนคู่แข่ง</h4>
            <p style="font-size:0.88rem; color:#94A3B8;">Goodmate (28฿/180ml), 137 Degrees (30฿/180ml) กล่องเล็ก ราคาสูง ดื่มไม่พออิ่ม</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border-left: 3px solid #10B981;">
            <h4 style="color:#FFF; margin-bottom:6px;">จุดแข็งอิชิตัน</h4>
            <p style="font-size:0.88rem; color:#94A3B8;">ขวด 230ml (+28% ปริมาณ) เทคโนโลยี Aseptic Cold Line ต้นทุน COGS คุมได้ที่ ~8.00฿</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border-left: 3px solid #EA580C;">
            <h4 style="color:#FFF; margin-bottom:6px;">เครือข่ายกระจายสินค้า</h4>
            <p style="font-size:0.88rem; color:#94A3B8;">14,000 ร้าน 7-Eleven ทั่วประเทศ ต้องการยอดขายเพียง 1.4 ขวด/วัน/สาขา</p>
          </div>
        </div>
      `
    },
    {
      title: "2. The 2 Hero Launch SKUs (230ml PET)",
      badge: "PRODUCT SPECIFICATIONS",
      content: `
        <h2 style="font-size: 2.2rem; color: #F59E0B; margin-bottom: 1rem;">2 รสชาติหลัก: Original Oat & Oat + Almond</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1.5rem;">
          <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid #D97706;">
            <h3 style="color:#F59E0B; font-size:1.3rem;">1) Original Oat (230ml)</h3>
            <p style="color:#CBD5E1; font-size:0.9rem; margin:8px 0;">ข้าวโอ๊ตออสเตรเลียแท้ 100% สกัดเอนไซม์ธรรมชาติ ไม่เติมน้ำตาลทราย</p>
            <div style="color:#94A3B8; font-size:0.85rem;">• Beta-Glucan 1,000 mg • แคลเซียมสูง 30% • 0% Lactose</div>
            <div style="margin-top:12px; font-weight:700; color:#FFF;">ราคาแนะนำ: 20 – 22 บาท</div>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid #C2410C;">
            <h3 style="color:#FB923C; font-size:1.3rem;">2) Oat + Almond Blend (230ml)</h3>
            <p style="color:#CBD5E1; font-size:0.9rem; margin:8px 0;">โอ๊ตผสานอัลมอนด์คั่วแคลิฟอร์เนีย นัวคูณสอง เข้มข้นสไตล์บาริสต้า</p>
            <div style="color:#94A3B8; font-size:0.85rem;">• วิตามินอีสูง 50% • 0% คอเลสเตอรอล • ไขมันดี MUFA</div>
            <div style="margin-top:12px; font-weight:700; color:#FFF;">ราคาแนะนำ: 22 บาท</div>
          </div>
        </div>
      `
    },
    {
      title: "3. 7-Eleven Shelf Economics: 1.4 Bottles/Day",
      badge: "VELOCITY FEASIBILITY",
      content: `
        <h2 style="font-size: 2.2rem; color: #F59E0B; margin-bottom: 1rem;">สถิติยืนยัน: ทำไมเป้า 100 ล้านบาทจึงเป็นไปได้จริง 100%</h2>
        <div style="background: rgba(217,119,6,0.12); padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; border: 1px solid #D97706;">
          <h3 style="color:#FDE68A; font-size:1.4rem;">สูตรการขาย: 7,142,857 ขวด ÷ 5,110,000 Store-Days = 1.40 ขวด / สาขา / วัน</h3>
          <p style="color:#E2E8F0; margin-top:6px; font-size:0.95rem;">
            แบ่งตาม 2 รสชาติ: ขาย <strong>Original Oat เพียง 0.7 ขวด</strong> และ <strong>Oat+Almond 0.7 ขวด</strong> ต่อวันต่อสาขาเท่านั้น!
          </p>
        </div>
        <p style="color:#94A3B8; font-size:0.95rem;">
          เมื่อเทียบกับ Tofusan ที่ขายได้ 8–12 ขวด/สาขา/วัน และชาเขียวอิชิตันที่ขาย 15–25 ขวด/สาขา/วัน เป้าหมาย 1.4 ขวดต่อสาขาจึงเป็นตัวเลขที่ Conservative และทำสำเร็จได้อย่างแน่นอน
        </p>
      `
    },
    {
      title: "4. Integrated Marketing Plan (IMC) & Viral Stunt",
      badge: "COMMUNICATION BLITZ",
      content: `
        <h2 style="font-size: 2.2rem; color: #F59E0B; margin-bottom: 1rem;">แผนการตลาด 360° สไตล์คุณตัน: ไวรัลสู่ยอดขายจริง</h2>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; margin-top: 1.5rem;">
          <li style="display:flex; gap:12px;">
            <strong style="color:#F59E0B;">Wave 1:</strong>
            <span style="color:#CBD5E1;">Viral Stunt: "คุณตันบาริสต้าปริศนา ณ สยามสแควร์" เสิร์ฟลาเต้โอ๊ตทายราคา 150฿ เฉลยแค่ 20฿ ใน 7-Eleven</span>
          </li>
          <li style="display:flex; gap:12px;">
            <strong style="color:#F59E0B;">Wave 2:</strong>
            <span style="color:#CBD5E1;">Sampling Blitz: แจกชิม 500,000 ขวดใน 10 ย่านออฟฟิศ CBD กรุงเทพฯ ช่วงเช้า 07.30 - 09.30 น.</span>
          </li>
          <li style="display:flex; gap:12px;">
            <strong style="color:#F59E0B;">Wave 3:</strong>
            <span style="color:#CBD5E1;">7-Eleven All Cafe Combo: ซื้อ Espresso Shot แลกซื้อนมโอ๊ต 15฿ เพื่อชง DIY Oat Latte</span>
          </li>
          <li style="display:flex; gap:12px;">
            <strong style="color:#F59E0B;">Wave 4:</strong>
            <span style="color:#CBD5E1;">TikTok Trend: แฮชแท็ก #นัวคูณสองโอ๊ตอัลมอนด์ รีวิวรสชาติและสูตรทำเครื่องดื่มสุขภาพ</span>
          </li>
        </ul>
      `
    },
    {
      title: "5. Financial Statement & P&L Summary (COGS 8฿)",
      badge: "P&L APPROVAL",
      content: `
        <h2 style="font-size: 2.2rem; color: #F59E0B; margin-bottom: 1rem;">โครงสร้างกำไรสุทธิปีแรก (Year 1 P&L Model)</h2>
        <table style="width:100%; border-collapse:collapse; margin: 1.5rem 0; font-size:0.95rem;">
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding:8px 0; color:#CBD5E1;">ยอดขายสุทธิอิชิตัน (Net Revenue)</td><td style="text-align:right; font-weight:700; color:#FFF;">100.00 M฿ (100.0%)</td></tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding:8px 0; color:#CBD5E1;">ต้นทุนขายรวม Total COGS (@ 8.00฿)</td><td style="text-align:right; color:#EF4444;">(57.14 M฿) (57.1%)</td></tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding:8px 0; color:#CBD5E1;">กำไรขั้นต้นรวม (Gross Profit)</td><td style="text-align:right; font-weight:700; color:#10B981;">42.86 M฿ (42.9%)</td></tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding:8px 0; color:#CBD5E1;">งบการตลาดและโฆษณา A&P (18%)</td><td style="text-align:right; color:#F59E0B;">(18.00 M฿) (18.0%)</td></tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding:8px 0; color:#CBD5E1;">ค่าใช้จ่ายขายและบริหาร SG&A (8%)</td><td style="text-align:right; color:#94A3B8;">(8.00 M฿) (8.0%)</td></tr>
          <tr><td style="padding:12px 0; font-weight:800; color:#F59E0B; font-size:1.1rem;">กำไรจากการดำเนินงานสุทธิ (EBIT)</td><td style="text-align:right; font-weight:800; color:#F59E0B; font-size:1.2rem;">16.86 M฿ (16.9%)</td></tr>
        </table>
        <div style="background:rgba(16,185,129,0.1); border:1px solid #10B981; padding:12px; border-radius:8px; font-size:0.85rem; color:#A7F3D0;">
          💡 สรุป: โครงการสร้างผลกำไรจากการดำเนินงาน 16.86 ล้านบาท ได้ทันทีตั้งแต่ปีแรก โดยมีความเสี่ยงต่ำมาก
        </div>
      `
    }
  ];

  function renderSlide(idx) {
    const s = slides[idx];
    if (!s) return;
    deckCounter.textContent = `Slide ${idx + 1} of ${slides.length}`;
    deckSlideCard.innerHTML = `
      <div class="badge-pill" style="border-color: var(--accent-gold); color: #FDE68A; margin-bottom: 1rem;">
        ${s.badge}
      </div>
      ${s.content}
    `;
    deckPrevBtn.disabled = (idx === 0);
    deckNextBtn.textContent = (idx === slides.length - 1) ? 'จบการนำเสนอ (Finish)' : 'ถัดไป (Next) ▶';
  }

  if (deckBtn) {
    deckBtn.addEventListener('click', () => {
      currentSlide = 0;
      renderSlide(currentSlide);
      deckModal.classList.add('active');
    });
  }

  if (closeDeckBtn) {
    closeDeckBtn.addEventListener('click', () => {
      deckModal.classList.remove('active');
    });
  }

  if (deckPrevBtn) {
    deckPrevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        renderSlide(currentSlide);
      }
    });
  }

  if (deckNextBtn) {
    deckNextBtn.addEventListener('click', () => {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        renderSlide(currentSlide);
      } else {
        deckModal.classList.remove('active');
      }
    });
  }

  // Keyboard navigation for pitch deck
  document.addEventListener('keydown', (e) => {
    if (!deckModal.classList.contains('active')) return;
    if (e.key === 'ArrowRight' || e.key === ' ') {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        renderSlide(currentSlide);
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentSlide > 0) {
        currentSlide--;
        renderSlide(currentSlide);
      }
    }
  });

  // Toast Notification System
  const stitchToast = document.getElementById('stitchToast');
  const toastIcon = document.getElementById('toastIcon');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(message, icon = '✨') {
    if (!stitchToast) return;
    toastMsg.textContent = message;
    toastIcon.textContent = icon;
    stitchToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      stitchToast.classList.remove('show');
    }, 2800);
  }

  // Quick Share Button
  const quickShareBtn = document.getElementById('quickShareBtn');
  if (quickShareBtn) {
    quickShareBtn.addEventListener('click', () => {
      const liveUrl = 'https://now-oatmilk.vercel.app';
      navigator.clipboard.writeText(liveUrl).then(() => {
        playUiSound('pop');
        showToast('คัดลอกลิงก์ https://now-oatmilk.vercel.app เรียบร้อยแล้ว!', '📋');
      }).catch(() => {
        showToast('เปิด URL: ' + liveUrl, '🌐');
      });
    });
  }

});
