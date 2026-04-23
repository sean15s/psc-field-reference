import { useState, useMemo } from "react";

const PSC_DATA = [
  // ─── COLD FINISHED STEEL ───────────────────────────────────────────────────
  {
    id: "cf-rounds",
    category: "Cold Finished Steel",
    type: "Rounds",
    grades: ["1018","1045","1117","11L17","1141","1144","11L44","1215","12L14","4140","41L40","8620 Annealed","8620 Heat-Treated","4340 AMS6415","Stressproof","Fatigueproof","ETD 150"],
    sizes: "1/8\" through 12\" diameter. Metric: 20mm–60mm (1045 TGP). Hexagons: 1/4\"–2-1/2\"",
    finishes: ["Cold Drawn","Turned & Polished","Turned Ground & Polished"],
    notes: "12L14 'Penn-Lead' screw machine stock available. Mill quantities (ton bundles) available. Chamfered bar ends, consistent straightness.",
    uses: [
      { label: "Screw machine parts / high-speed machining", grades: [
        { grade: "12L14", why: "Lead additive makes it the best-machining steel available — cuts fast, clean chips, extends tool life" },
        { grade: "11L17", why: "Leaded resulfurized grade — free machining at high speeds with good surface finish" },
        { grade: "1215", why: "Highest machinability of non-leaded grades — resulfurized and rephosphorized for fast cutting" },
        { grade: "11L44", why: "Higher strength than 11L17/1215 with lead for machinability — good where you need both" },
      ]},
      { label: "Shafts, pins, fasteners (general)", grades: [
        { grade: "1018", why: "Low carbon — easy to machine and weld, good surface hardness when case hardened, economical" },
        { grade: "1045", why: "Medium carbon — stronger than 1018, better wear resistance, good for through-hardening" },
      ]},
      { label: "High-strength shafts, gears, hydraulic components", grades: [
        { grade: "4140", why: "Chromium-molybdenum alloy — excellent strength, toughness, and fatigue resistance after heat treat" },
        { grade: "41L40", why: "Same as 4140 with lead — all the alloy strength with significantly better machinability" },
        { grade: "4340 AMS6415", why: "Nickel-chrome-moly — highest toughness and strength of common alloys, aerospace/defense grade" },
      ]},
      { label: "High fatigue / torsional stress applications", grades: [
        { grade: "Stressproof", why: "Proprietary cold drawn alloy — extremely high fatigue strength, no heat treat needed, great for studs and shafts" },
        { grade: "Fatigueproof", why: "Higher strength than Stressproof — designed specifically for maximum fatigue life under cyclic loading" },
        { grade: "ETD 150", why: "Elevated temperature drawn — 150 ksi minimum tensile, excellent for hydraulic cylinder rods and high-stress shafts" },
      ]},
      { label: "Case hardening / carburizing (gears, cams)", grades: [
        { grade: "8620 Annealed", why: "Low carbon core stays tough after carburizing — hard surface, tough inside, ideal for gears" },
        { grade: "8620 Heat-Treated", why: "Pre-hardened for applications where full carburizing isn't needed but strength is required" },
      ]},
      { label: "Metric machined components", grades: [
        { grade: "1045", why: "Standard metric grade — TGP finish holds tight tolerances for metric dimensioned parts" },
      ]},
    ],
  },
  {
    id: "cf-flats",
    category: "Cold Finished Steel",
    type: "Flats",
    grades: ["1018","4140 Heat Treated DCF"],
    sizes: "1/8\"–6\" thick × 3/16\"–20\" wide",
    finishes: ["Cold Drawn","Cold Rolled","Machined"],
    notes: "Tight tolerances. Good surface finish straight off the bar.",
    uses: [
      { label: "Keys, keystock, general machining", grades: [
        { grade: "1018", why: "Soft enough to machine easily, tough enough for keystock — welds without issue" },
      ]},
      { label: "Dies, tools, high-strength fixtures", grades: [
        { grade: "4140 Heat Treated DCF", why: "Pre-hardened to ~28-34 HRC — ready to use without further heat treat, machines well at that hardness" },
      ]},
    ],
  },
  {
    id: "cf-squares",
    category: "Cold Finished Steel",
    type: "Squares",
    grades: ["1018","1215","12L14","4140 Annealed"],
    sizes: "1/8\" through 6\" square",
    finishes: ["Cold Drawn"],
    notes: "",
    uses: [
      { label: "General machining, keystock", grades: [
        { grade: "1018", why: "Economical, machines and welds well, consistent dimensions from cold drawing" },
        { grade: "1215", why: "Better machinability than 1018 — faster cycle times, cleaner finish" },
        { grade: "12L14", why: "Best machinability — leaded grade cuts fastest and cleanest for high-volume work" },
      ]},
      { label: "Tooling, dies", grades: [
        { grade: "4140 Annealed", why: "Soft enough to machine in annealed state, then heat treat to required hardness" },
      ]},
    ],
  },
  {
    id: "cf-hex",
    category: "Cold Finished Steel",
    type: "Hexagons",
    grades: ["1018","1215","12L14"],
    sizes: "1/8\" through 4\" hexagon",
    finishes: ["Cold Drawn"],
    notes: "Metric sizes available.",
    uses: [
      { label: "Bolts, nuts, fittings, valve bodies", grades: [
        { grade: "1018", why: "Good strength for general fasteners, case hardenable for wear surfaces" },
        { grade: "1215", why: "Faster machining than 1018 — preferred for high-volume turned fasteners" },
        { grade: "12L14", why: "Best for screw machine shops turning large quantities of hex stock — maximum tool life" },
      ]},
    ],
  },

  // ─── HOT ROLLED CARBON STEEL ──────────────────────────────────────────────
  {
    id: "hr-rounds",
    category: "Hot Rolled Carbon / Alloy Steel",
    type: "Rounds",
    grades: ["1018","1045","1141","1117","8620","4140 Annealed","4140 HT","4340"],
    sizes: "2\" through 22\" diameter",
    finishes: ["As-rolled","Annealed","Heat-Treated"],
    notes: "Full range of low carbon and alloy. Large diameter specialty.",
    uses: [
      { label: "Large shafts, axles, rolls", grades: [
        { grade: "1045", why: "Medium carbon — through-hardenable, good strength-to-cost ratio for large diameter shafts" },
        { grade: "4140 HT", why: "Heat treated alloy — significantly higher strength and toughness than 1045 for demanding applications" },
        { grade: "4340", why: "Highest toughness alloy — used when 4140 isn't strong enough, common in heavy equipment and aerospace" },
      ]},
      { label: "General structural / machined components", grades: [
        { grade: "1018", why: "Low carbon — weldable, machinable, economical for non-critical structural parts" },
        { grade: "1045", why: "More strength than 1018 with still-good weldability and machinability" },
      ]},
      { label: "Free machining applications", grades: [
        { grade: "1141", why: "Resulfurized — better chip breaking and surface finish than plain carbon at same strength level" },
        { grade: "1117", why: "Low carbon free machining — machinable and carburizable, good for pins and light shafts" },
      ]},
      { label: "Carburizing / case hardening", grades: [
        { grade: "8620", why: "Nickel-chrome-moly low carbon — carburizes to a very hard surface with tough, ductile core" },
      ]},
    ],
  },
  {
    id: "hr-shapes",
    category: "Hot Rolled Carbon / Alloy Steel",
    type: "Structural Shapes",
    grades: ["A36 / standard carbon"],
    sizes: "Angles (bar & structural), Beams (standard & wide flange), Channels (bar & structural)",
    finishes: ["As-rolled"],
    notes: "",
    uses: [
      { label: "Structural fabrication, frames, supports", grades: [
        { grade: "A36 / standard carbon", why: "36 ksi minimum yield — the standard structural grade, excellent weldability, widely specified" },
      ]},
      { label: "Construction, trailers, equipment frames", grades: [
        { grade: "A36 / standard carbon", why: "Cost-effective, readily available, easy to weld and fabricate for heavy frame applications" },
      ]},
    ],
  },
  {
    id: "hr-plate",
    category: "Hot Rolled Carbon / Alloy Steel",
    type: "Plate",
    grades: ["Hot Rolled","P&O","Abrasion Resisting","HSLA","Tread","Corten"],
    sizes: "Standard structural thicknesses for carbon.",
    finishes: ["Hot Rolled","Pickled & Oiled","Abrasion Resistant","HSLA","Tread","Weathering (Corten)"],
    notes: "Precision plate cutting available.",
    uses: [
      { label: "General fabrication", grades: [
        { grade: "Hot Rolled", why: "Mill scale surface, economical — good for parts where appearance and tight tolerance aren't critical" },
        { grade: "P&O", why: "Pickled and oiled removes mill scale — cleaner surface, better for painting or forming operations" },
      ]},
      { label: "Wear/abrasion applications (hoppers, buckets, liners)", grades: [
        { grade: "Abrasion Resisting", why: "400-500 Brinell hardness — 3-4x more wear resistant than standard carbon plate, extends service life dramatically" },
      ]},
      { label: "High strength structural / light weight", grades: [
        { grade: "HSLA", why: "High strength low alloy — same strength as alloy steel at lower weight, better weldability than heat treated grades" },
      ]},
      { label: "Outdoor / weathering applications", grades: [
        { grade: "Corten", why: "Forms a stable rust-like patina that protects against further corrosion — no painting required for many applications" },
      ]},
      { label: "Floor plate / anti-slip surfaces", grades: [
        { grade: "Tread", why: "Raised diamond or bar pattern provides grip — standard for walkways, truck beds, ramps" },
      ]},
    ],
  },
  {
    id: "hr-sheet",
    category: "Hot Rolled Carbon / Alloy Steel",
    type: "Sheet",
    grades: ["Cold Rolled","Hot Rolled","P&O","Galvanized","HSLA"],
    sizes: "Standard sheet gauges",
    finishes: ["CR","HR","P&O","Galvanized","HSLA"],
    notes: "",
    uses: [
      { label: "Stamping, forming, general fabrication", grades: [
        { grade: "Cold Rolled", why: "Tighter tolerances and smoother surface than HR — better for formed parts and painted assemblies" },
        { grade: "Hot Rolled", why: "Economical, good for non-cosmetic fabrication where surface finish isn't critical" },
        { grade: "P&O", why: "Scale-free surface — better forming characteristics and paint adhesion than standard HR" },
      ]},
      { label: "Corrosion resistance / outdoor exposure", grades: [
        { grade: "Galvanized", why: "Zinc coating provides sacrificial corrosion protection — zinc corrodes before the steel does" },
      ]},
      { label: "High strength light gauge", grades: [
        { grade: "HSLA", why: "Higher yield strength allows thinner gauge — reduces weight while maintaining structural performance" },
      ]},
    ],
  },

  // ─── CARBON STEEL TUBE ────────────────────────────────────────────────────
  {
    id: "tube-structural",
    category: "Carbon Steel Tube",
    type: "Structural Tubing",
    grades: ["ASTM A500","ASTM A513"],
    sizes: "Rectangular: 1/2\"×1\"×.062\" wall through 12\"×8\"×1/2\" wall. Square: 1/2\"×.065\" wall through 14\"×1/2\" wall.",
    finishes: ["ERW"],
    notes: "",
    uses: [
      { label: "Structural frames, columns, supports", grades: [
        { grade: "ASTM A500", why: "Standard structural tube spec — 46 ksi minimum yield, the go-to for construction and fabrication" },
      ]},
      { label: "Mechanical / precision tubing", grades: [
        { grade: "ASTM A513", why: "Tighter OD/wall tolerances than A500 — better for mechanical applications where fit matters" },
      ]},
    ],
  },
  {
    id: "tube-round",
    category: "Carbon Steel Tube",
    type: "Round Tubing",
    grades: ["DOM","CD Seamless","ERW","HF Seamless","4140","4130"],
    sizes: "1/4\" OD through 30\" OD",
    finishes: ["As-drawn","Seamless"],
    notes: "",
    uses: [
      { label: "Hydraulic / pneumatic cylinders (tight tolerances)", grades: [
        { grade: "DOM", why: "Drawn Over Mandrel — tightest ID tolerance of any tube, smooth bore critical for cylinder applications" },
      ]},
      { label: "High pressure hydraulic / structural precision", grades: [
        { grade: "CD Seamless", why: "No weld seam means uniform strength in all directions — better for pressure applications than ERW" },
        { grade: "HF Seamless", why: "Hot finished seamless — heavier walls available, good for high pressure and elevated temperature" },
      ]},
      { label: "General mechanical tubing", grades: [
        { grade: "ERW", why: "Electric resistance welded — economical, good dimensional consistency, fine for non-pressure structural use" },
      ]},
      { label: "High strength / aircraft / motorsport", grades: [
        { grade: "4140", why: "Chrome-moly alloy tube — excellent strength-to-weight, heat treatable, standard for roll cages and hydraulic" },
        { grade: "4130", why: "Lower carbon than 4140 — better weldability, slightly less strength, preferred for aircraft and welded structures" },
      ]},
    ],
  },
  {
    id: "tube-pipe",
    category: "Carbon Steel Tube",
    type: "Pipe",
    grades: ["Welded","Seamless"],
    sizes: "1/4\" IPS through 30\" IPS",
    finishes: ["Standard"],
    notes: "",
    uses: [
      { label: "Fluid transfer, plumbing, general piping", grades: [
        { grade: "Welded", why: "Economical — weld seam is fine for low-pressure fluid transfer and general structural pipe applications" },
      ]},
      { label: "High pressure / critical service", grades: [
        { grade: "Seamless", why: "No weld seam — uniform wall thickness and strength throughout, required for high pressure and critical applications" },
      ]},
    ],
  },
  {
    id: "tube-boiler",
    category: "Carbon Steel Tube",
    type: "Boiler Tube",
    grades: ["ASTM/ASME SA 178 Grade A","ASTM/ASME SA 178 Grade C","ASTM/ASME SA 178 Grade D"],
    sizes: "2\" OD, 2-1/2\" OD, 3\" OD — .105\" wall and .120\" wall",
    finishes: ["Seamless"],
    notes: "",
    uses: [
      { label: "Boilers, heat exchangers, pressure vessels", grades: [
        { grade: "ASTM/ASME SA 178 Grade A", why: "Minimum tensile 47 ksi — standard boiler tube grade for lower pressure applications" },
        { grade: "ASTM/ASME SA 178 Grade C", why: "Higher tensile than Grade A — used where higher pressure or temperature service is required" },
        { grade: "ASTM/ASME SA 178 Grade D", why: "Highest strength of SA 178 grades — for demanding boiler and pressure vessel applications" },
      ]},
    ],
  },

  // ─── STAINLESS STEEL ──────────────────────────────────────────────────────
  {
    id: "ss-rounds",
    category: "Stainless Steel",
    type: "Rounds",
    grades: ["303","304","304L","316","316L","416","17-4PH"],
    sizes: "1/4\" through 12\" diameter",
    finishes: ["Cold Drawn","Turned Ground & Polished"],
    notes: "",
    uses: [
      { label: "Screw machine parts, high-volume machining", grades: [
        { grade: "303", why: "Sulfur added for machinability — the only stainless that machines close to carbon steel, best for turned parts" },
        { grade: "416", why: "Martensitic free-machining stainless — hardenable for wear resistance, good corrosion resistance" },
      ]},
      { label: "General corrosion resistance, food/beverage, fabrication", grades: [
        { grade: "304", why: "The workhorse stainless — good corrosion resistance, weldable, widely available and specified" },
        { grade: "304L", why: "Low carbon version of 304 — use when welding to prevent carbide precipitation and intergranular corrosion" },
      ]},
      { label: "Marine, chemical, high chloride environments", grades: [
        { grade: "316", why: "Molybdenum added — significantly better resistance to chlorides and acids than 304, marine standard" },
        { grade: "316L", why: "Low carbon 316 — same chloride resistance with better weldability, preferred for welded marine/chemical parts" },
      ]},
      { label: "High strength, precipitation hardened (aerospace, medical)", grades: [
        { grade: "17-4PH", why: "Precipitation hardened — combines stainless corrosion resistance with alloy steel strength levels, heat treatable" },
      ]},
      { label: "Low carbon / weld-critical applications", grades: [
        { grade: "304L", why: "Low carbon prevents sensitization at weld heat affected zone — required for welded assemblies in corrosive service" },
        { grade: "316L", why: "Same benefit as 304L but with added molybdenum for chloride resistance — best for welded marine/chemical parts" },
      ]},
    ],
  },
  {
    id: "ss-accuracy-rounds",
    category: "Stainless Steel",
    type: "Accuracy Round Stock",
    grades: ["303"],
    sizes: ".374\", .499\", .624\", .749\", .999\", 1.249\", 1.374\", 1.499\", 1.999\"",
    finishes: ["Cold Drawn","Turned Ground & Polished"],
    notes: "Held to extremely tight diameter tolerances specifically for precision screw machine work. Eliminates first-pass cleanup — load and run.",
    uses: [
      { label: "Precision screw machine production", grades: [
        { grade: "303", why: "Best machining stainless — sulfur addition gives carbon-steel-like chip breaking and tool life, accuracy sizes eliminate setup cleanup cuts" },
      ]},
      { label: "High-volume turned stainless components", grades: [
        { grade: "303", why: "Tight OD tolerance means consistent bar-to-bar diameter — critical for screw machine shops running high volume with minimal operator intervention" },
      ]},
    ],
  },
  {
    id: "ss-squares",
    category: "Stainless Steel",
    type: "Squares",
    grades: ["303","304","316"],
    sizes: "1/4\" through 2\" square",
    finishes: ["Cold Drawn"],
    notes: "",
    uses: [
      { label: "Machined components, fittings", grades: [
        { grade: "303", why: "Free machining — best choice when you need stainless and have high machining volume" },
      ]},
      { label: "General fab, food industry", grades: [
        { grade: "304", why: "FDA compliant, easy to clean, good corrosion resistance — standard for food contact applications" },
      ]},
      { label: "Marine / chemical service", grades: [
        { grade: "316", why: "Molybdenum provides chloride resistance 304 can't match — required near saltwater or chemical exposure" },
      ]},
    ],
  },
  {
    id: "ss-hex",
    category: "Stainless Steel",
    type: "Hexagons",
    grades: ["303","304","316"],
    sizes: "1/4\" through 2\" hexagon",
    finishes: ["Cold Drawn"],
    notes: "",
    uses: [
      { label: "Nuts, bolts, valve stems, fittings", grades: [
        { grade: "303", why: "Machines fastest of the three — preferred for high-volume turned fastener production" },
        { grade: "304", why: "General purpose corrosion resistant fasteners — most common stainless hex grade" },
        { grade: "316", why: "Use over 304 when the application involves chlorides, acids, or marine exposure" },
      ]},
    ],
  },
  {
    id: "ss-flats",
    category: "Stainless Steel",
    type: "Flats",
    grades: ["304","304 True Bar"],
    sizes: "1/8\"–1-1/4\" thick × 1/2\"–8\" wide",
    finishes: ["Cold Drawn"],
    notes: "304 'True Bar' for tight tolerance flat bar applications.",
    uses: [
      { label: "Brackets, frames, fabrication", grades: [
        { grade: "304", why: "Weldable, corrosion resistant, good strength — standard for structural stainless fabrication" },
      ]},
      { label: "Precision machined flat components", grades: [
        { grade: "304 True Bar", why: "Held to tighter width and thickness tolerances than standard flat bar — less cleanup machining required" },
      ]},
    ],
  },
  {
    id: "ss-angles",
    category: "Stainless Steel",
    type: "Angles",
    grades: ["304"],
    sizes: "3/4\"×3/4\"×1/8\" through 5\"×3\"×1/4\" — equal and unequal leg",
    finishes: ["As-drawn"],
    notes: "",
    uses: [
      { label: "Structural framing, food processing equipment, marine", grades: [
        { grade: "304", why: "Combines structural utility with corrosion resistance — eliminates painting/coating in wet or food environments" },
      ]},
    ],
  },
  {
    id: "ss-tube",
    category: "Stainless Steel",
    type: "Tubing & Pipe",
    grades: ["304"],
    sizes: "Round: 1/4\" OD×.035\" wall – 1-1/2\" OD×.120\" wall. Square: 3/4\"×1/8\" wall – 4\"×1/4\" wall. Rect: 3/4\"×1-1/2\"×.065\" – 2\"×4\"×1/4\" wall. Pipe: 1/4\" IPS Sch.40 – 6\" IPS Sch.40",
    finishes: ["Mill","180 Grit Polished"],
    notes: "Polished finish available for aesthetic/sanitary applications.",
    uses: [
      { label: "Food/beverage, pharmaceutical, sanitary systems", grades: [
        { grade: "304", why: "Non-reactive, easy to sterilize, smooth bore prevents bacteria harboring — meets FDA/3A sanitary standards" },
      ]},
      { label: "Architectural / decorative", grades: [
        { grade: "304", why: "180 grit polished finish provides clean aesthetic appearance for visible architectural applications" },
      ]},
      { label: "General corrosion-resistant fluid transfer", grades: [
        { grade: "304", why: "Resists rust and most chemicals — eliminates corrosion maintenance issues of carbon steel pipe" },
      ]},
    ],
  },
  {
    id: "ss-sheet",
    category: "Stainless Steel",
    type: "Sheet",
    grades: ["304"],
    sizes: "24 GA through 1/4\"",
    finishes: ["Mill Finish","#4 Polished (one side)","Mirror finish (quote)"],
    notes: "Mirror finish available on request.",
    uses: [
      { label: "Fabrication, enclosures, food equipment", grades: [
        { grade: "304", why: "Corrosion resistant, cleanable surface, good formability — standard for food service and industrial enclosures" },
      ]},
      { label: "Architectural / visible surfaces", grades: [
        { grade: "304", why: "#4 brushed or mirror finish provides premium appearance for countertops, panels, and trim applications" },
      ]},
    ],
  },

  // ─── ALUMINUM ─────────────────────────────────────────────────────────────
  {
    id: "al-6061-bars",
    category: "Aluminum",
    type: "6061 Extruded Bars",
    grades: ["6061-T6"],
    sizes: "Rounds: 1/4\"–16\" dia. Squares: 1/4\"–6\". Flats: 1/8\"–6\" thick × 1/2\"–12\" wide. Econo-Plate: 6\"–18\" wide.",
    finishes: ["Extruded"],
    notes: "Most versatile aluminum alloy. Excellent machinability and weldability.",
    uses: [
      { label: "Machined parts, fittings, brackets, structural", grades: [
        { grade: "6061-T6", why: "Best all-around aluminum — strong, machines well, welds well, good corrosion resistance, anodizes cleanly" },
      ]},
      { label: "Aerospace, marine, automotive components", grades: [
        { grade: "6061-T6", why: "T6 temper provides 40 ksi yield strength at 1/3 the weight of steel — excellent strength-to-weight ratio" },
      ]},
    ],
  },
  {
    id: "al-6061-shapes",
    category: "Aluminum",
    type: "6061 Extruded Shapes",
    grades: ["6061-T6"],
    sizes: "Angles: 1\"×1\"×1/8\" – 4\"×4\"×3/8\" (equal & unequal). American Std Channels: 3\"×.170\" – 12\"×.300\". AA Channels: 2\"×.130\" – 12\"×.350\"",
    finishes: ["Extruded"],
    notes: "",
    uses: [
      { label: "Structural framing, trailers, enclosures", grades: [
        { grade: "6061-T6", why: "Light weight with good structural strength — eliminates rust issues vs steel, reduces dead load in structures" },
      ]},
    ],
  },
  {
    id: "al-6063-shapes",
    category: "Aluminum",
    type: "6063 Extruded Shapes",
    grades: ["6063-T5/T6"],
    sizes: "Angles: 1\"×1\"×1/16\" – 2\"×2\"×3/16\". Channels: 3/4\"×3/4\"×1/8\" – 3\"×1\"×1/8\"",
    finishes: ["Extruded"],
    notes: "Better surface finish than 6061. Ideal for anodizing.",
    uses: [
      { label: "Architectural, window frames, decorative trim", grades: [
        { grade: "6063-T5/T6", why: "Smoother surface finish than 6061 — anodizes with better appearance, standard for architectural extrusions" },
      ]},
      { label: "Anodized components", grades: [
        { grade: "6063-T5/T6", why: "Lower silicon content produces clearer, more uniform anodize than 6061 — preferred when color consistency matters" },
      ]},
    ],
  },
  {
    id: "al-6063-tube",
    category: "Aluminum",
    type: "6063 Extruded Tubing",
    grades: ["6063-T5/T6"],
    sizes: "Square: 3/4\"×1/8\" wall – 4\"×1/8\" wall. Rect: 2\"×1\"×1/8\" wall – 4\"×2\"×1/8\" wall",
    finishes: ["Extruded"],
    notes: "",
    uses: [
      { label: "Architectural, frames, light structural", grades: [
        { grade: "6063-T5/T6", why: "Good surface for anodizing, light weight, adequate strength for non-load-bearing frames and enclosures" },
      ]},
    ],
  },
  {
    id: "al-pipe",
    category: "Aluminum",
    type: "6061 Pipe",
    grades: ["6061-T6"],
    sizes: "3/4\" IPS Sch. 40 through 4\" IPS Sch. 40 (also listed as 1/2\" IPS Sch. 40 through 6\" IPS Sch. 40 in some branches — confirm with your branch for exact availability)",
    finishes: ["Extruded"],
    notes: "Size range varies by branch. Confirm availability with your location.",
    uses: [
      { label: "Fluid lines, structural, pneumatic", grades: [
        { grade: "6061-T6", why: "Corrosion resistant and lightweight vs steel pipe — good for non-ferrous fluid systems and structural tube applications" },
      ]},
    ],
  },
  {
    id: "al-plate",
    category: "Aluminum",
    type: "Plate",
    grades: ["6061","7075","Tool & Jig"],
    sizes: "1/2\" through 12\" thick",
    finishes: ["Saw cut"],
    notes: "Precision plate sawing and circle cutting available.",
    uses: [
      { label: "Machined parts, fixtures, structural", grades: [
        { grade: "6061", why: "Most common plate grade — machines well, welds, good corrosion resistance, economical for general machined plate" },
      ]},
      { label: "High-strength aerospace / defense", grades: [
        { grade: "7075", why: "Zinc alloy — highest strength aluminum available, 73 ksi yield in T6, used where 6061 isn't strong enough" },
      ]},
      { label: "Mold bases, jigs, fixtures", grades: [
        { grade: "Tool & Jig", why: "Stress relieved and precision ground — holds tight flatness tolerances, eliminates warping during machining of large plates" },
      ]},
    ],
  },
  {
    id: "al-sheet",
    category: "Aluminum",
    type: "Sheet",
    grades: ["3003","5052","6061","Tread Plate"],
    sizes: ".032\" through .190\". Tread Plate through .250\"",
    finishes: ["Mill"],
    notes: "",
    uses: [
      { label: "General fabrication, HVAC, light structures", grades: [
        { grade: "3003", why: "Most formable aluminum — bends without cracking, good for ductwork, tanks, and sheet metal work" },
      ]},
      { label: "Marine, fuel tanks, high corrosion resistance", grades: [
        { grade: "5052", why: "Best corrosion resistance of common sheet grades — magnesium alloy resists saltwater and many chemicals" },
      ]},
      { label: "High-strength sheet, machined parts", grades: [
        { grade: "6061", why: "Strongest common sheet grade — heat treatable, machines well, good when you need strength in sheet form" },
      ]},
      { label: "Floor plate, walkways, anti-slip", grades: [
        { grade: "Tread Plate", why: "Raised pattern provides traction — lighter than steel tread plate, won't rust, standard for aluminum truck bodies" },
      ]},
    ],
  },
  {
    id: "al-2011",
    category: "Aluminum",
    type: "2011-T3 Cold Finished Bars",
    grades: ["2011-T3"],
    sizes: "1/4\" through 3\" diameter",
    finishes: ["Cold Drawn"],
    notes: "RoHS Compliant. Highest machinability of any aluminum alloy.",
    uses: [
      { label: "Screw machine parts, high-speed CNC, precision components", grades: [
        { grade: "2011-T3", why: "Copper-bismuth alloy — machines faster and cleaner than 6061, the aluminum equivalent of 12L14, RoHS compliant" },
      ]},
    ],
  },

  // ─── TOOL STEEL ───────────────────────────────────────────────────────────
  {
    id: "tool-air",
    category: "Tool Steel",
    type: "Air Hardening",
    grades: ["A2","A6","A7"],
    sizes: "Rounds, Flats, Hollow Bar. Drill Rod available in A2, A6.",
    finishes: ["DeCarb-Free","Rough Turned","Precision Ground","Oversize"],
    notes: "Good dimensional stability on heat treat. Low distortion.",
    uses: [
      { label: "Dies, punches, gauges, shear blades", grades: [
        { grade: "A2", why: "Low distortion on hardening, good wear resistance — the most popular air hardening tool steel for dies and punches" },
        { grade: "A6", why: "Lower hardening temperature than A2 — minimal distortion, good for thin or complex shapes" },
        { grade: "A7", why: "Highest wear resistance of the A-series — extreme abrasion applications where A2 wears too fast" },
      ]},
    ],
  },
  {
    id: "tool-hchc",
    category: "Tool Steel",
    type: "High Carbon High Chrome",
    grades: ["D2","D3","D7"],
    sizes: "Rounds, Flats, Hollow Bar. Drill Rod available in D2.",
    finishes: ["DeCarb-Free","Rough Turned","Precision Ground","Oversize"],
    notes: "Excellent wear resistance. Industry workhorse for blanking and forming.",
    uses: [
      { label: "Blanking dies, forming dies, slitters", grades: [
        { grade: "D2", why: "12% chromium gives excellent wear resistance and air hardening — the most widely used die steel in the industry" },
        { grade: "D3", why: "Oil hardening version of D2 — slightly higher wear resistance but more brittle, less common than D2" },
        { grade: "D7", why: "Highest vanadium content of D-series — maximum abrasion resistance for severe blanking and forming applications" },
      ]},
    ],
  },
  {
    id: "tool-shock",
    category: "Tool Steel",
    type: "Shock Resisting",
    grades: ["S1","S5","S7"],
    sizes: "Rounds, Flats. Drill Rod available in S7.",
    finishes: ["DeCarb-Free","Rough Turned","Precision Ground","Oversize"],
    notes: "High toughness, impact resistant. Good for interrupted cuts.",
    uses: [
      { label: "Chisels, punches, jackhammer bits, swaging dies", grades: [
        { grade: "S1", why: "Tungsten alloy — very tough, resists shock loading, good for heavy impact tools that see repeated blows" },
        { grade: "S5", why: "Silicon-manganese base — toughest of the S-series, used for pneumatic tools and severe impact applications" },
        { grade: "S7", why: "Air hardening shock steel — combines shock resistance with low distortion on heat treat, versatile impact grade" },
      ]},
    ],
  },
  {
    id: "tool-mold",
    category: "Tool Steel",
    type: "Mold Quality",
    grades: ["420","P20","H13"],
    sizes: "Rounds, Flats, Hollow Bar.",
    finishes: ["DeCarb-Free","Rough Turned","Precision Ground","Oversize"],
    notes: "",
    uses: [
      { label: "Plastic injection mold bases / cavity blocks", grades: [
        { grade: "P20", why: "Pre-hardened to 28-32 HRC — machines directly to finished mold without heat treat, most common plastic mold steel" },
      ]},
      { label: "Die casting dies (aluminum, zinc)", grades: [
        { grade: "H13", why: "Hot work steel — resists thermal fatigue from repeated heating/cooling cycles, standard for aluminum die casting" },
      ]},
      { label: "Corrosion-resistant molds, food contact tooling", grades: [
        { grade: "420", why: "Stainless tool steel — hardenable to 50+ HRC with corrosion resistance, used for PVC molds and food contact tooling" },
      ]},
    ],
  },
  {
    id: "tool-hss",
    category: "Tool Steel",
    type: "High Speed Steel",
    grades: ["M2","M4"],
    sizes: "Rounds, Flats. Drill Rod available in M2.",
    finishes: ["DeCarb-Free","Rough Turned","Precision Ground","Oversize"],
    notes: "Maintains hardness at elevated temperatures.",
    uses: [
      { label: "Drill bits, end mills, taps, general cutting tools", grades: [
        { grade: "M2", why: "Tungsten-molybdenum HSS — maintains 62+ HRC at cutting temperatures, the standard high speed steel for tooling" },
        { grade: "M4", why: "Higher vanadium than M2 — better wear resistance for abrasive materials, used for demanding cutting applications" },
      ]},
    ],
  },
  {
    id: "tool-oil",
    category: "Tool Steel",
    type: "Oil Hardening",
    grades: ["O1","O2","O6","L6"],
    sizes: "Rounds, Flats. Drill Rod available in O1.",
    finishes: ["DeCarb-Free","Rough Turned","Precision Ground","Oversize"],
    notes: "O1 is the most common general-purpose tool steel.",
    uses: [
      { label: "Punches, dies, gauges, taps (general toolroom)", grades: [
        { grade: "O1", why: "The most widely used tool steel — predictable heat treat, good wear resistance, economical, the default toolroom steel" },
        { grade: "O2", why: "Slightly different alloy than O1 — similar performance, sometimes preferred for specific heat treat characteristics" },
      ]},
      { label: "Graphitic, free-machining, threading tools", grades: [
        { grade: "O6", why: "Graphitic oil hardening steel — self-lubricating during machining, excellent for taps and threading tools" },
      ]},
      { label: "Chisels, heavy-duty punches requiring toughness", grades: [
        { grade: "L6", why: "Nickel alloy oil hardening — tougher than O1 at similar hardness, good for impact applications needing wear resistance" },
      ]},
    ],
  },
  {
    id: "tool-water",
    category: "Tool Steel",
    type: "Water Hardening",
    grades: ["W1","W2"],
    sizes: "Rounds, Flats. Drill Rod available in W1.",
    finishes: ["DeCarb-Free","Rough Turned","Precision Ground","Oversize"],
    notes: "Lowest cost tool steel. High surface hardness with tough core.",
    uses: [
      { label: "Hand tools, hammers, reamers, low-run dies", grades: [
        { grade: "W1", why: "Plain high carbon steel — lowest cost tool steel, develops very hard surface with tough core, good for hand tools" },
        { grade: "W2", why: "Vanadium added to W1 — finer grain size gives slightly better toughness and edge retention than W1" },
      ]},
    ],
  },
  {
    id: "tool-powder",
    category: "Tool Steel",
    type: "Powdered Metals",
    grades: ["A11-LVC PM","A11 PM","M4 PM","T15 PM","CPM grades"],
    sizes: "Rounds, Flats.",
    finishes: ["DeCarb-Free","Precision Ground"],
    notes: "Superior carbide distribution vs conventional. Higher wear resistance and toughness.",
    uses: [
      { label: "High-production dies, punches demanding max wear life", grades: [
        { grade: "A11 PM", why: "Powder metallurgy process gives uniform carbide distribution — dramatically longer die life than conventional A11" },
        { grade: "A11-LVC PM", why: "Low vanadium carbide version — better grindability than standard A11 PM with still-excellent wear resistance" },
      ]},
      { label: "Cutting tools requiring extreme wear resistance", grades: [
        { grade: "M4 PM", why: "PM process gives finer carbides than conventional M4 — better toughness and grindability at same wear resistance" },
        { grade: "T15 PM", why: "Highest wear resistance available in HSS — cobalt and vanadium rich, used for the most demanding cutting applications" },
      ]},
    ],
  },
  {
    id: "tool-alloy",
    category: "Tool Steel",
    type: "Alloy & Low Carbon",
    grades: ["Freemax 15","4140 Pre-Hard","4150","4340 HT","8620"],
    sizes: "Rounds, Flats, Hollow Bar.",
    finishes: ["DeCarb-Free","Rough Turned","Precision Ground"],
    notes: "",
    uses: [
      { label: "Free machining pre-hardened applications", grades: [
        { grade: "Freemax 15", why: "Pre-hardened free machining alloy — saves heat treat cost, machines well at hardness, good for fixture components" },
        { grade: "4140 Pre-Hard", why: "Pre-hardened 4140 at ~28-32 HRC — ready to machine to final dimension, no post-machining heat treat required" },
      ]},
      { label: "Heavy-duty shafts, structural tooling", grades: [
        { grade: "4150", why: "Higher carbon than 4140 — greater hardness potential after heat treat for more demanding wear applications" },
        { grade: "4340 HT", why: "Heat treated nickel-chrome-moly — highest toughness alloy steel, for tooling that must resist shock and high stress" },
      ]},
      { label: "Carburized tooling components", grades: [
        { grade: "8620", why: "Low carbon core stays tough after carburizing — develops hard wear surface while core absorbs impact" },
      ]},
    ],
  },
  {
    id: "tool-flat-stock",
    category: "Tool Steel",
    type: "Precision Ground Flat Stock",
    grades: ["Low Carbon","O1","A2","A6","D2","M2","S7","4142","440C","410"],
    sizes: "Standard flat stock sizes, precision ground.",
    finishes: ["Precision Ground"],
    notes: "Ready to use — no additional grinding required.",
    uses: [
      { label: "Shims, wear plates, gauges, toolroom stock", grades: [
        { grade: "Low Carbon", why: "Economical precision ground stock — for shims and spacers where hardness isn't required" },
        { grade: "O1", why: "General purpose tool steel ground flat — hardened or annealed, ready for toolroom use without further grinding" },
        { grade: "A2", why: "Air hardening precision ground — low distortion when hardened, good for gauges and precision tooling components" },
      ]},
      { label: "Corrosion-resistant precision flat components", grades: [
        { grade: "440C", why: "Hardest stainless steel available — 58-60 HRC, excellent wear and corrosion resistance for precision parts" },
        { grade: "410", why: "Martensitic stainless ground flat — hardenable with good corrosion resistance, common for valve components" },
      ]},
    ],
  },

  // ─── SPECIALTY ────────────────────────────────────────────────────────────
  {
    id: "specialty",
    category: "Specialty Products",
    type: "Specialty & Non-Ferrous",
    grades: ["Expanded Metal","Bar Grating","Grip Strut","Brass","Copper"],
    sizes: "Various — contact branch for availability",
    finishes: ["Standard"],
    notes: "",
    uses: [
      { label: "Walkways, platforms, safety flooring", grades: [
        { grade: "Bar Grating", why: "Open design drains liquids and debris, strong load capacity, standard for industrial mezzanines and platforms" },
        { grade: "Grip Strut", why: "Serrated plank with openings — aggressive anti-slip surface for ramps and walkways in wet or oily conditions" },
        { grade: "Expanded Metal", why: "Single piece construction, no welds — lighter than grating, good for guards, screens, and light-duty flooring" },
      ]},
      { label: "Electrical, plumbing, machined fittings", grades: [
        { grade: "Brass", why: "Excellent machinability, corrosion resistant, non-sparking — standard for valves, fittings, and electrical components" },
        { grade: "Copper", why: "Best electrical conductivity of common metals, excellent corrosion resistance — required for electrical and plumbing applications" },
      ]},
    ],
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(PSC_DATA.map(d => d.category)))];

