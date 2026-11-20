// ============================================================================
// MERAY Hair Salon — Comprehensive Mock CRM Data
// All client data uses clearly labeled sample names.
// ============================================================================

export const INITIAL_STYLISTS = [
  {
    id: 'stylist-1',
    name: 'Marcus Vance',
    role: 'Master Barber & Founder',
    bio: '15+ years specializing in low-skin tapers, straight razor grooming, and classic scissor craft.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    audiences: ['men', 'boy'],
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    active: true
  },
  {
    id: 'stylist-2',
    name: 'Elena Rostova',
    role: 'Creative Color Director',
    bio: 'Master colorist specialized in dimensional balayage, corrective blonding, and precision bobs.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    audiences: ['women', 'girl'],
    workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    active: true
  },
  {
    id: 'stylist-3',
    name: 'Chloe Bennett',
    role: 'Senior Youth & Texture Specialist',
    bio: 'Patient, creative artisan beloved by young clients for curls, braiding, and modern trending styles.',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    audiences: ['girl', 'boy', 'women'],
    workingDays: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    active: true
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1',
    name: 'Sample Client 1 (David K.)',
    email: 'sample.client1@example.com',
    phone: '(847) 555-0101',
    visits: 8,
    totalSpent: 360,
    favoriteService: 'Signature Skin Fade',
    notes: 'Prefers high drop taper with foil shaver finish. Likes complimentary espresso.',
    createdAt: '2026-03-15'
  },
  {
    id: 'cust-2',
    name: 'Sample Client 2 (Sarah M.)',
    email: 'sample.client2@example.com',
    phone: '(847) 555-0102',
    visits: 6,
    totalSpent: 750,
    favoriteService: 'Dimensional Balayage & Gloss',
    notes: 'Sensitive scalp. Prefers ammonia-free toner formulations.',
    createdAt: '2026-04-10'
  },
  {
    id: 'cust-3',
    name: 'Sample Client 3 (Liam P.)',
    email: 'sample.client3@example.com',
    phone: '(847) 555-0103',
    visits: 4,
    totalSpent: 120,
    favoriteService: 'Boys Textured Crop',
    notes: 'Parent sits nearby. Enthusiastic about soccer designs.',
    createdAt: '2026-06-22'
  },
  {
    id: 'cust-4',
    name: 'Sample Client 4 (Emma R.)',
    email: 'sample.client4@example.com',
    phone: '(847) 555-0104',
    visits: 5,
    totalSpent: 220,
    favoriteService: 'Princess Curls & French Braid',
    notes: 'Loves sparkly glitter spray finish and pastel clips.',
    createdAt: '2026-05-18'
  },
  {
    id: 'cust-5',
    name: 'Sample Client 5 (Robert B.)',
    email: 'sample.client5@example.com',
    phone: '(847) 555-0105',
    visits: 12,
    totalSpent: 540,
    favoriteService: 'Executive Beard Sculpt & Hot Towel',
    notes: 'Regular every alternating Thursday at 10 AM with Marcus.',
    createdAt: '2026-01-11'
  },
  {
    id: 'cust-6',
    name: 'Sample Client 6 (Jessica T.)',
    email: 'sample.client6@example.com',
    phone: '(847) 555-0106',
    visits: 3,
    totalSpent: 390,
    favoriteService: 'Precision Bob & Blowout',
    notes: 'Always books blowouts before major weekend corporate events.',
    createdAt: '2026-08-05'
  },
  {
    id: 'cust-7',
    name: 'Sample Client 7 (Noah C.)',
    email: 'sample.client7@example.com',
    phone: '(847) 555-0107',
    visits: 5,
    totalSpent: 155,
    favoriteService: 'Boys Classic Taper Fade',
    notes: 'Wears glasses, careful around ear line.',
    createdAt: '2026-07-14'
  },
  {
    id: 'cust-8',
    name: 'Sample Client 8 (Sophia L.)',
    email: 'sample.client8@example.com',
    phone: '(847) 555-0108',
    visits: 4,
    totalSpent: 190,
    favoriteService: 'Butterfly Layers & Silk Press',
    notes: 'Thick wavy hair, allow 45 minutes.',
    createdAt: '2026-09-02'
  },
  {
    id: 'cust-9',
    name: 'Sample Client 9 (Anthony W.)',
    email: 'sample.client9@example.com',
    phone: '(847) 555-0109',
    visits: 7,
    totalSpent: 380,
    favoriteService: 'Royal Meray Grooming Package',
    notes: 'Likes cooling tea tree shampoo and scalp massage.',
    createdAt: '2026-02-28'
  },
  {
    id: 'cust-10',
    name: 'Sample Client 10 (Michelle H.)',
    email: 'sample.client10@example.com',
    phone: '(847) 555-0110',
    visits: 9,
    totalSpent: 1150,
    favoriteService: 'Full Foil Highlights & Cut',
    notes: 'VIP client, books 4 appointments in advance.',
    createdAt: '2026-01-20'
  },
  {
    id: 'cust-11',
    name: 'Sample Client 11 (Lucas G.)',
    email: 'sample.client11@example.com',
    phone: '(847) 555-0111',
    visits: 2,
    totalSpent: 65,
    favoriteService: 'Lightning Bolt Razor Part',
    notes: 'First time was nervous, loves Chloe now.',
    createdAt: '2026-10-04'
  },
  {
    id: 'cust-12',
    name: 'Sample Client 12 (Olivia K.)',
    email: 'sample.client12@example.com',
    phone: '(847) 555-0112',
    visits: 4,
    totalSpent: 160,
    favoriteService: 'Gloss & Shine Treatment',
    notes: 'Natural curls, strictly sulfate-free.',
    createdAt: '2026-07-29'
  },
  {
    id: 'cust-13',
    name: 'Sample Client 13 (James V.)',
    email: 'sample.client13@example.com',
    phone: '(847) 555-0113',
    visits: 11,
    totalSpent: 495,
    favoriteService: 'Signature Skin Fade',
    notes: 'Zero gap on trimmer, razor line only on neck.',
    createdAt: '2026-02-14'
  },
  {
    id: 'cust-14',
    name: 'Sample Client 14 (Hannah D.)',
    email: 'sample.client14@example.com',
    phone: '(847) 555-0114',
    visits: 5,
    totalSpent: 620,
    favoriteService: 'Keratin Smoothing Express',
    notes: 'Very pleased with frizz reduction results.',
    createdAt: '2026-05-30'
  },
  {
    id: 'cust-15',
    name: 'Sample Client 15 (Ethan S.)',
    email: 'sample.client15@example.com',
    phone: '(847) 555-0115',
    visits: 3,
    totalSpent: 90,
    favoriteService: 'Boys Textured Crop',
    notes: 'Prefers matte styling clay finish.',
    createdAt: '2026-09-19'
  }
];

