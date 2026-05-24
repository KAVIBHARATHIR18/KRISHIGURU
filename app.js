// ==========================================
// 1. Application State & Storage
// ==========================================
let currentLang = "en";
let selectedSoilType = "loam";
let selectedRegionKey = "punjab";
let currentClimateData = null;

// Initialize KrishiAssistant (loaded globally from js/assistant.js)
let assistant = new window.KrishiAssistant(currentLang);

// Timers persistent store
let sprayReminders = JSON.parse(localStorage.getItem("sprayReminders")) || [];

// ==========================================
// 2. DOM Elements Selection
// ==========================================
const DOM = {
  // Localization elements
  title: document.getElementById("txt-title"),
  subtitle: document.getElementById("txt-subtitle"),
  soilAnalyzer: document.getElementById("txt-soilAnalyzer"),
  lblNutrients: document.getElementById("lbl-nutrients"),
  lblN: document.getElementById("lbl-n"),
  lblP: document.getElementById("lbl-p"),
  lblK: document.getElementById("lbl-k"),
  lblPhLevel: document.getElementById("lbl-phLevel"),
  lblMoisture: document.getElementById("lbl-moisture"),
  lblSoilType: document.getElementById("lbl-soilType"),
  lblLocation: document.getElementById("lbl-location"),
  btnAnalyze: document.getElementById("btn-analyze"),
  txtAnalyzeBtn: document.getElementById("txt-analyzeBtn"),
  
  climateCenter: document.getElementById("txt-climateCenter"),
  lblMetricTemp: document.getElementById("lbl-metric-temp"),
  lblMetricHumidity: document.getElementById("lbl-metric-humidity"),
  lblMetricWind: document.getElementById("lbl-metric-wind"),
  lblMetricRain: document.getElementById("lbl-metric-rain"),
  txtWeeklyForecast: document.getElementById("txt-weeklyForecast"),
  
  recommendations: document.getElementById("txt-recommendations"),
  txtProfitTip: document.getElementById("txt-profitTip"),
  
  assistantTitle: document.getElementById("txt-assistantTitle"),
  chatWelcomeText: document.getElementById("chatWelcomeText"),
  chatInput: document.getElementById("chatInput"),
  txtSpeechHint: document.getElementById("txt-speechHint"),
  
  irrigationPestScheduler: document.getElementById("txt-irrigationPestScheduler"),
  txtNextIrrigation: document.getElementById("txt-nextIrrigation"),
  txtPestControl: document.getElementById("txt-pestControl"),
  lblSelectCrop: document.getElementById("lbl-selectCrop"),
  lblSelectSymptoms: document.getElementById("lbl-selectSymptoms"),
  txtRecommendTreatment: document.getElementById("txt-recommendTreatment"),
  lblPestDiagnosis: document.getElementById("lbl-pestDiagnosis"),
  lblRecommendedPesticide: document.getElementById("lbl-recommendedPesticide"),
  lblSafetyInstruction: document.getElementById("lbl-safetyInstruction"),
  txtAddReminder: document.getElementById("txt-addReminder"),
  lblActiveIrrigationLogs: document.getElementById("lbl-activeIrrigationLogs"),
  lblActivePestLogs: document.getElementById("lbl-activePestLogs"),
  
  // Interactive nodes
  langSelect: document.getElementById("langSelect"),
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  themeIcon: document.getElementById("themeIcon"),
  soilForm: document.getElementById("soilForm"),
  phSlider: document.getElementById("inputPh"),
  phValueText: document.getElementById("phValueText"),
  phLabelText: document.getElementById("phLabelText"),
  moistureSlider: document.getElementById("inputMoisture"),
  moistureValText: document.getElementById("moistureValText"),
  regionSelect: document.getElementById("inputRegion"),
  
  // Dynamic Outputs
  weatherRegionName: document.getElementById("weatherRegionName"),
  weatherConditionText: document.getElementById("weatherConditionText"),
  weatherConditionIcon: document.getElementById("weatherConditionIcon"),
  valTemp: document.getElementById("val-temp"),
  valHumidity: document.getElementById("val-humidity"),
  valWind: document.getElementById("val-wind"),
  valRain: document.getElementById("val-rain"),
  forecastRow: document.getElementById("forecastRow"),
  recommendationsList: document.getElementById("recommendationsList"),
  
  // Assistant elements
  chatMessages: document.getElementById("chatMessages"),
  micBtn: document.getElementById("micBtn"),
  chatSendBtn: document.getElementById("chatSendBtn"),
  
  // Irrigation and Pest outputs
  irrigationIndicatorIcon: document.getElementById("irrigationIndicatorIcon"),
  irrigationActionText: document.getElementById("irrigationActionText"),
  irrigationReasonText: document.getElementById("irrigationReasonText"),
  irrigationRemindersLog: document.getElementById("irrigationRemindersLog"),
  pestCropSelect: document.getElementById("pestCropSelect"),
  pestSymptomSelect: document.getElementById("pestSymptomSelect"),
  btnPestDiagnose: document.getElementById("btn-pestDiagnose"),
  pestResultCard: document.getElementById("pestResultCard"),
  resPestName: document.getElementById("resPestName"),
  resPestTreatment: document.getElementById("resPestTreatment"),
  resPestSafety: document.getElementById("resPestSafety"),
  btnAddPestReminder: document.getElementById("btn-addPestReminder"),
  pestRemindersLog: document.getElementById("pestRemindersLog")
};

