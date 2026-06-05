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
  {
    id: "hr-rounds",
    category: "Hot Rolled Carbon / Alloy Steel",
    type: "Rounds",
    grades: ["A36","B16","C.Q.","1018","1045","1117","1141","8620","4130","4140 Annealed","4140 HT","4150","4340"],
    sizes: "2\" through 22\" diameter",
    finishes: ["As-rolled","Annealed","Heat-Treated"],
    notes: "Full range of low carbon and alloy. Large diameter specialty. Confirm availability on diameters above 18\" with your branch.",
    uses: [
      { label: "Structural and general fabrication", grades: [
        { grade: "A36", why: "Standard structural grade — 36 ksi yield, excellent weldability, economical for non-critical round bar applications" },
        { grade: "C.Q.", why: "Commercial Quality — general purpose low carbon round bar for non-critical fabrication and welding" },
      ]},
      { label: "Large shafts, axles, rolls", grades: [
        { grade: "1045", why: "Medium carbon — through-hardenable, good strength-to-cost ratio for large diameter shafts" },
        { grade: "4140 HT", why: "Heat treated alloy — significantly higher strength and toughness than 1045 for demanding applications" },
        { grade: "4150", why: "Higher carbon than 4140 — greater hardness potential after heat treat for more demanding wear applications" },
        { grade: "4340", why: "Highest toughness alloy — used when 4140 isn't strong enough, common in heavy equipment and aerospace" },
      ]},
      { label: "General structural / machined components", grades: [
        { grade: "1018", why: "Low carbon — weldable, machinable, economical for non-critical structural parts" },
        { grade: "B16", why: "Alloy grade for stud bolts and high temperature fasteners — good elevated temperature strength" },
      ]},
      { label: "Free machining applications", grades: [
        { grade: "1141", why: "Resulfurized — better chip breaking and surface finish than plain carbon at same strength level" },
        { grade: "1117", why: "Low carbon free machining — machinable and carburizable, good for pins and light shafts" },
      ]},
      { label: "High strength / aircraft / motorsport", grades: [
        { grade: "4130", why: "Chrome-moly alloy — better weldability than 4140, slightly less strength, preferred for welded high strength applications" },
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
    grades: ["A36"],
    sizes: "Angles (bar & structural), Beams (standard & wide flange), Channels (bar & structural)",
    finishes: ["As-rolled"],
    notes: "",
    uses: [
      { label: "Structural fabrication, frames, supports", grades: [
        { grade: "A36", why: "36 ksi minimum yield — the standard structural grade, excellent weldability, widely specified" },
      ]},
      { label: "Construction, trailers, equipment frames", grades: [
        { grade: "A36", why: "Cost-effective, readily available, easy to weld and fabricate for heavy frame applications" },
      ]},
    ],
  },
  {
    id: "hr-flats",
    category: "Hot Rolled Carbon / Alloy Steel",
    type: "Flat Bars",
    grades: ["A36","MQ"],
    sizes: "Standard flat bar sizes",
    finishes: ["As-rolled"],
    notes: "",
    uses: [
      { label: "General fabrication, welding", grades: [
        { grade: "A36", why: "Standard structural flat bar — weldable, machinable, economical for general fab applications" },
        { grade: "MQ", why: "Merchant Quality — general purpose flat bar for non-critical fabrication where tight tolerance isn't required" },
      ]},
    ],
  },
  {
    id: "hr-squares",
    category: "Hot Rolled Carbon / Alloy Steel",
    type: "Square Bars",
    grades: ["A36"],
    sizes: "Standard square bar sizes",
    finishes: ["As-rolled"],
    notes: "",
    uses: [
      { label: "General structural and fabrication", grades: [
        { grade: "A36", why: "Standard grade for hot rolled square bar — weldable, economical, widely available" },
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
  {
    id: "tube-structural",
    category: "Carbon Steel Tube",
    type: "Structural Tubing",
    grades: ["ASTM A500 Grade B","ASTM A500 Grade C"],
    sizes: "Rectangular: 1/2\"×1\"×.062\" wall through 12\"×8\"×1/2\" wall. Square: 1/2\"×.065\" wall through 14\"×1/2\" wall.",
    finishes: ["ERW"],
    notes: "A500 is the standard spec for cold formed welded structural tubing — square and rectangular HSS. Grade B: 46 ksi yield. Grade C: 50 ksi yield.",
    uses: [
      { label: "Structural frames, columns, supports", grades: [
        { grade: "ASTM A500 Grade B", why: "46 ksi minimum yield — the most common structural tube grade, widely specified for construction and fabrication" },
        { grade: "ASTM A500 Grade C", why: "50 ksi minimum yield — higher strength grade for applications where Grade B doesn't meet the spec" },
      ]},
    ],
  },
  {
    id: "tube-round",
    category: "Carbon Steel Tube",
    type: "Round Tubing",
    grades: ["DOM — A513","ERW — A513","HF Seamless — A519","CD Seamless — A519","4140 Seamless","4130 Seamless"],
    sizes: "1/4\" OD through 30\" OD",
    finishes: ["As-drawn","Seamless"],
    notes: "DOM, ERW, HF Seamless, and CD Seamless are tube types — not steel grades. Underlying carbon steel is 1020 or 1026. 4140 and 4130 are alloy grades available in seamless.",
    uses: [
      { label: "Hydraulic / pneumatic cylinders (tight tolerances)", grades: [
        { grade: "DOM — A513", why: "Drawn Over Mandrel — tightest ID tolerance of any tube, smooth bore critical for cylinder applications" },
      ]},
      { label: "High pressure / precision mechanical", grades: [
        { grade: "CD Seamless — A519", why: "Cold drawn seamless — no weld seam, tight tolerances, best combination of dimensional accuracy and pressure rating" },
        { grade: "HF Seamless — A519", why: "Hot finished seamless — heavier walls available, good for high pressure and elevated temperature applications" },
      ]},
      { label: "General mechanical tubing", grades: [
        { grade: "ERW — A513", why: "Electric resistance welded — economical, good dimensional consistency, fine for non-pressure structural and mechanical use" },
      ]},
      { label: "High strength / aircraft / motorsport", grades: [
        { grade: "4140 Seamless", why: "Chrome-moly alloy tube — excellent strength-to-weight, heat treatable, standard for roll cages and hydraulic" },
        { grade: "4130 Seamless", why: "Lower carbon than 4140 — better weldability, slightly less strength, preferred for aircraft and welded structures" },
      ]},
    ],
  },
  {
    id: "tube-pipe",
    category: "Carbon Steel Tube",
    type: "Pipe",
    grades: ["A53 Welded","A53 Seamless","A106 Seamless"],
    sizes: "1/4\" IPS through 30\" IPS",
    finishes: ["Standard"],
    notes: "A53 covers both welded and seamless pipe. A106 is seamless only and rated for higher temperature service. Both available in standard wall (Sch. 40) and extra strong (Sch. 80).",
    uses: [
      { label: "Fluid transfer, plumbing, general piping", grades: [
        { grade: "A53 Welded", why: "Economical — weld seam is fine for low-pressure fluid transfer and general structural pipe applications" },
        { grade: "A53 Seamless", why: "No weld seam — better for higher pressure applications while still being economical for general service" },
      ]},
      { label: "High pressure / high temperature service", grades: [
        { grade: "A106 Seamless", why: "Rated for high temperature and high pressure service — required for steam lines, process piping, and critical fluid systems" },
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
    ],
  },
  {
    id: "ss-accuracy-rounds",
    category: "Stainless Steel",
    type: "Accuracy Round Stock",
    grades: ["303"],
    sizes: ".374\", .499\", .624\", .749\", .999\", 1.249\", 1.374\", 1.499\", 1.999\"",
    finishes: ["Cold Drawn","Turned Ground & Polished"],
    notes: "Held to extremely tight diameter tolerances specifically for precision screw machine work.",
    uses: [
      { label: "Precision screw machine production", grades: [
        { grade: "303", why: "Best machining stainless — accuracy sizes eliminate setup cleanup cuts, load and run" },
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
    grades: ["303","304","304 True Bar"],
    sizes: "1/8\"–1-1/4\" thick × 1/2\"–8\" wide",
    finishes: ["Cold Drawn"],
    notes: "304 'True Bar' for tight tolerance flat bar applications.",
    uses: [
      { label: "High volume machined flat components", grades: [
        { grade: "303", why: "Free machining stainless — best machinability of flat bar grades, preferred for high volume turned or milled parts" },
      ]},
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
    grades: ["304","316"],
    sizes: "Round: 1/4\" OD×.035\" wall – 1-1/2\" OD×.120\" wall. Square/Rect tubing. Pipe: 1/4\" IPS Sch.40 – 6\" IPS Sch.40",
    finishes: ["Mill","180 Grit Polished"],
    notes: "Polished finish available for aesthetic/sanitary applications.",
    uses: [
      { label: "Food/beverage, pharmaceutical, sanitary systems", grades: [
        { grade: "304", why: "Non-reactive, easy to sterilize, smooth bore prevents bacteria harboring — meets FDA/3A sanitary standards" },
      ]},
      { label: "Marine, chemical, high chloride environments", grades: [
        { grade: "316", why: "Molybdenum addition gives significantly better chloride and acid resistance than 304 — required for marine and chemical service" },
      ]},
      { label: "Architectural / decorative", grades: [
        { grade: "304", why: "180 grit polished finish provides clean aesthetic appearance for visible architectural applications" },
      ]},
    ],
  },
  {
    id: "ss-sheet",
    category: "Stainless Steel",
    type: "Sheet",
    grades: ["304"],
    sizes: "24 GA through 1/4\"",
    finishes: ["#2 Mill Finish","#4 Polished (one side)","Mirror finish (quote)"],
    notes: "#2 is the standard mill finish. #4 brushed is the most common polished finish. Mirror finish available on request.",
    uses: [
      { label: "Fabrication, enclosures, food equipment", grades: [
        { grade: "304", why: "Corrosion resistant, cleanable surface, good formability — standard for food service and industrial enclosures" },
      ]},
      { label: "Architectural / visible surfaces", grades: [
        { grade: "304", why: "#4 brushed or mirror finish provides premium appearance for countertops, panels, and trim applications" },
      ]},
    ],
  },
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
    id: "al-7075-rounds",
    category: "Aluminum",
    type: "7075 Rounds",
    grades: ["7075-T6","7075-T651"],
    sizes: "Standard round bar sizes",
    finishes: ["Extruded"],
    notes: "Highest strength common aluminum alloy. Not as weldable as 6061. Best for machined high-strength parts.",
    uses: [
      { label: "High strength aerospace / defense / structural", grades: [
        { grade: "7075-T6", why: "73 ksi yield strength — highest strength of common aluminum alloys, used where 6061 isn't strong enough" },
        { grade: "7075-T651", why: "Stress relieved plate/bar — better dimensional stability during heavy machining, standard for aerospace structural parts" },
      ]},
    ],
  },
  {
    id: "al-6061-shapes",
    category: "Aluminum",
    type: "6061 Extruded Shapes",
    grades: ["6061-T6"],
    sizes: "Angles: 1\"×1\"×1/8\" – 4\"×4\"×3/8\". American Std Channels: 3\"–12\". AA Channels: 2\"–12\"",
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
    sizes: "1/2\" IPS Sch. 40 through 6\" IPS Sch. 40 (confirm with branch for exact availability)",
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
    grades: ["6061","7075","2024","Tool & Jig"],
    sizes: "1/2\" through 12\" thick",
    finishes: ["Saw cut"],
    notes: "Precision plate sawing and circle cutting available.",
    uses: [
      { label: "Machined parts, fixtures, structural", grades: [
        { grade: "6061", why: "Most common plate grade — machines well, welds, good corrosion resistance, economical for general machined plate" },
      ]},
      { label: "High-strength aerospace / defense", grades: [
        { grade: "7075", why: "Zinc alloy — highest strength aluminum available, 73 ksi yield in T6, used where 6061 isn't strong enough" },
        { grade: "2024", why: "Copper alloy aluminum — very high strength with excellent fatigue resistance, standard aerospace structural grade" },
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
    notes: "High toughness, impact resistant.",
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
        { grade: "O2", why: "Similar performance to O1, sometimes preferred for specific heat treat characteristics" },
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
  {
    id: "specialty",
    category: "Specialty Products",
    type: "Specialty & Non-Ferrous",
    grades: ["Expanded Metal","Bar Grating","Grip Strut","Perforated Metal","Wire Cloth","Fiberglass Grating","Brass","Copper"],
    sizes: "Various — contact branch for availability",
    finishes: ["Standard"],
    notes: "",
    uses: [
      { label: "Walkways, platforms, safety flooring", grades: [
        { grade: "Bar Grating", why: "Open design drains liquids and debris, strong load capacity, standard for industrial mezzanines and platforms" },
        { grade: "Grip Strut", why: "Serrated plank with openings — aggressive anti-slip surface for ramps and walkways in wet or oily conditions" },
        { grade: "Expanded Metal", why: "Single piece construction, no welds — lighter than grating, good for guards, screens, and light-duty flooring" },
        { grade: "Fiberglass Grating", why: "Non-conductive, non-corrosive, lightweight — ideal for chemical plants, water treatment, and electrical environments where steel would rust or conduct" },
      ]},
      { label: "Filtration, screening, venting", grades: [
        { grade: "Wire Cloth", why: "Woven wire mesh — used for filtration, screening, and ventilation where precise opening size matters" },
        { grade: "Perforated Metal", why: "Sheet with punched holes in a uniform pattern — used for guards, filters, screens, and decorative panels" },
      ]},
      { label: "Electrical, plumbing, machined fittings", grades: [
        { grade: "Brass", why: "Excellent machinability, corrosion resistant, non-sparking — standard for valves, fittings, and electrical components" },
        { grade: "Copper", why: "Best electrical conductivity of common metals, excellent corrosion resistance — required for electrical and plumbing applications" },
      ]},
    ],
  },
  {
    id: "copper-brass-sheet",
    category: "Specialty Products",
    type: "Copper & Brass Sheet / Plate",
    grades: ["Brass","Copper"],
    sizes: "Standard sheet and plate sizes — contact branch for availability",
    finishes: ["Mill"],
    notes: "Available in sheet and plate form. Contact your branch to confirm current stock and sizes.",
    uses: [
      { label: "Electrical applications", grades: [
        { grade: "Copper", why: "Highest electrical conductivity of any common metal — standard for bus bars, electrical sheet, and conductive components" },
      ]},
      { label: "Decorative, architectural, machined parts", grades: [
        { grade: "Brass", why: "Attractive gold appearance, excellent machinability, good corrosion resistance — used for decorative panels, nameplates, and machined parts" },
      ]},
    ],
  },
];

const PSC_SERVICES = [
  {
    id: "bar-sawing",
    type: "Bar Sawing",
    description: "Precision CNC cold saw cutting — economical and accurate.",
    details: "Provides machine shop quality surfaces with extremely close tolerances on high production cutting jobs. Standard saw cutting available on all products in all quantities. Band sawing also available for larger sections and general cutting.",
    capacity: "Single piece or precision production cutting. All bar, tube, and structural products.",
    bestFor: ["Screw machine shops", "High production runs", "Close tolerance cut lengths", "All bar and tube products"],
    notes: "Band sawing available for larger sections. Cold sawing produces the cleanest, squarest cut.",
  },
  {
    id: "alum-plate-sawing",
    type: "Aluminum Plate Sawing",
    description: "Saw cutting through 12\" thick aluminum plate — close tolerance precision cutting available.",
    details: "Handles the full range of aluminum plate stock up to 12\" thick. Close tolerance precision saw cutting available on all quantities. Circle sawing also available for round blanks, discs, and flanges.",
    capacity: "Aluminum plate up to 12\" thick. All grades: 6061, 7075, Tool & Jig.",
    bestFor: ["Aluminum plate blanks", "Precision plate components", "Circle / disc cutting", "Thick plate applications"],
    notes: "Circle sawing available. Precision tolerance cutting available on request.",
  },
  {
    id: "plate-burning",
    type: "Plate Burning",
    description: "CNC plasma and oxy fuel cutting — custom parts up to 8\" thick, tight dimensional tolerances.",
    details: "Flame cutting using both oxy-acetylene and plasma processes. Produces custom shapes and parts from plate with tight dimensional tolerances. CNC controlled for repeatable accuracy.",
    capacity: "Carbon steel plate up to 8\" thick. Plasma for stainless and aluminum. Oxy fuel for heavy carbon steel.",
    bestFor: ["Custom shapes from plate", "Carbon steel plate parts", "Structural components", "Heavy plate up to 8\" thick"],
    notes: "Oxy fuel best for thick carbon steel. Plasma for faster cutting, cleaner edge, works on stainless and aluminum.",
  },
  {
    id: "shearing",
    type: "Shearing",
    description: "Clean straight cuts in sheet metal — up to 3/8\" stainless, 1/2\" carbon and aluminum.",
    details: "Produces clean, straight cuts on sheet material. Fast and economical for straight-line blanking. Best suited for sheet and thin plate applications where a flat, straight cut is required.",
    capacity: "3/8\" max for stainless. 1/2\" max for carbon steel and aluminum.",
    bestFor: ["Carbon steel sheet", "Aluminum sheet", "Stainless sheet", "Flat blanks and strip"],
    notes: "For thicker material or custom shapes, use plate burning. Shearing is fastest and most economical for sheet.",
  },
  {
    id: "custom-extrusions",
    type: "Custom Extrusions",
    description: "Aluminum extruded to customer specs — saves machining costs and reduces scrap.",
    details: "Aluminum can be extruded in an infinite number of custom designed cross-sections. Designed to exact customer specifications. Eliminates the need to machine a complex profile from solid bar — you get exactly the shape you need, ready to cut to length.",
    capacity: "Aluminum alloys. Custom profiles to customer drawings. Volume applications.",
    bestFor: ["Custom aluminum profiles", "High volume repeat parts", "Complex cross-sections", "Cost reduction vs. machining from solid"],
    notes: "Requires tooling setup. Best suited for volume applications where tooling cost is justified by piece count.",
  },
  {
    id: "stocking-programs",
    type: "Stocking Programs",
    description: "Dedicated inventory programs for high volume or non-standard items.",
    details: "PSC will maintain dedicated inventory for customers with consistent or high-volume demand. Includes non-standard items, custom sizes, and JIT (Just-In-Time) delivery programs. Locks in availability and price for the customer, secures committed volume for PSC.",
    capacity: "Any product line. Custom sizes and non-standard items. Blanket orders and JIT programs.",
    bestFor: ["High volume buyers", "Non-standard sizes", "JIT delivery requirements", "Customers with predictable demand"],
    notes: "Contact your branch to discuss a stocking program. Works best with 3–6 month volume commitments.",
  },
  {
    id: "delivery",
    type: "Delivery",
    description: "Regional delivery available across our service area. Next day standard in most areas. Same day pickup available.",
    details: "PSC offers regional delivery to customers across our service area. Next day delivery is standard in most areas. Same day pickup is available at all branch locations. Contact your branch for delivery schedules and availability in your area.",
    capacity: "All 11 locations. Regional delivery area from each branch. Same day pickup at all locations.",
    bestFor: ["All customers in service area", "Time-sensitive orders", "JIT programs", "Large or heavy material"],
    notes: "Contact your branch for delivery schedules and availability in your area.",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(PSC_DATA.map(d => d.category)))];

const GLOSSARY = [
  { term: "TGP", category: "Abbreviations", definition: "Turned, Ground & Polished. The bar is rough turned on a lathe, then centerless ground to tight diameter tolerance, then polished. Gives the best surface finish and tightest tolerance of any cold finished product. What a customer means when they say they need 'clean, tight bar.'" },
  { term: "T&P", category: "Abbreviations", definition: "Turned & Polished. Turned on a lathe and polished but not ground — looser tolerance than TGP. Step below TGP in finish quality and cost." },
  { term: "C/F", category: "Abbreviations", definition: "Cold Finished. Steel that has been processed at room temperature (cold drawn, turned, ground) to tighten dimensions and improve surface finish vs hot rolled. Better tolerance, better surface, higher strength than HR." },
  { term: "H/R", category: "Abbreviations", definition: "Hot Rolled. Steel rolled at high temperature — less precise dimensions, mill scale surface, more economical than cold finished. Good for structural and fabrication work where tight tolerance isn't needed." },
  { term: "P&O", category: "Abbreviations", definition: "Pickled & Oiled. Hot rolled steel that has been acid-cleaned to remove mill scale, then oiled to prevent rust. Better surface than standard HR, easier to paint or form. Common for sheet and plate." },
  { term: "DOM", category: "Abbreviations", definition: "Drawn Over Mandrel. Tube that starts as ERW (welded) then is cold drawn over a mandrel — this irons out the weld seam and produces extremely tight ID and OD tolerances with a smooth bore. The standard for hydraulic cylinder applications." },
  { term: "ERW", category: "Abbreviations", definition: "Electric Resistance Welded. Tube formed from flat strip, rolled into shape, and welded along the seam using electric current. Economical, good dimensional consistency. Fine for structural use but weld seam makes it unsuitable for high-pressure applications." },
  { term: "HF Seamless", category: "Abbreviations", definition: "Hot Finished Seamless. Tube produced without a weld seam by piercing a solid billet — finished at elevated temperature. No seam means uniform strength in all directions. Used for pressure applications and large diameter tubing." },
  { term: "DCF", category: "Abbreviations", definition: "Drawn, Case Free (or DeCarb Free). A cold finished product that has been processed to eliminate the decarburized layer on the surface. Critical for tool steel and alloy applications where surface carbon content affects heat treat results." },
  { term: "IPS", category: "Abbreviations", definition: "Iron Pipe Size. The nominal sizing system for pipe — a 2\" IPS pipe doesn't actually measure 2\" OD. It's a legacy system where the number refers to the approximate inside diameter of older pipes. Always clarify OD and wall when ordering pipe." },
  { term: "OD", category: "Abbreviations", definition: "Outside Diameter. The measurement across the outside of a round or tube. For tubing and pipe, always get both OD and wall thickness — or OD and ID — to define the part completely." },
  { term: "ID", category: "Abbreviations", definition: "Inside Diameter. The measurement of the bore/hole of a tube or pipe. ID = OD minus (2 × wall thickness). Critical for fluid flow and mechanical fit applications." },
  { term: "OAL", category: "Abbreviations", definition: "Overall Length. The total cut length of a piece. When a customer gives you OAL they want material cut to that exact finished length." },
  { term: "HSLA", category: "Abbreviations", definition: "High Strength Low Alloy. Steel with small amounts of alloying elements (niobium, vanadium, titanium) that boost strength without requiring heat treatment. Higher yield than standard carbon steel, better weldability than heat treated alloy steel." },
  { term: "ASTM", category: "Abbreviations", definition: "American Society for Testing and Materials. The organization that writes the material specifications (A36, A500, A513, etc.) that define minimum mechanical properties, chemistry, and testing requirements. When a customer asks for 'ASTM certified' they want material tested to that spec." },
  { term: "AMS", category: "Abbreviations", definition: "Aerospace Material Specification. Higher-tier spec than ASTM — tighter chemistry, tighter testing, full traceability required. When you see AMS on an order (like 4340 AMS6415) it's aerospace or defense and paperwork is critical." },
  { term: "DFARS", category: "Abbreviations", definition: "Defense Federal Acquisition Regulation Supplement. Requires that steel used in US defense contracts be melted and manufactured in the US or certain allied countries. When a customer asks if material is 'DFARS compliant' they're on a government/defense job." },
  { term: "Sch. 40", category: "Abbreviations", definition: "Schedule 40. A pipe wall thickness designation. Sch. 40 is the most common standard wall. Higher schedule = thicker wall = more pressure capacity." },
  { term: "Mill Cert / MTR", category: "Documents & Orders", definition: "Mill Certification / Material Test Report. The document from the steel mill that certifies the chemistry and mechanical properties of a specific heat of material. Customers on aerospace, defense, pressure vessel, or food/pharma jobs will always ask for certs." },
  { term: "Heat Number", category: "Documents & Orders", definition: "The unique identification number assigned to a specific melt of steel at the mill. The heat number ties the material to the mill cert. When a customer asks to 'keep the heat numbers' they want the cert documentation matched to the specific bars they received." },
  { term: "RFQ", category: "Documents & Orders", definition: "Request for Quote. When a customer sends an RFQ they want pricing — not an order, just a price. Respond fast. Speed on an RFQ is one of the biggest competitive advantages in this business." },
  { term: "PO", category: "Documents & Orders", definition: "Purchase Order. The formal document a customer issues when they're actually buying. Don't ship without a PO number. The PO is the contract." },
  { term: "Blanket Order", category: "Documents & Orders", definition: "A standing order for a set quantity over a period of time, released in smaller shipments. Customer commits to buying X tons over 6 months, you commit to holding the inventory. Good for locking in price and securing volume." },
  { term: "Saw Cutting", category: "Processing", definition: "Cutting bar, tube, or plate to a specific length using a band saw or cold saw. PSC offers both single-piece cutting and precision production cutting (high volume, tight length tolerance). A major value-add over buying from a mill." },
  { term: "Band Saw", category: "Processing", definition: "Uses a continuous toothed blade — good for general cutting across most materials. Slightly rougher cut than cold saw but handles a wider range of sizes and materials." },
  { term: "Cold Saw", category: "Processing", definition: "Uses a circular blade at slow speed — produces a very clean, burr-free, square cut with tight length tolerance. Preferred for precision production cutting where finish and squareness matter." },
  { term: "Flame Cutting", category: "Processing", definition: "Cutting plate or structural using an oxy-acetylene or plasma torch. Oxy (flame) cutting is good for thick carbon steel plate. Plasma cutting is faster, cleaner edge, works on stainless and aluminum too. PSC offers both." },
  { term: "Plasma Cutting", category: "Processing", definition: "Uses a high-velocity jet of ionized gas to cut metal. Faster than oxy-flame, better edge quality, works on stainless and aluminum where oxy won't. Standard for precision plate cutting." },
  { term: "Shearing", category: "Processing", definition: "Cutting sheet or thin plate using a shear blade — like giant scissors. Fast and economical for straight cuts on sheet. Can't cut thick plate or profiles." },
  { term: "Circle Cutting", category: "Processing", definition: "Cutting round blanks (discs) from plate using a plasma or flame cutter on a rotary arm. PSC offers aluminum plate circle cutting — common for flanges, discs, and round blanks." },
  { term: "Deburring", category: "Processing", definition: "Removing the sharp edge or burr left after cutting. A customer who asks for 'deburred' parts wants the sharp edges knocked off so they're safe to handle and won't cause interference on assembly." },
  { term: "Galvanized", category: "Metallurgy", definition: "Steel coated with zinc for corrosion protection. The zinc acts as a sacrificial coating — it corrodes before the steel does. Applied by hot-dip galvanizing (HDG) for structural material or continuous galvanizing lines for sheet. Standard for outdoor structural applications and sheet metal exposed to weather." },
  { term: "Galvanneal", category: "Metallurgy", definition: "A step beyond galvanized — after the hot-dip zinc coating is applied, the material is immediately annealed in a furnace. This diffuses the zinc into the steel surface, creating a zinc-iron alloy coating. Galvanneal has a matte grey appearance vs. the spangled shine of standard galvanized. It paints better, welds better, and is the standard for automotive and appliance applications where a painted finish is required." },
  { term: "Annealed", category: "Metallurgy", definition: "Heat treated to soften the material — makes it easier to machine, form, or cold work. When you see '4140 Annealed' it means it hasn't been hardened yet. Customer will machine it in this soft state, then heat treat to final hardness." },
  { term: "Heat Treated / HT", category: "Metallurgy", definition: "The material has been hardened and tempered to a specified hardness range. '4140 HT' means it's already at its final hardness — ready to use without further heat treat." },
  { term: "Pre-Hardened", category: "Metallurgy", definition: "Same as heat treated — the mill or service center has already done the heat treatment. Customer gets it ready to machine to final dimensions. Saves them the cost and lead time of sending out for heat treat." },
  { term: "Carburizing / Case Hardening", category: "Metallurgy", definition: "A heat treatment process where carbon is diffused into the surface of low-carbon steel, creating a hard outer case with a tough ductile core. Common for gears, pins, cams. Why grades like 8620 and 1018 are used — they case harden well." },
  { term: "Quench & Temper", category: "Metallurgy", definition: "The standard heat treatment sequence for alloy steel — heat to austenitizing temperature, quench (rapid cool in oil or water) to harden, then temper (reheat to lower temperature) to reduce brittleness. What '4140 HT' has been through." },
  { term: "Machinability", category: "Metallurgy", definition: "How easily a material can be cut, drilled, and machined. Rated as a percentage vs 1212 free machining steel (100%). 12L14 rates around 170% — cuts faster and cleaner than the baseline. 4140 HT rates around 55% — much harder to machine." },
  { term: "Tensile Strength", category: "Metallurgy", definition: "The maximum stress a material can withstand before breaking — measured in PSI or KSI. 1018 cold drawn: ~70 KSI. 4140 HT: ~150 KSI. 4340 HT: ~180+ KSI. Higher tensile = stronger but usually harder to machine." },
  { term: "Yield Strength", category: "Metallurgy", definition: "The stress at which a material starts to permanently deform. A36 structural: 36 KSI yield. 4140 HT: ~130 KSI yield. Important number when a customer asks about load capacity." },
  { term: "Elongation", category: "Metallurgy", definition: "How much a material can stretch before breaking — expressed as a percentage. High elongation means ductile, the material can bend and form without cracking. Low elongation means brittle. A material with 2% elongation will crack where one with 20% elongation won't. Important when a customer is forming, bending, or drawing the material." },
  { term: "Decarburization / DeCarb", category: "Metallurgy", definition: "The loss of carbon from the surface of steel during hot rolling or heat treatment — creates a soft skin on an otherwise hard material. DeCarb-free stock has had this layer removed. Critical for tool steel where surface hardness is required right to the OD." },
  { term: "Mill Scale", category: "Metallurgy", definition: "The blue-black oxide layer that forms on steel during hot rolling. Rough, hard, not weldable until removed. Hot rolled material has it. P&O, cold finished, and machined material has it removed." },
  { term: "Tolerance", category: "Dimensions & Tolerances", definition: "The allowable variation from a specified dimension. Cold finished stock holds tighter tolerances than hot rolled. TGP holds tighter than cold drawn." },
  { term: "Wall Thickness", category: "Dimensions & Tolerances", definition: "For tube and pipe — the thickness of the tube wall. Wall = (OD - ID) / 2. Heavier wall = more pressure capacity and more material to machine on ID." },
  { term: "Gauge", category: "Dimensions & Tolerances", definition: "The thickness measurement for carbon steel sheet and tube wall. Gauge numbers run in reverse — higher gauge = thinner material. 10 GA = .135\", 11 GA = .120\", 16 GA = .060\". Aluminum and stainless use different gauge scales — always confirm in decimals on non-carbon material." },

];

const GLOSSARY_CATEGORIES = ["All", ...Array.from(new Set(GLOSSARY.map(g => g.category)))];

const GAUGE_DATA = [
  { fraction: "1/2\"",    gauge: "—",   decimal: ".500" },
  { fraction: "7/16\"",   gauge: "—",   decimal: ".4375" },
  { fraction: "3/8\"",    gauge: "—",   decimal: ".375" },
  { fraction: "5/16\"",   gauge: "—",   decimal: ".3125" },
  { fraction: "1/4\"",    gauge: "—",   decimal: ".250" },
  { fraction: "3/16\"",   gauge: "—",   decimal: ".1875" },
  { fraction: "—",        gauge: "7",   decimal: ".179" },
  { fraction: "—",        gauge: "8",   decimal: ".164" },
  { fraction: "—",        gauge: "9",   decimal: ".150" },
  { fraction: "1/8\"",    gauge: "10",  decimal: ".135" },
  { fraction: "—",        gauge: "11",  decimal: ".120" },
  { fraction: "—",        gauge: "12",  decimal: ".105" },
  { fraction: "—",        gauge: "13",  decimal: ".090" },
  { fraction: "—",        gauge: "14",  decimal: ".083" },
  { fraction: "—",        gauge: "15",  decimal: ".072" },
  { fraction: "1/16\"",   gauge: "16",  decimal: ".065" },
  { fraction: "—",        gauge: "17",  decimal: ".058" },
  { fraction: "—",        gauge: "18",  decimal: ".049" },
  { fraction: "—",        gauge: "19",  decimal: ".042" },
  { fraction: "—",        gauge: "20",  decimal: ".035" },
  { fraction: "—",        gauge: "21",  decimal: ".032" },
  { fraction: "—",        gauge: "22",  decimal: ".028" },
  { fraction: "—",        gauge: "24",  decimal: ".024" },
  { fraction: "—",        gauge: "26",  decimal: ".018" },
  { fraction: "—",        gauge: "28",  decimal: ".015" },
];

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
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: "600", color: "#7eb8f7", marginBottom: "3px" }}>{g.grade}</div>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "11px", color: "#8a9ab8", lineHeight: "1.5" }}>{g.why}</div>
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
      borderRadius: "8px", marginBottom: "10px", overflow: "hidden", transition: "border-color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(74,144,217,0.5)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
    >
      <button onClick={() => setExpanded(o => !o)} style={{
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#4a90d9", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "3px" }}>
            {item.category}
          </div>
          <div style={{ fontSize: "17px", fontWeight: "600", color: "#ffffff", fontFamily: "'IBM Plex Sans', sans-serif" }}>
            {item.type}
          </div>
        </div>
        <span style={{ color: "#4a90d9", fontSize: "20px", lineHeight: 1, fontWeight: "300" }}>{expanded ? "−" : "+"}</span>
      </button>
      <div style={{ padding: "0 16px 12px" }}>
        {item.grades.slice(0, 6).map(g => <GradeTag key={g} grade={g} />)}
        {item.grades.length > 6 && <span style={{ fontSize: "11px", color: "#5a6e90", fontFamily: "'IBM Plex Mono', monospace" }}>+{item.grades.length - 6} more</span>}
      </div>
      {expanded && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "16px" }}>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", color: "#5a6e90", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'IBM Plex Mono', monospace" }}>GRADES STOCKED</div>
            {item.grades.map(g => <GradeTag key={g} grade={g} />)}
          </div>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", color: "#5a6e90", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'IBM Plex Mono', monospace" }}>SIZE RANGE</div>
            <div style={{ fontSize: "13px", color: "#cdd8f0", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.6" }}>{item.sizes}</div>
          </div>
          {item.finishes.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", color: "#5a6e90", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'IBM Plex Mono', monospace" }}>FINISHES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {item.finishes.map(f => (
                  <span key={f} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "3px", padding: "2px 8px", fontSize: "11px", color: "#8a9ab8", fontFamily: "'IBM Plex Sans', sans-serif" }}>{f}</span>
                ))}
              </div>
            </div>
          )}
          {item.notes && (
            <div style={{ marginBottom: "14px", padding: "10px 12px", background: "rgba(74,144,217,0.08)", borderLeft: "3px solid #4a90d9", borderRadius: "0 4px 4px 0" }}>
              <div style={{ fontSize: "12px", color: "#cdd8f0", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.5" }}>{item.notes}</div>
            </div>
          )}
          {item.uses.length > 0 && (
            <div>
              <div style={{ fontSize: "10px", color: "#5a6e90", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'IBM Plex Mono', monospace" }}>APPLICATIONS — TAP TO SEE GRADES</div>
              {item.uses.map((u, i) => <UseRow key={i} use={u} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ServiceCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "8px", marginBottom: "10px", overflow: "hidden", transition: "border-color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(74,144,217,0.5)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
    >
      <button onClick={() => setExpanded(o => !o)} style={{
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#4a90d9", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "3px" }}>
            SERVICE
          </div>
          <div style={{ fontSize: "17px", fontWeight: "600", color: "#ffffff", fontFamily: "'IBM Plex Sans', sans-serif" }}>
            {item.type}
          </div>
          <div style={{ fontSize: "12px", color: "#8a9ab8", fontFamily: "'IBM Plex Sans', sans-serif", marginTop: "3px" }}>
            {item.description}
          </div>
        </div>
        <span style={{ color: "#4a90d9", fontSize: "20px", lineHeight: 1, fontWeight: "300", flexShrink: 0, marginLeft: "12px" }}>{expanded ? "−" : "+"}</span>
      </button>
      {expanded && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "16px" }}>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "13px", color: "#cdd8f0", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.6" }}>{item.details}</div>
          </div>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", color: "#5a6e90", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'IBM Plex Mono', monospace" }}>CAPACITY</div>
            <div style={{ fontSize: "12px", color: "#8a9ab8", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.5" }}>{item.capacity}</div>
          </div>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", color: "#5a6e90", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'IBM Plex Mono', monospace" }}>BEST FOR</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {item.bestFor.map(b => (
                <span key={b} style={{ background: "rgba(74,144,217,0.12)", border: "1px solid rgba(74,144,217,0.25)", borderRadius: "3px", padding: "2px 8px", fontSize: "11px", color: "#7eb8f7", fontFamily: "'IBM Plex Sans', sans-serif" }}>{b}</span>
              ))}
            </div>
          </div>
          {item.notes && (
            <div style={{ padding: "10px 12px", background: "rgba(74,144,217,0.08)", borderLeft: "3px solid #4a90d9", borderRadius: "0 4px 4px 0" }}>
              <div style={{ fontSize: "12px", color: "#cdd8f0", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.5" }}>{item.notes}</div>
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
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "8px", marginBottom: "6px", overflow: "hidden", transition: "border-color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(74,144,217,0.4)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = open ? "rgba(74,144,217,0.3)" : "rgba(255,255,255,0.08)"}
    >
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", fontWeight: "700", color: "#7eb8f7" }}>{item.term}</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "#3a4a6a", letterSpacing: "1px", textTransform: "uppercase" }}>{item.category}</span>
        </div>
        <span style={{ color: "#4a90d9", fontSize: "18px", lineHeight: 1, fontWeight: "300", flexShrink: 0 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 16px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
          <div style={{ fontSize: "13px", color: "#8a9ab8", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.7" }}>{item.definition}</div>
        </div>
      )}
    </div>
  );
};

const DENSITIES = {
  carbon:    0.2836,
  aluminum:  0.0975,
  stainless: 0.2890,
};

const SHAPES = [
  { key: "round",    label: "Round Bar",        fields: ["diameter", "length"] },
  { key: "square",   label: "Square Bar",        fields: ["width", "length"] },
  { key: "flat",     label: "Flat Bar",          fields: ["width", "thickness", "length"] },
  { key: "hex",      label: "Hex Bar",           fields: ["across_flats", "length"] },
  { key: "tube",     label: "Round Tube / Pipe", fields: ["od", "wall", "length"] },
  { key: "rect",     label: "Rect / Sq Tube",    fields: ["od_width", "od_height", "wall", "length"] },
  { key: "plate",    label: "Sheet / Plate",     fields: ["width", "thickness", "length"] },
];

const FIELD_LABELS = {
  diameter:    { label: "Diameter", unit: "in" },
  length:      { label: "Length",   unit: "in" },
  width:       { label: "Width",    unit: "in" },
  thickness:   { label: "Thickness",unit: "in" },
  across_flats:{ label: "Across Flats", unit: "in" },
  od:          { label: "OD",       unit: "in" },
  wall:        { label: "Wall",     unit: "in" },
  od_width:    { label: "OD Width", unit: "in" },
  od_height:   { label: "OD Height",unit: "in" },
};

function calcWeight(shape, material, vals) {
  const d = DENSITIES[material];
  const v = (k) => parseFloat(vals[k]) || 0;
  let volume = 0;

  if (shape === "round") {
    const r = v("diameter") / 2;
    volume = Math.PI * r * r * v("length");
  } else if (shape === "square") {
    volume = v("width") * v("width") * v("length");
  } else if (shape === "flat" || shape === "plate") {
    volume = v("width") * v("thickness") * v("length");
  } else if (shape === "hex") {
    // area of regular hexagon from across-flats = (3√3/2) * (af/2)^2 * (2/√3)^2 simplified:
    // area = (√3/2) * af^2 / (√3) * (√3) => standard: area = (3√3/2) * s^2 where s = af/√3
    const af = v("across_flats");
    const area = (Math.sqrt(3) / 2) * af * af;
    volume = area * v("length");
  } else if (shape === "tube") {
    const ro = v("od") / 2;
    const ri = ro - v("wall");
    volume = Math.PI * (ro * ro - ri * ri) * v("length");
  } else if (shape === "rect") {
    const ow = v("od_width");
    const oh = v("od_height");
    const w = v("wall");
    const iw = ow - 2 * w;
    const ih = oh - 2 * w;
    volume = (ow * oh - iw * ih) * v("length");
  }

  return volume * d;
}

function WeightCalculator() {
  const [material, setMaterial] = useState("carbon");
  const [shape, setShape] = useState("round");
  const [vals, setVals] = useState({});
  const [qty, setQty] = useState("1");

  const currentShape = SHAPES.find(s => s.key === shape);
  const weightEa = calcWeight(shape, material, vals);
  const totalWeight = weightEa * (parseFloat(qty) || 1);
  const hasResult = weightEa > 0;

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(74,144,217,0.2)", borderRadius: "6px",
    padding: "10px 12px", color: "#e8edf5",
    fontSize: "15px", fontFamily: "'IBM Plex Mono', monospace",
    outline: "none", boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: "10px", color: "#5a6e90", letterSpacing: "1.5px",
    textTransform: "uppercase", marginBottom: "6px",
    fontFamily: "'IBM Plex Mono', monospace", display: "block",
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "16px" }}>
      <div style={{ fontSize: "11px", color: "#3a4a6a", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "16px", letterSpacing: "1px" }}>
        WEIGHT CALCULATOR — LBS PER PIECE
      </div>

      {/* Material selector */}
      <div style={{ marginBottom: "16px" }}>
        <span style={labelStyle}>Material</span>
        <div style={{ display: "flex", gap: "6px" }}>
          {[["carbon","Carbon Steel"],["aluminum","Aluminum"],["stainless","Stainless"]].map(([key, label]) => (
            <button key={key} onClick={() => setMaterial(key)} style={{
              flex: 1, padding: "9px 4px", borderRadius: "6px", cursor: "pointer",
              border: "1px solid", fontSize: "12px", fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: "600", transition: "all 0.15s",
              background: material === key ? "#4a90d9" : "transparent",
              borderColor: material === key ? "#4a90d9" : "rgba(255,255,255,0.12)",
              color: material === key ? "#ffffff" : "#5a6e90",
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Shape selector */}
      <div style={{ marginBottom: "16px" }}>
        <span style={labelStyle}>Shape</span>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {SHAPES.map(s => (
            <button key={s.key} onClick={() => { setShape(s.key); setVals({}); }} style={{
              padding: "7px 12px", borderRadius: "6px", cursor: "pointer",
              border: "1px solid", fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: "600", transition: "all 0.15s", marginBottom: "4px",
              background: shape === s.key ? "#4a90d9" : "transparent",
              borderColor: shape === s.key ? "#4a90d9" : "rgba(255,255,255,0.12)",
              color: shape === s.key ? "#ffffff" : "#5a6e90",
            }}>{s.label}</button>
          ))}
        </div>
      </div>

      {/* Dimension inputs */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: currentShape.fields.length >= 3 ? "1fr 1fr" : "1fr 1fr", gap: "12px" }}>
          {currentShape.fields.map(field => (
            <div key={field}>
              <span style={labelStyle}>{FIELD_LABELS[field].label} ({FIELD_LABELS[field].unit})</span>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="0.000"
                value={vals[field] || ""}
                onChange={e => setVals(v => ({ ...v, [field]: e.target.value }))}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#4a90d9"}
                onBlur={e => e.target.style.borderColor = "rgba(74,144,217,0.2)"}
              />
            </div>
          ))}
          <div>
            <span style={labelStyle}>Quantity (pcs)</span>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="1"
              value={qty}
              onChange={e => setQty(e.target.value)}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#4a90d9"}
              onBlur={e => e.target.style.borderColor = "rgba(74,144,217,0.2)"}
            />
          </div>
        </div>
      </div>

      {/* Result */}
      <div style={{
        background: hasResult ? "rgba(74,144,217,0.12)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hasResult ? "rgba(74,144,217,0.4)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "8px", padding: "20px 16px", textAlign: "center", transition: "all 0.2s",
      }}>
        {hasResult ? (
          <>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#4a90d9", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Result</div>
            <div style={{ display: "flex", justifyContent: "space-around", gap: "16px" }}>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "28px", fontWeight: "700", color: "#ffffff" }}>{weightEa.toFixed(2)}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#5a6e90", letterSpacing: "1px", marginTop: "4px" }}>LBS / PIECE</div>
              </div>
              {(parseFloat(qty) || 1) > 1 && (
                <div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "28px", fontWeight: "700", color: "#7eb8f7" }}>{totalWeight.toFixed(2)}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#5a6e90", letterSpacing: "1px", marginTop: "4px" }}>LBS TOTAL</div>
                </div>
              )}
            </div>
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "11px", color: "#5a6e90", marginTop: "12px" }}>
              {(totalWeight / 2000).toFixed(3)} tons
            </div>
          </>
        ) : (
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "#3a4a6a", letterSpacing: "1px" }}>
            ENTER DIMENSIONS TO CALCULATE
          </div>
        )}
      </div>

      <div style={{ marginTop: "12px", padding: "10px 12px", background: "rgba(74,144,217,0.08)", borderLeft: "3px solid #4a90d9", borderRadius: "0 4px 4px 0" }}>
        <div style={{ fontSize: "12px", color: "#cdd8f0", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.6" }}>
          All dimensions in inches. Carbon steel: 0.2836 lb/in³ · Aluminum: 0.0975 lb/in³ · Stainless: 0.2890 lb/in³
        </div>
      </div>
    </div>
  );
}

export default function PSCFieldApp() {
  const [tab, setTab] = useState("products");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [glossarySearch, setGlossarySearch] = useState("");
  const [glossaryCategory, setGlossaryCategory] = useState("All");
  const [serviceSearch, setServiceSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return PSC_DATA.filter(item => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      if (!q) return matchCat;
      const haystack = [item.category, item.type, ...item.grades, item.sizes, item.notes, ...item.uses.map(u => u.label), ...item.uses.flatMap(u => u.grades.map(g => g.grade + " " + g.why)), ...item.finishes].join(" ").toLowerCase();
      return matchCat && haystack.includes(q);
    });
  }, [search, activeCategory]);

  const filteredServices = useMemo(() => {
    const q = serviceSearch.toLowerCase().trim();
    if (!q) return PSC_SERVICES;
    return PSC_SERVICES.filter(s => [s.type, s.description, s.details, s.capacity, ...s.bestFor, s.notes].join(" ").toLowerCase().includes(q));
  }, [serviceSearch]);

  const filteredGlossary = useMemo(() => {
    const q = glossarySearch.toLowerCase().trim();
    return GLOSSARY
      .filter(item => {
        const matchCat = glossaryCategory === "All" || item.category === glossaryCategory;
        if (!q) return matchCat;
        return matchCat && (item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q));
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [glossarySearch, glossaryCategory]);

  const TABS = [
    { key: "products", label: "Products" },
    { key: "services", label: "Services" },
    { key: "glossary", label: "Glossary" },
    { key: "gauge", label: "Gauge" },
    { key: "weight", label: "Weight" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", color: "#e8edf5", fontFamily: "'IBM Plex Sans', sans-serif" }}>
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: "900", color: "#ffffff", letterSpacing: "1px", lineHeight: 1 }}>Pennsylvania Steel Company</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", fontWeight: "600", color: "#4a90d9", letterSpacing: "3px", textTransform: "uppercase", marginTop: "3px" }}>Field Reference</div>
            </div>
            <a href="https://www.pasteel.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "rgba(74,144,217,0.12)", border: "1px solid rgba(74,144,217,0.25)", borderRadius: "6px", padding: "4px 10px", fontSize: "10px", color: "#4a90d9", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "1px" }}>PASTEEL.COM</div>
            </a>
          </div>
          <div style={{ display: "flex", gap: "0px" }}>
            {TABS.map(t => (
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
          <div style={{ background: "#091428", borderBottom: "1px solid rgba(74,144,217,0.1)", padding: "12px 16px", position: "sticky", top: "89px", zIndex: 99 }}>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ position: "relative", marginBottom: "10px" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#4a90d9", fontSize: "16px" }}>⌕</span>
                <input type="text" placeholder="Search grade, type, or application... e.g. 4140, DOM, mold, screw machine" value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,144,217,0.2)", borderRadius: "6px", padding: "10px 36px 10px 36px", color: "#e8edf5", fontSize: "13px", fontFamily: "'IBM Plex Sans', sans-serif", outline: "none" }}
                  onFocus={e => e.target.style.borderColor = "#4a90d9"}
                  onBlur={e => e.target.style.borderColor = "rgba(74,144,217,0.2)"}
                />
                {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#5a6e90", cursor: "pointer", fontSize: "18px" }}>×</button>}
              </div>
              <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                    whiteSpace: "nowrap", padding: "5px 12px", borderRadius: "20px",
                    fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace", fontWeight: "600",
                    letterSpacing: "0.5px", cursor: "pointer", border: "1px solid",
                    background: activeCategory === cat ? "#4a90d9" : "transparent",
                    borderColor: activeCategory === cat ? "#4a90d9" : "rgba(255,255,255,0.12)",
                    color: activeCategory === cat ? "#ffffff" : "#5a6e90", transition: "all 0.15s",
                  }}>
                    {cat === "Cold Finished Steel" ? "C/F Steel" : cat === "Hot Rolled Carbon / Alloy Steel" ? "HR Steel" : cat === "Carbon Steel Tube" ? "Tube/Pipe" : cat}
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
                NO RESULTS FOUND<br /><span style={{ fontSize: "11px", color: "#2a3a5a", marginTop: "8px", display: "block" }}>Try a grade number, material type, or application</span>
              </div>
            ) : filtered.map(item => <ProductCard key={item.id} item={item} />)}
          </div>
        </>
      )}

      {/* SERVICES TAB */}
      {tab === "services" && (
        <>
          <div style={{ background: "#091428", borderBottom: "1px solid rgba(74,144,217,0.1)", padding: "12px 16px", position: "sticky", top: "89px", zIndex: 99 }}>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#4a90d9", fontSize: "16px" }}>⌕</span>
                <input type="text" placeholder="Search services... e.g. plasma, sawing, delivery, stocking" value={serviceSearch} onChange={e => setServiceSearch(e.target.value)}
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,144,217,0.2)", borderRadius: "6px", padding: "10px 36px 10px 36px", color: "#e8edf5", fontSize: "13px", fontFamily: "'IBM Plex Sans', sans-serif", outline: "none" }}
                  onFocus={e => e.target.style.borderColor = "#4a90d9"}
                  onBlur={e => e.target.style.borderColor = "rgba(74,144,217,0.2)"}
                />
                {serviceSearch && <button onClick={() => setServiceSearch("")} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#5a6e90", cursor: "pointer", fontSize: "18px" }}>×</button>}
              </div>
            </div>
          </div>
          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "16px" }}>
            <div style={{ fontSize: "11px", color: "#3a4a6a", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "12px", letterSpacing: "1px" }}>
              {filteredServices.length} SERVICE{filteredServices.length !== 1 ? "S" : ""}
            </div>
            {filteredServices.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#3a4a6a", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px" }}>NO RESULTS FOUND</div>
            ) : filteredServices.map(item => <ServiceCard key={item.id} item={item} />)}
          </div>
        </>
      )}

      {/* GLOSSARY TAB */}
      {tab === "glossary" && (
        <>
          <div style={{ background: "#091428", borderBottom: "1px solid rgba(74,144,217,0.1)", padding: "12px 16px", position: "sticky", top: "89px", zIndex: 99 }}>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ position: "relative", marginBottom: "10px" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#4a90d9", fontSize: "16px" }}>⌕</span>
                <input type="text" placeholder="Search terms... e.g. TGP, DOM, mill cert, carburizing" value={glossarySearch} onChange={e => setGlossarySearch(e.target.value)}
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,144,217,0.2)", borderRadius: "6px", padding: "10px 36px 10px 36px", color: "#e8edf5", fontSize: "13px", fontFamily: "'IBM Plex Sans', sans-serif", outline: "none" }}
                  onFocus={e => e.target.style.borderColor = "#4a90d9"}
                  onBlur={e => e.target.style.borderColor = "rgba(74,144,217,0.2)"}
                />
                {glossarySearch && <button onClick={() => setGlossarySearch("")} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#5a6e90", cursor: "pointer", fontSize: "18px" }}>×</button>}
              </div>
              <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
                {GLOSSARY_CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setGlossaryCategory(cat)} style={{
                    whiteSpace: "nowrap", padding: "5px 12px", borderRadius: "20px",
                    fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace", fontWeight: "600",
                    letterSpacing: "0.5px", cursor: "pointer", border: "1px solid",
                    background: glossaryCategory === cat ? "#4a90d9" : "transparent",
                    borderColor: glossaryCategory === cat ? "#4a90d9" : "rgba(255,255,255,0.12)",
                    color: glossaryCategory === cat ? "#ffffff" : "#5a6e90", transition: "all 0.15s",
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
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#3a4a6a", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px" }}>NO RESULTS FOUND</div>
            ) : filteredGlossary.map((item, i) => <GlossaryCard key={i} item={item} />)}
          </div>
        </>
      )}

      {/* GAUGE CHART TAB */}
      {tab === "gauge" && (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: "#3a4a6a", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "16px", letterSpacing: "1px" }}>
            CARBON STEEL — GAUGE REFERENCE
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "rgba(74,144,217,0.15)", borderBottom: "1px solid rgba(74,144,217,0.25)", padding: "10px 16px" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: "700", color: "#4a90d9", letterSpacing: "1px", textTransform: "uppercase" }}>Fraction</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: "700", color: "#4a90d9", letterSpacing: "1px", textTransform: "uppercase", textAlign: "center" }}>Gauge</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: "700", color: "#4a90d9", letterSpacing: "1px", textTransform: "uppercase", textAlign: "right" }}>Decimal</div>
            </div>
            {/* Rows */}
            {GAUGE_DATA.map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                padding: "10px 16px",
                borderBottom: i < GAUGE_DATA.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
              }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: row.fraction !== "—" ? "#ffffff" : "#3a4a6a" }}>
                  {row.fraction}
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: row.gauge !== "—" ? "#7eb8f7" : "#3a4a6a", textAlign: "center", fontWeight: row.gauge !== "—" ? "600" : "400" }}>
                  {row.gauge !== "—" ? `${row.gauge} GA` : "—"}
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "#cdd8f0", textAlign: "right" }}>
                  {row.decimal + '"'}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "12px", padding: "10px 12px", background: "rgba(74,144,217,0.08)", borderLeft: "3px solid #4a90d9", borderRadius: "0 4px 4px 0" }}>
            <div style={{ fontSize: "12px", color: "#cdd8f0", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: "1.6" }}>
              Carbon steel gauge reference — applies to carbon steel sheet and carbon steel tube wall thickness. Gauge numbers run in reverse: higher gauge = thinner material. Aluminum and stainless use different gauge scales — always confirm in decimals when quoting non-carbon material.
            </div>
          </div>
        </div>
      )}

      {/* WEIGHT CALCULATOR TAB */}
      {tab === "weight" && <WeightCalculator />}

      <div style={{ textAlign: "center", padding: "24px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: "10px", color: "#3a4a6a", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "1px" }}>
        PENNSYLVANIA STEEL COMPANY · PASTEEL.COM
      </div>
    </div>
  );
}
