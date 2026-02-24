/* ─────────────────────────────────────────────────────────────
   Tour Page — All editable content lives here.
   destinations[] drives BOTH the map pins AND the cost calculator.
───────────────────────────────────────────────────────────── */

// ── 1. Hero ─────────────────────────────────────────────────
export const heroData = {
  brandLabel: "Velmora Travels",
  title: "Explore Sri Lanka",
  subtitle: "Pick your destinations on the map, build your custom route, and get an instant price estimate.",
  backgroundImage: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1600",
  breadcrumb: { home: "Home", current: "Tour Planner" },
};

// ── 2. Section meta ─────────────────────────────────────────
export const plannerMeta = {
  label: "Plan Your Journey",
  heading: "Build Your",
  headingAccent: "Custom Route",
  subheading: "Click destinations on the map to add them to your itinerary. Prices update in real time.",
};

// ── 3. Destinations / Map Pins ──────────────────────────────
// x / y are percentages of the SVG map viewBox (0-100)
// pricePerPerson is in USD per person per night (used by cost calc)
export const destinations = [
  {
    id: "colombo",
    name: "Colombo",
    region: "Western",
    icon: "FaCity",
    x: 22,
    y: 63,
    nights: 1,
    pricePerNight: 120,
    description: "Sri Lanka's bustling commercial capital — colonial architecture, vibrant markets, and seaside promenades.",
    image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=600",
    highlights: ["Gangaramaya Temple", "Pettah Market", "Galle Face Green", "National Museum"],
  },
  {
    id: "kandy",
    name: "Kandy",
    region: "Central",
    icon: "FaLandmark",
    x: 44,
    y: 42,
    nights: 2,
    pricePerNight: 150,
    description: "The cultural capital, home to the sacred Temple of the Tooth Relic and lush highland scenery.",
    image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?q=80&w=600",
    highlights: ["Temple of the Tooth", "Royal Botanical Gardens", "Kandy Lake", "Cultural Dance Show"],
  },
  {
    id: "sigiriya",
    name: "Sigiriya",
    region: "North Central",
    icon: "FaMountain",
    x: 52,
    y: 28,
    nights: 1,
    pricePerNight: 180,
    description: "An ancient rock fortress rising 200m above the jungle — a UNESCO World Heritage Site.",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=600",
    highlights: ["Sigiriya Rock Climb", "Lion's Paw Terrace", "Frescoes Gallery", "Pidurangala Rock"],
  },
  {
    id: "dambulla",
    name: "Dambulla",
    region: "North Central",
    icon: "FaPrayingHands",
    x: 46,
    y: 31,
    nights: 1,
    pricePerNight: 130,
    description: "Home to the famous Cave Temple complex — five caves filled with stunning Buddhist murals and statues.",
    image: "https://images.unsplash.com/photo-1580181870297-e4d0c25a8567?q=80&w=600",
    highlights: ["Golden Rock Cave Temple", "Dambulla Lake", "Rangiri Dambulla Cave", "Minneriya National Park"],
  },
  {
    id: "anuradhapura",
    name: "Anuradhapura",
    region: "North Central",
    icon: "FaMonument",
    x: 38,
    y: 18,
    nights: 2,
    pricePerNight: 140,
    description: "One of the ancient capitals of Sri Lanka — sprawling ruins, sacred Bodhi tree, and ancient dagobas.",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600",
    highlights: ["Sri Maha Bodhi Tree", "Ruwanwelisaya", "Abhayagiri Monastery", "Isurumuniya Temple"],
  },
  {
    id: "ella",
    name: "Ella",
    region: "Uva",
    icon: "FaTrain",
    x: 58,
    y: 56,
    nights: 2,
    pricePerNight: 160,
    description: "A misty mountain village famous for the Nine Arch Bridge, dramatic hikes, and scenic train rides.",
    image: "https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?q=80&w=600",
    highlights: ["Nine Arch Bridge", "Little Adam's Peak", "Ella Rock Hike", "Scenic Train Ride"],
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    region: "Central",
    icon: "FaLeaf",
    x: 50,
    y: 51,
    nights: 2,
    pricePerNight: 155,
    description: 'Sri Lanka\'s "Little England" — rolling tea estates, waterfalls, and cool misty air at 1,868m elevation.',
    image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=600",
    highlights: ["Tea Factory Visit", "Horton Plains Hike", "World's End", "Gregory Lake"],
  },
  {
    id: "yala",
    name: "Yala",
    region: "Southern",
    icon: "FaPaw",
    x: 62,
    y: 76,
    nights: 2,
    pricePerNight: 220,
    description: "Sri Lanka's premier wildlife sanctuary — the world's highest density of leopards plus elephants, sloth bears, and crocodiles.",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=600",
    highlights: ["Leopard Safari", "Elephant Herds", "Sloth Bear Sighting", "Bird Watching"],
  },
  {
    id: "mirissa",
    name: "Mirissa",
    region: "Southern",
    icon: "FaWater",
    x: 44,
    y: 88,
    nights: 2,
    pricePerNight: 175,
    description: "A palm-fringed beach paradise renowned for world-class whale watching and crescent-shaped golden sands.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600",
    highlights: ["Blue Whale Watching", "Coconut Tree Hill", "Surfing", "Parrot Rock Sunset"],
  },
  {
    id: "galle",
    name: "Galle",
    region: "Southern",
    icon: "FaFortAwesome",
    x: 34,
    y: 85,
    nights: 1,
    pricePerNight: 190,
    description: "A UNESCO-listed Dutch colonial fort town on a rocky peninsula — charming cafes, boutiques, and rampart sunsets.",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=600",
    highlights: ["Galle Fort Ramparts", "Dutch Reformed Church", "Lighthouse", "Jungle Beach"],
  },
  {
    id: "bentota",
    name: "Bentota",
    region: "Western",
    icon: "FaUmbrellaBeach",
    x: 25,
    y: 74,
    nights: 2,
    pricePerNight: 200,
    description: "Sri Lanka's water sports capital — pristine beaches, river safaris, and luxurious beach resorts.",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=600",
    highlights: ["Water Sports Hub", "Bentota River Safari", "Brief Garden", "Turtle Hatchery"],
  },
  {
    id: "trincomalee",
    name: "Trincomalee",
    region: "Eastern",
    icon: "FaAnchor",
    x: 66,
    y: 22,
    nights: 2,
    pricePerNight: 165,
    description: "Home to one of the world's finest natural harbours — hidden coves, hot springs, and whale shark snorkelling.",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=600",
    highlights: ["Nilaveli Beach", "Pigeon Island Snorkelling", "Koneswaram Temple", "Kanniya Hot Springs"],
  },
];