// ==========================================
// 3. UI Multi-language Translation
// ==========================================
function updateUITranslations() {
  const dict = window.translations[currentLang];
  if (!dict) return;

  // Header and core
  DOM.title.textContent = dict.title;
  DOM.subtitle.textContent = dict.subtitle;
  DOM.soilAnalyzer.textContent = dict.soilAnalyzer;
  DOM.lblNutrients.textContent = dict.nitrogen + ", " + dict.phosphorus + ", " + dict.potassium;
  DOM.lblN.textContent = dict.nitrogen;
  DOM.lblP.textContent = dict.phosphorus;
  DOM.lblK.textContent = dict.potassium;
  DOM.lblPhLevel.textContent = dict.phLevel;
  DOM.lblMoisture.textContent = dict.moisture;
  DOM.lblSoilType.textContent = dict.soilType;
  DOM.lblLocation.textContent = dict.location;
  DOM.txtAnalyzeBtn.textContent = dict.analyzeBtn;
  
  DOM.climateCenter.textContent = dict.climateCenter;
  DOM.lblMetricTemp.textContent = dict.temperature;
  DOM.lblMetricHumidity.textContent = dict.humidity;
  DOM.lblMetricWind.textContent = dict.windSpeed;
  DOM.lblMetricRain.textContent = dict.rainChance;
  DOM.txtWeeklyForecast.textContent = dict.weeklyForecast;
  
  DOM.recommendations.textContent = dict.recommendations;
  DOM.txtProfitTip.textContent = dict.profitTip;
  
  DOM.assistantTitle.textContent = dict.assistantTitle;
  DOM.chatWelcomeText.textContent = dict.assistantGreeting;
  DOM.chatInput.placeholder = dict.placeholder;
  DOM.txtSpeechHint.textContent = dict.speechInactive;
  
  DOM.irrigationPestScheduler.textContent = dict.irrigationPestScheduler;
  DOM.txtNextIrrigation.textContent = dict.nextIrrigation;
  DOM.txtPestControl.textContent = dict.pestControl;
  DOM.lblSelectCrop.textContent = dict.selectCrop;
  DOM.lblSelectSymptoms.textContent = dict.selectSymptoms;
  DOM.txtRecommendTreatment.textContent = dict.recommendTreatment;
  DOM.lblPestDiagnosis.textContent = dict.pestDiagnosis;
  DOM.lblRecommendedPesticide.textContent = dict.recommendedPesticide;
  DOM.lblSafetyInstruction.textContent = dict.safetyInstruction;
  DOM.txtAddReminder.textContent = dict.addReminder;

  // Translate Soil Selector cards
  document.getElementById("st-loam").textContent = dict.loam;
  document.getElementById("st-clay").textContent = dict.clay;
  document.getElementById("st-sand").textContent = dict.sand;
  document.getElementById("st-silt").textContent = dict.silt;
  document.getElementById("st-peat").textContent = dict.peat;
  document.getElementById("st-chalk").textContent = dict.chalk;

  // Re-populate regions with localized titles
  populateRegionDropdown();
  
  // Re-populate agricultural crops in pest dropdown
  populatePestCropDropdown();

  // If recommendations or climate already exist, refresh them
  if (currentClimateData) {
    renderClimate(currentClimateData);
    runAnalysis();
  }
  
  // Update assistant language
  assistant.setLanguage(currentLang);
  
  // Re-render schedules to localize their dates/crop names
  renderPestReminders();
}

