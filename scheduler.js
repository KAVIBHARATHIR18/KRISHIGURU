window.PEST_DATABASE = {
  paddy: [
    {
      symptom: "Dead hearts / Dried central shoots",
      pest: "Yellow Stem Borer (तना छेदक)",
      treatment: "Apply Chlorantraniliprole 0.4% G (Ferterra) @ 4kg/acre or release Trichogramma japonicum cards (biological control).",
      safety: "Use protective gloves. Keep standing water at 2-3 inches for optimal granular dispersion."
    },
    {
      symptom: "White streaks on leaves / Papery look",
      pest: "Leaf Folder (पत्ती लपेटक)",
      treatment: "Spray Cartap Hydrochloride 50% SP @ 250g/acre or spray Neem Seed Kernel Extract (NSKE 5%) as organic alternative.",
      safety: "Avoid spraying during peak sunlight. Ensure 10-day safety gap before harvesting."
    }
  ],
  wheat: [
    {
      symptom: "Orange-brown pustules on leaf surface",
      pest: "Brown/Leaf Rust (गेहूं का गेरुआ)",
      treatment: "Spray Propiconazole 25% EC (Tilt) @ 200ml in 200L water per acre.",
      safety: "Ensure mask is worn. Do not allow cattle to graze on sprayed straw for 15 days."
    },
    {
      symptom: "Sticky honey-dew / Tiny green bugs",
      pest: "Wheat Aphids (माहू कीट)",
      treatment: "Spray Imidacloprid 17.8% SL @ 100ml/acre or release Green Lacewing (Chrysoperla) predators.",
      safety: "Spray in the evening to protect beneficial pollinating insects."
    }
  ],
  cotton: [
    {
      symptom: "Damaged squares / Bored bolls",
      pest: "American Bollworm (कपास की सूंडी)",
      treatment: "Spray Emamectin Benzoate 5% SG @ 95g/acre or spray Bacillus thuringiensis (Bt) biological formulation.",
      safety: "Wear standard PPE kit. Avoid drift towards domestic drinking water sources."
    },
    {
      symptom: "Upward leaf curling / Sticky shiny leaves",
      pest: "Whiteflies & Jassids (सफेद मक्खी / तेला)",
      treatment: "Spray Diafenthiuron 50% WP @ 240g/acre or set up Yellow Sticky Traps (10 per acre) and spray Neem oil (1500 ppm).",
      safety: "Do not apply diafenthiuron twice in quick succession to prevent whitefly resistance."
    }
  ],
  sugarcane: [
    {
      symptom: "Tunnels in stalks / Reddened tissue",
      pest: "Internode Borer (पोर छेदक)",
      treatment: "Release egg parasitoid Trichogramma chilonis @ 2.5 CC/acre at fortnightly intervals.",
      safety: "Biological control - completely non-toxic. Best applied during twilight hours."
    }
  ],
  maize: [
    {
      symptom: "Ragged holes in leaves / Papery sawdust",
      pest: "Fall Armyworm (फॉल आर्मीवॉर्म)",
      treatment: "Spray Spinetoram 11.7% SC @ 100ml/acre or organic dusting of Metarhizium anisopliae fungus.",
      safety: "Direct the spray nozzle into the crop whorl (center) for maximum direct impact on larvae."
    }
  ]
};

/**
 * Calculates smart irrigation needs based on soil moisture and forecasted rain probability.
 */
window.evaluateIrrigation = function evaluateIrrigation(soilMoisture, nextDayRainProb) {
  // If moisture is high (>70%), we don't need immediate watering
  if (soilMoisture > 70) {
    return {
      status: "optimal",
      action: "Pause watering. Soil is perfectly saturated.",
      hoursRemaining: 48,
      indicator: "normal"
    };
  }

  // If heavy rain is forecasted (>65% probability)
  if (nextDayRainProb > 60) {
    return {
      status: "suspended",
      action: `Postpone Irrigation! Rain forecasted (${nextDayRainProb}% chance). Let nature irrigate.`,
      hoursRemaining: 24,
      indicator: "rain"
    };
  }

  // If soil moisture is critical (<40%)
  if (soilMoisture < 40) {
    return {
      status: "critical",
      action: "CRITICAL: Irrigate immediately! Soil is highly dehydrated.",
      hoursRemaining: 0,
      indicator: "critical"
    };
  }

  // Moderate moisture (40% - 70%)
  return {
    status: "scheduled",
    action: "Routine light irrigation scheduled.",
    hoursRemaining: 18,
    indicator: "normal"
  };
}