// Helper to generate dynamic ISO dates relative to today
const getRelativeDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const INITIAL_BOOKINGS = [
  // TODAY'S BOOKINGS
  {
    id: 'bk-101',
    ref: 'MRY-9201',
    clientName: 'Sample Client 1 (David K.)',
    phone: '(847) 555-0101',
    audience: 'men',
    service: 'Signature Skin Fade',
    style: 'Low Taper Fade',
    stylistId: 'stylist-1',
    stylistName: 'Marcus Vance',
    date: getRelativeDate(0),
    time: '09:30 AM',
    price: 35,
    status: 'completed',
    notes: 'Regular taper with razor sharp nape line'
  },
  {
    id: 'bk-102',
    ref: 'MRY-9202',
    clientName: 'Sample Client 2 (Sarah M.)',
    phone: '(847) 555-0102',
    audience: 'women',
    service: 'Dimensional Balayage & Gloss',
    style: 'Sun-Kissed Blonde Balayage',
    stylistId: 'stylist-2',
    stylistName: 'Elena Rostova',
    date: getRelativeDate(0),
    time: '11:00 AM',
    price: 165,
    status: 'confirmed',
    notes: 'Bring toner formula #9B from last formula card'
  },
  {
    id: 'bk-103',
    ref: 'MRY-9203',
    clientName: 'Sample Client 3 (Liam P.)',
    phone: '(847) 555-0103',
    audience: 'boy',
    service: 'Boys Textured Crop',
    style: 'Modern French Crop',
    stylistId: 'stylist-1',
    stylistName: 'Marcus Vance',
    date: getRelativeDate(0),
    time: '01:30 PM',
    price: 28,
    status: 'confirmed',
    notes: 'First time with trimmers on sides'
  },
  {
    id: 'bk-104',
    ref: 'MRY-9204',
    clientName: 'Sample Client 4 (Emma R.)',
    phone: '(847) 555-0104',
    audience: 'girl',
    service: 'Princess Curls & French Braid',
    style: 'Boho Crown Braids',
    stylistId: 'stylist-3',
    stylistName: 'Chloe Bennett',
    date: getRelativeDate(0),
    time: '03:00 PM',
    price: 45,
    status: 'pending',
    notes: 'Client birthday weekend, requested lavender ribbon'
  },
  {
    id: 'bk-105',
    ref: 'MRY-9205',
    clientName: 'Sample Client 5 (Robert B.)',
    phone: '(847) 555-0105',
    audience: 'men',
    service: 'Executive Beard Sculpt & Hot Towel',
    style: 'Full Beard Precision Lineup',
    stylistId: 'stylist-1',
    stylistName: 'Marcus Vance',
    date: getRelativeDate(0),
    time: '04:30 PM',
    price: 45,
    status: 'confirmed',
    notes: 'Eucalyptus essential oil towel'
  },

  // PAST 14 DAYS BOOKINGS
  {
    id: 'bk-106',
    ref: 'MRY-9106',
    clientName: 'Sample Client 6 (Jessica T.)',
    phone: '(847) 555-0106',
    audience: 'women',
    service: 'Precision Bob & Blowout',
    style: 'French Blunt Bob',
    stylistId: 'stylist-2',
    stylistName: 'Elena Rostova',
    date: getRelativeDate(-1),
    time: '10:00 AM',
    price: 85,
    status: 'completed',
    notes: 'Texturizing shears on weight line'
  },
  {
    id: 'bk-107',
    ref: 'MRY-9107',
    clientName: 'Sample Client 7 (Noah C.)',
    phone: '(847) 555-0107',
    audience: 'boy',
    service: 'Boys Classic Taper Fade',
    style: 'Side Part Gentleman',
    stylistId: 'stylist-3',
    stylistName: 'Chloe Bennett',
    date: getRelativeDate(-2),
    time: '02:00 PM',
    price: 30,
    status: 'completed',
    notes: 'School picture prep'
  },
  {
    id: 'bk-108',
    ref: 'MRY-9108',
    clientName: 'Sample Client 8 (Sophia L.)',
    phone: '(847) 555-0108',
    audience: 'girl',
    service: 'Butterfly Layers & Silk Press',
    style: 'Voluminous Face Framing',
    stylistId: 'stylist-2',
    stylistName: 'Elena Rostova',
    date: getRelativeDate(-3),
    time: '04:00 PM',
    price: 55,
    status: 'completed',
    notes: 'Heat protection serum applied'
  },
  {
    id: 'bk-109',
    ref: 'MRY-9109',
    clientName: 'Sample Client 9 (Anthony W.)',
    phone: '(847) 555-0109',
    audience: 'men',
    service: 'Royal Meray Grooming Package',
    style: 'Mid Drop Fade & Beard',
    stylistId: 'stylist-1',
    stylistName: 'Marcus Vance',
    date: getRelativeDate(-4),
    time: '11:30 AM',
    price: 70,
    status: 'completed',
    notes: 'VIP package'
  },
  {
    id: 'bk-110',
    ref: 'MRY-9110',
    clientName: 'Sample Client 10 (Michelle H.)',
    phone: '(847) 555-0110',
    audience: 'women',
    service: 'Full Foil Highlights & Cut',
    style: 'Platinum Ash Blonde',
    stylistId: 'stylist-2',
    stylistName: 'Elena Rostova',
    date: getRelativeDate(-5),
    time: '01:00 PM',
    price: 195,
    status: 'completed',
    notes: 'Bond builder additive included'
  },
  {
    id: 'bk-111',
    ref: 'MRY-9111',
    clientName: 'Sample Client 11 (Lucas G.)',
    phone: '(847) 555-0111',
    audience: 'boy',
    service: 'Lightning Bolt Razor Part',
    style: 'Freestyle Hair Art',
    stylistId: 'stylist-3',
    stylistName: 'Chloe Bennett',
    date: getRelativeDate(-6),
    time: '03:30 PM',
    price: 38,
    status: 'completed',
    notes: 'Razor pattern on right temple'
  },
  {
    id: 'bk-112',
    ref: 'MRY-9112',
    clientName: 'Sample Client 12 (Olivia K.)',
    phone: '(847) 555-0112',
    audience: 'girl',
    service: 'Gloss & Shine Treatment',
    style: 'Glass Hair Finish',
    stylistId: 'stylist-2',
    stylistName: 'Elena Rostova',
    date: getRelativeDate(-7),
    time: '05:00 PM',
    price: 40,
    status: 'completed',
    notes: 'Hydrating mask leave-in'
  },
  {
    id: 'bk-113',
    ref: 'MRY-9113',
    clientName: 'Sample Client 13 (James V.)',
    phone: '(847) 555-0113',
    audience: 'men',
    service: 'Signature Skin Fade',
    style: 'High Bald Fade',
    stylistId: 'stylist-1',
    stylistName: 'Marcus Vance',
    date: getRelativeDate(-8),
    time: '09:00 AM',
    price: 35,
    status: 'no_show',
    notes: 'Followed up via text'
  },
  {
    id: 'bk-114',
    ref: 'MRY-9114',
    clientName: 'Sample Client 14 (Hannah D.)',
    phone: '(847) 555-0114',
    audience: 'women',
    service: 'Keratin Smoothing Express',
    style: 'Ultra Sleek Silk',
    stylistId: 'stylist-2',
    stylistName: 'Elena Rostova',
    date: getRelativeDate(-9),
    time: '12:00 PM',
    price: 180,
    status: 'completed',
    notes: 'Formaldehyde-free keratin formula'
  },
  {
    id: 'bk-115',
    ref: 'MRY-9115',
    clientName: 'Sample Client 15 (Ethan S.)',
    phone: '(847) 555-0115',
    audience: 'boy',
    service: 'Boys Textured Crop',
    style: 'Surfer Waves',
    stylistId: 'stylist-3',
    stylistName: 'Chloe Bennett',
    date: getRelativeDate(-11),
    time: '02:30 PM',
    price: 28,
    status: 'cancelled',
    notes: 'Rescheduled for upcoming week'
  },

  // UPCOMING 14 DAYS BOOKINGS
  {
    id: 'bk-116',
    ref: 'MRY-9316',
    clientName: 'Sample Client 1 (David K.)',
    phone: '(847) 555-0101',
    audience: 'men',
    service: 'Signature Skin Fade',
    style: 'Low Taper Fade',
    stylistId: 'stylist-1',
    stylistName: 'Marcus Vance',
    date: getRelativeDate(1),
    time: '10:00 AM',
    price: 35,
    status: 'confirmed',
    notes: 'Bi-weekly regular booking'
  },
  {
    id: 'bk-117',
    ref: 'MRY-9317',
    clientName: 'Sample Client 4 (Emma R.)',
    phone: '(847) 555-0104',
    audience: 'girl',
    service: 'Girls Signature Cut & Blowout',
    style: 'Blunt Bob with Fringe',
    stylistId: 'stylist-3',
    stylistName: 'Chloe Bennett',
    date: getRelativeDate(1),
    time: '01:00 PM',
    price: 38,
    status: 'pending',
    notes: 'Requested pink clip set'
  },
  {
    id: 'bk-118',
    ref: 'MRY-9318',
    clientName: 'Sample Client 6 (Jessica T.)',
    phone: '(847) 555-0106',
    audience: 'women',
    service: 'Root Touch-Up & Blowout',
    style: 'Rich Espresso Brunette',
    stylistId: 'stylist-2',
    stylistName: 'Elena Rostova',
    date: getRelativeDate(2),
    time: '11:00 AM',
    price: 95,
    status: 'confirmed',
    notes: 'Standard root regrowth service'
  },
  {
    id: 'bk-119',
    ref: 'MRY-9319',
    clientName: 'Sample Client 7 (Noah C.)',
    phone: '(847) 555-0107',
    audience: 'boy',
    service: 'Boys Textured Crop',
    style: 'Textured Caesar',
    stylistId: 'stylist-1',
    stylistName: 'Marcus Vance',
    date: getRelativeDate(2),
    time: '03:30 PM',
    price: 28,
    status: 'confirmed',
    notes: 'Parent accompanying'
  },
  {
    id: 'bk-120',
    ref: 'MRY-9320',
    clientName: 'Sample Client 9 (Anthony W.)',
    phone: '(847) 555-0109',
    audience: 'men',
    service: 'Executive Beard Sculpt & Hot Towel',
    style: 'Beard Fade & Sharp Stache',
    stylistId: 'stylist-1',
    stylistName: 'Marcus Vance',
    date: getRelativeDate(3),
    time: '04:00 PM',
    price: 45,
    status: 'pending',
    notes: 'Wants extra conditioning beard butter'
  },
  {
    id: 'bk-121',
    ref: 'MRY-9321',
    clientName: 'Sample Client 10 (Michelle H.)',
    phone: '(847) 555-0110',
    audience: 'women',
    service: 'Dimensional Balayage & Gloss',
    style: 'Caramel Honey Balayage',
    stylistId: 'stylist-2',
    stylistName: 'Elena Rostova',
    date: getRelativeDate(4),
    time: '09:30 AM',
    price: 175,
    status: 'confirmed',
    notes: 'Requires 2.5 hour appointment block'
  },
  {
    id: 'bk-122',
    ref: 'MRY-9322',
    clientName: 'Sample Client 11 (Lucas G.)',
    phone: '(847) 555-0111',
    audience: 'boy',
    service: 'Boys Classic Taper Fade',
    style: 'Clean Taper & Pompadour',
    stylistId: 'stylist-3',
    stylistName: 'Chloe Bennett',
    date: getRelativeDate(5),
    time: '02:00 PM',
    price: 30,
    status: 'confirmed',
    notes: 'Weekend afternoon family slot'
  },
  {
    id: 'bk-123',
    ref: 'MRY-9323',
    clientName: 'Sample Client 8 (Sophia L.)',
    phone: '(847) 555-0108',
    audience: 'girl',
    service: 'Princess Curls & French Braid',
    style: 'Waterfall Braid & Wand Waves',
    stylistId: 'stylist-3',
    stylistName: 'Chloe Bennett',
    date: getRelativeDate(6),
    time: '12:30 PM',
    price: 45,
    status: 'pending',
    notes: 'Attending family wedding'
  },
  {
    id: 'bk-124',
    ref: 'MRY-9324',
    clientName: 'Sample Client 5 (Robert B.)',
    phone: '(847) 555-0105',
    audience: 'men',
    service: 'Royal Meray Grooming Package',
    style: 'Executive Pompadour & Shave',
    stylistId: 'stylist-1',
    stylistName: 'Marcus Vance',
    date: getRelativeDate(7),
    time: '10:00 AM',
    price: 70,
    status: 'confirmed',
    notes: 'Pre-vacation grooming'
  },
  {
    id: 'bk-125',
    ref: 'MRY-9325',
    clientName: 'Sample Client 14 (Hannah D.)',
    phone: '(847) 555-0114',
    audience: 'women',
    service: 'Precision Bob & Blowout',
    style: 'Layered Italian Bob',
    stylistId: 'stylist-2',
    stylistName: 'Elena Rostova',
    date: getRelativeDate(8),
    time: '03:00 PM',
    price: 85,
    status: 'pending',
    notes: 'Consultation on curtain bangs'
  }
];