function populateRegionDropdown() {
  const currentValue = DOM.regionSelect.value || selectedRegionKey;
  DOM.regionSelect.innerHTML = "";
  for (const [key, reg] of Object.entries(window.REGIONS)) {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = reg.name[currentLang] || reg.name.en;
    DOM.regionSelect.appendChild(opt);
  }
  DOM.regionSelect.value = currentValue;
}

function populatePestCropDropdown() {
  const dict = window.translations[currentLang];
  const currentValue = DOM.pestCropSelect.value || "paddy";
  DOM.pestCropSelect.innerHTML = "";
  
  // Crop mapping
  const crops = [
    { key: "paddy", label: dict.sand === "Sandy" ? "Paddy (Rice)" : (currentLang === "hi" ? "धान (चावल)" : "Paddy") }, // quick check
    { key: "wheat", label: currentLang === "hi" ? "गेहूं" : "Wheat" },
    { key: "cotton", label: currentLang === "hi" ? "कपास" : "Cotton" },
    { key: "sugarcane", label: currentLang === "hi" ? "गन्ना" : "Sugarcane" },
    { key: "maize", label: currentLang === "hi" ? "मक्का" : "Maize" }
  ];

  crops.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.key;
    opt.textContent = c.label;
    DOM.pestCropSelect.appendChild(opt);
  });
  DOM.pestCropSelect.value = currentValue;
  updatePestSymptoms();
}

function updatePestSymptoms() {
  const crop = DOM.pestCropSelect.value;
  DOM.pestSymptomSelect.innerHTML = "";
  const list = window.PEST_DATABASE[crop] || [];
  
  list.forEach((p, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = p.symptom;
    DOM.pestSymptomSelect.appendChild(opt);
  });
}

// ==========================================
// 4. Weather & Climate Rendering
// ==========================================
function getConditionIcon(condition) {
  const cond = condition.toLowerCase();
  if (cond.includes("rain") || cond.includes("drizzling")) return '<i class="fa-solid fa-cloud-showers-heavy" style="color: #3b82f6;"></i>';
  if (cond.includes("cloudy")) return '<i class="fa-solid fa-cloud" style="color: #9ca3af;"></i>';
  return '<i class="fa-solid fa-sun" style="color: #eab308; text-shadow: 0 0 15px rgba(234,179,8,0.5);"></i>';
}

