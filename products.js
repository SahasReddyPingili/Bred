// Product Catalog tailored for College Students & Streetwear Culture
// Divided into 4 Core Divisions: F1 Merch, Sports Merch, Customizations, and Heavyweight Streetwear.
// Fabric Standard: 200+ GSM Heavyweight Combed Ring-Spun Cotton (Superior to H&M and Levi's retail staples).

const PRODUCTS = [
    // DIVISION 01: F1 & MOTORSPORT MERCH
    {
        id: "prod-f1-01",
        division: "f1",
        category: "f1",
        title: "APEX PADDOCK RIPSTOP RACING BOMBER",
        tagline: "Water-resistant matte nylon with Grand Prix telemetry prints & rubberized race patches",
        price: 94.00,
        originalPrice: 120.00,
        studentPrice: 75.20,
        gsm: "240+ GSM Matte Ripstop",
        gsmValue: 240,
        fit: "Oversized Track Pit Fit",
        badge: "F1 GRAND PRIX",
        badgeColor: "amber",
        images: [
            "assets/f1-bg.png",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80"
        ],
        colors: [
            { name: "Scuderia Carbon", hex: "#121214" },
            { name: "Silverstone Grey", hex: "#73757d" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: 11,
        description: "Inspired by Formula 1 night race pit crews in Singapore and Las Vegas. Dual front wind-baffle zippers, quilted thermal lining, and authentic telemetry throttle-map graphics silkscreened along the lower back hem. Outperforms standard commercial jackets with zero flimsy polyester shell lining.",
        features: [
            "Weatherproof micro-ripstop outer shell with wind-baffle seal",
            "3D silicone Grand Prix rubber badge on left chest",
            "Internal pocket custom sized for student ID & pit pass",
            "Reflective 3M circuit map detailing on rear"
        ],
        campusFitTip: "Naturally boxy through the chest to allow easy layering over our 200+ GSM hoodies."
    },
    {
        id: "prod-f1-02",
        division: "f1",
        category: "f1",
        title: "POLE POSITION 220+ GSM MONZA TEE",
        tagline: "Vintage mineral wash with crackle-finish aerodynamic telemetry graphic",
        price: 46.00,
        originalPrice: 58.00,
        studentPrice: 36.80,
        gsm: "220+ GSM Combed Cotton",
        gsmValue: 220,
        fit: "Drop-Shoulder Boxy",
        badge: "MONZA EDITION",
        badgeColor: "volt",
        images: [
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80"
        ],
        colors: [
            { name: "Asphalt Black", hex: "#1a1a1e" },
            { name: "Chalk White", hex: "#e8e7e1" }
        ],
        sizes: ["S", "M", "L", "XL"],
        inStock: 16,
        description: "The ultimate race-day tee for campus fans. Engineered with 220+ GSM ring-spun combed cotton washed with volcanic pumice stones. Significantly heavier, thicker, and more durable than typical 140 GSM fast-fashion t-shirts from H&M.",
        features: [
            "Dense 220+ GSM combed single jersey construction",
            "1.2-inch high-density ribbed collar that maintains shape after 50+ dorm washes",
            "Vintage-distressed water-base screenprint that will not crack or peel",
            "Checkered flag hem tag woven in Tokyo"
        ],
        campusFitTip: "Boxy streetwear cut with relaxed drop-shoulder silhouette."
    },

    // DIVISION 02: SPORTS & VARSITY MERCH
    {
        id: "prod-sp-01",
        division: "sports",
        category: "sports",
        title: "VARSITY 94 HEAVYWEIGHT MESH JERSEY",
        tagline: "Double-layered dazzle athletic mesh with embroidered arched campus numbers",
        price: 58.00,
        originalPrice: 72.00,
        studentPrice: 46.40,
        gsm: "240+ GSM Heavy Dazzle Mesh",
        gsmValue: 240,
        fit: "Relaxed Boxy Athletic",
        badge: "VARSITY DROP",
        badgeColor: "cyan",
        images: [
            "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"
        ],
        colors: [
            { name: "Black / Volt", hex: "#0e0f12" },
            { name: "Forest / Cream", hex: "#1c2b22" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: 19,
        description: "A tribute to mid-90s college basketball championships. Built with dual-layer breathable dazzle mesh at 240+ GSM, high-density twill tackle numbers, and ribbed contrast trims.",
        features: [
            "Dual-layer 240+ GSM breathable polyester dazzle mesh",
            "Authentic zig-zag stitched tackle twill letters and numbers",
            "Woven jock tag at lower hem with graduation year stamp",
            "Reinforced side vents for natural drape over hoodies"
        ],
        campusFitTip: "Fits generously wide. Ideal for layering over long sleeves or 200+ GSM tees."
    },
    {
        id: "prod-sp-02",
        division: "sports",
        category: "sports",
        title: "ALL-CONFERENCE REVERSE-WEAVE CREWNECK",
        tagline: "240+ GSM cross-grain fleece with ribbed side gussets and chainstitch varsity crest",
        price: 76.00,
        originalPrice: 95.00,
        studentPrice: 60.80,
        gsm: "240+ GSM Reverse Weave",
        gsmValue: 240,
        fit: "Classic Boxy Athletic",
        badge: "ALL-AMERICAN",
        badgeColor: "purple",
        images: [
            "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80"
        ],
        colors: [
            { name: "Athletic Heather Grey", hex: "#8c9199" },
            { name: "Midnight Navy", hex: "#171c26" }
        ],
        sizes: ["S", "M", "L", "XL"],
        inStock: 14,
        description: "Engineered like the indestructible varsity sweaters of archival campus athletics. Cross-grain fleece cut prevents vertical shrinkage in dorm washers, and rib gussets prevent shoulder pulling during brisk morning quad walks.",
        features: [
            "240+ GSM ultra-dense loopback French Terry",
            "Authentic chainstitch chenille college patch",
            "Ribbed athletic side panels for flexible movement",
            "Reinforced crewneck collar with triangle V-stitch"
        ],
        campusFitTip: "True to size with structured vintage proportions."
    },

    // DIVISION 03: CUSTOMISATIONS & BESPOKE LAB
    {
        id: "prod-cu-01",
        division: "custom",
        category: "custom",
        title: "BESPOKE LAB CUSTOM DORM CLUB HOODIE",
        tagline: "Personalize with your student club, college initials, dorm coordinates & puff print",
        price: 84.00,
        originalPrice: 105.00,
        studentPrice: 67.20,
        gsm: "240+ GSM Heavyweight Terry",
        gsmValue: 240,
        fit: "Boxy Drop-Shoulder Custom",
        badge: "BESPOKE STUDIO",
        badgeColor: "volt",
        images: [
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=900&q=80"
        ],
        colors: [
            { name: "Obsidian Core", hex: "#111216" },
            { name: "Bone White", hex: "#e2ded6" },
            { name: "Slate Charcoal", hex: "#2b2d36" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: 25,
        description: "Our in-house campus custom studio garment. Upload your transparent PNG artwork, choose your dorm number, Greek letters, or club initials. Hand-printed and heat-cured with raised 3D puff print on a 200+ GSM heavyweight combed cotton blank.",
        features: [
            "Upload your own transparent PNG graphics (no background needed)",
            "High-density 3D puff ink formula cured at 320°F",
            "Heavy 200+ GSM pre-shrunk combed cotton base blank",
            "Custom woven neck label with your initials"
        ],
        campusFitTip: "Order your regular size for a tailored oversized drape. Enter custom text in the interactive studio."
    },
    {
        id: "prod-cu-02",
        division: "custom",
        category: "custom",
        title: "DIY ARCHIVE EMBROIDERED SERIAL TEE",
        tagline: "Custom chainstitch monogram on heavy 200+ GSM vintage blank with choice of thread",
        price: 48.00,
        originalPrice: 60.00,
        studentPrice: 38.40,
        gsm: "200+ GSM Vintage Combed Cotton",
        gsmValue: 200,
        fit: "Ultra-Boxy Fit",
        badge: "CUSTOM LAB",
        badgeColor: "cyan",
        images: [
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80"
        ],
        colors: [
            { name: "Faded Onyx", hex: "#191a1d" },
            { name: "Washed Sand", hex: "#cfc7b8" }
        ],
        sizes: ["S", "M", "L", "XL"],
        inStock: 18,
        description: "Made to order in 48 hours. Choose your grad year, college initials, or customized campus coordinate line. Embroidered with Japanese metallic or industrial amber thread on our signature 200+ GSM blank.",
        features: [
            "Up to 12 custom characters embroidered on left collar or cuff",
            "Premium metallic or high-vis Madeira thread",
            "Heavyweight 200+ GSM combed jersey body — superior to Levi's commercial t-shirts",
            "Individual archive serial number stamped on hem"
        ],
        campusFitTip: "Signature boxy streetwear cut with drop-shoulder seams."
    },

    // DIVISION 04: SIGNATURE HEAVYWEIGHT STREETWEAR
    {
        id: "prod-sw-01",
        division: "streetwear",
        category: "streetwear",
        title: "CYBER ACID 200+ GSM OVERSIZED HOODIE",
        tagline: "Double-layered hood, kangaroo pouch with hidden zip pocket for student ID",
        price: 78.00,
        originalPrice: 95.00,
        studentPrice: 62.40,
        gsm: "240+ GSM French Terry",
        gsmValue: 240,
        fit: "Boxy Drop-Shoulder",
        badge: "CAMPUS GRAIL",
        badgeColor: "volt",
        images: [
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80"
        ],
        colors: [
            { name: "Obsidian Black", hex: "#0c0d10" },
            { name: "Washed Bone", hex: "#dcd6cd" },
            { name: "Acid Moss", hex: "#4b5320" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: 14,
        description: "Engineered specifically for freezing 8:00 AM lecture halls and late-night library study sessions. Crafted from ultra-heavyweight 200+ GSM combed French Terry cotton with zero synthetic blend. Outlasts standard H&M and retail hoodies through hundreds of harsh campus laundry cycles.",
        features: [
            "100% Organic Heavyweight Cotton (Pre-shrunk, 200+ GSM)",
            "Discreet interior pocket sized for student keycard & AirPods",
            "Reinforced thumb loops in cuffs for freezing lecture halls",
            "Silkscreen puff print high-durability chest graphic"
        ],
        campusFitTip: "Take your regular size for an authentic slouchy boxy drape. Size down if you prefer a standard fit."
    },
    {
        id: "prod-sw-02",
        division: "streetwear",
        category: "streetwear",
        title: "DORM-RUN RIPSTOP PARACHUTE CARGOS",
        tagline: "Water-resistant matte nylon with 8 utility pockets & bungee ankle cinches",
        price: 84.00,
        originalPrice: 110.00,
        studentPrice: 67.20,
        gsm: "240+ GSM Matte Ripstop",
        gsmValue: 240,
        fit: "Wide-Leg Adjustable Bungee",
        badge: "SELLING FAST",
        badgeColor: "amber",
        images: [
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=80"
        ],
        colors: [
            { name: "Cyber Gunmetal", hex: "#1c1d22" },
            { name: "Tactical Olive", hex: "#353b2d" },
            { name: "Desert Sand", hex: "#a4947d" }
        ],
        sizes: ["S", "M", "L", "XL"],
        inStock: 6,
        description: "Carry your entire daily carry without a backpack. Eight deep utility pockets designed to hold your phone, charger brick, keys, and snacks. Dual bungee toggles at hem let you switch from wide skate drape to stacked sneaker cinch in two seconds.",
        features: [
            "Tear-resistant micro-ripstop weave",
            "Elastic waistband with heavy paracord drawstrings",
            "YKK zipper cargo pockets with quick-pull tags",
            "Bungee cord adjusters at ankles for customizable silhouette"
        ],
        campusFitTip: "Elastic waist fits a range of sizes. Choose S (28-30), M (31-33), L (34-36), XL (36-38)."
    },
    {
        id: "prod-sw-03",
        division: "streetwear",
        category: "streetwear",
        title: "ALL-NIGHTER TACTICAL TOTE / CROSSBODY",
        tagline: "Ballistic Cordura with padded 16\" laptop sleeve and water bottle sleeve",
        price: 54.00,
        originalPrice: 68.00,
        studentPrice: 43.20,
        gsm: "1000D Ballistic Weave",
        gsmValue: 260,
        fit: "Convertible 2-in-1",
        badge: "CAMPUS ESSENTIAL",
        badgeColor: "cyan",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=900&q=80"
        ],
        colors: [
            { name: "Matte Stealth Black", hex: "#161719" },
            { name: "Cobalt Ripstop", hex: "#1d3557" }
        ],
        sizes: ["ONE SIZE"],
        inStock: 22,
        description: "The sleek alternative to bulky high school backpacks. Converts in seconds from a shoulder tote to a cross-chest sling bag. Fully padded internal sleeve safeguards your MacBook Pro or iPad, with dedicated slots for highlighters and dorm keys.",
        features: [
            "Padded fleece-lined 16\" MacBook sleeve",
            "Key carabiner clip inside top zipper compartment",
            "Luggage pass-through for holiday flight travels home",
            "Weatherproof polyurethane zipper seals"
        ],
        campusFitTip: "Fits up to 16-inch laptops, 3 textbooks, Stanley tumbler, and a hoodie."
    }
];

// Campus Lifestyle Social Proof (UGC Feed - "Spotted on Campus")
const CAMPUS_LOOKBOOK = [
    {
        id: "ugc-1",
        student: "@marcus_d",
        college: "Columbia University (NYC)",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
        image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
        caption: "Butler library at 2am in the 200+ GSM hoodie. The structured heavyweight drape holds up perfectly all semester.",
        taggedItem: "prod-sw-01",
        division: "streetwear",
        likes: 1420
    },
    {
        id: "ugc-2",
        student: "@lewis_v",
        college: "UC Berkeley (California)",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
        caption: "The F1 Apex paddock jacket in lecture hall is an instant conversation starter. Built like actual team kit.",
        taggedItem: "prod-f1-01",
        division: "f1",
        likes: 2740
    },
    {
        id: "ugc-3",
        student: "@claire.fitz",
        college: "NYU Washington Square",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
        caption: "Varsity 94 mesh jersey over a 200+ GSM tee for game day. Unmatched drape.",
        taggedItem: "prod-sp-01",
        division: "sports",
        likes: 2190
    },
    {
        id: "ugc-4",
        student: "@kai_chen",
        college: "UT Austin (Texas)",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
        caption: "Club initials and dorm room coordinates custom puff printed in the Bespoke Lab on 200+ GSM blank. Zero cracking.",
        taggedItem: "prod-cu-01",
        division: "custom",
        likes: 3120
    }
];