const GLOSSARY = [
  // ─── LINE CARD ABBREVIATIONS ──────────────────────────────────────────────
  { term: "TGP", category: "Abbreviations", definition: "Turned, Ground & Polished. The bar is rough turned on a lathe, then centerless ground to tight diameter tolerance, then polished. Gives the best surface finish and tightest tolerance of any cold finished product. What a customer means when they say they need 'clean, tight bar.'" },
  { term: "T&P", category: "Abbreviations", definition: "Turned & Polished. Turned on a lathe and polished but not ground — looser tolerance than TGP. Step below TGP in finish quality and cost." },
  { term: "C/F", category: "Abbreviations", definition: "Cold Finished. Steel that has been processed at room temperature (cold drawn, turned, ground) to tighten dimensions and improve surface finish vs hot rolled. Better tolerance, better surface, higher strength than HR." },
  { term: "H/R", category: "Abbreviations", definition: "Hot Rolled. Steel rolled at high temperature — less precise dimensions, mill scale surface, more economical than cold finished. Good for structural and fabrication work where tight tolerance isn't needed." },
  { term: "P&O", category: "Abbreviations", definition: "Pickled & Oiled. Hot rolled steel that has been acid-cleaned to remove mill scale, then oiled to prevent rust. Better surface than standard HR, easier to paint or form. Common for sheet and plate." },
  { term: "DOM", category: "Abbreviations", definition: "Drawn Over Mandrel. Tube that starts as ERW (welded) then is cold drawn over a mandrel — this irons out the weld seam and produces extremely tight ID and OD tolerances with a smooth bore. The standard for hydraulic cylinder applications." },
  { term: "ERW", category: "Abbreviations", definition: "Electric Resistance Welded. Tube formed from flat strip, rolled into shape, and welded along the seam using electric current. Economical, good dimensional consistency. Fine for structural use but weld seam makes it unsuitable for high-pressure applications." },
  { term: "HF Seamless", category: "Abbreviations", definition: "Hot Finished Seamless. Tube produced without a weld seam by piercing a solid billet — finished at elevated temperature. No seam means uniform strength in all directions. Used for pressure applications and large diameter tubing." },
  { term: "CD Seamless", category: "Abbreviations", definition: "Cold Drawn Seamless. Seamless tube that has been cold drawn to tighter tolerances and better surface finish than hot finished. Best combination of no weld seam plus tight dimensions." },
  { term: "DCF", category: "Abbreviations", definition: "Drawn, Case Free (or DeCarb Free). A cold finished product that has been processed to eliminate the decarburized layer on the surface. Critical for tool steel and alloy applications where surface carbon content affects heat treat results." },
  { term: "IPS", category: "Abbreviations", definition: "Iron Pipe Size. The nominal sizing system for pipe — a 2\" IPS pipe doesn't actually measure 2\" OD. It's a legacy system where the number refers to the approximate inside diameter of older pipes. Always clarify OD and wall when ordering pipe." },
  { term: "OD", category: "Abbreviations", definition: "Outside Diameter. The measurement across the outside of a round or tube. For tubing and pipe, always get both OD and wall thickness — or OD and ID — to define the part completely." },
  { term: "ID", category: "Abbreviations", definition: "Inside Diameter. The measurement of the bore/hole of a tube or pipe. ID = OD minus (2 × wall thickness). Critical for fluid flow and mechanical fit applications." },
  { term: "OAL", category: "Abbreviations", definition: "Overall Length. The total cut length of a piece. When a customer gives you OAL they want material cut to that exact finished length." },
  { term: "HRC", category: "Abbreviations", definition: "Hardness Rockwell C Scale. The standard hardness measurement for hardened steel. Higher number = harder. Typical ranges: annealed tool steel 20-25 HRC, pre-hardened P20 28-32 HRC, hardened D2 die steel 58-62 HRC, hardened HSS 62-65 HRC." },
  { term: "HRB", category: "Abbreviations", definition: "Hardness Rockwell B Scale. Used for softer materials — annealed steel, aluminum, brass. When material is too soft for the C scale. 100 HRB ≈ 22 HRC." },
  { term: "BHN / BRN", category: "Abbreviations", definition: "Brinell Hardness Number. Another hardness scale — used commonly for abrasion resistant plate (400 BHN, 500 BHN). Larger indenter than Rockwell, better for coarser materials." },
  { term: "HSLA", category: "Abbreviations", definition: "High Strength Low Alloy. Steel with small amounts of alloying elements (niobium, vanadium, titanium) that boost strength without requiring heat treatment. Higher yield than standard carbon steel, better weldability than heat treated alloy steel." },
  { term: "ASTM", category: "Abbreviations", definition: "American Society for Testing and Materials. The organization that writes the material specifications (A36, A500, A513, etc.) that define minimum mechanical properties, chemistry, and testing requirements. When a customer asks for 'ASTM certified' they want material tested to that spec." },
  { term: "AMS", category: "Abbreviations", definition: "Aerospace Material Specification. Higher-tier spec than ASTM — tighter chemistry, tighter testing, full traceability required. When you see AMS on an order (like 4340 AMS6415) it's aerospace or defense and paperwork is critical." },
  { term: "PM", category: "Abbreviations", definition: "Powder Metallurgy. Steel made by compacting and sintering metal powder rather than casting. Produces extremely uniform carbide distribution — better wear resistance and toughness than conventionally cast tool steel of the same grade." },
  { term: "CPM", category: "Abbreviations", definition: "Crucible Particle Metallurgy. Crucible Industries' brand name for their powder metallurgy tool steel process. CPM grades (CPM S30V, CPM Rex, etc.) are premium PM tool steels with exceptional wear resistance and toughness." },
  { term: "RoHS", category: "Abbreviations", definition: "Restriction of Hazardous Substances. EU directive restricting certain materials (including lead) in electronic equipment. When a customer asks for 'RoHS compliant' aluminum (like 2011-T3) they need the version without restricted substances — important for electronics and medical applications." },
  { term: "DFARS", category: "Abbreviations", definition: "Defense Federal Acquisition Regulation Supplement. Requires that steel and other metals used in US defense contracts be melted and manufactured in the US or certain allied countries. When a customer asks if material is 'DFARS compliant' they're on a government/defense job." },
  { term: "Sch. 40", category: "Abbreviations", definition: "Schedule 40. A pipe wall thickness designation — Schedule refers to the wall thickness relative to the pipe size. Sch. 40 is the most common standard wall. Higher schedule = thicker wall = more pressure capacity." },

  // ─── DOCUMENT / ORDER TERMS ───────────────────────────────────────────────
  { term: "Mill Cert / MTR", category: "Documents & Orders", definition: "Mill Certification / Material Test Report. The document from the steel mill that certifies the chemistry and mechanical properties of a specific heat of material. Customers on aerospace, defense, pressure vessel, or food/pharma jobs will always ask for certs. PSC maintains traceability so we can provide these." },
  { term: "Heat Number", category: "Documents & Orders", definition: "The unique identification number assigned to a specific melt of steel at the mill. The heat number ties the material to the mill cert. When a customer asks to 'keep the heat numbers' they want the cert documentation matched to the specific bars they received." },
  { term: "Cert to Print", category: "Documents & Orders", definition: "Certified to the customer's drawing or specification. They want documentation proving the material meets their specific requirements, not just the standard spec." },
  { term: "RFQ", category: "Documents & Orders", definition: "Request for Quote. When a customer sends an RFQ they want pricing — not an order, just a price. Respond fast. Speed on an RFQ is one of the biggest competitive advantages in this business." },
  { term: "PO", category: "Documents & Orders", definition: "Purchase Order. The formal document a customer issues when they're actually buying. Don't ship without a PO number. The PO is the contract." },
  { term: "Lead Time", category: "Documents & Orders", definition: "How long until the customer gets their material. PSC's next-day delivery capability is a major selling point — most competitors can't match it. When a customer is in a bind, lead time wins the order." },
  { term: "Will Call / Pickup", category: "Documents & Orders", definition: "Customer comes to the branch to pick up their material rather than having it delivered. Good for urgent same-day needs. Know your branch's pickup hours and dock capabilities." },
  { term: "JIT", category: "Documents & Orders", definition: "Just In Time. A stocking program where PSC holds inventory at the branch specifically for one customer, releasing it to them on their production schedule. Locks in the customer, reduces their carrying cost, good for both sides." },
  { term: "Blanket Order", category: "Documents & Orders", definition: "A standing order for a set quantity over a period of time, released in smaller shipments. Customer commits to buying X tons over 6 months, you commit to holding the inventory. Good for locking in price and securing volume." },
  { term: "Stocking Program", category: "Documents & Orders", definition: "PSC holds agreed-upon inventory of specific sizes and grades for a customer at all times. Customer gets guaranteed availability, PSC gets committed volume. One of PSC's core service offerings." },

  // ─── PROCESSING / FABRICATION ─────────────────────────────────────────────
  { term: "Saw Cutting", category: "Processing", definition: "Cutting bar, tube, or plate to a specific length using a band saw or cold saw. PSC offers both single-piece cutting and precision production cutting (high volume, tight length tolerance). A major value-add over buying from a mill." },
  { term: "Band Saw", category: "Processing", definition: "Uses a continuous toothed blade — good for general cutting across most materials. Slightly rougher cut than cold saw but handles a wider range of sizes and materials." },
  { term: "Cold Saw", category: "Processing", definition: "Uses a circular blade at slow speed — produces a very clean, burr-free, square cut with tight length tolerance. Preferred for precision production cutting where finish and squareness matter." },
  { term: "Flame Cutting", category: "Processing", definition: "Cutting plate or structural using an oxy-acetylene or plasma torch. Oxy (flame) cutting is good for thick carbon steel plate. Plasma cutting is faster, cleaner edge, works on stainless and aluminum too. PSC offers both." },
  { term: "Plasma Cutting", category: "Processing", definition: "Uses a high-velocity jet of ionized gas to cut metal. Faster than oxy-flame, better edge quality, works on stainless and aluminum where oxy won't. Standard for precision plate cutting." },
  { term: "Shearing", category: "Processing", definition: "Cutting sheet or thin plate using a shear blade — like giant scissors. Fast and economical for straight cuts on sheet. Can't cut thick plate or profiles." },
  { term: "Circle Cutting", category: "Processing", definition: "Cutting round blanks (discs) from plate using a plasma or flame cutter on a rotary arm. PSC offers aluminum plate circle cutting — common for flanges, discs, and round blanks." },
  { term: "Deburring", category: "Processing", definition: "Removing the sharp edge or burr left after cutting. A customer who asks for 'deburred' parts wants the sharp edges knocked off so they're safe to handle and won't cause interference on assembly." },
  { term: "Squareness", category: "Processing", definition: "How close to 90 degrees the cut end is relative to the bar or tube axis. A 'square cut' matters when the end is a mating surface. Cold sawing produces better squareness than band sawing." },
  { term: "Facing", category: "Processing", definition: "Machining the end of a bar flat and square on a lathe. Customer may ask for 'faced and centered' when they need very precise end condition for a machining setup." },

  // ─── MATERIAL / METALLURGY TERMS ─────────────────────────────────────────
  { term: "Annealed", category: "Metallurgy", definition: "Heat treated to soften the material — makes it easier to machine, form, or cold work. When you see '4140 Annealed' it means it hasn't been hardened yet. Customer will machine it in this soft state, then heat treat to final hardness." },
  { term: "Heat Treated / HT", category: "Metallurgy", definition: "The material has been hardened and tempered to a specified hardness range. '4140 HT' means it's already at its final hardness — ready to use without further heat treat. Common for structural and mechanical applications." },
  { term: "Pre-Hardened", category: "Metallurgy", definition: "Same as heat treated — the mill or service center has already done the heat treatment. Customer gets it ready to machine to final dimensions. Saves them the cost and lead time of sending out for heat treat." },
  { term: "Carburizing / Case Hardening", category: "Metallurgy", definition: "A heat treatment process where carbon is diffused into the surface of low-carbon steel, creating a hard outer case with a tough ductile core. Common for gears, pins, cams. Why grades like 8620 and 1018 are used — they case harden well." },
  { term: "Quench & Temper", category: "Metallurgy", definition: "The standard heat treatment sequence for alloy steel — heat to austenitizing temperature, quench (rapid cool in oil or water) to harden, then temper (reheat to lower temperature) to reduce brittleness. What '4140 HT' has been through." },
  { term: "Stress Relieving", category: "Metallurgy", definition: "Heating material to a moderate temperature (below hardening temp) and slow cooling to reduce internal stresses from machining or welding. Customer may ask for stress relieved material when they're doing heavy machining and can't afford distortion." },
  { term: "Machinability", category: "Metallurgy", definition: "How easily a material can be cut, drilled, and machined. Rated as a percentage vs 1212 free machining steel (100%). 12L14 rates around 170% — cuts faster and cleaner than the baseline. 4140 HT rates around 55% — much harder to machine." },
  { term: "Tensile Strength", category: "Metallurgy", definition: "The maximum stress a material can withstand before breaking — measured in PSI or KSI (thousands of PSI). 1018 cold drawn: ~70 KSI. 4140 HT: ~150 KSI. 4340 HT: ~180+ KSI. Higher tensile = stronger but usually harder to machine." },
  { term: "Yield Strength", category: "Metallurgy", definition: "The stress at which a material starts to permanently deform (bend and not spring back). Engineers design to yield strength, not tensile. A36 structural: 36 KSI yield. 4140 HT: ~130 KSI yield. Important number when a customer asks about load capacity." },
  { term: "Elongation", category: "Metallurgy", definition: "How much a material can stretch before breaking — expressed as a percentage. High elongation = ductile, can bend without cracking. Low elongation = brittle. Important for formed parts — a material with 2% elongation will crack where one with 20% won't." },
  { term: "Decarburization / DeCarb", category: "Metallurgy", definition: "The loss of carbon from the surface of steel during hot rolling or heat treatment — creates a soft skin on an otherwise hard material. DeCarb-free stock has had this layer removed. Critical for tool steel where surface hardness is required right to the OD." },
  { term: "Carbide", category: "Metallurgy", definition: "Hard particles of carbon compounds (iron carbide, chromium carbide, vanadium carbide) distributed through tool steel. More carbides = more wear resistance. Powder metallurgy produces finer, more uniform carbide distribution than conventional melting." },
  { term: "Grain Size", category: "Metallurgy", definition: "The size of the individual crystals in the steel microstructure. Finer grain = tougher, better fatigue resistance, better surface finish after machining. Vanadium additions (like in W2 vs W1) refine grain size." },
  { term: "Precipitation Hardening", category: "Metallurgy", definition: "A hardening mechanism used in 17-4PH stainless — tiny particles precipitate out of solution during a lower-temperature aging heat treatment. Allows stainless to reach alloy steel strength levels without the distortion of conventional quench & temper." },
  { term: "Sensitization", category: "Metallurgy", definition: "What happens to standard 304 or 316 stainless at weld temperatures — chromium carbides form at grain boundaries, robbing those areas of corrosion resistance. The fix is to use 304L or 316L (low carbon) which don't sensitize. Important to explain to customers welding stainless in corrosive service." },
  { term: "Mill Scale", category: "Metallurgy", definition: "The blue-black oxide layer that forms on steel during hot rolling. Rough, hard, not weldable until removed. Hot rolled material has it. P&O, cold finished, and machined material has it removed. A customer who says 'I can't weld through the scale' needs P&O or cold finished." },
  { term: "Temper", category: "Metallurgy", definition: "For aluminum: the condition of the material after processing. T6 = solution heat treated and artificially aged (strongest). T5 = cooled from hot working and artificially aged. For steel: the second step of quench & temper heat treatment — reduces brittleness after hardening." },

  // ─── DIMENSIONS / TOLERANCES ─────────────────────────────────────────────
  { term: "Tolerance", category: "Dimensions & Tolerances", definition: "The allowable variation from a specified dimension. A 1.000\" bar with a +/-.001\" tolerance can measure anywhere from .999\" to 1.001\" and still be in spec. Cold finished stock holds tighter tolerances than hot rolled. TGP holds tighter than cold drawn." },
  { term: "Oversize", category: "Dimensions & Tolerances", definition: "Material supplied larger than the nominal size to allow for cleanup machining. A customer who needs a finished 2.000\" shaft might order 2.125\" oversize so they have material to take off and still hit their final dimension. Common in tool steel." },
  { term: "Nominal Size", category: "Dimensions & Tolerances", definition: "The stated or named size — not necessarily the exact measured dimension. A 1\" round bar is nominally 1\" but actual dimension depends on the tolerance band for that product. Always clarify if a customer needs exact finished size." },
  { term: "Wall Thickness", category: "Dimensions & Tolerances", definition: "For tube and pipe — the thickness of the tube wall. Specified along with OD to fully define the tube. Wall = (OD - ID) / 2. Heavier wall = more pressure capacity and more material to machine on ID." },
  { term: "Straightness", category: "Dimensions & Tolerances", definition: "How straight the bar or tube is along its length. Cold finished bars have better straightness than hot rolled due to the drawing/straightening process. Chamfered bar ends (PSC standard on C/F rounds) help with loading into screw machines." },
  { term: "Gauge", category: "Dimensions & Tolerances", definition: "The thickness measurement for sheet — but the gauge number runs backwards (higher gauge = thinner sheet). 24 gauge is thinner than 10 gauge. For anything other than sheet, always use decimal thickness to avoid confusion." },

  // ─── SALES / CUSTOMER TERMS ───────────────────────────────────────────────
  { term: "Job Shop", category: "Customer Types", definition: "A machine shop that takes on a variety of custom machining work for different customers — they don't make one product, they make whatever comes in the door. High-variety, often short run. Good customer for cold finished bar and tool steel." },
  { term: "OEM", category: "Customer Types", definition: "Original Equipment Manufacturer. A company that makes a specific product (pumps, valves, motors, machines). More predictable buying patterns than job shops — good for stocking programs and blanket orders." },
  { term: "Fabricator", category: "Customer Types", definition: "Shop that cuts, bends, welds, and assembles structural steel or sheet metal. Primary buyers of structural shapes, plate, sheet, and tubing. Care about cut quality, straightness, and weldability more than tight machining tolerances." },
  { term: "Distributor", category: "Customer Types", definition: "A company that buys material and resells it — they're not the end user. May be buying from PSC to fill a gap in their own inventory. Price sensitive, lower margin, but volume can be significant." },
  { term: "Maintenance / MRO", category: "Customer Types", definition: "Maintenance, Repair & Operations. Buying material to fix or maintain existing equipment — not to make new products. Often urgent, small quantities, willing to pay for availability. PSC's next-day delivery is a big win here." },
  { term: "Tier 1 / Tier 2 Supplier", category: "Customer Types", definition: "Supply chain terminology — Tier 1 sells directly to the OEM, Tier 2 sells to Tier 1. Knowing where a customer sits in the chain tells you how price-sensitive they are and what specs they'll need to flow down." },
  { term: "Approved Vendor List / AVL", category: "Customer Types", definition: "A customer's list of pre-qualified suppliers they're allowed to buy from. Getting on an AVL — especially for aerospace or defense customers — can lock in business for years. PSC's certifications and traceability help qualify us." },
  { term: "Spot Buy", category: "Customer Types", definition: "A one-time purchase outside of any ongoing agreement — customer needs something now and is just shopping around. Good opportunity to impress with service and convert to a regular account." },
  { term: "Book Business", category: "Customer Types", definition: "Regular, recurring orders from an established customer — the backbone of a territory. Your job is to protect book business and build more of it." },
];

