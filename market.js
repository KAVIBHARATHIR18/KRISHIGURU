window.CROP_PROFILES = {
  paddy: {
    id: "paddy",
    name: { en: "Paddy (Rice)", hi: "धान (चावल)", ta: "நெல் (அரிசி)", te: "వరి (బియ్యం)", bn: "ধান (চাল)" },
    basePrice: 2200,      // ₹ per quintal (Standard MSP approx)
    productionCost: 1350,  // ₹ per quintal
    yieldPerAcre: 22,      // quintals
    growthDuration: 120,   // days
    n: 80, p: 40, k: 40,   // ideal soil inputs
    phMin: 5.5, phMax: 7.0,
    idealMoisture: 75,     // %
    waterNeeds: "High"
  },
  wheat: {
    id: "wheat",
    name: { en: "Wheat", hi: "गेहूं", ta: "கோதுமை", te: "గోధుమలు", bn: "গম" },
    basePrice: 2275,
    productionCost: 1150,
    yieldPerAcre: 18,
    growthDuration: 135,
    n: 100, p: 50, k: 40,
    phMin: 6.0, phMax: 7.5,
    idealMoisture: 45,
    waterNeeds: "Moderate"
  },
  cotton: {
    id: "cotton",
    name: { en: "Cotton", hi: "कपास", ta: "பருத்தி", te: "పత్తి", bn: "তুলা" },
    basePrice: 6620,
    productionCost: 3800,
    yieldPerAcre: 8,
    growthDuration: 160,
    n: 90, p: 45, k: 45,
    phMin: 5.8, phMax: 8.0,
    idealMoisture: 50,
    waterNeeds: "Moderate"
  },
  sugarcane: {
    id: "sugarcane",
    name: { en: "Sugarcane", hi: "गन्ना", ta: "கரும்பு", te: "చెరకు", bn: "আখ" },
    basePrice: 315, // ₹ per quintal (higher yield, lower price/quintal)
    productionCost: 170,
    yieldPerAcre: 350,    // highly productive
    growthDuration: 300,
    n: 150, p: 80, k: 120,
    phMin: 6.0, phMax: 7.5,
    idealMoisture: 80,
    waterNeeds: "Very High"
  },
  maize: {
    id: "maize",
    name: { en: "Maize (Corn)", hi: "मक्का", ta: "சோளம் (மக்கா)", te: "మొక్కజొన్న", bn: "ভুট্টা" },
    basePrice: 2090,
    productionCost: 1200,
    yieldPerAcre: 24,
    growthDuration: 100,
    n: 120, p: 60, k: 50,
    phMin: 5.8, phMax: 7.2,
    idealMoisture: 55,
    waterNeeds: "Moderate"
  },
  ragi: {
    id: "ragi",
    name: { en: "Ragi (Finger Millet)", hi: "रागी (मडुआ)", ta: "கேழ்வரகு", te: "రాగులు", bn: "রাগি (বাজরা)" },
    basePrice: 3846,
    productionCost: 2100,
    yieldPerAcre: 10,
    growthDuration: 110,
    n: 40, p: 30, k: 30,
    phMin: 5.0, phMax: 8.2,
    idealMoisture: 30,
    waterNeeds: "Low"
  },
  groundnut: {
    id: "groundnut",
    name: { en: "Groundnut", hi: "मूंगफली", ta: "நிலக்கடலை", te: "వేరుశనగ", bn: "চিনাবাদাম" },
    basePrice: 6375,
    productionCost: 3900,
    yieldPerAcre: 12,
    growthDuration: 115,
    n: 30, p: 50, k: 50,
    phMin: 6.0, phMax: 7.0,
    idealMoisture: 40,
    waterNeeds: "Moderate"
  }
};

/**
 * Calculates current market price per quintal with minor random fluctuations
 * and regional bonuses (e.g. Wheat sells slightly better in grain-hubs or high demand zones).
 */
window.getLiveMarketPrices = function getLiveMarketPrices(regionKey = "punjab") {
  const seed = new Date().getDate(); // predictable daily fluctuation
  const prices = {};

  for (const [key, crop] of Object.entries(CROP_PROFILES)) {
    // Generate simple pseudo-random wave (-5% to +10%)
    const pctChange = ((Math.sin(seed + key.charCodeAt(0)) + 1) / 2) * 15 - 5;
    let price = Math.round(crop.basePrice * (1 + pctChange / 100));

    // Region adjustment factors
    if (regionKey === "punjab" && key === "wheat") price = Math.round(price * 1.03); // Premium Punjab grain
    if (regionKey === "maharashtra" && key === "cotton") price = Math.round(price * 1.05); // High quality Nashik fiber
    if (regionKey === "tamilnadu" && key === "paddy") price = Math.round(price * 1.04); // Kaveri delta premium
    if (regionKey === "gujarat" && key === "groundnut") price = Math.round(price * 1.06);

    prices[key] = {
      price,
      pctChange: parseFloat(pctChange.toFixed(1)),
      cost: crop.productionCost,
      yield: crop.yieldPerAcre,
      duration: crop.growthDuration
    };
  }
  return prices;
}
