window.REGIONS = {
  punjab: { name: { en: "Punjab (Ludhiana)", hi: "पंजाब (लुधियाना)", ta: "பஞ்சாப் (லுதியானா)", te: "పంజాబ్ (లుధియానా)", bn: "পাঞ্জাব (লুধিয়ানা)" }, lat: 30.901, lon: 75.857, cropBias: ["wheat", "paddy", "maize"] },
  maharashtra: { name: { en: "Maharashtra (Nashik)", hi: "महाराष्ट्र (नाशिक)", ta: "மகாராஷ்டிரா (நாசிக்)", te: "మహారాష్ట్ర (నాసిక్)", bn: "মহারাষ্ট্র (নাশিক)" }, lat: 19.997, lon: 73.789, cropBias: ["cotton", "sugarcane", "groundnut"] },
  tamilnadu: { name: { en: "Tamil Nadu (Coimbatore)", hi: "तमिलनाडु (कोयंबटूर)", ta: "தமிழ்நாடு (கோயம்புத்தூர்)", te: "తమిళనాడు (కోయంబత్తూరు)", bn: "তামিলনাড়ু (কোয়েম্বাটুর)" }, lat: 11.016, lon: 76.955, cropBias: ["paddy", "sugarcane", "ragi"] },
  andhra: { name: { en: "Andhra Pradesh (Vijayawada)", hi: "आंध्र प्रदेश (विजयवाड़ा)", ta: "ஆந்திரப் பிரதேசம் (விஜயவாடா)", te: "ఆంధ్రప్రదేశ్ (విజయవాడ)", bn: "অন্ধ্রপ্রদেশ (বিজয়ওয়াড়া)" }, lat: 16.506, lon: 80.648, cropBias: ["paddy", "cotton", "maize"] },
  up: { name: { en: "Uttar Pradesh (Gorakhpur)", hi: "उत्तर प्रदेश (गोरखपुर)", ta: "உத்தரபிரதேசம் (கோரக்பூர்)", te: "ఉత్తర ప్రదేశ్ (గోరఖ్‌పూర్)", bn: "উত্তর প্রদেশ (গোরক্ষপুর)" }, lat: 26.760, lon: 83.373, cropBias: ["wheat", "sugarcane", "maize"] },
  bengal: { name: { en: "West Bengal (Bardhaman)", hi: "पश्चिम बंगाल (बर्धमान)", ta: "পশ্চিমবঙ্গ (বর্ধমান)", te: "పశ్చిమ బెంగాల్ (బర్ధమాన్)", bn: "পশ্চিমবঙ্গ (বর্ধমান)" }, lat: 23.232, lon: 87.863, cropBias: ["paddy", "maize", "groundnut"] },
  gujarat: { name: { en: "Gujarat (Anand)", hi: "गुजरात (आणंद)", ta: "குஜராத் (ஆனந்த்)", te: "గుజరాత్ (ఆనంద్)", bn: "গুজরাট (আনন্দ)" }, lat: 22.564, lon: 72.928, cropBias: ["cotton", "groundnut", "maize"] }
};

window.fetchClimateData = async function fetchClimateData(regionKey = "punjab") {
  const region = REGIONS[regionKey] || REGIONS.punjab;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${region.lat}&longitude=${region.lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather service offline");
    const data = await response.json();

    return {
      current: {
        temp: Math.round(data.current.temperature_2m),
        humidity: Math.round(data.current.relative_humidity_2m),
        windSpeed: Math.round(data.current.wind_speed_10m),
        precipitation: Math.round(data.current.precipitation * 100) / 100, // mm
        condition: parseCondition(data.current.precipitation, data.current.relative_humidity_2m)
      },
      daily: data.daily.time.map((time, idx) => ({
        date: new Date(time).toLocaleDateString(undefined, { weekday: "short", day: "numeric" }),
        tempMax: Math.round(data.daily.temperature_2m_max[idx]),
        tempMin: Math.round(data.daily.temperature_2m_min[idx]),
        rainProb: data.daily.precipitation_probability_max[idx]
      })),
      lat: region.lat,
      lon: region.lon,
      regionName: region.name
    };
  } catch (err) {
    console.warn("Using simulated farming micro-climate:", err.message);
    return getSimulatedClimate(regionKey);
  }
}

function parseCondition(precip, humidity) {
  if (precip > 2) return "Rainy";
  if (precip > 0.1) return "Drizzling";
  if (humidity > 80) return "Cloudy";
  if (humidity < 40) return "Sunny";
  return "Partly Cloudy";
}

function getSimulatedClimate(regionKey) {
  const region = REGIONS[regionKey] || REGIONS.punjab;
  const isSouth = regionKey === "tamilnadu" || regionKey === "andhra";
  
  // Base parameters
  const baseTemp = isSouth ? 32 : 28;
  const humidity = Math.floor(50 + Math.random() * 30);
  const windSpeed = Math.floor(8 + Math.random() * 12);
  const rainProb = Math.floor(Math.random() * 40);
  const precip = rainProb > 30 ? parseFloat((Math.random() * 5).toFixed(1)) : 0;

  const current = {
    temp: baseTemp + Math.floor(Math.random() * 4) - 2,
    humidity,
    windSpeed,
    precipitation: precip,
    condition: parseCondition(precip, humidity)
  };

  const daily = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayIdx = new Date().getDay();

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    daily.push({
      date: d.toLocaleDateString(undefined, { weekday: "short", day: "numeric" }),
      tempMax: current.temp + 2 + Math.floor(Math.random() * 3),
      tempMin: current.temp - 4 - Math.floor(Math.random() * 3),
      rainProb: Math.floor(Math.random() * 60)
    });
  }

  return {
    current,
    daily,
    lat: region.lat,
    lon: region.lon,
    regionName: region.name
  };
}