function renderClimate(data) {
  DOM.weatherRegionName.textContent = data.regionName[currentLang] || data.regionName.en;
  
  // Localize condition names slightly
  let condText = data.current.condition;
  if (currentLang === "hi") {
    if (condText === "Sunny") condText = "धूप और साफ आसमान";
    if (condText === "Rainy") condText = "भारी वर्षा";
    if (condText === "Drizzling") condText = "हल्की बूंदाबांदी";
    if (condText === "Cloudy") condText = "बादल छाए रहेंगे";
    if (condText === "Partly Cloudy") condText = "आंशिक रूप से बादल";
  }
  
  DOM.weatherConditionText.textContent = condText;
  DOM.weatherConditionIcon.innerHTML = getConditionIcon(data.current.condition);
  
  DOM.valTemp.textContent = `${data.current.temp}°C`;
  DOM.valHumidity.textContent = `${data.current.humidity}%`;
  DOM.valWind.textContent = `${data.current.windSpeed} km/h`;
  DOM.valRain.textContent = `${data.daily[0].rainProb}%`;
  
  // Render forecast
  DOM.forecastRow.innerHTML = "";
  data.daily.forEach(d => {
    const fCard = document.createElement("div");
    fCard.className = "forecast-card";
    fCard.innerHTML = `
      <span class="day">${d.date}</span>
      ${getConditionIcon(d.rainProb > 40 ? "Rainy" : d.rainProb > 20 ? "Cloudy" : "Sunny")}
      <span class="temp-range">${d.tempMax}° / ${d.tempMin}°</span>
      <span class="rain-prob"><i class="fa-solid fa-droplet"></i> ${d.rainProb}%</span>
    `;
    DOM.forecastRow.appendChild(fCard);
  });
}

// ==========================================
// 5. Soil pH & Moisture Sliders Interaction
// ==========================================
function updatePHLabel(val) {
  DOM.phValueText.textContent = val.toFixed(1);
  let label = "Neutral";
  let labelHi = "तटस्थ";
  let color = "#22c55e";

  if (val < 5.0) {
    label = "Highly Acidic";
    labelHi = "अत्यधिक अम्लीय";
    color = "#ef4444";
  } else if (val < 6.5) {
    label = "Slightly Acidic";
    labelHi = "हल्का अम्लीय";
    color = "#f59e0b";
  } else if (val > 8.0) {
    label = "Highly Alkaline";
    labelHi = "अत्यधिक क्षारीय";
    color = "#a855f7";
  } else if (val > 7.5) {
    label = "Slightly Alkaline";
    labelHi = "हल्का क्षारीय";
    color = "#3b82f6";
  }

  DOM.phLabelText.textContent = currentLang === "hi" ? labelHi : label;
  DOM.phValueText.style.color = color;
}

// ==========================================
// 6. Dynamic Recommended Crop Rendering
// ==========================================
function renderRecommendations(crops) {
  DOM.recommendationsList.innerHTML = "";
  const dict = window.translations[currentLang];
  
  crops.forEach((crop, idx) => {
    const card = document.createElement("div");
    card.className = `crop-card rank-${idx}`;
    
    // Add best badges
    let badgeHtml = "";
    if (idx === 0) {
      badgeHtml = `<div class="crop-badge"><i class="fa-solid fa-trophy"></i> ${currentLang === "hi" ? "उत्कृष्ट मिलान" : "BEST MATCH"}</div>`;
    } else if (crop.expectedProfit > 20000) {
      badgeHtml = `<div class="crop-badge" style="background:var(--primary-color);"><i class="fa-solid fa-chart-line"></i> ${currentLang === "hi" ? "उच्च लाभ" : "HIGH PROFIT"}</div>`;
    }

    const pctClass = crop.pctChange >= 0 ? "trend-up" : "trend-down";
    const pctIcon = crop.pctChange >= 0 ? "fa-arrow-trend-up" : "fa-arrow-trend-down";
    const nameStr = crop.name[currentLang] || crop.name.en;

    card.innerHTML = `
      ${badgeHtml}
      <div class="crop-card-left">
        <div class="crop-main">
          <h4>${nameStr}</h4>
        </div>
        <div class="crop-details">
          <span><i class="fa-solid fa-circle-nodes"></i> NPK: ${crop.idealN}-${crop.idealP}-${crop.idealK}</span>
          <span><i class="fa-solid fa-scale-balanced"></i> pH: ${crop.idealPh}</span>
          <span><i class="fa-solid fa-calendar-day"></i> ${crop.growthDuration} ${dict.days}</span>
        </div>
      </div>
      <div class="crop-card-right">
        <div class="profit-figure">${dict.currency}${crop.expectedProfit.toLocaleString()}/acre</div>
        <div class="market-rate">
          Mandi: ${dict.currency}${crop.marketPrice}${dict.mandiUnit}
          <span class="rate-trend ${pctClass}"><i class="fa-solid ${pctIcon}"></i> ${crop.pctChange}%</span>
        </div>
        <div class="score-radial">
          <i class="fa-solid fa-heart-pulse"></i> ${dict.suitability}: ${crop.suitability}%
        </div>
      </div>
    `;
    DOM.recommendationsList.appendChild(card);
  });
}

