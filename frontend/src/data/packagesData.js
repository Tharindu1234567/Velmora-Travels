/* ─────────────────────────────────────────────────────────────
   Packages Page — All editable content lives here.
   Update packages[], filters, hero, perks and cta freely.
───────────────────────────────────────────────────────────── */

// ── 1. Hero Banner ──────────────────────────────────────────
export const heroData = {
  brandLabel: "Velmora Travels",
  title: "Tour Packages",
  subtitle: "Handcrafted Sri Lanka journeys for every kind of explorer — from ancient temples to wild safaris.",
  backgroundImage: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?q=80&w=1600",
  breadcrumb: { home: "Home", current: "Packages" },
};

// ── 2. Section Meta ─────────────────────────────────────────
export const sectionMeta = {
  label: "Explore Sri Lanka",
  heading: "Our Most Popular",
  headingAccent: "Tour Packages",
  subheading:
    "Discover carefully crafted journeys across Sri Lanka — from cultural escapes and wildlife adventures to relaxing beach getaways — designed to suit every traveller.",
};

// ── 3. Filter Tabs ──────────────────────────────────────────
// "id" must match the "category" field used in packages[]
export const filters = [
  { id: "All", label: "All Packages" },
  { id: "Cultural", label: "Cultural" },
  { id: "Nature", label: "Nature & Wildlife" },
  { id: "Beach", label: "Beach & Water" },
  { id: "Heritage", label: "Heritage" },
];

// ── 4. Packages ─────────────────────────────────────────────
export const packages = [
  {
    id: 1,
    category: "Cultural",
    badge: "Best Seller",
    title: "Cultural & Scenic Getaway",
    duration: "3 Nights / 4 Days",
    groupSize: "2 – 8 People",
    price: "From $420",
    image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?q=80&w=800",
    destinations: ["Temple of the Tooth", "Sigiriya Fortress", "Dambulla Caves", "Colombo City"],
    highlights: [
      "Sunrise climb at Sigiriya Rock Fortress",
      "Guided tour of Dambulla Cave Temple",
      "Kandy Esala Perahera cultural experience",
      "Private chauffeur throughout",
    ],
    included: ["Luxury vehicle & chauffeur", "Hotel accommodation", "Daily breakfast", "Entry tickets"],
    href: "/packages/cultural-scenic-getaway",
  },
  {
    id: 2,
    category: "Cultural",
    badge: "Popular",
    title: "Cultural & Hill Country Tour",
    duration: "5 Nights / 6 Days",
    groupSize: "2 – 6 People",
    price: "From $680",
    image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=800",
    destinations: ["Temple of the Tooth", "Tea Plantations", "Ella Train Ride", "Waterfalls", "Colombo City"],
    highlights: [
      "Scenic Kandy–Ella train ride through tea country",
      "Visit to a working tea factory & estate",
      "Horton Plains & World's End hike",
      "Nine Arch Bridge sunrise photography",
    ],
    included: ["Luxury vehicle & chauffeur", "Hotel accommodation", "Daily breakfast", "Train tickets"],
    href: "/packages/cultural-hill-country",
  },
  {
    id: 3,
    category: "Nature",
    badge: "Adventure",
    title: "Nature & Wildlife Tour",
    duration: "7 Nights / 8 Days",
    groupSize: "2 – 10 People",
    price: "From $950",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800",
    destinations: ["Sigiriya Rock", "Yala Safari", "Mirissa Beach", "Galle Fort"],
    highlights: [
      "Jeep safari in Yala for leopard sightings",
      "Whale watching off Mirissa coast",
      "Minneriya elephant gathering",
      "Sunset at the iconic Galle Fort",
    ],
    included: ["Luxury 4×4 & chauffeur", "Boutique hotel stays", "Daily breakfast", "Safari jeep fees"],
    href: "/packages/nature-wildlife",
  },
  {
    id: 4,
    category: "Beach",
    badge: "Relaxing",
    title: "Beach & Coastal Escape",
    duration: "4 Nights / 5 Days",
    groupSize: "2 – 8 People",
    price: "From $540",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800",
    destinations: ["Bentota Beach", "Hikkaduwa Reef", "Mirissa", "Galle Fort"],
    highlights: [
      "Surfing & snorkelling at Hikkaduwa Reef",
      "Bentota River boat safari",
      "Whale watching at Mirissa",
      "Colonial sunset tour of Galle Fort",
    ],
    included: ["Luxury vehicle & chauffeur", "Beachfront resort stays", "Daily breakfast", "Water sport sessions"],
    href: "/packages/beach-coastal",
  },
  {
    id: 5,
    category: "Heritage",
    badge: "Immersive",
    title: "Complete Sri Lanka Experience",
    duration: "11 Nights / 12 Days",
    groupSize: "2 – 6 People",
    price: "From $1,450",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800",
    destinations: ["Ancient Cities", "Tea Trails", "Yala Safari", "Bentota Water Sports"],
    highlights: [
      "Full cultural triangle — Anuradhapura, Polonnaruwa, Sigiriya",
      "Ella to Kandy by luxury scenic train",
      "Exclusive Yala safari experience",
      "Bentota water sports & river cruise",
    ],
    included: ["Private chauffeur guide", "Luxury hotels & resorts", "Full-board meals", "All entry tickets & activities"],
    href: "/packages/complete-sri-lanka",
  },
  {
    id: 6,
    category: "Heritage",
    badge: "Flagship",
    title: "Sri Lanka Heritage & Scenic Tour",
    duration: "13 Nights / 14 Days",
    groupSize: "2 – 6 People",
    price: "From $1,850",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=800",
    destinations: ["Wilpattu Safari", "Ancient Cities", "Sigiriya", "Kandy", "Ella Train", "Galle Beaches"],
    highlights: [
      "Wilpattu National Park — leopard & sloth bear safari",
      "Sacred city of Anuradhapura at dawn",
      "Kandy Esala Perahera cultural show",
      "Riding the most scenic train in Asia — Ella",
    ],
    included: ["Dedicated chauffeur guide", "5-star & boutique hotels", "Full-board meals", "All tickets & private transfers"],
    href: "/packages/heritage-scenic",
  },
];

// ── 5. Perks (Why Book With Us) ─────────────────────────────
export const perks = [
  {
    icon: "FaShieldAlt",
    title: "Safe & Insured",
    desc: "All vehicles are GPS-tracked, fully insured, and operated by certified chauffeurs.",
  },
  {
    icon: "FaHandshake",
    title: "Flexible Booking",
    desc: "Free cancellation up to 48 hours before departure. No questions asked.",
  },
  {
    icon: "FaUserTie",
    title: "Expert Guides",
    desc: "Multilingual professional chauffeur-guides with deep local knowledge.",
  },
  {
    icon: "FaStar",
    title: "Luxury Vehicles",
    desc: "High-end, air-conditioned vehicles — from saloons to luxury 4×4s.",
  },
];

export const perksMeta = {
  label: "Why Book With Us",
  heading: "The Velmora",
  headingAccent: "Difference",
};

// ── 6. CTA Banner ────────────────────────────────────────────
export const ctaData = {
  label: "Can't Find Your Perfect Trip?",
  heading: "Build Your Custom Sri Lanka Journey",
  subheading: "Tell us your dream destinations, travel dates, and preferences — we'll craft a fully personalised itinerary just for you.",
  primaryButton: { label: "Plan My Trip", href: "/contact" },
  secondaryButton: { label: "WhatsApp Us", href: "https://wa.me/94700000000" },
};