export const INITIAL_SERVICES = [
  // MEN
  { id: 'srv-m-1', audience: 'men', category: 'Haircuts', name: 'Signature Skin Fade', price: 35, duration: 40, icon: 'Scissors', active: true, order: 1 },
  { id: 'srv-m-2', audience: 'men', category: 'Shaves', name: 'Executive Beard Sculpt & Hot Towel', price: 45, duration: 35, icon: 'Sparkles', active: true, order: 2 },
  { id: 'srv-m-3', audience: 'men', category: 'Packages', name: 'Royal Meray Grooming Package', price: 70, duration: 60, icon: 'Crown', active: true, order: 3 },
  { id: 'srv-m-4', audience: 'men', category: 'Treatments', name: 'Tea Tree Scalp Detox & Massage', price: 25, duration: 20, icon: 'Droplets', active: true, order: 4 },

  // WOMEN
  { id: 'srv-w-1', audience: 'women', category: 'Color', name: 'Dimensional Balayage & Gloss', price: 165, duration: 120, icon: 'Sparkles', active: true, order: 1 },
  { id: 'srv-w-2', audience: 'women', category: 'Cuts', name: 'Precision Designer Cut & Blowout', price: 75, duration: 55, icon: 'Scissors', active: true, order: 2 },
  { id: 'srv-w-3', audience: 'women', category: 'Smoothing', name: 'Brazilian Keratin Smoothing', price: 210, duration: 150, icon: 'Shield', active: true, order: 3 },
  { id: 'srv-w-4', audience: 'women', category: 'Color', name: 'Full Foil Blonding & Shadow Root', price: 185, duration: 135, icon: 'Sun', active: true, order: 4 },

  // GIRL
  { id: 'srv-g-1', audience: 'girl', category: 'Styling', name: 'Princess Curls & French Braid', price: 45, duration: 40, icon: 'Heart', active: true, order: 1 },
  { id: 'srv-g-2', audience: 'girl', category: 'Cuts', name: 'Girls Signature Cut & Blowout', price: 38, duration: 35, icon: 'Scissors', active: true, order: 2 },
  { id: 'srv-g-3', audience: 'girl', category: 'Treatments', name: 'Berry Moisture Conditioning Glaze', price: 25, duration: 25, icon: 'Droplet', active: true, order: 3 },
  { id: 'srv-g-4', audience: 'girl', category: 'Party', name: 'Mini Sparkle Glam Party Pack', price: 65, duration: 50, icon: 'Star', active: true, order: 4 },

  // BOY
  { id: 'srv-b-1', audience: 'boy', category: 'Cuts', name: 'Boys Textured Crop', price: 28, duration: 30, icon: 'Scissors', active: true, order: 1 },
  { id: 'srv-b-2', audience: 'boy', category: 'Cuts', name: 'Boys Classic Taper Fade', price: 30, duration: 30, icon: 'Zap', active: true, order: 2 },
  { id: 'srv-b-3', audience: 'boy', category: 'Design', name: 'Freestyle Razor Part / Lightning Art', price: 15, duration: 15, icon: 'Flame', active: true, order: 3 },
  { id: 'srv-b-4', audience: 'boy', category: 'Cuts', name: 'Boys Buzz & Lineup Combo', price: 22, duration: 25, icon: 'Check', active: true, order: 4 }
];

