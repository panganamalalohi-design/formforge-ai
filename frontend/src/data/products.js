/**
 * FormForge AI - Product Research Dataset
 *
 * Data Structure:
 * product = { id, name, overview, isSample, materials, designSolutions, limitations, redesignOpportunities, timeline }
 *
 * Timeline Entry:
 * { id, title, period: { label, status }, development, materialsAndCharacteristics, problemAddressed, solutionIntroduced, advantages, limitations, sources }
 *
 * Statuses: 'verified' | 'approximate' | 'unverified'
 * Sources: Array of { title, url, note } (empty array when no verified sources are provided)
 */

export const PRODUCTS = [
  {
    id: "water-bottle",
    name: "Portable Water Bottle",
    category: "Personal Hydration Vessels",
    overview:
      "A historical and mechanical overview of portable personal hydration containers. Traces the progression from organic and metal military field canteens to blow-molded polymers, polycarbonate consumer bottles, and modern double-wall vacuum-insulated stainless steel vessels.",
    isSample: true,
    featured: true,
    sampleNotice: "SAMPLE DATA - verify before citing",
    tags: ["Consumer Goods", "Hydration", "Ergonomics", "Thermal Retention"],
    stats: {
      erasDocumented: 6,
      primaryMaterialNow: "18/8 Food-Grade Stainless Steel",
      coreChallenge: "Hygienic cleaning, thermal efficiency, monomaterial recycling"
    },
    materials: [
      {
        name: "Natural Bladders & Terracotta Ceramics",
        era: "Pre-Industrial & Antiquity",
        characteristics: "Porous earthenware, glazed ceramics, animal hides, and dried gourds. High thermal mass, permeable to moisture.",
        advantages: "Readily available local materials; slight evaporative cooling through unglazed earthenware walls.",
        limitations: "Fragile, heavy, prone to microbial growth and difficult sanitization; impart distinct odors to water."
      },
      {
        name: "Tin-Plated Iron & Stamped Aluminum",
        era: "Late 19th - Early 20th Century",
        characteristics: "Lightweight pressed metal sheets with soldered seams or stamped halves; felt-covered canvas outer jackets.",
        advantages: "High impact resistance in rugged environments; dramatic weight reduction compared to glass or stone.",
        limitations: "Susceptible to corrosion, denting, and acidic degradation; cork closures harbored bacteria; metallic taste transfer."
      },
      {
        name: "Low-Density & High-Density Polyethylene (LDPE/HDPE)",
        era: "Mid-20th Century (~1940s–1960s)",
        characteristics: "Squeeze-moldable thermoplastic with low glass-transition temperature and chemical inertness.",
        advantages: "Unbreakable under normal drops, mass-manufacturable at very low unit costs; enabled active one-handed squeezing.",
        limitations: "Poor thermal insulation; retains residual odors and flavors; susceptible to heat warping in dishwashers."
      },
      {
        name: "Polycarbonate (BPA-based Resin)",
        era: "Late 20th Century (~1970s–1990s)",
        characteristics: "Rigid, glass-like clarity with extreme impact toughness; wide-mouth threaded neck profiles.",
        advantages: "Exceptional durability in backcountry settings; transparent liquid level visibility; wide temperature tolerance.",
        limitations: "Subsequent chemical discovery of bisphenol-A (BPA) leaching when exposed to hot liquids; rigid material can crack under notch stress."
      },
      {
        name: "Double-Wall Austenitic Stainless Steel (18/8 - AISI 304)",
        era: "Early 21st Century (~2000s–Present)",
        characteristics: "High corrosion-resistant alloy (18% chromium, 8% nickel) with an evacuated air space between dual walls.",
        advantages: "Eliminates conductive and convective heat transfer; non-reactive with acidic juices; eliminates exterior condensation sweating.",
        limitations: "Significantly higher tare weight; energy-intensive manufacturing process; vulnerable to vacuum loss if exterior wall is deeply dented."
      },
      {
        name: "Modular Monomaterial & Bio-composites",
        era: "Contemporary (~2015–Present)",
        characteristics: "Single-family polymers or disassembly-friendly stainless steel paired with food-grade platinum silicone seals.",
        advantages: "Facilitates circular end-of-life recycling; every gasket, lid spring, and thread component can be replaced individually.",
        limitations: "Higher assembly part count; higher initial retail cost; requires consumer discipline to disassemble for thorough hygiene."
      }
    ],
    designSolutions: [
      {
        title: "Dual-Wall Vacuum Thermal Barrier",
        problem: "Rapid ambient temperature equalization causing cold beverages to warm up and hot beverages to cool down.",
        solution: "Evacuating air between concentric inner and outer metal cylinders down to high vacuum levels (<10^-3 Torr), combined with copper-plated inner wall reflection.",
        impact: "Maintains beverage temperature up to 24 hours cold or 12 hours hot without external power."
      },
      {
        title: "Elastomeric Thread Sealing & Silicone Gaskets",
        problem: "Fluid leakage around dynamic lid threads under inverted orientation and internal vapor pressure.",
        solution: "Molded compression silicone O-rings seating against precision-rolled rim bevels with controlled torque limits.",
        impact: "Zero-leakage assurance even under turbulent transport in commuter bags."
      },
      {
        title: "Wide-Mouth vs. Chug Spout Ergonomics",
        problem: "Conflict between easy cleaning/ice insertion (wide mouth) and controlled spill-free sipping during motion (narrow mouth).",
        solution: "Two-stage modular lids: a wide neck for filling and interior scrubbing, with an integrated secondary narrow drinking aperture.",
        impact: "Balances hygiene access with ergonomic flow control during walking or commuting."
      },
      {
        title: "Tactile Powder Coating & Mechanical Texturing",
        problem: "Slick bare metal finishes slipping from wet or gloved hands, causing surface drops and denting.",
        solution: "Electrostatic thermoset powder coating with micro-textured matte finish applied to exterior stainless steel shell.",
        impact: "Dramatically increased friction coefficient, enhanced chip resistance, and tactile warmth."
      }
    ],
    limitations: [
      {
        area: "Hygiene & Hidden Microbial Niches",
        description: "Complex flip-top lids, drinking straws, and recessed silicone gaskets retain moisture and are difficult to reach with standard sponges, promoting mildew if not disassembled regularly."
      },
      {
        area: "Weight vs. Durability Trade-off",
        description: "Double-wall steel bottles typically weigh 300g–500g empty, creating carrying resistance for hikers and daily urban pedestrians compared to ultra-lightweight 80g plastic bottles."
      },
      {
        area: "Mixed-Material Recycling Barriers",
        description: "Lids frequently combine polypropylene (PP), polyoxymethylene (POM springs), thermoplastic elastomers (TPE), and stainless steel pins, making automated municipal recycling infeasible without manual disassembly."
      },
      {
        area: "Impact Dents Leading to Vacuum Failure",
        description: "A hard drop on a concrete edge can create an inward crease bridging the inner and outer metal walls, permanently destroying vacuum insulation performance."
      }
    ],
    redesignOpportunities: [
      {
        opportunity: "Threadless Magnetic or Cam-Lock Closure",
        rationale: "Eliminates deep thread grooves that harbor mineral scale and bacteria, enabling effortless wiping."
      },
      {
        opportunity: "Tool-Free Total Disassembly Architecture",
        rationale: "Enables all seal components, springs, and body sections to pop apart instantly for 100% dishwasher exposure."
      },
      {
        opportunity: "Impact-Absorbing Replaceable Base Bumper",
        rationale: "Sacrificial elastomer bottom prevents terminal vacuum bridge damage when the bottle is dropped."
      },
      {
        opportunity: "Monomaterial Body & Cap System",
        rationale: "Enables true closed-loop recycling without requiring separation into disparate waste streams."
      }
    ],
    timeline: [
      {
        id: "wb-01",
        title: "Organic Vessels & Permeable Field Canteens",
        period: {
          label: "Antiquity to Pre-Industrial Era",
          status: "approximate"
        },
        development:
          "Earliest documented portable hydration containers utilized naturally hollowed gourds, stitched animal bladders, and wheel-thrown unglazed or lead-glazed terracotta jars fitted with wood or rag bungs.",
        materialsAndCharacteristics:
          "Unglazed or salt-glazed earthenware, dried botanical gourds, and tanned animal hides. Porous wall structures allowing micro-evaporation.",
        problemAddressed:
          "Fundamental human survival requirement to carry potable water during agricultural labor, travel, and hunting beyond natural spring locations.",
        solutionIntroduced:
          "Lightweight organic vessels and shaped ceramic amphorae with narrow necks to reduce sloshing and evaporation during transport.",
        advantages:
          "Manufacturable with ubiquitous regional earth materials; porous ceramic walls provided mild evaporative cooling in hot, dry winds.",
        limitations:
          "Extremely fragile when struck against rocks; organic bladders deteriorated rapidly; porous walls retained bacteria and stagnant organic flavors.",
        sources: []
      },
      {
        id: "wb-02",
        title: "Stamped Sheet Metal Military Canteens",
        period: {
          label: "Late 19th to Early 20th Century",
          status: "approximate"
        },
        development:
          "Industrial stamping presses and soldering allowed mass production of twin-half tin-plated steel or aluminum field canteens issued to armed forces and industrial laborers.",
        materialsAndCharacteristics:
          "Cold-stamped sheet aluminum or tin-plated iron, soldered seams, chain-attached cork stoppers, and heavy felt cloth covers.",
        problemAddressed:
          "Need for rugged, shatterproof personal water supplies capable of surviving trench warfare, forced marches, and harsh logistical drops.",
        solutionIntroduced:
          "Oval or kidney-contoured metal profiles designed to rest ergonomically against the human hip or torso when suspended on a webbing belt.",
        advantages:
          "Unbreakable in rough field conditions; soaking the exterior felt sleeve in water produced evaporative cooling of the interior metal reservoir.",
        limitations:
          "Prone to corrosive rust or oxidation; metal imparts a strong tinny taste; cork bungs quickly degraded and harbored mold.",
        sources: []
      },
      {
        id: "wb-03",
        title: "Blow-Molded Thermoplastic Squeeze Bottles",
        period: {
          label: "Mid-20th Century (~1940s–1960s)",
          status: "approximate"
        },
        development:
          "Post-WWII advances in petrochemical synthesis and extrusion blow molding enabled mass manufacturing of flexible low-density polyethylene (LDPE) containers.",
        materialsAndCharacteristics:
          "Extrusion blow-molded LDPE and HDPE with injection-molded screw caps featuring integrated push-pull pull valves.",
        problemAddressed:
          "Rigid metal bottles required two hands to unthread and tip back, making hydration dangerous or awkward during active cycling and athletic sports.",
        solutionIntroduced:
          "Flexible, resilient plastic body that can be squeezed by a single hand to force liquid through a self-closing poppet valve directly into the mouth.",
        advantages:
          "Ultra-lightweight (under 70 grams), virtually indestructible under direct impact, negligible production cost, one-handed operation.",
        limitations:
          "Zero thermal insulation; absorbs odors and sugary sports-drink residues permanently; releases micro-particulates upon repeated flexing.",
        sources: []
      },
      {
        id: "wb-04",
        title: "Polycarbonate Laboratory & Backcountry Reusables",
        period: {
          label: "Late 20th Century (~1970s–1990s)",
          status: "approximate"
        },
        development:
          "Outdoor enthusiasts adopted shatterproof scientific laboratory reagent bottles (such as Nalge jars), leading to the rise of heavy-duty consumer reusable bottles.",
        materialsAndCharacteristics:
          "BPA-based polycarbonate resin, injection-stretch blow molded. Threaded high-density polyethylene loop-top closure.",
        problemAddressed:
          "Need for an odor-resistant, transparent, high-impact bottle that could handle freezing mountain temperatures as well as boiling backcountry purification water.",
        solutionIntroduced:
          "Wide 63mm neck diameter to facilitate snow packing, chemical purification tablet insertion, and compatibility with portable water filters.",
        advantages:
          "Glass-clear liquid measurement graduations, remarkable drop resistance from mountain rock faces, completely dishwasher-safe.",
        limitations:
          "High thermal conductivity meant hot drinks burned hands and cold drinks sweated heavily; subsequent toxicology concerns regarding BPA leaching led to widespread industry reform.",
        sources: []
      },
      {
        id: "wb-05",
        title: "Double-Wall Vacuum Insulated Stainless Steel",
        period: {
          label: "Early 21st Century (~2000s–Present)",
          status: "verified"
        },
        development:
          "Commercialization of miniature vacuum brazing techniques transitioned James Dewar's scientific vacuum flask into sleek, everyday consumer hydration vessels.",
        materialsAndCharacteristics:
          "Deep-drawn 18/8 (AISI 304) food-contact stainless steel inner and outer liners with copper thermal barrier plating and vacuum sealing (<10^-3 Torr).",
        problemAddressed:
          "Single-wall metal and plastic containers sweat cold condensation onto documents and laptop desks while losing all cooling or heating performance within 60 minutes.",
        solutionIntroduced:
          "Complete elimination of conduction and convection pathways between liquid and exterior ambient air via a vacuum gap sealed with glass solder.",
        advantages:
          "24-hour ice preservation; zero condensation sweating on exterior powder-coated walls; non-toxic, non-leaching food-grade metal interior.",
        limitations:
          "Substantially heavier tare weight (350–500g); prone to permanent vacuum breach if dropped hard onto sharp pavement; difficult to recycle composite lids.",
        sources: []
      },
      {
        id: "wb-06",
        title: "Modular, Monomaterial & Circular Ecosystems",
        period: {
          label: "Contemporary (~2015–Present)",
          status: "verified"
        },
        development:
          "Recent industrial redesign efforts prioritize extended product longevity, sanitary accessibility, and ease of end-of-life recycling.",
        materialsAndCharacteristics:
          "Electropolished 316/304 marine-grade stainless steel, medical-grade platinum silicone seals, and bio-based circular polymers engineered for mono-stream reclamation.",
        problemAddressed:
          "Disposal of millions of complex multi-material bottles due to a single cracked plastic lid hinge or irrecoverable mildew growth in unsealed crevices.",
        solutionIntroduced:
          "Modular architecture where every component (chug cap, straw, gasket, bottom boot) is individually purchasable, tool-free disassemblable, and fully recyclable.",
        advantages:
          "Radical extension of product lifespan; complete cleaning transparency eliminates microbial colonies; reduced lifecycle environmental footprint.",
        limitations:
          "Higher initial consumer purchase price; requires standardized replacement component inventory by brands; user friction to clean multiple disengaged pieces.",
        sources: []
      }
    ]
  },
  {
    id: "chair",
    name: "Ergonomic Task Chair",
    category: "Seating & Posture Architecture",
    overview: "Research dataset for ergonomic task chairs is currently unpopulated in this demonstration version.",
    isSample: false,
    featured: false,
    sampleNotice: "NO DATASET AVAILABLE - Demo version includes sample data for Portable Water Bottle only.",
    tags: ["Office Furniture", "Ergonomics", "Kinematics", "Seating"],
    stats: {
      erasDocumented: 0,
      primaryMaterialNow: "Not compiled",
      coreChallenge: "No data compiled"
    },
    materials: [],
    designSolutions: [],
    limitations: [],
    redesignOpportunities: [],
    timeline: []
  },
  {
    id: "lamp",
    name: "Articulated Task & Desk Lamp",
    category: "Workplace Illumination",
    overview: "Research dataset for articulated desk lamps is currently unpopulated in this demonstration version.",
    isSample: false,
    featured: false,
    sampleNotice: "NO DATASET AVAILABLE - Demo version includes sample data for Portable Water Bottle only.",
    tags: ["Lighting", "Counterbalance", "Optics", "Thermal Management"],
    stats: {
      erasDocumented: 0,
      primaryMaterialNow: "Not compiled",
      coreChallenge: "No data compiled"
    },
    materials: [],
    designSolutions: [],
    limitations: [],
    redesignOpportunities: [],
    timeline: []
  },
  {
    id: "bicycle",
    name: "Urban Commuter Bicycle",
    category: "Personal Mobility",
    overview: "Research dataset for urban commuter bicycles is currently unpopulated in this demonstration version.",
    isSample: false,
    featured: false,
    sampleNotice: "NO DATASET AVAILABLE - Demo version includes sample data for Portable Water Bottle only.",
    tags: ["Micromobility", "Tubing Metallurgy", "Drivetrain", "Urban Transit"],
    stats: {
      erasDocumented: 0,
      primaryMaterialNow: "Not compiled",
      coreChallenge: "No data compiled"
    },
    materials: [],
    designSolutions: [],
    limitations: [],
    redesignOpportunities: [],
    timeline: []
  }
];

export function getProducts() {
  return PRODUCTS;
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}
