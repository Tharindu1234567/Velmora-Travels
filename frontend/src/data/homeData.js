/* ─────────────────────────────────────────────────────────────
   Home Page Sections Data
   – Testimonials
   – Featured Packages (home preview)
───────────────────────────────────────────────────────────── */

// ── 1. Testimonials ─────────────────────────────────────────
export const testimonialsMeta = {
  label: "What Travellers Say",
  heading: "Real Stories from",
  headingAccent: "Real Explorers",
  subheading: "Don't just take our word for it — hear from the hundreds of happy travellers we've taken across Sri Lanka.",
};

export const testimonials = [
  {
    id: 1,
    name: "James & Sophie Hartley",
    country: "United Kingdom",
    flag: "🇬🇧",
    avatar: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    package: "Cultural & Hill Country Tour",
    quote:
      "Absolutely flawless from start to finish. Our chauffeur Kasun knew every hidden viewpoint on the Kandy–Ella train route. The Nine Arch Bridge at sunrise was a moment we'll never forget. Velmora truly delivered a 5-star experience.",
  },
  {
    id: 2,
    name: "Yuki Tanaka",
    country: "Japan",
    flag: "🇯🇵",
    avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    package: "Nature & Wildlife Tour",
    quote:
      "We spotted three leopards in Yala on day one! The safari guide was incredibly knowledgeable and the luxury tented camp was beyond our expectations. Highest quality tour we've ever taken in Asia.",
  },
  {
    id: 3,
    name: "Marco & Elena Ricci",
    country: "Italy",
    flag: "🇮🇹",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    package: "Complete Sri Lanka Experience",
    quote:
      "12 days, one incredible country. Velmora handled everything perfectly — hotel check-ins, timings, restaurant bookings. We never once had to think about logistics. Just pure immersion in the most beautiful island.",
  },
  {
    id: 4,
    name: "David & Amara Chen",
    country: "Australia",
    flag: "🇦🇺",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    package: "Beach & Coastal Escape",
    quote:
      "The Mirissa whale watching was a highlight of our lives — blue whales right next to the boat! The beach resorts were stunning and our driver/guide was always on time, friendly, and went above and beyond.",
  },
  {
    id: 5,
    name: "Nina Hoffmann",
    country: "Germany",
    flag: "🇩🇪",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    package: "Cultural & Scenic Getaway",
    quote:
      "Sigiriya at sunrise was absolutely magical — we were at the top before the crowds arrived. Perfect 4-day introduction to Sri Lanka. The entire team was responsive, professional, and genuinely caring.",
  },
  {
    id: 6,
    name: "The Fernandez Family",
    country: "Canada",
    flag: "🇨🇦",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    package: "Sri Lanka Heritage & Scenic Tour",
    quote:
      "Travelled with our two kids (8 and 12) and Velmora made it work beautifully. Child-friendly pacing, great food recommendations, and every hotel had the amenities we needed. We'll be back for sure!",
  },
];

// ── 2. Home Featured Packages ────────────────────────────────
export const featuredPackagesMeta = {
  label: "Curated Journeys",
  heading: "Popular",
  headingAccent: "Packages",
  subheading: "Hand-picked tours for every kind of traveller — luxury, adventure, cultural and beach.",
  viewAllLabel: "View All Packages",
  viewAllHref: "/packages",
};

// IDs must match packagesData.js packages[].id
export const featuredPackageIds = [1, 3, 4, 5];