// ── 4. Cost Calculator Config ────────────────────────────────
export const costConfig = {
  baseTransferCost: 50, // USD flat base per destination added
  perKmCost: 0.8, // USD per km (approx road distance)
  chauffeurDayRate: 65, // USD per full travel day
  accommodationTiers: [
    { id: "budget", label: "Budget", multiplier: 0.6 },
    { id: "standard", label: "Standard", multiplier: 1.0 },
    { id: "luxury", label: "Luxury", multiplier: 1.8 },
    { id: "ultra", label: "Ultra Lux", multiplier: 2.8 },
  ],
  mealsTiers: [
    { id: "breakfast", label: "Breakfast Only", pricePerDay: 0 },
    { id: "half", label: "Half Board", pricePerDay: 25 },
    { id: "full", label: "Full Board", pricePerDay: 55 },
  ],
  // rough km between destinations (symmetric)
  distances: {
    "colombo-kandy": 116,
    "colombo-bentota": 65,
    "colombo-galle": 125,
    "kandy-sigiriya": 88,
    "kandy-dambulla": 75,
    "kandy-nuwara-eliya": 77,
    "kandy-ella": 140,
    "sigiriya-dambulla": 20,
    "sigiriya-anuradhapura": 65,
    "dambulla-anuradhapura": 60,
    "ella-yala": 100,
    "ella-mirissa": 110,
    "nuwara-eliya-ella": 55,
    "yala-galle": 120,
    "mirissa-galle": 25,
    "galle-bentota": 65,
    "trincomalee-sigiriya": 110,
    "trincomalee-anuradhapura": 105,
  },
};

// ── 5. Tour Highlights (below map section) ───────────────────
export const tourHighlights = [
  { icon: "FaMapMarkedAlt", value: "12+", label: "Destinations" },
  { icon: "FaRoad", value: "2,000km", label: "Scenic Routes" },
  { icon: "FaCar", value: "100%", label: "Private Chauffeur" },
  { icon: "FaStar", value: "4.9★", label: "Customer Rating" },
];

// ── 6. CTA ───────────────────────────────────────────────────
export const ctaData = {
  label: "Ready to Hit the Road?",
  heading: "Turn Your Route Into Reality",
  subheading: "Share your custom plan with us — our team will refine the itinerary and confirm your booking within 24 hours.",
  primaryButton: { label: "Get a Quote", href: "/contact" },
  secondaryButton: { label: "WhatsApp Us", href: "https://wa.me/94700000000" },
};