// ==========================================
// 7. Irrigation & Water Evaluator
// ==========================================
function renderIrrigationAlert(soilMoisture, rainProb) {
  const result = window.evaluateIrrigation(soilMoisture, rainProb);
  const dict = window.translations[currentLang];

  // Modify styles based on safety indicator
  DOM.irrigationIndicatorIcon.className = `irrigation-icon ${result.indicator}`;
  
  if (result.indicator === "critical") {
    DOM.irrigationIndicatorIcon.innerHTML = '<i class="fa-solid fa-droplet-slash" style="animation: pulse-recording 1.5s infinite;"></i>';
  } else if (result.indicator === "rain") {
    DOM.irrigationIndicatorIcon.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
  } else {
    DOM.irrigationIndicatorIcon.innerHTML = '<i class="fa-solid fa-droplet"></i>';
  }

  // Handle multilingual irrigation status strings
  let localizedAction = result.action;
  let localizedReason = "System monitors local agricultural precipitation forecast.";

  if (currentLang === "hi") {
    if (result.status === "optimal") {
      localizedAction = "सिंचाई रोकें। मिट्टी पूरी तरह संतृप्त है।";
      localizedReason = "नमी इष्टतम स्तर पर है। अतिरिक्त पानी की आवश्यकता नहीं है।";
    } else if (result.status === "suspended") {
      localizedAction = `सिंचाई स्थगित! भारी बारिश की संभावना (${rainProb}% चांस)।`;
      localizedReason = "मौसम सेवा प्राकृतिक सिंचाई प्रदान करने का संकेत दे रही है।";
    } else if (result.status === "critical") {
      localizedAction = "अत्यधिक आवश्यक: तुरंत पानी दें! मिट्टी पूरी तरह शुष्क है।";
      localizedReason = "नमी का स्तर 40% से नीचे चला गया है। जड़ों को नुकसान हो सकता है।";
    } else {
      localizedAction = "नियमित सिंचाई निर्धारित है।";
      localizedReason = "अगली सिंचाई 18 घंटे में।";
    }
  }

  DOM.irrigationActionText.textContent = localizedAction;
  DOM.irrigationReasonText.textContent = localizedReason;

  // Populate Irrigation Log Row
  DOM.irrigationRemindersLog.innerHTML = "";
  const times = [
    { event: currentLang === "hi" ? "मुख्य फसल वाष्पीकरण जल भराव" : "Crop transpiration top-up", hr: 6 },
    { event: currentLang === "hi" ? "सुबह हल्की ड्रिप सिंचाई छिड़काव" : "Routine morning drip sprinkler", hr: 18 }
  ];

  times.forEach(t => {
    const item = document.createElement("div");
    item.className = "reminder-item";
    item.innerHTML = `
      <span>${t.event}</span>
      <span class="date-tag"><i class="fa-solid fa-clock"></i> ${t.hr} ${dict.hours}</span>
    `;
    DOM.irrigationRemindersLog.appendChild(item);
  });
}

