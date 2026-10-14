/**
 * FormForge AI - API Client
 *
 * Provides simulated demo interfaces for the Design Solution Explorer and Redesign Studio.
 * Interfaces are designed to be drop-in compatible with a future Flask/Gemini backend.
 */

/**
 * Simulate network latency for demo purposes
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * askExplorer({ product, entry, question })
 *
 * Simulates intelligent design exploration anchored to the selected product and historical era entry.
 * Separates documented physical/historical facts from creative AI design suggestions.
 *
 * @param {Object} params
 * @param {Object} params.product - Product object
 * @param {Object} params.entry - Timeline entry object
 * @param {string} params.question - Designer query
 * @returns {Promise<Object>}
 */
export async function askExplorer({ product, entry, question }) {
  await delay(650);

  const qLower = (question || "").toLowerCase();
  const entryTitle = entry?.title || "Contemporary Hydration Vessel";
  const entryPeriod = entry?.period?.label || "Historical Era";

  // Contextual answer synthesis based on common queries
  let answer = "";
  let documentedFacts = [];
  let aiSuggestions = [];

  if (qLower.includes("material") || qLower.includes("why might this material")) {
    answer = `During the ${entryPeriod}, material selection was largely governed by the manufacturing limits and resource availability of the era. For "${entryTitle}", materials such as ${entry?.materialsAndCharacteristics || "the specified substrate"} were selected to prioritize mechanical durability, containment barrier integrity, and thermal resistance within the technological constraints of the time.`;
    documentedFacts = [
      `Primary material specified: ${entry?.materialsAndCharacteristics || "Specialized alloy / polymer composite"}.`,
      `Functional capability: ${entry?.advantages || "Provided physical integrity and fluid containment under operational stress."}`,
      `Known limitation: ${entry?.limitations || "Prone to wear, corrosion, thermal bridging, or difficult sanitization."}`
    ];
    aiSuggestions = [
      "Evaluate substituting high-strength bio-polycarbonate or recycled 316L stainless steel to reduce lifecycle emissions while preserving mechanical strength.",
      "Explore applying an interior atomic-layer deposition (ALD) ceramic coating to prevent any flavor leaching without adding measurable tare weight.",
      "Consider monomaterial mold design with localized wall-thickness variations to achieve structural rigidity without relying on secondary reinforcers."
    ];
  } else if (qLower.includes("problem") || qLower.includes("solve") || qLower.includes("what problem")) {
    answer = `The core problem addressed by "${entryTitle}" was: ${entry?.problemAddressed || "Providing dependable fluid transport under challenging environmental conditions."}. The development focused on resolving the tension between container portability and content integrity.`;
    documentedFacts = [
      `Documented operational pain point: ${entry?.problemAddressed || "Uncontrolled leakage, fragility, or rapid ambient temperature loss."}`,
      `Introduced solution: ${entry?.solutionIntroduced || "A specialized structural geometry and sealing mechanism."}`,
      `Direct engineering outcome: ${entry?.advantages || "Improved user reliability and transport safety."}`
    ];
    aiSuggestions = [
      "Consider how contemporary user behaviors (e.g., one-handed transit commuting, digital workspace hygiene) introduce new nuances to this historic problem.",
      "Explore magnetic bistable closures as an alternative to threaded rotational caps to simplify rapid access.",
      "Integrate pressure-equalizing micro-valves to prevent sudden vacuum locks or liquid spray when opening carbonated beverages."
    ];
  } else if (qLower.includes("limitation") || qLower.includes("trade-off") || qLower.includes("drawback")) {
    answer = `Every industrial design milestone entails intentional trade-offs. For "${entryTitle}", the principal limitations documented in research include: ${entry?.limitations || "Compromises in thermal retention, weight, or sanitization."}`;
    documentedFacts = [
      `Recorded technical limitation: ${entry?.limitations || "Multi-material complexity, microbial accumulation, or drop vulnerability."}`,
      `Manufacturing constraint: Specialized tooling or joining methods (soldering, vacuum brazing, or multi-shot molding) increased production overhead.`,
      `Maintenance consideration: Cleaning accessibility was frequently constrained by deep neck threads or recessed elastomer gaskets.`
    ];
    aiSuggestions = [
      "Address sanitization bottlenecks by specifying open-radius internal corners (>6mm radius) to prevent sponge bridging.",
      "Implement zero-crevice friction-welded caps that eliminate hidden gasket channels where black mold commonly colonies.",
      "Consider sacrificial modular bumpers made of bio-elastomer to protect the vacuum seal during accidental pavement drops."
    ];
  } else if (qLower.includes("alternative") || qLower.includes("explore") || qLower.includes("what alternatives")) {
    answer = `When analyzing "${entryTitle}" from a contemporary redesign lens, multiple promising alternative architectures emerge across materials, mechanics, and lifecycle circularity.`;
    documentedFacts = [
      `Historical precedent: "${entryTitle}" resolved fluid containment using the manufacturing paradigm of ${entryPeriod}.`,
      `Core advantage achieved: ${entry?.advantages || "High durability and functional utility."}`,
      `Unresolved structural legacy: Multi-component lids frequently prevent automated single-stream recycling at end of life.`
    ];
    aiSuggestions = [
      "Alternative 1: Monomaterial Stainless Architecture — Replace all polymer lid components with hydroformed stainless steel and medical-grade silicone.",
      "Alternative 2: Modular Repairable Ecosystem — Standardize all thread pitches and seal diameters to allow multi-brand cross-compatibility and decades of part replacement.",
      "Alternative 3: Flat-Pack / Telescopic Mechanics — For non-thermal commuter products, explore origami-inspired silicone folding bodies that collapse to 20% volume when empty."
    ];
  } else {
    // General design inquiry
    answer = `Regarding your inquiry on "${entryTitle}" (${entryPeriod}): In industrial product design, this milestone represented a transition point where ${entry?.solutionIntroduced || "new mechanical configurations were introduced to resolve existing user frustrations"}.`;
    documentedFacts = [
      `Context: ${entry?.development || "A step forward in personal hydration container evolution."}`,
      `Physical characteristics: ${entry?.materialsAndCharacteristics || "Materials engineered for portable liquid containment."}`,
      `Primary recorded advantage: ${entry?.advantages || "Enhanced reliability in portable usage."}`,
      `Primary recorded limitation: ${entry?.limitations || "Trade-offs in weight, cleaning, or manufacturing complexity."}`
    ];
    aiSuggestions = [
      `Examine how the ergonomics of "${entryTitle}" compare with contemporary touchpoints (handles, finger loops, tactile textures).`,
      "Evaluate whether modern precision manufacturing (CNC stamping, laser micro-welding) could eliminate the joint weaknesses inherent to this period's fabrication.",
      "Prototype rapid physical models focusing specifically on cleaning ergonomics and one-handed operation."
    ];
  }

  return {
    answer,
    documentedFacts,
    aiSuggestions,
    mode: "demo"
  };
}

