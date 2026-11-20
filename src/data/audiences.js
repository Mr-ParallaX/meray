export const AUDIENCES = [
  {
    id: "men",
    name: "Men",
    label: "Men's Grooming",
    hex: "#F5A623",
    bgHex: "#F5A623",
    image: "/image/men.png",
    phoneImage: "/image/men_phone.png",
    words: ["FADE", "SHAVE", "STYLE"],
    priceFrom: 30, // TODO confirm with client
    tagline: "Sharp Cuts For Men",
    description: "Precision fades, clean line-ups and hot-towel shaves. Classic barbershop craft with a modern edge, right on Busse Rd.",
    storyHeading: ["Defy", "The", "Ordinary"],
    storyText: "The Meray chair is where classic barbershop tradition meets progressive grooming. From surgical skin fades to tailored beard sculpture, we dial in your signature look with pinpoint precision.",
    marqueeText: "Fresh Fades",
    services: [
      {
        id: "m-fade",
        name: "Signature Skin Fade",
        desc: "Zero taper, foil shaver finish, clipper artistry & warm lather neck shave.",
        price: 35, // TODO confirm
        durationMin: 45,
        icon: "Scissors",
        category: "Haircuts"
      },
      {
        id: "m-cut",
        name: "Classic Executive Cut",
        desc: "Tailored scissor & clipper styling suited to your head shape and hair texture.",
        price: 30, // TODO confirm
        durationMin: 35,
        icon: "Sparkles",
        category: "Haircuts"
      },
      {
        id: "m-shave",
        name: "Hot Towel Razor Shave",
        desc: "Essential oil steam, double pass straight razor shave & calming balm.",
        price: 30, // TODO confirm
        durationMin: 35,
        icon: "Wind",
        category: "Beard & Shave"
      },
      {
        id: "m-beard",
        name: "Beard Sculpt & Line-Up",
        desc: "Precision trimmer outline, hot steam towel, foil detailing & conditioning oil.",
        price: 20, // TODO confirm
        durationMin: 25,
        icon: "Zap",
        category: "Beard & Shave"
      },
      {
        id: "m-combo",
        name: "The Full Meray Experience",
        desc: "Haircut of choice + hot towel straight razor shave + scalp detox wash.",
        price: 60, // TODO confirm
        durationMin: 70,
        icon: "Crown",
        category: "Haircuts"
      },
      {
        id: "m-color",
        name: "Grey Camo & Beard Tint",
        desc: "Natural subtle tone blending that restores youthfulness in under 30 minutes.",
        price: 40, // TODO confirm
        durationMin: 30,
        icon: "Palette",
        category: "Color"
      }
    ],
    styles: [
      {
        id: "s-fade",
        title: "LOW TAPER FADE",
        subtitle: "Clean & Modern",
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=75",
        desc: "A seamless transition from skin at the sideburns and neckline, keeping natural fullness through the sides and length on top."
      },
      {
        id: "s-crop",
        title: "TEXTURED CROP",
        subtitle: "Matte Finish",
        image: "https://images.unsplash.com/photo-1634480257305-7f4ca3582e6a?auto=format&fit=crop&w=1600&q=75",
        desc: "Blunt or jagged forward fringe with high-textured crown movement, framed by a high skin taper fade."
      },
      {
        id: "s-beard",
        title: "BEARD SCULPT",
        subtitle: "Razor Line-Up",
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1600&q=75",
        desc: "Crisp cheek geometry, debulked jawline density, and a razor-honed neckline with beard butter hydration."
      }
    ],
    process: [
      { code: "A-01", title: "Consult & Map", desc: "We analyze your hair density, crown pattern and face structure before cutting." },
      { code: "B-88", title: "Hot Towel Steam", desc: "Softens hair follicle tension and preps skin for pristine clippers and razor pass." },
      { code: "C-12", title: "Precision Cut", desc: "Scissor-over-comb and surgical clipper blending with zero harsh weight lines." },
      { code: "D-X9", title: "Style & Finish", desc: "Tonic wash, blow-dry lock, premium matte paste and straight razor neckline." }
    ]
  },
  {
    id: "women",
    name: "Women",
    label: "Women's Salon",
    hex: "#E54C43",
    bgHex: "#E54C43",
    image: "/image/women.png",
    phoneImage: "/image/women_phone.png",
    words: ["CUT", "COLOR", "GLOW"],
    priceFrom: 45, // TODO confirm with client
    tagline: "Beautiful Hair For Her",
    description: "Cuts, color and blowouts tailored to you. Walk in for a refresh, walk out feeling like the best version of yourself.",
    storyHeading: ["Radiate", "Your", "Elegance"],
    storyText: "Every woman's hair has its own rhythm and movement. At Meray, our master stylists create dimensional colors and bespoke cuts that enhance your natural glow with zero effort.",
    marqueeText: "Luxe Color & Cuts",
    services: [
      {
        id: "w-cut",
        name: "Designer Cut & Blowout",
        desc: "Signature consultation, luxury shampoo, precision sculpting and thermal styling.",
        price: 65, // TODO confirm
        durationMin: 60,
        icon: "Scissors",
        category: "Haircuts"
      },
      {
        id: "w-balayage",
        name: "Dimensional Balayage & Gloss",
        desc: "Hand-painted sun-kissed dimension with customized conditioning glaze.",
        price: 175, // TODO confirm
        durationMin: 150,
        icon: "Palette",
        category: "Color"
      },
      {
        id: "w-blowout",
        name: "Signature Meray Blowout",
        desc: "Deep scalp treatment, round brush volume blast and satin thermal seal.",
        price: 45, // TODO confirm
        durationMin: 45,
        icon: "Wind",
        category: "Styling"
      },
      {
        id: "w-color",
        name: "Full Root Touch-Up & Tone",
        desc: "100% grey coverage using botanical ammonia-free luxury color creams.",
        price: 85, // TODO confirm
        durationMin: 75,
        icon: "Sparkles",
        category: "Color"
      },
      {
        id: "w-keratin",
        name: "Smoothing Keratin Therapy",
        desc: "Eliminates 95% of frizz, boosts diamond shine and cuts morning routine in half.",
        price: 210, // TODO confirm
        durationMin: 120,
        icon: "Zap",
        category: "Treatments"
      },
      {
        id: "w-hydra",
        name: "Deep Bond Repair Treatment",
        desc: "Molecular bond builder that restores compromised hair to virgin strength.",
        price: 50, // TODO confirm
        durationMin: 35,
        icon: "Layers",
        category: "Treatments"
      }
    ],
    styles: [
      {
        id: "w-layers",
        title: "BUTTERFLY LAYERS",
        subtitle: "Bouncy & Voluminous",
        image: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=1600&q=75",
        desc: "Feathered front-framing cascade that gives instant height and movement while preserving your perimeter length."
      },
      {
        id: "w-balay",
        title: "BALAYAGE MELT",
        subtitle: "Dimensional Honey",
        image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1600&q=75",
        desc: "Seamless transition from natural roots into radiant caramel and golden tones with an ultra-glossy glaze."
      },
      {
        id: "w-silk",
        title: "SILK PRESS BLOWOUT",
        subtitle: "Mirror Shine",
        image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1600&q=75",
        desc: "Weightless thermal straightening that infuses hydration, leaves zero residue and flows with every step."
      }
    ],
    process: [
      { code: "A-01", title: "Consult & Vision", desc: "Discussing lifestyle, maintenance preferences, inspiration photos and face silhouette." },
      { code: "B-88", title: "Wash & Treat", desc: "Nutrient-rich cleansing bath, scalp stimulation and deep conditioning bond masque." },
      { code: "C-12", title: "Cut & Color", desc: "Architectural layering and hand-painted light reflections designed for movement." },
      { code: "D-X9", title: "Blow-Dry & Glow", desc: "Round-brush velocity blow dry, heat protection mist and diamond luster polish." }
    ]
  },
  {
    id: "girl",
    name: "Girl",
    label: "Girls' Styling",
    hex: "#9B59B6",
    bgHex: "#9B59B6",
    image: "/image/girl.png",
    phoneImage: "/image/girl_phone.png",
    words: ["CURL", "BRAID", "SHINE"],
    priceFrom: 35, // TODO confirm with client
    tagline: "Fun Styles For Girls",
    description: "Braids, curls, trims and party-ready styles in a fun, friendly chair. Gentle hands, beautiful results.",
    storyHeading: ["Sparkle", "With", "Confidence"],
    storyText: "We make salon visits a joyful experience. From school picture day to birthday updos and gentle trims, young ladies love their time in the Meray chair.",
    marqueeText: "Braids & Curls",
    services: [
      {
        id: "g-cut",
        name: "Princess Cut & Style",
        desc: "Gentle wash, gentle detangling, custom trim and fun braid or soft curls.",
        price: 35, // TODO confirm
        durationMin: 40,
        icon: "Scissors",
        category: "Kids"
      },
      {
        id: "g-braids",
        name: "Dutch & French Braids",
        desc: "Double Dutch braids, bubble braids or intricate crown styles with ribbons.",
        price: 30, // TODO confirm
        durationMin: 35,
        icon: "Sparkles",
        category: "Styling"
      },
      {
        id: "g-updo",
        name: "Party & Recital Updo",
        desc: "Special occasion curls, half-up twists or ballet bun with shimmer spray.",
        price: 45, // TODO confirm
        durationMin: 45,
        icon: "Crown",
        category: "Styling"
      },
      {
        id: "g-detangle",
        name: "Tear-Free Deep Detangle",
        desc: "Organic leave-in silk treatment and gentle wide-tooth brush therapy.",
        price: 25, // TODO confirm
        durationMin: 30,
        icon: "Wind",
        category: "Treatments"
      }
    ],
    styles: [
      {
        id: "g-braidstyle",
        title: "FAIRY TALE BRAIDS",
        subtitle: "Dutch Double Braid",
        image: "https://images.unsplash.com/photo-1774660810725-fb04e002003d?auto=format&fit=crop&w=1600&q=75",
        desc: "Tight yet gentle braids that hold through soccer practice, school days and weekend play."
      },
      {
        id: "g-curls",
        title: "PARTY CURLS",
        subtitle: "Bouncy & Light",
        image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1600&q=75",
        desc: "Heat-protected loose ringlets that bounce naturally without stiffness."
      },
      {
        id: "g-updostyle",
        title: "SILK TWIST UPDO",
        subtitle: "Recital Ready",
        image: "https://images.unsplash.com/photo-1734111719430-fe4a3973f8af?auto=format&fit=crop&w=1600&q=75",
        desc: "Elegant twists pinned securely for dance recitals, weddings and holiday photos."
      }
    ],
    process: [
      { code: "A-01", title: "Friendly Welcome", desc: "We meet our young client, choose a fun style and get cozy in the styling chair." },
      { code: "B-88", title: "Gentle Detangle", desc: "Tear-free botanical mist and soft-bristle smoothing to protect sensitive scalps." },
      { code: "C-12", title: "Trim or Braid", desc: "Even, neat trims or decorative braiding styled with gentle, caring hands." },
      { code: "D-X9", title: "Sparkle & Smile", desc: "Optional shimmer spray, cute hair accessory and a lollipop for the mirror reveal." }
    ]
  },
  {
    id: "boy",
    name: "Boy",
    label: "Boys' Cuts",
    hex: "#3FA8D6",
    bgHex: "#3FA8D6",
    image: "/image/boy.png",
    phoneImage: "/image/boy_phone.png",
    words: ["FRESH", "COOL", "CUT"],
    priceFrom: 22, // TODO confirm with client
    tagline: "Cool Cuts For Boys",
    description: "Cool fades and neat school cuts for the little gentlemen. Patient stylists, zero tears, total confidence.",
    storyHeading: ["Young", "Sharp", "Legends"],
    storyText: "Whether he wants a modern taper, clean buzz, textured surfer fringe or his first real skin fade, our friendly barbers make every young dude look and feel fresh.",
    marqueeText: "Fresh Boy Cuts",
    services: [
      {
        id: "b-fade",
        name: "Young Gent High & Tight",
        desc: "Clean low or mid fade with clean neck edge and clipper guard blend.",
        price: 25, // TODO confirm
        durationMin: 30,
        icon: "Scissors",
        category: "Kids"
      },
      {
        id: "b-classic",
        name: "Classic Schoolboy Trim",
        desc: "Clean scissor work on top with neat taper around ears and collar.",
        price: 22, // TODO confirm
        durationMin: 25,
        icon: "Sparkles",
        category: "Kids"
      },
      {
        id: "b-crop",
        name: "Textured Surfer Crop",
        desc: "Piecey matte top with tapered sides, styled with kid-safe texture paste.",
        price: 24, // TODO confirm
        durationMin: 30,
        icon: "Wind",
        category: "Kids"
      },
      {
        id: "b-design",
        name: "Custom Hair Tattoo / Line",
        desc: "Single or double lightning bolt or curve etched into the temple.",
        price: 15, // TODO confirm
        durationMin: 15,
        icon: "Zap",
        category: "Kids"
      }
    ],
    styles: [
      {
        id: "b-highfade",
        title: "MODERN HIGH FADE",
        subtitle: "Textured Top",
        image: "https://images.unsplash.com/photo-1521490878864-a50e9fcb5718?auto=format&fit=crop&w=1600&q=75",
        desc: "Athletic, sharp and super easy to keep neat with just water and quick finger styling."
      },
      {
        id: "b-taper",
        title: "CLEAN TAPER",
        subtitle: "School Picture Ready",
        image: "https://images.unsplash.com/photo-1657105052497-f996284ffff8?auto=format&fit=crop&w=1600&q=75",
        desc: "A timeless gentleman's cut with natural soft edges, ideal for dress shirts and class portraits."
      },
      {
        id: "b-spike",
        title: "CREW SPIKE",
        subtitle: "Matte Hold",
        image: "https://images.unsplash.com/photo-1634480257305-7f4ca3582e6a?auto=format&fit=crop&w=1600&q=75",
        desc: "Slightly shorter back and sides with a spiky textured crown for maximum energy."
      }
    ],
    process: [
      { code: "A-01", title: "Game Plan", desc: "Mom or dad shares the cut preference, or the young man picks his favorite fade." },
      { code: "B-88", title: "Cape & Comfort", desc: "Ultra-soft cape, gentle neck strip and a friendly station." },
      { code: "C-12", title: "Precision Cut", desc: "Quiet clippers and steady scissor work for smooth blending." },
      { code: "D-X9", title: "Cool Gel Finish", desc: "Spike, comb or texture with kid-safe pomade, plus a high five!" }
    ]
  }
];

