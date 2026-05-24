// window.CROP_PROFILES, window.getLiveMarketPrices, and window.REGIONS will be loaded globally via index.html script tags

/**
 * Calculates optimal crop suitability and expected returns.
 * @param {Object} soil { n, p, k, ph, moisture, type }
 * @param {Object} weather { current: { temp, humidity, precipitation }, regionKey }
 */
window.calculateRecommendations = function calculateRecommendations(soil, weather) {
  const regionKey = weather.regionKey || "punjab";
  const livePrices = getLiveMarketPrices(regionKey);
  const regionData = REGIONS[regionKey] || REGIONS.punjab;
  
  const recommendations = [];

  for (const [key, crop] of Object.entries(CROP_PROFILES)) {
    const market = livePrices[key];
    
    // 1. Soil nutrient score (N, P, K compatibility)
    // We compare user soil levels to crop ideals. If user level is close or slightly above, we score high.
    const nDiff = Math.abs(soil.n - crop.n) / crop.n;
    const pDiff = Math.abs(soil.p - crop.p) / crop.p;
    const kDiff = Math.abs(soil.k - crop.k) / crop.k;
    const nutrientScore = Math.max(0, 100 - (nDiff + pDiff + kDiff) * 35);

    // 2. pH score (critical for root development)
    let phScore = 100;
    if (soil.ph < crop.phMin) {
      const diff = crop.phMin - soil.ph;
      phScore = Math.max(0, 100 - diff * 40); // steep penalty for acidic soil
    } else if (soil.ph > crop.phMax) {
      const diff = soil.ph - crop.phMax;
      phScore = Math.max(0, 100 - diff * 40); // steep penalty for alkaline soil
    }

    // 3. Moisture score
    const moistureDiff = Math.abs(soil.moisture - crop.idealMoisture) / crop.idealMoisture;
    const moistureScore = Math.max(0, 100 - moistureDiff * 50);

    // 4. Climate bias & regional affinity
    let regionalAffin = 85;
    if (regionData.cropBias.includes(key)) {
      regionalAffin = 100; // regional match
    }

    // 5. Total Suitability Score (weighted average)
    const suitability = Math.round(
      (nutrientScore * 0.35) + (phScore * 0.35) + (moistureScore * 0.20) + (regionalAffin * 0.10)
    );

    // 6. Financial Profitability Analysis
    // Revenue = Yield per acre * Mandi Price
    const revenuePerAcre = crop.yieldPerAcre * market.price;
    // Overhead production cost per acre
    const costPerAcre = crop.yieldPerAcre * market.cost;
    const expectedProfit = revenuePerAcre - costPerAcre;

    recommendations.push({
      id: crop.id,
      name: crop.name,
      suitability,
      waterNeeds: crop.waterNeeds,
      marketPrice: market.price,
      pctChange: market.pctChange,
      expectedProfit,
      growthDuration: crop.growthDuration,
      idealN: crop.n,
      idealP: crop.p,
      idealK: crop.k,
      idealPh: `${crop.phMin}-${crop.phMax}`
    });
  }

  // Sort by profit margin combined with a minimum suitability threshold of 45% (to prevent farming bad crops)
  return recommendations.sort((a, b) => {
    // If suitability is too low, rank lower, else prioritize profitability
    const suitabilityWeightA = a.suitability > 45 ? 1 : 0.2;
    const suitabilityWeightB = b.suitability > 45 ? 1 : 0.2;
    return (b.expectedProfit * suitabilityWeightB) - (a.expectedProfit * suitabilityWeightA);
  });
}