export const INITIAL_STYLES = [
  { id: 'sty-1', audience: 'men', category: 'Fades', name: 'Low Skin Taper', description: 'Clean taper around temples and neckline with textured top.', image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&auto=format&fit=crop&q=80', active: true },
  { id: 'sty-2', audience: 'men', category: 'Classic', name: 'Executive Side Part', description: 'Timeless scissor cut styled with high shine pomade.', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&auto=format&fit=crop&q=80', active: true },
  { id: 'sty-3', audience: 'men', category: 'Modern', name: 'Textured Crop & Mid Fade', description: 'Matte finished blunt fringe with drop fade sides.', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&auto=format&fit=crop&q=80', active: true },
  { id: 'sty-4', audience: 'women', category: 'Color', name: 'Caramel Honey Balayage', description: 'Sun-lit ribbons seamlessly blended into deep espresso roots.', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=500&auto=format&fit=crop&q=80', active: true },
  { id: 'sty-5', audience: 'women', category: 'Cuts', name: 'Italian Butterfly Layers', description: 'Airy volume with cascading face-framing curtains.', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&auto=format&fit=crop&q=80', active: true },
  { id: 'sty-6', audience: 'women', category: 'Cuts', name: 'Micro French Bob', description: 'Sharp chin-length blunt edge with subtle interior movement.', image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&auto=format&fit=crop&q=80', active: true },
  { id: 'sty-7', audience: 'girl', category: 'Braids', name: 'Boho Halo Dutch Braids', description: 'Soft twin crown braids finished with decorative floral pins.', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop&q=80', active: true },
  { id: 'sty-8', audience: 'girl', category: 'Curls', name: 'Glaze Mermaid Waves', description: 'Hydrated bouncy barrel curls with silk shine serum.', image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500&auto=format&fit=crop&q=80', active: true },
  { id: 'sty-9', audience: 'girl', category: 'Cuts', name: 'Classic Bob with Bangs', description: 'Easy-care straight cut with soft forehead fringe.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80', active: true },
  { id: 'sty-10', audience: 'boy', category: 'Modern', name: 'Textured French Crop', description: 'Messy textured top with clean drop taper.', image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=500&auto=format&fit=crop&q=80', active: true },
  { id: 'sty-11', audience: 'boy', category: 'Fade', name: 'High Burst Fade & Quiff', description: 'Dynamic burst fade around ears with swept-up top quiff.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80', active: true },
  { id: 'sty-12', audience: 'boy', category: 'Art', name: 'Dual Razor Stripe Design', description: 'Precision double diagonal stripes on low taper.', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80', active: true }
];

export const INITIAL_GALLERY = [
  { id: 'gal-1', audience: 'men', category: 'Fade', caption: 'Low skin taper & natural wave enhancement', image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80' },
  { id: 'gal-2', audience: 'women', category: 'Balayage', caption: 'Dimensional warm honey balayage over dark roots', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&auto=format&fit=crop&q=80' },
  { id: 'gal-3', audience: 'girl', category: 'Braids', caption: 'Twin Dutch crown braids for special occasion', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&auto=format&fit=crop&q=80' },
  { id: 'gal-4', audience: 'boy', category: 'Textured Crop', caption: 'Clean fade with matte textured crop finish', image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=600&auto=format&fit=crop&q=80' },
  { id: 'gal-5', audience: 'men', category: 'Shave', caption: 'Hot towel straight razor beard sculpting', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80' },
  { id: 'gal-6', audience: 'women', category: 'Blonde', caption: 'Cool vanilla blonde full foil transformation', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&auto=format&fit=crop&q=80' },
  { id: 'gal-7', audience: 'girl', category: 'Curls', caption: 'Hydrated natural ringlet definition', image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&auto=format&fit=crop&q=80' },
  { id: 'gal-8', audience: 'boy', category: 'Hair Art', caption: 'Lightning bolt razor carving on fade', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80' },
  { id: 'gal-9', audience: 'men', category: 'Classic', name: 'Scissor craft scissor cut with pompadour', image: 'https://images.unsplash.com/photo-1517832606589-715753d4be37?w=600&auto=format&fit=crop&q=80' },
  { id: 'gal-10', audience: 'women', category: 'Silk Press', caption: 'Glossy glass hair blowout finish', image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&auto=format&fit=crop&q=80' },
  { id: 'gal-11', audience: 'girl', category: 'Birthday', caption: 'Lavender ribbon party curls', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80' },
  { id: 'gal-12', audience: 'boy', category: 'Taper', caption: 'Gentleman side part with zero taper', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80' }
];

export const INITIAL_BEFORE_AFTER = [
  {
    id: 'ba-1',
    title: 'Precision Mid Fade Transformation',
    audience: 'men',
    beforeImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=700&auto=format&fit=crop&q=80',
    description: 'Transition from overgrown unstyled mop to a razor-sharp mid drop fade with textured crown volume.'
  },
  {
    id: 'ba-2',
    title: 'Warm Honey Balayage Makeover',
    audience: 'women',
    beforeImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=700&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=700&auto=format&fit=crop&q=80',
    description: 'Corrected brassy box dye into a seamless, dimensional golden caramel balayage with high-gloss root tap.'
  }
];

export const INITIAL_OFFERS = [
  {
    id: 'off-1',
    title: 'First-Time Client Welcome VIP',
    badge: 'NEW GUEST SPECIAL',
    promoCode: 'WELCOME20',
    description: 'Enjoy 20% off any signature haircut, fade, or custom salon styling service on your initial visit.',
    audience: 'all',
    validUntil: '2026-12-31',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
    active: true
  },
  {
    id: 'off-2',
    title: 'Father & Son Precision Combo',
    badge: 'POPULAR DUO',
    promoCode: 'FATHERSON',
    description: 'Book together on Tuesday through Thursday and receive complimentary hot towel beard finish + free boy haircut art.',
    audience: 'men',
    validUntil: '2026-12-15',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80',
    active: true
  },
  {
    id: 'off-3',
    title: 'Color Refresh & Gloss Package',
    badge: 'MIDWEEK BLONDING',
    promoCode: 'GLOSS50',
    description: 'Free Olaplex conditioning bond treatment with any full balayage or foil highlight service booked online.',
    audience: 'women',
    validUntil: '2026-11-30',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&auto=format&fit=crop&q=80',
    active: true
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Michael S.',
    rating: 5,
    date: 'Nov 14, 2026',
    audience: 'men',
    status: 'approved',
    comment: 'Best fade in Mt Prospect by far! Marcus takes his time and nails the razor taper every single session.'
  },
  {
    id: 'rev-2',
    author: 'Jennifer B.',
    rating: 5,
    date: 'Nov 12, 2026',
    audience: 'women',
    status: 'approved',
    comment: 'Elena transformed my brassy hair into a rich luminous balayage. The salon vibe is super modern and relaxing.'
  },
  {
    id: 'rev-3',
    author: 'Sarah K. (Liam’s Mom)',
    rating: 5,
    date: 'Nov 09, 2026',
    audience: 'boy',
    status: 'approved',
    comment: 'My 7-year-old used to hate haircuts until Chloe worked her magic. He was so proud of his lightning bolt part!'
  },
  {
    id: 'rev-4',
    author: 'Daniel R.',
    rating: 5,
    date: 'Nov 04, 2026',
    audience: 'men',
    status: 'approved',
    comment: 'The hot towel shave and scalp detox are unreal. Felt like a brand new person walking out.'
  },
  {
    id: 'rev-5',
    author: 'Amanda G.',
    rating: 5,
    date: 'Nov 18, 2026',
    audience: 'women',
    status: 'pending',
    comment: 'Loved the silk press and precision bob. Super clean station and friendly master staff.'
  },
  {
    id: 'rev-6',
    author: 'George M.',
    rating: 4,
    date: 'Nov 19, 2026',
    audience: 'men',
    status: 'pending',
    comment: 'Great cut and lineup. A bit busy on Saturday afternoon so definitely book your time slot in advance.'
  }
];

export const INITIAL_SETTINGS = {
  salonName: 'MERAY HAIR SALON',
  address: '1582 Busse Rd, Mt Prospect, IL 60056, USA',
  phone: '(847) 258-3604',
  email: 'info@merayhairsalon.com',
  instagram: '@merayhairsalon',
  slotLengthMinutes: 30,
  heroAutoplayEnabled: true,
  heroAutoplayInterval: 5,

  // Weekly opening hours
  hours: [
    { day: 'Monday', isOpen: true, openTime: '09:00 AM', closeTime: '07:00 PM' },
    { day: 'Tuesday', isOpen: true, openTime: '09:00 AM', closeTime: '07:00 PM' },
    { day: 'Wednesday', isOpen: true, openTime: '09:00 AM', closeTime: '07:00 PM' },
    { day: 'Thursday', isOpen: true, openTime: '09:00 AM', closeTime: '08:00 PM' },
    { day: 'Friday', isOpen: true, openTime: '09:00 AM', closeTime: '08:00 PM' },
    { day: 'Saturday', isOpen: true, openTime: '08:30 AM', closeTime: '06:00 PM' },
    { day: 'Sunday', isOpen: true, openTime: '10:00 AM', closeTime: '05:00 PM' }
  ],

  // Dynamic hero texts per audience editable from CRM
  heroTexts: {
    men: {
      label: "Men's Grooming",
      priceFrom: 30,
      description: "Precision fades, clean line-ups and hot-towel shaves. Classic barbershop craft with a modern edge.",
      words: ["FADE", "SHAVE", "STYLE"]
    },
    women: {
      label: "Women's Salon",
      priceFrom: 45,
      description: "Custom haircuts, dimensional balayage, vivid colors and luxury blowouts crafted for effortless confidence.",
      words: ["CUT", "COLOR", "GLOW"]
    },
    girl: {
      label: "Girls' Styling",
      priceFrom: 35,
      description: "Fun, gentle styling, curls, braids and signature cuts in a welcoming, stress-free salon chair.",
      words: ["CURL", "BRAID", "SHINE"]
    },
    boy: {
      label: "Boys' Cuts",
      priceFrom: 25,
      description: "Trending crops, clean fades and cool textured cuts for young gentlemen of all ages.",
      words: ["FRESH", "COOL", "CUT"]
    }
  }
};