/**
 * generateBrief(formValues)
 *
 * Generates an illustrative, structured industrial design concept brief.
 * Form values:
 * {
 *   productName,
 *   inspiration,
 *   targetUsers,
 *   materials: [],
 *   colourScheme,
 *   functionalRequirements,
 *   designConstraints
 * }
 *
 * @param {Object} formValues
 * @returns {Promise<Object>}
 */
export async function generateBrief(formValues) {
  await delay(750);

  const {
    productName = "Portable Water Bottle",
    inspiration = "Bauhaus Functionalism & Aerospace Metallurgy",
    targetUsers = "Urban Commuters & Studio Designers",
    materials = ["18/8 Food-Grade Stainless Steel", "Platinum Food-Grade Silicone"],
    colourScheme = "Raw Titanium & Burnt Umber",
    functionalRequirements = "Leak-proof 360-degree drink cap with modular tool-free disassembly",
    designConstraints = "Must be 100% dishwasher safe with zero inaccessible crevice geometry"
  } = formValues;

  const primaryMaterial = Array.isArray(materials) && materials.length > 0 ? materials[0] : "18/8 Stainless Steel";
  const secondaryMaterial = Array.isArray(materials) && materials.length > 1 ? materials[1] : "Food-Grade Silicone";

  const materialsWithReasons = [
    {
      name: primaryMaterial,
      reason: `Serves as the structural chassis, selected for exceptional corrosion resistance, zero chemical leaching, and high fatigue endurance under everyday drop cycles.`
    },
    {
      name: secondaryMaterial,
      reason: `Specified for high-precision sealing gaskets and tactile touchpoints, selected for thermal stability (-40°C to +200°C) and resistance to UV discoloration.`
    }
  ];

  if (Array.isArray(materials) && materials.length > 2) {
    for (let i = 2; i < materials.length; i++) {
      materialsWithReasons.push({
        name: materials[i],
        reason: `Secondary reinforcement and modular component accents, balancing lightness with scratch-resistant surface finish.`
      });
    }
  }

  return {
    concept: `The Forge ${productName.replace(/bottle/i, "").trim()} Vessel — ${inspiration.split(/[,&]/)[0].trim()} Edition`,
    rationale: `This concept directly resolves the recurring historical limitations of ${productName.toLowerCase()}s by synthesizing ${inspiration} with stringent ${designConstraints.toLowerCase()}. Designed specifically for ${targetUsers.toLowerCase()}, the architecture shifts from single-use assembly towards a lifetime modular ecosystem where each part can be inspected, cleaned, and replaced with zero tools.`,
    mainFeatures: [
      `Zero-Crevice Thread Architecture: A wide-pitch external rolled thread with open 4mm radii prevents biofilm accumulation and allows standard kitchen sponge access.`,
      `Dual-Mode Magnetic Actuator: A bistable magnetic flip-cap provides tactile, single-handed drinking access while preventing accidental unsealing in transit bags.`,
      `Sacrificial Bio-Elastomer Base Bumper: A high-durometer press-fit protective foot absorbs drop energy, protecting the inner vacuum chamber from thermal bridging.`,
      `Tactile Directional Grip: Micro-machined fluting along the upper cylinder provides positive grip registration even when hands are wet or gloved.`,
      `Circular Monomaterial Disassembly: Every sealing ring, spring, and chassis segment separates into distinct mono-recyclable categories in under 10 seconds.`
    ],
    materials: materialsWithReasons,
    expectedBenefits: [
      `Significantly enhanced hygiene confidence through 100% visible cleaning pathways.`,
      `Superior thermal stability preserving beverage temperature without sweating or surface scald.`,
      `Extended product lifespan (10+ years) supported by modular component replacement.`,
      `Harmonious aesthetic presence aligned with the ${colourScheme} industrial palette.`
    ],
    potentialDisadvantages: [
      `Initial tare weight will be approximately 12–15% higher than thin-gauge single-wall alternatives.`,
      `Higher initial tooling capital required for precision magnetic actuator and rolled thread dies.`,
      `Consumer must be briefly educated on how the modular magnetic cap snaps into open lock position.`
    ],
    manufacturingConsiderations:
      `Chassis to be fabricated via deep-drawing 0.8mm AISI 304 stainless steel tubing followed by continuous automated laser longitudinal seam welding. Interior cavity to undergo electropolishing to Ra < 0.4 µm to inhibit bacterial adhesion. Exterior finished with electrostatic low-VOC thermoset powder coating in ${colourScheme}. Vacuum evacuation brazed at 650°C in a high-vacuum furnace (<10^-4 Torr).`,
    furtherResearchQuestions: [
      `What is the ergonomic torque threshold for elderly or motor-impaired users when breaking the magnetic cap seal?`,
      `How does the sacrificial elastomer base maintain retention tolerance after 300 cycles in a high-temperature commercial dishwasher?`,
      `What is the lifecycle carbon break-even point of this stainless vessel compared to standard single-use PET bottles across 1, 3, and 5 years?`
    ],
    mode: "demo"
  };
}