const GLOSSARY_CATEGORIES = ["All", ...Array.from(new Set(GLOSSARY.map(g => g.category)))];

const GradeTag = ({ grade }) => (
  <span style={{
    display: "inline-block",
    background: "rgba(59,130,246,0.15)",
    color: "#7eb8f7",
    border: "1px solid rgba(59,130,246,0.3)",
    borderRadius: "3px",
    padding: "2px 7px",
    fontSize: "11px",
    fontFamily: "'IBM Plex Mono', monospace",
    marginRight: "4px",
    marginBottom: "4px",
    letterSpacing: "0.5px",
  }}>{grade}</span>
);

const UseRow = ({ use }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "6px", marginBottom: "6px" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#cdd8f0", fontSize: "12px", textAlign: "left",
          width: "100%", padding: "4px 0", display: "flex",
          alignItems: "center", gap: "6px", fontFamily: "'IBM Plex Sans', sans-serif",
        }}
      >
        <span style={{ color: "#4a90d9", fontSize: "10px" }}>{open ? "▼" : "▶"}</span>
        {use.label}
      </button>
      {open && (
        <div style={{ paddingLeft: "16px", marginTop: "6px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {use.grades.map((g, i) => (
            <div key={i} style={{
              background: "rgba(74,144,217,0.06)",
              border: "1px solid rgba(74,144,217,0.15)",
              borderRadius: "5px",
              padding: "8px 10px",
            }}>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "12px", fontWeight: "600",
                color: "#7eb8f7", marginBottom: "3px",
              }}>{g.grade}</div>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "11px", color: "#8a9ab8", lineHeight: "1.5",
              }}>{g.why}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "8px",
      marginBottom: "10px",
      overflow: "hidden",
      transition: "border-color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(74,144,217,0.5)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
    >
      <button
        onClick={() => setExpanded(o => !o)}
        style={{
          width: "100%", background: "none", border: "none",
          cursor: "pointer", padding: "14px 16px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <div style={{
            fontSize: "11px", fontWeight: "700", color: "#4a90d9",
            fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "1.5px",
            textTransform: "uppercase", marginBottom: "3px",
          }}>
            {item.category}
          </div>
          <div style={{
            fontSize: "17px", fontWeight: "600", color: "#ffffff",
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}>
            {item.type}
          </div>
        </div>
        <span style={{ color: "#4a90d9", fontSize: "20px", lineHeight: 1, fontWeight: "300" }}>
          {expanded ? "−" : "+"}
        </span>
      </button>

      <div style={{ padding: "0 16px 12px" }}>
        {item.grades.slice(0, 6).map(g => <GradeTag key={g} grade={g} />)}
        {item.grades.length > 6 && (
          <span style={{ fontSize: "11px", color: "#5a6e90", fontFamily: "'IBM Plex Mono', monospace" }}>
            +{item.grades.length - 6} more
          </span>
        )}
      </div>

      {expanded && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "16px" }}>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", color: "#5a6e90", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'IBM Plex Mono', monospace" }}>
              GRADES STOCKED
            </div>
            {item.grades.map(g => <GradeTag key={g} grade={g} />)}
          </div>

          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", color: "#5a6e90", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'IBM Plex Mono', monospace" }}>
              SIZE RANGE
            </div>
            <div style={{ fontSize: "13px", color: "#cdd8f0", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.6" }}>
              {item.sizes}
            </div>
          </div>

          {item.finishes.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", color: "#5a6e90", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'IBM Plex Mono', monospace" }}>
                FINISHES
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {item.finishes.map(f => (
                  <span key={f} style={{
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "3px", padding: "2px 8px", fontSize: "11px",
                    color: "#8a9ab8", fontFamily: "'IBM Plex Sans', sans-serif",
                  }}>{f}</span>
                ))}
              </div>
            </div>
          )}

          {item.notes && (
            <div style={{ marginBottom: "14px", padding: "10px 12px", background: "rgba(74,144,217,0.08)", borderLeft: "3px solid #4a90d9", borderRadius: "0 4px 4px 0" }}>
              <div style={{ fontSize: "12px", color: "#cdd8f0", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.5" }}>
                {item.notes}
              </div>
            </div>
          )}

          {item.uses.length > 0 && (
            <div>
              <div style={{ fontSize: "10px", color: "#5a6e90", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'IBM Plex Mono', monospace" }}>
                APPLICATIONS — TAP TO SEE GRADES
              </div>
              {item.uses.map((u, i) => <UseRow key={i} use={u} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const GlossaryCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "8px", marginBottom: "6px",
      overflow: "hidden", transition: "border-color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(74,144,217,0.4)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = open ? "rgba(74,144,217,0.3)" : "rgba(255,255,255,0.08)"}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "12px 16px", display: "flex",
          justifyContent: "space-between", alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "14px", fontWeight: "700", color: "#7eb8f7",
          }}>{item.term}</span>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "9px", color: "#3a4a6a",
            letterSpacing: "1px", textTransform: "uppercase",
          }}>{item.category}</span>
        </div>
        <span style={{ color: "#4a90d9", fontSize: "18px", lineHeight: 1, fontWeight: "300", flexShrink: 0 }}>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div style={{
          padding: "0 16px 14px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "12px",
        }}>
          <div style={{
            fontSize: "13px", color: "#8a9ab8",
            fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.7",
          }}>{item.definition}</div>
        </div>
      )}
    </div>
  );
};

export default function PSCFieldApp() {
  const [tab, setTab] = useState("products");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [glossarySearch, setGlossarySearch] = useState("");
  const [glossaryCategory, setGlossaryCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return PSC_DATA.filter(item => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      if (!q) return matchCat;
      const haystack = [
        item.category, item.type,
        ...item.grades,
        item.sizes, item.notes,
        ...item.uses.map(u => u.label),
        ...item.uses.flatMap(u => u.grades.map(g => g.grade + " " + g.why)),
        ...item.finishes,
      ].join(" ").toLowerCase();
      return matchCat && haystack.includes(q);
    });
  }, [search, activeCategory]);

  const filteredGlossary = useMemo(() => {
    const q = glossarySearch.toLowerCase().trim();
    return GLOSSARY.filter(item => {
      const matchCat = glossaryCategory === "All" || item.category === glossaryCategory;
      if (!q) return matchCat;
      return matchCat && (item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q));
    });
  }, [glossarySearch, glossaryCategory]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f1e",
      color: "#e8edf5",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;600;700&family=Barlow+Condensed:wght@700;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0f1e; }
        ::-webkit-scrollbar-thumb { background: #4a90d9; border-radius: 2px; }
        input::placeholder { color: #3a4a6a; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #0d1a3a 0%, #091428 100%)",
        borderBottom: "1px solid rgba(74,144,217,0.25)",
        padding: "16px 16px 0px",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>

          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "22px", fontWeight: "900",
                color: "#ffffff", letterSpacing: "1px", lineHeight: 1,
              }}>Pennsylvania Steel Company</div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "10px", fontWeight: "600",
                color: "#4a90d9", letterSpacing: "3px",
                textTransform: "uppercase", marginTop: "3px",
              }}>Field Reference</div>
            </div>
            <div style={{
              background: "rgba(74,144,217,0.12)",
              border: "1px solid rgba(74,144,217,0.25)",
              borderRadius: "6px", padding: "4px 10px",
              fontSize: "10px", color: "#4a90d9",
              fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "1px",
            }}>PASTEEL.COM</div>
          </div>

          {/* Tab bar */}
          <div style={{ display: "flex", gap: "0px" }}>
            {[
              { key: "products", label: "Products" },
              { key: "glossary", label: "Glossary" },
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{
                flex: 1, background: "none", border: "none", cursor: "pointer",
                padding: "10px 0", fontSize: "13px", fontWeight: "700",
                fontFamily: "'IBM Plex Sans', sans-serif",
                color: tab === t.key ? "#ffffff" : "#5a6e90",
                borderBottom: tab === t.key ? "2px solid #4a90d9" : "2px solid transparent",
                transition: "all 0.15s",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS TAB */}
      {tab === "products" && (
        <>
          <div style={{
            background: "#091428",
            borderBottom: "1px solid rgba(74,144,217,0.1)",
            padding: "12px 16px",
            position: "sticky", top: "89px", zIndex: 99,
          }}>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ position: "relative", marginBottom: "10px" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#4a90d9", fontSize: "16px" }}>⌕</span>
                <input
                  type="text"
                  placeholder="Search grade, type, or application... e.g. 4140, DOM, mold, screw machine"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(74,144,217,0.2)", borderRadius: "6px",
                    padding: "10px 36px 10px 36px", color: "#e8edf5",
                    fontSize: "13px", fontFamily: "'IBM Plex Sans', sans-serif", outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor = "#4a90d9"}
                  onBlur={e => e.target.style.borderColor = "rgba(74,144,217,0.2)"}
                />
                {search && (
                  <button onClick={() => setSearch("")} style={{
                    position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", color: "#5a6e90", cursor: "pointer", fontSize: "18px",
                  }}>×</button>
                )}
              </div>
              <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                    whiteSpace: "nowrap", padding: "5px 12px", borderRadius: "20px",
                    fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: "600", letterSpacing: "0.5px", cursor: "pointer", border: "1px solid",
                    background: activeCategory === cat ? "#4a90d9" : "transparent",
                    borderColor: activeCategory === cat ? "#4a90d9" : "rgba(255,255,255,0.12)",
                    color: activeCategory === cat ? "#ffffff" : "#5a6e90",
                    transition: "all 0.15s",
                  }}>
                    {cat === "Cold Finished Steel" ? "C/F Steel" :
                     cat === "Hot Rolled Carbon / Alloy Steel" ? "HR Steel" :
                     cat === "Carbon Steel Tube" ? "Tube/Pipe" : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "16px" }}>
            <div style={{ fontSize: "11px", color: "#3a4a6a", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "12px", letterSpacing: "1px" }}>
              {filtered.length} RESULT{filtered.length !== 1 ? "S" : ""}{search && ` FOR "${search.toUpperCase()}"`}
            </div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#3a4a6a", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px" }}>
                NO RESULTS FOUND<br />
                <span style={{ fontSize: "11px", color: "#2a3a5a", marginTop: "8px", display: "block" }}>Try a grade number, material type, or application</span>
              </div>
            ) : (
              filtered.map(item => <ProductCard key={item.id} item={item} />)
            )}
          </div>
        </>
      )}

      {/* GLOSSARY TAB */}
      {tab === "glossary" && (
        <>
          <div style={{
            background: "#091428",
            borderBottom: "1px solid rgba(74,144,217,0.1)",
            padding: "12px 16px",
            position: "sticky", top: "89px", zIndex: 99,
          }}>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ position: "relative", marginBottom: "10px" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#4a90d9", fontSize: "16px" }}>⌕</span>
                <input
                  type="text"
                  placeholder="Search terms... e.g. TGP, DOM, mill cert, carburizing"
                  value={glossarySearch}
                  onChange={e => setGlossarySearch(e.target.value)}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(74,144,217,0.2)", borderRadius: "6px",
                    padding: "10px 36px 10px 36px", color: "#e8edf5",
                    fontSize: "13px", fontFamily: "'IBM Plex Sans', sans-serif", outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor = "#4a90d9"}
                  onBlur={e => e.target.style.borderColor = "rgba(74,144,217,0.2)"}
                />
                {glossarySearch && (
                  <button onClick={() => setGlossarySearch("")} style={{
                    position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", color: "#5a6e90", cursor: "pointer", fontSize: "18px",
                  }}>×</button>
                )}
              </div>
              <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
                {GLOSSARY_CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setGlossaryCategory(cat)} style={{
                    whiteSpace: "nowrap", padding: "5px 12px", borderRadius: "20px",
                    fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: "600", letterSpacing: "0.5px", cursor: "pointer", border: "1px solid",
                    background: glossaryCategory === cat ? "#4a90d9" : "transparent",
                    borderColor: glossaryCategory === cat ? "#4a90d9" : "rgba(255,255,255,0.12)",
                    color: glossaryCategory === cat ? "#ffffff" : "#5a6e90",
                    transition: "all 0.15s",
                  }}>{cat}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "16px" }}>
            <div style={{ fontSize: "11px", color: "#3a4a6a", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "12px", letterSpacing: "1px" }}>
              {filteredGlossary.length} TERM{filteredGlossary.length !== 1 ? "S" : ""}{glossarySearch && ` FOR "${glossarySearch.toUpperCase()}"`}
            </div>
            {filteredGlossary.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#3a4a6a", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px" }}>
                NO RESULTS FOUND
              </div>
            ) : (
              filteredGlossary.map((item, i) => <GlossaryCard key={i} item={item} />)
            )}
          </div>
        </>
      )}

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "24px 16px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontSize: "10px", color: "#3a4a6a", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "1px",
      }}>
        PENNSYLVANIA STEEL COMPANY · (800) 999-2997 · PASTEEL.COM
      </div>
    </div>
  );
}