// ==========================================
// 8. Pest Advisor & Scheduler
// ==========================================
function diagnosePest() {
  const crop = DOM.pestCropSelect.value;
  const symptomIdx = DOM.pestSymptomSelect.value;
  const pestItem = window.PEST_DATABASE[crop]?.[symptomIdx];

  if (pestItem) {
    DOM.resPestName.textContent = pestItem.pest;
    DOM.resPestTreatment.textContent = pestItem.treatment;
    DOM.resPestSafety.textContent = pestItem.safety;
    DOM.pestResultCard.className = "pest-result-card active";
  }
}

function addSprayReminder() {
  const crop = DOM.pestCropSelect.value;
  const symptomIdx = DOM.pestSymptomSelect.value;
  const pestItem = window.PEST_DATABASE[crop]?.[symptomIdx];
  if (!pestItem) return;

  const date = new Date();
  date.setDate(date.getDate() + 3); // schedule in 3 days
  const dateStr = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  const reminder = {
    id: Date.now(),
    crop: crop.toUpperCase(),
    pest: pestItem.pest,
    date: dateStr
  };

  sprayReminders.push(reminder);
  localStorage.setItem("sprayReminders", JSON.stringify(sprayReminders));
  renderPestReminders();
}

function removeSprayReminder(id) {
  sprayReminders = sprayReminders.filter(r => r.id !== id);
  localStorage.setItem("sprayReminders", JSON.stringify(sprayReminders));
  renderPestReminders();
}

