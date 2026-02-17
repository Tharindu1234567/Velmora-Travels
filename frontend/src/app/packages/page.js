"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FaShieldAlt,
  FaStar,
  FaUserTie,
  FaHandshake,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
  FaWhatsapp,
  FaChevronDown,
} from "react-icons/fa";
import { heroData, sectionMeta, filters, packages, perks, perksMeta, ctaData } from "@/data/packagesData";

/* ── icon map ────────────────────────────────────────────── */
const iconMap = {
  FaShieldAlt: <FaShieldAlt className="text-xl" />,
  FaHandshake: <FaHandshake className="text-xl" />,
  FaUserTie: <FaUserTie className="text-xl" />,
  FaStar: <FaStar className="text-xl" />,
};

/* ── animation helpers ───────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

/* ── badge colour map ────────────────────────────────────── */
const badgeColor = {
  "Best Seller": "bg-[#FFD700] text-gray-900",
  Popular: "bg-orange-500 text-white",
  Adventure: "bg-emerald-500 text-white",
  Relaxing: "bg-sky-500 text-white",
  Immersive: "bg-violet-500 text-white",
  Flagship: "bg-rose-500 text-white",
};

/* ── Package Card ─────────────────────────────────────────── */
function PackageCard({ pkg, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      {...scaleIn(index * 0.07)}
      whileHover={{ y: -7, transition: { duration: 0.22 } }}
      className="group bg-white rounded-[26px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.13)] transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-56 sm:h-60 overflow-hidden">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Badge */}
        {pkg.badge && (
          <span
            className={`absolute top-4 left-4 text-[11px] font-bold tracking-wide px-3 py-1 rounded-full backdrop-blur-sm ${badgeColor[pkg.badge] ?? "bg-gray-800 text-white"}`}
          >
            {pkg.badge}
          </span>
        )}

        {/* Category chip top-right */}
        <span className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full">
          {pkg.category}
        </span>

        {/* Bottom info strip on image */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-8 flex items-end justify-between">
          <div>
            <p className="text-white font-bold text-[16px] sm:text-[17px] leading-snug drop-shadow">{pkg.title}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-white/80 text-[11px]">
                <FaClock className="text-orange-300 shrink-0" />
                {pkg.duration}
              </span>
              <span className="w-px h-3 bg-white/30" />
              <span className="flex items-center gap-1 text-white/80 text-[11px]">
                <FaUsers className="text-orange-300 shrink-0" />
                {pkg.groupSize}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-[10px] px-3 py-1.5 shadow-lg shrink-0">
            <span className="text-sm font-extrabold text-gray-900 tracking-tight">{pkg.price}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6 flex flex-col flex-1 gap-3.5">
        {/* Destinations */}
        <div className="flex flex-wrap gap-1.5">
          {pkg.destinations.slice(0, 3).map((d, i) => (
            <span
              key={i}
              className="flex items-center gap-1 bg-orange-50 border border-orange-100 text-orange-700 text-[11px] font-medium rounded-full px-2.5 py-0.5"
            >
              <FaMapMarkerAlt className="text-orange-400 text-[9px] shrink-0" />
              {d}
            </span>
          ))}
          {pkg.destinations.length > 3 && (
            <span className="bg-gray-100 text-gray-500 text-[11px] font-medium rounded-full px-2.5 py-0.5">+{pkg.destinations.length - 3} more</span>
          )}
        </div>

        {/* Expandable highlights */}
        <div>
          <button
            onClick={() => setOpen((p) => !p)}
            className="flex items-center gap-1.5 text-orange-500 text-[12px] font-semibold hover:text-orange-600 transition-colors group/btn"
          >
            <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <FaChevronDown className="text-[10px]" />
            </motion.span>
            {open ? "Hide highlights" : "View highlights"}
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                key="highlights"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden mt-2.5 flex flex-col gap-2"
              >
                {pkg.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-[12px] leading-relaxed">
                    <FaCheckCircle className="text-orange-400 mt-0.5 shrink-0 text-[11px]" />
                    {h}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 mt-auto pt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
            <FaCheckCircle className="text-emerald-400 shrink-0" />
            <span className="line-clamp-1">{pkg.included[0]}</span>
          </div>

          <Link href={pkg.href}>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-[12px] font-semibold px-4 py-2 rounded-full cursor-pointer shadow-sm shadow-orange-200"
            >
              View Package <FaArrowRight className="text-[9px]" />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function PackagesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? packages : packages.filter((p) => p.category === activeFilter);

  return (
    <main className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative h-[55vh]  sm:h-[60vh] md:h-[65vh] w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 mx-10 rounded-t-[30px] rounded-b-[20px] bg-cover bg-center scale-100"
          style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        />
        <div className="absolute inset-0 mx-10 rounded-t-[30px] rounded-b-[20px] bg-gradient-to-b from-black/60 via-black/50 to-black/75" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.p {...fadeUp(0.1)} className="text-[#FFD700] text-xs sm:text-sm tracking-[4px] uppercase font-semibold mb-3">
            {heroData.brandLabel}
          </motion.p>
          <motion.h1 {...fadeUp(0.25)} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {heroData.title}
          </motion.h1>
          <motion.p {...fadeUp(0.4)} className="mt-4 text-white/70 text-sm sm:text-base md:text-[17px] max-w-xl mx-auto leading-relaxed">
            {heroData.subtitle}
          </motion.p>
          <motion.div {...fadeUp(0.5)} className="mt-6 flex items-center justify-center gap-2 text-white/50 text-xs sm:text-sm">
            <span className="hover:text-white cursor-pointer transition-colors">{heroData.breadcrumb.home}</span>
            <span>/</span>
            <span className="text-[#FFD700]">{heroData.breadcrumb.current}</span>
          </motion.div>
        </div>

        {/* wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
            <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── 2. PACKAGES GRID ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        {/* Section heading */}
        <motion.div {...fadeUp(0.1)} className="text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 text-[#FFD700] text-[11px] tracking-[4px] uppercase font-semibold">
            <span className="w-6 h-px bg-[#FFD700]" />
            {sectionMeta.label}
            <span className="w-6 h-px bg-[#FFD700]" />
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {sectionMeta.heading}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{sectionMeta.headingAccent}</span>
          </h2>
          <p className="mt-4 text-gray-500 text-[14px] sm:text-[15px] max-w-xl mx-auto leading-relaxed">{sectionMeta.subheading}</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div {...fadeUp(0.2)} className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2 bg-gray-100 rounded-full p-1.5">
            {filters.map((f) => (
              <motion.button
                key={f.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(f.id)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 ${
                  activeFilter === f.id
                    ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-md shadow-orange-300/40"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-gray-400">
            No packages found in this category.
          </motion.div>
        )}
      </section>

      {/* ── 3. FEATURED DARK BANNER ──────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 pb-16 sm:pb-20">
        <motion.div
          {...scaleIn(0.1)}
          className="max-w-7xl mx-auto relative rounded-[28px] sm:rounded-[36px] overflow-hidden"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1600)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 py-14 sm:py-16 px-8 sm:px-12 md:px-16">
            <div className="text-center md:text-left max-w-lg">
              <motion.p
                {...fadeUp(0.15)}
                className="inline-flex items-center gap-2 text-[#FFD700] text-[11px] tracking-[4px] uppercase font-semibold mb-3"
              >
                <span className="w-5 h-px bg-[#FFD700]" /> Our Flagship Journey
              </motion.p>
              <motion.h2 {...fadeUp(0.25)} className="text-2xl sm:text-3xl md:text-[2.4rem] font-bold text-white leading-tight tracking-tight">
                Complete Sri Lanka in <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">14 Unforgettable Days</span>
              </motion.h2>
              <motion.p {...fadeUp(0.35)} className="mt-4 text-white/60 text-[14px] sm:text-[15px] leading-relaxed max-w-md">
                Ancient kingdoms, misty highlands, wild safaris, and sun-kissed beaches — everything Sri Lanka has to offer in one seamless luxury
                journey.
              </motion.p>

              <motion.div {...fadeUp(0.45)} className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start">
                {["Ancient Cities", "Safari", "Tea Trails", "Beaches"].map((tag, i) => (
                  <span
                    key={i}
                    className="bg-white/10 border border-white/15 text-white/75 text-[11px] font-medium tracking-wide px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div {...fadeUp(0.3)} className="shrink-0 flex flex-col items-center gap-4">
              <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-[20px] px-8 py-5">
                <p className="text-white/60 text-xs mb-1">Starting From</p>
                <p className="text-4xl font-bold text-white">$1,850</p>
                <p className="text-white/50 text-xs mt-1">per person</p>
              </div>
              <Link href="/packages/heritage-scenic" className="w-full">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center gap-2 w-full px-8 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-semibold cursor-pointer"
                >
                  View Package <FaArrowRight className="text-xs" />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── 4. PERKS ─────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp(0.1)} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[#FFD700] text-[11px] tracking-[4px] uppercase font-semibold">
              <span className="w-6 h-px bg-[#FFD700]" />
              {perksMeta.label}
              <span className="w-6 h-px bg-[#FFD700]" />
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {perksMeta.heading}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{perksMeta.headingAccent}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                {...scaleIn(i * 0.08)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-[22px] p-6 sm:p-7 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">
                  {iconMap[perk.icon]}
                </div>
                <h3 className="text-gray-900 font-semibold text-[16px]">{perk.title}</h3>
                <p className="text-gray-500 text-[13px] sm:text-[14px] leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-20">
        <motion.div
          {...scaleIn(0.1)}
          className="max-w-7xl mx-auto relative bg-gray-900 rounded-[28px] sm:rounded-[36px] overflow-hidden py-14 sm:py-16 px-8 sm:px-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Glow circles */}
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-orange-500 opacity-10 -translate-x-28 -translate-y-28 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-[#FFD700] opacity-5 translate-x-20 translate-y-20 pointer-events-none" />

          <div className="relative text-center md:text-left">
            <motion.p
              {...fadeUp(0.2)}
              className="inline-flex items-center gap-2 text-[#FFD700] text-[11px] tracking-[4px] uppercase font-semibold mb-3"
            >
              <span className="w-5 h-px bg-[#FFD700]" /> {ctaData.label}
            </motion.p>
            <motion.h2 {...fadeUp(0.3)} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
              {ctaData.heading}
            </motion.h2>
            <motion.p {...fadeUp(0.4)} className="text-white/55 text-[14px] sm:text-[15px] mt-3 max-w-md leading-relaxed">
              {ctaData.subheading}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative flex flex-col sm:flex-row gap-3 shrink-0"
          >
            <motion.a
              href={ctaData.primaryButton.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-semibold shadow-lg"
            >
              {ctaData.primaryButton.label} <FaArrowRight className="text-xs" />
            </motion.a>
            <motion.a
              href={ctaData.secondaryButton.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <FaWhatsapp className="text-green-400 text-base" />
              {ctaData.secondaryButton.label}
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
