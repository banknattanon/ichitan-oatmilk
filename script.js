/**
 * ICHITAN OAT MILK — CEO Strategic Pitch & Launch Portal
 * Master Application Controller & Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  // Web Audio Synthesizer (Google Stitch Sound Design - Zero External Files)
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
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'pop') {
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.06);
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
  // 1. 3D PACKAGING VIEWER & FLAVOR SWITCHER
  // ==========================================
  const flavors = {
    plain: {
      name: "DAILY OAT",
      sub: "100% Australian Oat Milk",
      price: "20.-",
      graphic: "🌾",
      badges: "<span>🌱 0% SUGAR</span> • <span>🥛 LACTOSE FREE</span>",
      gradient: "linear-gradient(135deg, #FBF8F1 0%, #EED7A1 50%, #C4A468 100%)",
      capColor: "linear-gradient(180deg, #FF6B00 0%, #CC5200 100%)",
      brandColor: "#784E1A",
      nameColor: "#3B2610",
      fullName: "Daily Original 0% Added Sugar (สูตรจืดธรรมชาติ)",
      sensory: { sweet: "15%", sweetVal: "1/5", creamy: "85%", creamyVal: "4.5/5", aroma: "70%", aromaVal: "3.5/5", body: "80%", bodyVal: "4/5", kcal: "~70 kcal / 200ml" }
    },
    creamy: {
      name: "CREAMY OAT",
      sub: "Rich & Smooth Texture",
      price: "20.-",
      graphic: "🥛",
      badges: "<span>✨ CALCIUM HIGH</span> • <span>🌾 BETA-GLUCAN</span>",
      gradient: "linear-gradient(135deg, #FFF6E5 0%, #E0BA79 50%, #9C7238 100%)",
      capColor: "linear-gradient(180deg, #E5A93C 0%, #B45309 100%)",
      brandColor: "#6B4416",
      nameColor: "#2C1A06",
      fullName: "Daily Creamy Classic (สูตรคลาสสิกกลมกล่อม)",
      sensory: { sweet: "40%", sweetVal: "2/5", creamy: "95%", creamyVal: "5/5", aroma: "75%", aromaVal: "4/5", body: "85%", bodyVal: "4.5/5", kcal: "~85 kcal / 200ml" }
    },
    matcha: {
      name: "MATCHA OAT",
      sub: "Kyoto Uji Green Tea",
      price: "25.-",
      graphic: "🍵",
      badges: "<span>🍃 REAL TEA 100%</span> • <span>☕ ANTIOXIDANT</span>",
      gradient: "linear-gradient(135deg, #E8F5E9 0%, #2D6A4F 60%, #1B4332 100%)",
      capColor: "linear-gradient(180deg, #10B981 0%, #047857 100%)",
      brandColor: "#1B4332",
      nameColor: "#FFFFFF",
      fullName: "Uji Matcha Oat Latte (มัทฉะโอ๊ตมิลค์เกียวโต)",
      sensory: { sweet: "25%", sweetVal: "1.5/5", creamy: "75%", creamyVal: "3.8/5", aroma: "95%", aromaVal: "5/5", body: "75%", bodyVal: "3.8/5", kcal: "~95 kcal / 250ml" }
    },
    hojicha: {
      name: "HOJICHA OAT",
      sub: "Slow Roasted Japanese Tea",
      price: "25.-",
      graphic: "🍂",
      badges: "<span>🔥 ROASTED AROMA</span> • <span>💤 LOW CAFFEINE</span>",
      gradient: "linear-gradient(135deg, #F5EBE6 0%, #8B5A2B 60%, #4A2810 100%)",
      capColor: "linear-gradient(180deg, #A26B38 0%, #5E3917 100%)",
      brandColor: "#4A2810",
      nameColor: "#FFFFFF",
      fullName: "Roasted Hojicha Oat (โฮจิฉะคั่วหอมกรุ่น)",
      sensory: { sweet: "20%", sweetVal: "1.5/5", creamy: "70%", creamyVal: "3.5/5", aroma: "100%", aromaVal: "5/5", body: "80%", bodyVal: "4/5", kcal: "~90 kcal / 250ml" }
    },
    choco: {
      name: "DARK COCOA",
      sub: "Belgian 70% Dark Cacao",
      price: "25.-",
      graphic: "🍫",
      badges: "<span>⚡ CLEAN ENERGY</span> • <span>🖤 GUILT-FREE</span>",
      gradient: "linear-gradient(135deg, #EFEBE9 0%, #4E342E 60%, #211512 100%)",
      capColor: "linear-gradient(180deg, #F43F5E 0%, #9F1239 100%)",
      brandColor: "#271612",
      nameColor: "#FFFFFF",
      fullName: "Belgian Dark Cocoa Oat (ดาร์กช็อกโกแลตเข้มข้น 70%)",
      sensory: { sweet: "50%", sweetVal: "2.5/5", creamy: "90%", creamyVal: "4.5/5", aroma: "90%", aromaVal: "4.5/5", body: "95%", bodyVal: "5/5", kcal: "~110 kcal / 260ml" }
    }
  };

  const heroPackBody = document.getElementById('heroPackBody');
  const heroPackCap = document.getElementById('heroPackCap');
  const heroPackName = document.getElementById('heroPackName');
  const heroPackSub = document.getElementById('heroPackSub');
  const heroPackGraphic = document.getElementById('heroPackGraphic');
  const heroPackBadges = document.getElementById('heroPackBadges');
  const heroPackPrice = document.getElementById('heroPackPrice');
  const flavorActiveName = document.getElementById('flavorActiveName');
  const colorDots = document.querySelectorAll('.color-dot');
  const heroPack3d = document.getElementById('heroPack3d');

  function updatePackFlavor(flavorKey) {
    const f = flavors[flavorKey];
    if (!f) return;

    heroPackBody.style.background = f.gradient;
    heroPackCap.style.background = f.capColor;
    heroPackName.textContent = f.name;
    heroPackName.style.color = f.nameColor;
    heroPackSub.textContent = f.sub;
    heroPackGraphic.textContent = f.graphic;
    heroPackBadges.innerHTML = f.badges;
    heroPackPrice.textContent = f.price;
    flavorActiveName.textContent = f.fullName;

    if (f.sensory) {
      const barSweet = document.getElementById('barSweet');
      const valSweet = document.getElementById('valSweet');
      const barCreamy = document.getElementById('barCreamy');
      const valCreamy = document.getElementById('valCreamy');
      const barAroma = document.getElementById('barAroma');
      const valAroma = document.getElementById('valAroma');
      const barBody = document.getElementById('barBody');
      const valBody = document.getElementById('valBody');
      const flavorKcal = document.getElementById('flavorKcal');
      
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
      dot.classList.toggle('active', dot.dataset.flavor === flavorKey);
    });
  }

  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      playUiSound('pop');
      updatePackFlavor(dot.dataset.flavor);
    });
  });

  // 3D Parallax Tilt Effect on hover
  const packStage = document.querySelector('.pack-render-stage');
  if (packStage && heroPack3d) {
    packStage.addEventListener('mousemove', (e) => {
      const rect = packStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateY = (x / rect.width) * 45;
      const rotateX = -(y / rect.height) * 35;
      heroPack3d.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      heroPack3d.style.animation = 'none';
    });

    packStage.addEventListener('mouseleave', () => {
      heroPack3d.style.transform = '';
      heroPack3d.style.animation = 'floatBottle 4s ease-in-out infinite alternate';
    });
  }


  // ==========================================
  // 2. CONCEPT TABS NAVIGATION
  // ==========================================
  const conceptTabs = document.querySelectorAll('.concept-tab-btn');
  const conceptPanels = {
    'concept-a': document.getElementById('concept-a-panel'),
    'concept-b': document.getElementById('concept-b-panel'),
    'concept-c': document.getElementById('concept-c-panel')
  };

  conceptTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      conceptTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetConcept = tab.dataset.concept;
      Object.keys(conceptPanels).forEach(key => {
        if (conceptPanels[key]) {
          conceptPanels[key].style.display = (key === targetConcept) ? 'block' : 'none';
        }
      });

      // Sync 3D pack preview to match concept theme
      if (targetConcept === 'concept-a') updatePackFlavor('plain');
      if (targetConcept === 'concept-b') updatePackFlavor('matcha');
      if (targetConcept === 'concept-c') updatePackFlavor('choco');
    });
  });


  // ==========================================
  // 3. CANVAS-BASED CHARTS (ZERO DEPENDENCY)
  // ==========================================

  // Chart 1: Market Growth Projections (2024 - 2028F)
  function renderMarketGrowthChart() {
    const canvas = document.getElementById('marketGrowthChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const width = canvas.parentElement.clientWidth;
    const height = 280;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const years = ['2024', '2025', '2026 (Launch)', '2027F', '2028F'];
    const oatMilkData = [650, 1100, 2200, 3600, 5200]; // Rapid CAGR +45%
    const soyMilkData = [12000, 12400, 12600, 12700, 12800]; // Maturing
    const maxVal = 18000;

    const padLeft = 50;
    const padRight = 20;
    const padTop = 30;
    const padBottom = 40;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padTop + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();

      // Label
      ctx.fillStyle = '#64748B';
      ctx.font = '10px Kanit, sans-serif';
      ctx.textAlign = 'right';
      const labelVal = Math.round(maxVal - (maxVal / 4) * i);
      ctx.fillText(labelVal.toLocaleString() + ' M', padLeft - 8, y + 4);
    }

    // Draw Bars for each year
    const barGroupW = chartW / years.length;
    const barW = Math.min(28, barGroupW * 0.35);

    years.forEach((year, i) => {
      const centerX = padLeft + barGroupW * i + barGroupW / 2;

      // Soy Milk Bar (muted blue)
      const soyVal = soyMilkData[i];
      const soyH = (soyVal / maxVal) * chartH;
      const soyY = padTop + chartH - soyH;
      ctx.fillStyle = 'rgba(100, 116, 139, 0.5)';
      ctx.beginPath();
      ctx.roundRect(centerX - barW - 2, soyY, barW, soyH, [4, 4, 0, 0]);
      ctx.fill();

      // Oat Milk Bar (Golden Ichitan Highlight)
      const oatVal = oatMilkData[i];
      const oatH = (oatVal / maxVal) * chartH;
      const oatY = padTop + chartH - oatH;
      const grad = ctx.createLinearGradient(0, oatY, 0, oatY + oatH);
      grad.addColorStop(0, '#FF7A00');
      grad.addColorStop(1, '#E5A93C');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(centerX + 2, oatY, barW, oatH, [4, 4, 0, 0]);
      ctx.fill();

      // Value label on oat milk
      ctx.fillStyle = '#FCD34D';
      ctx.font = 'bold 10px Kanit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(oatVal.toLocaleString(), centerX + 2 + barW / 2, oatY - 6);

      // X-Axis labels
      ctx.fillStyle = (i === 2) ? '#E5A93C' : '#94A3B8';
      ctx.font = (i === 2) ? 'bold 11px Prompt, sans-serif' : '11px Kanit, sans-serif';
      ctx.fillText(year, centerX, height - 12);
    });

    // Legend
    ctx.fillStyle = 'rgba(100, 116, 139, 0.6)';
    ctx.fillRect(padLeft, 10, 10, 10);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px Kanit, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('นมถั่วเหลืองแบบเดิม (Soy Milk)', padLeft + 16, 19);

    ctx.fillStyle = '#E5A93C';
    ctx.fillRect(padLeft + 180, 10, 10, 10);
    ctx.fillStyle = '#FCD34D';
    ctx.fillText('⭐ นมข้าวโอ๊ต (Oat Milk: เติบโต +45% YoY)', padLeft + 196, 19);
  }

  // Chart 2: Price-per-100ml Benchmark Comparison
  function renderPriceBenchmarkChart() {
    const canvas = document.getElementById('priceBenchmarkChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const width = canvas.parentElement.clientWidth;
    const height = 280;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const brands = [
      { name: "Oatly (นำเข้า)", price100ml: 18.0, color: "#64748B", note: "125฿/กล่องใหญ่" },
      { name: "137 Degrees", price100ml: 17.8, color: "#64748B", note: "32฿/180ml" },
      { name: "Goodmate", price100ml: 16.7, color: "#94A3B8", note: "30฿/180ml" },
      { name: "Lactasoy (ถั่วเหลือง)", price100ml: 4.8, color: "#475569", note: "12฿/250ml" },
      { name: "⭐ ICHITAN OAT", price100ml: 9.5, color: "#E5A93C", highlight: true, note: "20-22฿/220ml" }
    ];

    const padLeft = 140;
    const padRight = 70;
    const padTop = 30;
    const padBottom = 20;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;
    const maxVal = 22;

    const rowH = chartH / brands.length;

    brands.forEach((b, i) => {
      const y = padTop + rowH * i + rowH / 2;
      const barH = 22;
      const barW = (b.price100ml / maxVal) * chartW;

      // Brand Name label on left
      ctx.fillStyle = b.highlight ? '#FCD34D' : '#E2E8F0';
      ctx.font = b.highlight ? 'bold 12px Prompt, sans-serif' : '11px Kanit, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(b.name, padLeft - 15, y + 4);

      // Horizontal Bar
      if (b.highlight) {
        const grad = ctx.createLinearGradient(padLeft, 0, padLeft + barW, 0);
        grad.addColorStop(0, '#FF6B00');
        grad.addColorStop(1, '#E5A93C');
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = b.color;
      }

      ctx.beginPath();
      ctx.roundRect(padLeft, y - barH / 2, barW, barH, [0, 6, 6, 0]);
      ctx.fill();

      // Value label on right of bar
      ctx.fillStyle = b.highlight ? '#FCD34D' : '#94A3B8';
      ctx.font = 'bold 11px Prompt, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(b.price100ml.toFixed(1) + ' ฿/100ml', padLeft + barW + 8, y + 4);
    });
  }

  // Initial draw & resize listener
  renderMarketGrowthChart();
  renderPriceBenchmarkChart();
  window.addEventListener('resize', () => {
    renderMarketGrowthChart();
    renderPriceBenchmarkChart();
  });


  // ==========================================
  // 4. INTERACTIVE CEO FINANCIAL SIMULATOR
  // ==========================================
  const sliderPrice = document.getElementById('sliderPrice');
  const sliderStores = document.getElementById('sliderStores');
  const sliderVelocity = document.getElementById('sliderVelocity');
  const sliderMultiplier = document.getElementById('sliderMultiplier');

  const valPrice = document.getElementById('valPrice');
  const valStores = document.getElementById('valStores');
  const valVelocity = document.getElementById('valVelocity');
  const valMultiplier = document.getElementById('valMultiplier');

  const kpiRevenue = document.getElementById('kpiRevenue');
  const kpiRevenueDesc = document.getElementById('kpiRevenueDesc');
  const kpiVolume = document.getElementById('kpiVolume');
  const kpiGrossProfit = document.getElementById('kpiGrossProfit');
  const kpiMarginPercent = document.getElementById('kpiMarginPercent');
  const kpiDaily711 = document.getElementById('kpiDaily711');
  const kpiEbitda = document.getElementById('kpiEbitda');

  function updateFinancialSimulator() {
    const price = parseFloat(sliderPrice.value);
    const stores = parseInt(sliderStores.value, 10);
    const velocity = parseInt(sliderVelocity.value, 10);
    const multiplier = parseInt(sliderMultiplier.value, 10);

    // Update Slider Value Texts
    valPrice.textContent = `${price} บาท`;
    valStores.textContent = `${stores.toLocaleString()} สาขา`;
    valVelocity.textContent = `${velocity} กล่อง/วัน`;
    valMultiplier.textContent = `+${multiplier}% ของยอด 7-11`;

    // Calculations
    const dailyUnits711 = stores * velocity;
    const totalDailyUnits = dailyUnits711 * (1 + multiplier / 100);
    const annualVolumeUnits = totalDailyUnits * 365;
    const annualVolumeMillion = annualVolumeUnits / 1000000;

    // Wholesale & Margin Logic:
    // Retail Price -> Wholesale is ~70% (30% retail margin for modern trade)
    const wholesalePrice = price * 0.70;
    // COGS is ~33% of retail price due to high-efficiency Aseptic Cold Line
    const cogsUnit = price * 0.33;
    const grossProfitUnit = wholesalePrice - cogsUnit;
    const grossMarginPercent = (grossProfitUnit / wholesalePrice) * 100;

    // Topline Consumer Value & Company Gross Revenue
    const totalConsumerSpendingMillion = (annualVolumeUnits * price) / 1000000;
    const ichitanNetWholesaleRevenueMillion = (annualVolumeUnits * wholesalePrice) / 1000000;
    const grossProfitMillion = (annualVolumeUnits * grossProfitUnit) / 1000000;

    // Estimated OPEX (marketing 80M + logistics/sales team 7% of revenue)
    const opexMillion = 80 + (ichitanNetWholesaleRevenueMillion * 0.07);
    const ebitdaMillion = Math.max(0, grossProfitMillion - opexMillion);

    // Update KPI UI
    kpiRevenue.textContent = `${Math.round(totalConsumerSpendingMillion).toLocaleString()} M฿`;
    kpiRevenueDesc.textContent = `สร้างยอดขายส่งเข้าอิชิตัน ~${Math.round(ichitanNetWholesaleRevenueMillion).toLocaleString()} ล้านบาท/ปี`;
    
    kpiVolume.textContent = `${annualVolumeMillion.toFixed(1)} M`;
    kpiGrossProfit.textContent = `${Math.round(grossProfitMillion).toLocaleString()} M฿`;
    kpiMarginPercent.textContent = `Gross Margin ~${grossMarginPercent.toFixed(1)}% (สูงกว่าค่าเฉลี่ย FMCG)`;
    
    kpiDaily711.textContent = `${Math.round(dailyUnits711).toLocaleString()}`;
    kpiEbitda.textContent = `${Math.round(ebitdaMillion).toLocaleString()} M฿`;
  }

  [sliderPrice, sliderStores, sliderVelocity, sliderMultiplier].forEach(el => {
    if (el) el.addEventListener('input', updateFinancialSimulator);
  });
  updateFinancialSimulator();


  // ==========================================
  // 5. EXECUTIVE BOARD VOTING & VERDICT
  // ==========================================
  const voteBoxes = document.querySelectorAll('.vote-stars-box');
  const scores = { a: 5, b: 4, c: 3 };

  voteBoxes.forEach(box => {
    const concept = box.dataset.concept;
    const stars = box.querySelectorAll('.star-btn');

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const score = parseInt(star.dataset.score, 10);
        scores[concept] = score;

        // Update stars active
        stars.forEach((s, idx) => {
          s.classList.toggle('active', idx < score);
        });

        // Update badge
        const badge = document.getElementById(`scoreBadge${concept.toUpperCase()}`);
        if (badge) {
          if (score === 5) badge.textContent = "5 / 5 ดาว (แนะนำสูงสุด)";
          else if (score >= 4) badge.textContent = `${score} / 5 ดาว (เฟส 2)`;
          else badge.textContent = `${score} / 5 ดาว (ทางเลือกลิมิเต็ด)`;
        }

        recomputeBoardVerdict();
      });
    });
  });

  function recomputeBoardVerdict() {
    const total = scores.a + scores.b + scores.c;
    const verdictTitle = document.querySelector('.verdict-title');
    const verdictText = document.getElementById('verdictText');

    if (scores.a >= 4 && scores.b >= 4) {
      verdictTitle.textContent = '🎉 มติที่ประชุม: "อนุมัติเปิดตัวกลยุทธ์ DUAL-LAUNCH (CONCEPT A + B)"';
      verdictText.innerHTML = 'เห็นชอบให้จัดสรรงบการตลาดก้อนแรก 80 ล้านบาท โดยใช้ <strong>CONCEPT A (Daily Oat 20฿)</strong> บุกเข้า 7-Eleven ยึดหัวหาด Mass Market เป็นตัวหลัก และตามด้วย <strong>CONCEPT B (Oat Tea Lab 25฿)</strong> ในเดือนที่ 3 เพื่อเพิ่มอัตรากำไร';
    } else if (scores.a === 5) {
      verdictTitle.textContent = '🎯 มติที่ประชุม: "อนุมัติมุ่งเน้น CONCEPT A (โอ๊ตมิลค์มหาชน 20฿) 100%"';
      verdictText.innerHTML = 'ให้ความสำคัญสูงสุดกับการสร้างปรากฏการณ์ Mass Disruption ในราคา 20 บาท ยึดเชลฟ์เซเว่น 14,000 สาขาทั่วประเทศ ทุ่มงบการตลาดและกำลังผลิตทั้งหมด';
    } else {
      verdictTitle.textContent = '📋 มติที่ประชุม: "อนุมัติศึกษาเพิ่มเติมและทดลองตลาดเฉพาะกลุ่ม (Pilot Test)"';
      verdictText.innerHTML = 'ดำเนินการทดลองวางจำหน่ายใน 500 สาขาชั้นนำของ กทม. เพื่อเก็บข้อมูล Consumer Feedback และปรับปรุงสูตรก่อนกระจายสินค้าทั่วประเทศ';
    }
  }

  // Export resolution button
  const exportBtn = document.getElementById('exportResolutionBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      window.print();
    });
  }


  // ==========================================
  // 6. FULLSCREEN BOARDROOM PITCH DECK MODE
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
      title: "1. The Billion-Baht White Space & Opportunity",
      badge: "EXECUTIVE BRIEF",
      content: `
        <h2 style="font-size: 2.2rem; color: #E5A93C; margin-bottom: 1rem;">ช่องว่างตลาดนมพืชไทย: โอกาสทองของอิชิตัน</h2>
        <p style="font-size: 1.15rem; color: #CBD5E1; margin-bottom: 1.5rem;">
          ตลาดนมพร้อมดื่มไทยมีมูลค่า <strong>65,000 ล้านบาท</strong> โดยนมวัวเริ่มชะลอตัว ขณะที่กลุ่มนมจากพืชเติบโตกว่า <strong>+45% YoY</strong> เพราะคนไทย 90% มีภาวะย่อยแลคโตสผิดปกติ
        </p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2rem;">
          <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border-left: 3px solid #E5A93C;">
            <h4 style="color:#FFF; margin-bottom:6px;">จุดอ่อนคู่แข่ง</h4>
            <p style="font-size:0.9rem; color:#94A3B8;">Oatly, Goodmate ขายแพง (30฿ - 125฿) กระจุกตัวแค่คาเฟ่และคนเมือง</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border-left: 3px solid #10B981;">
            <h4 style="color:#FFF; margin-bottom:6px;">จุดแข็งอิชิตัน</h4>
            <p style="font-size:0.9rem; color:#94A3B8;">โรงงาน Aseptic Cold Filling กำลังผลิตมหาศาล ต้นทุนต่ำกว่าคู่แข่ง 35%</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border-left: 3px solid #FF6B00;">
            <h4 style="color:#FFF; margin-bottom:6px;">หมัดเด็ดช่องทางขาย</h4>
            <p style="font-size:0.9rem; color:#94A3B8;">เข้าถึง 14,000+ เซเว่น และร้านโชห่วยทั่วประเทศได้ตั้งแต่วันแรก</p>
          </div>
        </div>
      `
    },
    {
      title: "2. The Big Disruption: Oat Milk at 20 THB",
      badge: "GAME CHANGER",
      content: `
        <h2 style="font-size: 2.2rem; color: #E5A93C; margin-bottom: 1rem;">ทลายกำแพงราคา: โอ๊ตมิลค์ 20 บาท ทุกเซเว่น</h2>
        <p style="font-size: 1.15rem; color: #CBD5E1; margin-bottom: 1.5rem;">
          เราไม่ได้แข่งเพื่อเป็นนมโอ๊ตเฉพาะกลุ่ม แต่เรากำลังจะ <strong>"Democratize Oat Milk"</strong> ให้กลายเป็นเครื่องดื่มประจำวันของคนไทย 70 ล้านคน
        </p>
        <div style="background: rgba(229,169,60,0.12); padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0;">
          <h3 style="color:#FCD34D; font-size:1.4rem;">"ทำไมต้องจ่าย 120 บาทที่คาเฟ่ ในเมื่อคุณดื่มอิชิตันโอ๊ตมิลค์ได้ในราคา 20 บาท?"</h3>
        </div>
        <p style="color: #94A3B8; font-size: 1rem;">
          ขนาด 200ml พอดีมื้อเช้า พกพาสะดวก ไม่ต้องแช่เย็น เก็บได้นาน 12 เดือน สารอาหารครบครัน เบต้ากลูแคนสูง แคลเซียมแน่น 0% คอเลสเตอรอล
        </p>
      `
    },
    {
      title: "3. The 3 Strategic Product Portfolios",
      badge: "PRODUCT INNOVATION",
      content: `
        <h2 style="font-size: 2.2rem; color: #E5A93C; margin-bottom: 1rem;">3 ทิศทางสินค้า: ตอบโจทย์ 3 เซกเมนต์หลัก</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 1.5rem;">
          <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid #E5A93C;">
            <h3 style="color:#E5A93C; font-size:1.2rem;">CONCEPT A: Daily Oat</h3>
            <div style="font-size:0.8rem; color:#FCD34D; margin:4px 0 10px;">ราคา 20 บาท | Mass Leader</div>
            <p style="font-size:0.85rem; color:#94A3B8;">สูตรจืด 0% น้ำตาล และสูตรกลมกล่อม เจาะคนทำงาน นักเรียน ย่อยง่ายแทนมื้อเช้า</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid #10B981;">
            <h3 style="color:#10B981; font-size:1.2rem;">CONCEPT B: Oat Tea Lab</h3>
            <div style="font-size:0.8rem; color:#6EE7B7; margin:4px 0 10px;">ราคา 25 บาท | Tea Synergy</div>
            <p style="font-size:0.85rem; color:#94A3B8;">มัทฉะอุจิ, โฮจิฉะคั่วหอม, ชาไทยพรีเมียม สไตล์คาเฟ่ญี่ปุ่น แคลอรี่ต่ำ ไร้นมวัว</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid #F43F5E;">
            <h3 style="color:#F43F5E; font-size:1.2rem;">CONCEPT C: Oat-Pop Vibe</h3>
            <div style="font-size:0.8rem; color:#FDA4AF; margin:4px 0 10px;">ราคา 25 บาท | Gen-Z Street</div>
            <p style="font-size:0.85rem; color:#94A3B8;">ดาร์กช็อกโกแลตเข้มข้น, ซอลท์เท็ดคาราเมล ดีไซน์จัดจ้านไวรัล TikTok แบบตันซันซู</p>
          </div>
        </div>
      `
    },
    {
      title: "4. 360° IMC Playbook & Signature Viral Stunt",
      badge: "MARKETING BLITZ",
      content: `
        <h2 style="font-size: 2.2rem; color: #E5A93C; margin-bottom: 1rem;">แผนการตลาด 360° สไตล์คุณตัน: ไวรัลสะเทือนเมือง</h2>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 14px; margin-top: 1.5rem;">
          <li style="display: flex; gap: 12px; align-items: flex-start;">
            <span style="color:#E5A93C; font-weight:700;">1. Viral Stunt:</span>
            <span style="color:#CBD5E1;">คุณตันปลอมตัวเป็นบาริสต้าปริศนาที่สยามสแควร์ เสิร์ฟกาแฟโอ๊ตมิลค์ให้คนทายราคา 150 บาท แล้วเฉลย 20 บาท!</span>
          </li>
          <li style="display: flex; gap: 12px; align-items: flex-start;">
            <span style="color:#E5A93C; font-weight:700;">2. The 1M Sampling:</span>
            <span style="color:#CBD5E1;">แจกชิมฟรี 1,000,000 กล่องตามสถานีรถไฟฟ้า มหาวิทยาลัย และย่านออฟฟิศ เพื่อทลายกำแพงการทดลอง</span>
          </li>
          <li style="display: flex; gap: 12px; align-items: flex-start;">
            <span style="color:#E5A93C; font-weight:700;">3. Signature Under-the-Cap:</span>
            <span style="color:#CBD5E1;">สแกนรหัสใต้ฝา/ใต้กล่องผ่าน LINE OA ลุ้นทริปเที่ยวยุโรปดูทุ่งข้าวโอ๊ต และทองคำแท่ง 20 ล้านบาท!</span>
          </li>
          <li style="display: flex; gap: 12px; align-items: flex-start;">
            <span style="color:#E5A93C; font-weight:700;">4. 7-Eleven Breakfast Combo:</span>
            <span style="color:#CBD5E1;">โปรโมชั่นซื้อคู่อาหารเช้า แซนด์วิช/ข้าวกล่อง เพิ่มเพียง 15 บาท ได้โอ๊ตมิลค์ 1 กล่องทันที</span>
          </li>
        </ul>
      `
    },
    {
      title: "5. Financial Return & Board Approval Request",
      badge: "FINANCIAL TARGET",
      content: `
        <h2 style="font-size: 2.2rem; color: #E5A93C; margin-bottom: 1rem;">ประมาณการผลตอบแทนทางการเงิน & ข้ออนุมัติ</h2>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin: 1.5rem 0;">
          <div style="background: rgba(16,185,129,0.1); border: 1px solid #10B981; padding: 1.5rem; border-radius: 12px;">
            <div style="color: #94A3B8; font-size: 0.9rem;">เป้าหมายยอดขายปีแรก (Year 1 Revenue)</div>
            <div style="color: #FFF; font-size: 2.2rem; font-weight: 800; font-family: Prompt;">1,500 – 1,990 M฿</div>
            <div style="color: #10B981; font-size: 0.85rem; margin-top: 4px;">~90 ล้านกล่องต่อปีจากทุกช่องทาง</div>
          </div>
          <div style="background: rgba(229,169,60,0.1); border: 1px solid #E5A93C; padding: 1.5rem; border-radius: 12px;">
            <div style="color: #94A3B8; font-size: 0.9rem;">กำไรขั้นต้นเป้าหมาย (Gross Profit)</div>
            <div style="color: #FCD34D; font-size: 2.2rem; font-weight: 800; font-family: Prompt;">52% - 55%</div>
            <div style="color: #E2E8F0; font-size: 0.85rem; margin-top: 4px;">สร้างกระแสเงินสดและผลกำไรมั่นคง</div>
          </div>
        </div>
        <div style="background: rgba(255,255,255,0.05); padding: 1.25rem; border-radius: 10px; border-left: 4px solid #FF6B00;">
          <strong style="color: #FFF;">ข้อเสนอเพื่ออนุมัติจาก CEO และคณะกรรมการ:</strong><br>
          <span style="color: #CBD5E1; font-size: 0.95rem;">
            1. อนุมัติงบการตลาดก้อนแรก 80 ล้านบาท สำหรับ Launch Phase<br>
            2. อนุมัติปรับไลน์การผลิต Aseptic Cold Line 1 สาย ณ โรงงานโรจนะเพื่อผลิตโอ๊ตมิลค์<br>
            3. อนุมัติเริ่มแผน DUAL-LAUNCH นำร่อง Concept A ในเดือนที่ 1 และตามด้วย Concept B ในเดือนที่ 3
          </span>
        </div>
      `
    }
  ];

  function renderSlide(index) {
    const s = slides[index];
    if (!s) return;
    deckCounter.textContent = `Slide ${index + 1} of ${slides.length}`;
    deckSlideCard.innerHTML = `
      <div class="badge-pill" style="border-color: #E5A93C; color: #FCD34D; margin-bottom: 1rem;">
        ${s.badge}
      </div>
      ${s.content}
    `;
    deckPrevBtn.disabled = (index === 0);
    deckNextBtn.textContent = (index === slides.length - 1) ? 'จบการนำเสนอ (Finish)' : 'ถัดไป (Next) ▶';
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
  // ==========================================
  // 7. GOOGLE STITCH UI: SOUND & THEME SYSTEM
  // ==========================================

  // Sound Toggle Handler
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.innerHTML = soundEnabled ? '<span>🔊 Sound: ON</span>' : '<span>🔇 Sound: OFF</span>';
      soundToggleBtn.style.opacity = soundEnabled ? '1' : '0.6';
      if (soundEnabled) playUiSound('pop');
      showToast(soundEnabled ? 'เปิดเสียงเอฟเฟกต์แล้ว' : 'ปิดเสียงเอฟเฟกต์แล้ว', soundEnabled ? '🔊' : '🔇');
    });
  }

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

  // Shelf Pulse Simulation
  const shelfPulseBtn = document.getElementById('shelfPulseBtn');
  const shelfHeroItem = document.getElementById('shelfHeroItem');
  if (shelfPulseBtn && shelfHeroItem) {
    shelfPulseBtn.addEventListener('click', () => {
      playUiSound('chime');
      shelfHeroItem.style.transform = 'translateY(-18px) scale(1.15)';
      shelfHeroItem.style.filter = 'drop-shadow(0 0 20px #FF6B00)';
      showToast('จำลองมุมมองสะดุดตา: สินค้าอิชิตันดึงดูดสายตาแรกของผู้ซื้อ!', '🔥');
      setTimeout(() => {
        shelfHeroItem.style.transform = '';
        shelfHeroItem.style.filter = '';
      }, 1800);
    });
  }

  // Theme Switcher Handlers
  const themeDarkBtn = document.getElementById('themeDarkBtn');
  const themeOatBtn = document.getElementById('themeOatBtn');
  const themeMatchaBtn = document.getElementById('themeMatchaBtn');
  const themeBtns = [themeDarkBtn, themeOatBtn, themeMatchaBtn].filter(Boolean);

  function setActiveTheme(themeName, activeBtn) {
    document.body.classList.remove('theme-oat', 'theme-matcha');
    if (themeName !== 'dark') {
      document.body.classList.add(`theme-${themeName}`);
    }
    themeBtns.forEach(btn => btn.classList.remove('active'));
    if (activeBtn) activeBtn.classList.add('active');
    playUiSound('click');
    showToast(`เปลี่ยนธีม: ${activeBtn.textContent.trim()}`, '🎨');
  }

  if (themeDarkBtn) themeDarkBtn.addEventListener('click', () => setActiveTheme('dark', themeDarkBtn));
  if (themeOatBtn) themeOatBtn.addEventListener('click', () => setActiveTheme('oat', themeOatBtn));
  if (themeMatchaBtn) themeMatchaBtn.addEventListener('click', () => setActiveTheme('matcha', themeMatchaBtn));

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