function renderPestReminders() {
  DOM.pestRemindersLog.innerHTML = "";
  if (sprayReminders.length === 0) {
    DOM.pestRemindersLog.innerHTML = `<div class="reminder-item" style="color:var(--text-secondary); justify-content:center;">${currentLang === "hi" ? "कोई कीट छिड़काव रिमाइंडर सेट नहीं है।" : "No spray calendars scheduled."}</div>`;
    return;
  }

  sprayReminders.forEach(r => {
    const item = document.createElement("div");
    item.className = "reminder-item";
    item.innerHTML = `
      <div>
        <strong>${r.crop}</strong> - <span>${r.pest}</span>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="date-tag"><i class="fa-solid fa-calendar-days"></i> ${r.date}</span>
        <button class="delete-reminder-btn" data-id="${r.id}"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;
    DOM.pestRemindersLog.appendChild(item);
  });

  // Bind deletes
  document.querySelectorAll(".delete-reminder-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(btn.getAttribute("data-id"));
      removeSprayReminder(id);
    });
  });
}

// ==========================================
// 9. Conversational Assistant Controls
// ==========================================
function appendChatBubble(sender, text) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble bubble-${sender}`;
  
  if (sender === "assistant") {
    bubble.innerHTML = `
      <span>${text}</span>
      <button class="speak-response-btn"><i class="fa-solid fa-volume-high"></i></button>
    `;
    
    // Bind vocal feedback button
    bubble.querySelector(".speak-response-btn").addEventListener("click", () => {
      assistant.speak(text);
    });
  } else {
    bubble.textContent = text;
  }
  
  DOM.chatMessages.appendChild(bubble);
  DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
}

function handleAssistantSend() {
  const query = DOM.chatInput.value.trim();
  if (!query) return;

  // Append user bubble
  appendChatBubble("user", query);
  DOM.chatInput.value = "";

  // Get response and speak/append
  setTimeout(() => {
    const reply = assistant.getResponse(query);
    appendChatBubble("assistant", reply);
    
    // Auto-read aloud only if spoken to via mic
    if (assistant.speechActive || DOM.micBtn.classList.contains("listening")) {
      assistant.speak(reply);
    }
  }, 400);
}

// ==========================================
// 10. Central Analysis Pipeline
// ==========================================
async function runAnalysis() {
  const soil = {
    n: parseInt(document.getElementById("inputN").value) || 0,
    p: parseInt(document.getElementById("inputP").value) || 0,
    k: parseInt(document.getElementById("inputK").value) || 0,
    ph: parseFloat(DOM.phSlider.value) || 7.0,
    moisture: parseInt(DOM.moistureSlider.value) || 50,
    type: selectedSoilType
  };

  selectedRegionKey = DOM.regionSelect.value;
  
  // Fetch live weather data
  DOM.btnAnalyze.classList.add("loading");
  const weather = await window.fetchClimateData(selectedRegionKey);
  currentClimateData = weather;
  DOM.btnAnalyze.classList.remove("loading");
  
  // Render weather values
  renderClimate(weather);

  // Recommendations calculation (loaded globally from js/recommendation.js)
  const crops = window.calculateRecommendations(soil, {
    current: weather.current,
    regionKey: selectedRegionKey
  });
  renderRecommendations(crops);

  // Irrigation schedules evaluation
  renderIrrigationAlert(soil.moisture, weather.daily[0].rainProb);
}

// ==========================================
// 11. Initializer & Bindings
// ==========================================
function init() {
  // Populate dropdowns initially
  populateRegionDropdown();
  populatePestCropDropdown();
  
  // Global greeting trigger utility
  window.speakWelcomeText = () => {
    const dict = window.translations[currentLang];
    assistant.speak(dict.assistantGreeting);
  };

  // 1. Language selector change
  DOM.langSelect.addEventListener("change", (e) => {
    currentLang = e.target.value;
    updateUITranslations();
  });

  // 2. Theme switch
  DOM.themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      DOM.themeIcon.className = "fa-solid fa-moon";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      DOM.themeIcon.className = "fa-solid fa-sun";
    }
  });

  // 3. Soil type cards click selection
  document.querySelectorAll(".soil-type-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".soil-type-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      selectedSoilType = card.getAttribute("data-type");
    });
  });

  // 4. Sliders real-time metrics feedback
  DOM.phSlider.addEventListener("input", (e) => {
    updatePHLabel(parseFloat(e.target.value));
  });
  DOM.moistureSlider.addEventListener("input", (e) => {
    DOM.moistureValText.textContent = `${e.target.value}%`;
  });

  // 5. Submit analysis main trigger
  DOM.soilForm.addEventListener("submit", (e) => {
    e.preventDefault();
    runAnalysis();
  });

  // 6. Voice Assistant Events
  DOM.chatSendBtn.addEventListener("click", handleAssistantSend);
  DOM.chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAssistantSend();
  });

  // Voice Speech-To-Text mic event
  DOM.micBtn.addEventListener("click", () => {
    const active = DOM.micBtn.classList.contains("listening");
    if (active) {
      assistant.stopListening();
      DOM.micBtn.classList.remove("listening");
      DOM.txtSpeechHint.textContent = window.translations[currentLang].speechInactive;
    } else {
      DOM.micBtn.classList.add("listening");
      DOM.txtSpeechHint.textContent = window.translations[currentLang].speechActive;
      
      assistant.startListening((transcript) => {
        DOM.chatInput.value = transcript;
        DOM.micBtn.classList.remove("listening");
        DOM.txtSpeechHint.textContent = window.translations[currentLang].speechInactive;
        handleAssistantSend();
      });
    }
  });

  // Listen state callback feedback
  assistant.onSpeechStateChange = (isListening) => {
    const dict = window.translations[currentLang];
    if (isListening) {
      DOM.micBtn.classList.add("listening");
      DOM.txtSpeechHint.textContent = dict.speechActive;
    } else {
      DOM.micBtn.classList.remove("listening");
      DOM.txtSpeechHint.textContent = dict.speechInactive;
    }
  };

  // 7. Pest wizard triggers
  DOM.pestCropSelect.addEventListener("change", updatePestSymptoms);
  DOM.btnPestDiagnose.addEventListener("click", diagnosePest);
  DOM.btnAddPestReminder.addEventListener("click", addSprayReminder);

  // Perform initial analysis run out-of-the-box
  runAnalysis();
  renderPestReminders();
}

// Start application
window.addEventListener("DOMContentLoaded", init);