export const SALON_INTERIOR_IMAGES = [
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1600&q=75",
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1600&q=75",
  "https://images.unsplash.com/photo-1773904215697-e6c21fc27ac2?auto=format&fit=crop&w=1600&q=75",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=75"
];

export const BEFORE_AFTER_PAIRS = [
  {
    id: "ba-1",
    audience: "men",
    title: "Overgrown Crop to Clean Mid Taper Fade",
    before: "https://images.unsplash.com/photo-1494873446894-adbfecfc407a?auto=format&fit=crop&w=1600&q=75",
    after: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=75",
    caption: "Sharp perimeter with razor line-up and volume reduction on sides."
  },
  {
    id: "ba-2",
    audience: "women",
    title: "Flat Roots to Bouncy Butterfly Layers",
    before: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1600&q=75",
    after: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=1600&q=75",
    caption: "Full blowout with dimensional layering and soft face-framing sweep."
  }
];

export const OFFERS_DATA = [
  {
    id: "off-first",
    audience: "all",
    badge: "20% OFF",
    title: "New Client Welcome Special",
    code: "WELCOME20",
    description: "Receive 20% off any haircut, color, or full grooming package on your first visit to Meray.",
    validUntil: "Dec 31, 2026"
  },
  {
    id: "off-father-son",
    audience: "men",
    badge: "SAVE $15",
    title: "Father & Son Duo Cut",
    code: "DUOFRESH",
    description: "Book dad's haircut and boy's haircut together on any Tuesday or Wednesday to save $15.",
    validUntil: "Dec 31, 2026"
  },
  {
    id: "off-color-gloss",
    audience: "women",
    badge: "FREE GLOSS",
    title: "Balayage Glaze Upgrade",
    code: "GLOWUP",
    description: "Complimentary bond-building gloss treatment with any full balayage or highlight service.",
    validUntil: "Dec 31, 2026"
  }
];
