/* ─────────────────────────────────────────────────────────────
   About Us Page — All editable content lives here.
   Icons are referenced by string key; the page maps them to
   the actual react-icons components.
───────────────────────────────────────────────────────────── */

// ── 1. Hero Banner ──────────────────────────────────────────
export const heroData = {
  brandLabel: "Velmora Travels",
  title: "About Us",
  subtitle: "Crafting unforgettable journeys across the pearl of the Indian Ocean.",
  backgroundImage: "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=1600",
  breadcrumb: { home: "Home", current: "About Us" },
};

// ── 2. Our Story ────────────────────────────────────────────
export const storyData = {
  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
  imageAlt: "Our Story",
  floatingCard: { value: "4.9 / 5", label: "Client Rating" },
  label: "Our Story",
  heading: "A Journey Born From",
  headingAccent: "Passion",
  paragraphs: [
    "Founded in 2016, Velmora Travels was built on a simple belief — travel should be effortless, memorable, and extraordinary. What started as a small fleet of two vehicles has grown into Sri Lanka's most trusted premium travel service.",
    "We serve discerning travellers from across the globe who expect nothing short of excellence. Every route we plan, every chauffeur we hire, and every detail we curate reflects our unwavering commitment to your experience.",
  ],
};

// ── 3. Highlights (checklist inside Our Story) ──────────────
export const highlights = [
  "Award-winning luxury travel operator in Sri Lanka",
  "Fleet of premium, GPS-tracked vehicles",
  "Multilingual professional chauffeurs",
  "Customised itineraries for every budget",
  "Partnered with leading luxury hotels & resorts",
];

// ── 4. Stats Bar ────────────────────────────────────────────
export const stats = [
  { value: "8+", label: "Years of Experience" },
  { value: "2K+", label: "Happy Travellers" },
  { value: "50+", label: "Destinations" },
  { value: "4.9★", label: "Average Rating" },
];

// ── 5. Mission & Vision ──────────────────────────────────────
export const missionVision = {
  sectionLabel: "Our Purpose",
  sectionHeading: "Mission & Vision",
  mission: {
    label: "Mission",
    title: "Elevating Every Journey",
    desc: "To provide seamless, premium travel experiences in Sri Lanka by combining professional expertise, luxury vehicles, and genuine hospitality — making every trip extraordinary from the first moment to the last.",
  },
  vision: {
    label: "Vision",
    title: "Sri Lanka's #1 Luxury Experience",
    desc: "To be recognised globally as Sri Lanka's most trusted and innovative luxury travel partner, setting the standard for excellence in tourist transportation and immersive cultural experiences.",
  },
};

// ── 6. Core Values ───────────────────────────────────────────
// icon: string key — mapped to react-icons in the page component
export const values = [
  {
    icon: "FaShieldAlt",
    title: "Safety First",
    desc: "Every journey is planned with your safety as the top priority — from vetted drivers to insured vehicles.",
  },
  {
    icon: "FaStar",
    title: "Premium Comfort",
    desc: "Travel in high-end, air-conditioned vehicles with professional chauffeurs dedicated to your comfort.",
  },
  {
    icon: "FaMapMarkedAlt",
    title: "Local Expertise",
    desc: "Our team has deep roots in Sri Lanka — we know the hidden gems, the best routes, and the local culture.",
  },
  {
    icon: "MdSupportAgent",
    title: "24 / 7 Support",
    desc: "We're always available before, during, and after your trip to ensure everything goes smoothly.",
  },
  {
    icon: "MdLuggage",
    title: "Tailored Packages",
    desc: "No two journeys are alike. We craft fully personalised itineraries that match your travel goals.",
  },
  {
    icon: "FaUserTie",
    title: "Professional Team",
    desc: "From chauffeurs to travel consultants, every member of our team is trained to exceed expectations.",
  },
];

export const valuesSectionMeta = {
  label: "What We Stand For",
  heading: "Our Core Values",
  subheading: "Six pillars that define every service we deliver and every experience we create.",
};

// ── 7. Team ──────────────────────────────────────────────────
export const team = [
  {
    name: "Arjun Perera",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Nimali de Silva",
    role: "Head of Operations",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Kasun Fernando",
    role: "Lead Travel Consultant",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  },
];

export const teamSectionMeta = {
  label: "The People Behind It",
  heading: "Meet Our Team",
  subheading: "Passionate travel professionals dedicated to making your Sri Lanka experience unforgettable.",
};

// ── 8. CTA Banner ────────────────────────────────────────────
export const ctaData = {
  label: "Ready to Explore?",
  heading: "Plan Your Dream Sri Lanka Journey",
  subheading: "Let our experts craft a personalised itinerary just for you — from serene beaches to misty highlands.",
  bookButton: { label: "Book Now", href: "/contact" },
  whatsappButton: { label: "WhatsApp", href: "https://wa.me/94700000000" },
};
