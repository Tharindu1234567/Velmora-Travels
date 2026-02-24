"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaArrowRight,
  FaWhatsapp,
  FaStar,
  FaCalendarAlt,
  FaTag,
  FaChevronLeft,
  FaShieldAlt,
  FaHandshake,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { packages } from "@/data/packagesData";

/* ── animation helpers ───────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});
const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.94 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

/* ── badge colours ───────────────────────────────────────── */
const badgeColor = {
  "Best Seller": "bg-[#FFD700] text-gray-900",
  Popular: "bg-blue-500 text-white",
  Adventure: "bg-emerald-500 text-white",
  Relaxing: "bg-sky-500 text-white",
  Immersive: "bg-violet-500 text-white",
  Flagship: "bg-rose-500 text-white",
};

const categoryColor = {
  Cultural: "bg-amber-50  text-amber-700  border-amber-200",
  Nature: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Beach: "bg-cyan-50   text-cyan-700   border-cyan-200",
  Heritage: "bg-rose-50   text-rose-700   border-rose-200",
};

/* ── related packages ────────────────────────────────────── */
function RelatedCard({ pkg }) {
  return (
    <motion.div
      {...scaleIn(0.05)}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-400 flex flex-col"
    >
      <div className="relative h-44 overflow-hidden shrink-0">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {pkg.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${badgeColor[pkg.badge] ?? "bg-gray-800 text-white"}`}
          >
            {pkg.badge}
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white font-bold text-[14px] leading-snug">{pkg.title}</p>
          <p className="text-white/70 text-[11px] mt-0.5">{pkg.duration}</p>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <p className="text-orange-500 font-extrabold text-[15px]">{pkg.price}</p>
        <div className="flex flex-wrap gap-1.5">
          {pkg.destinations.slice(0, 2).map((d, i) => (
            <span
              key={i}
              className="text-[10px] text-orange-600 bg-orange-50 border border-orange-100 rounded-full px-2 py-0.5 flex items-center gap-1"
            >
              <FaMapMarkerAlt className="text-[8px]" /> {d}
            </span>
          ))}
        </div>
        <Link href={pkg.href} className="mt-auto">
          <motion.span
            whileHover={{ x: 4 }}
            className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 text-[12px] font-semibold cursor-pointer transition-colors"
          >
            View Package <FaArrowRight className="text-[9px]" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function PackageDetailPage({ params }) {
  const slug = params?.slug;
  const pkg = packages.find((p) => p.href === `/packages/${slug}`);

  if (!pkg) notFound();

  const related = packages.filter((p) => p.id !== pkg.id && p.category === pkg.category).slice(0, 3);

  return (
    <main className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <PageHero
        backgroundImage={pkg.image}
        brandLabel={pkg.category}
        title={pkg.title}
        subtitle={`${pkg.duration}  ·  ${pkg.groupSize}`}
        breadcrumb={{ home: "Packages", current: pkg.title }}
        stats={[
          { value: pkg.price.replace("From ", ""), label: "Per Person" },
          { value: pkg.duration.split(" / ")[0], label: "Nights" },
          { value: pkg.groupSize.split(" – ")[1] ?? pkg.groupSize, label: "Max Group" },
        ]}
        height="h-[65vh] sm:h-[70vh] md:h-[75vh]"
      />

      {/* ── BACK LINK ────────────────────────────────────────── */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full mt-8">
        <Link href="/packages">
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            <FaChevronLeft className="text-[10px]" /> Back to Packages
          </motion.span>
        </Link>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <article className="py-10 sm:py-14 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-10 xl:gap-14 items-start">
          {/* ── Left column ──────────────────────────────────── */}
          <div className="flex flex-col gap-10">
            {/* Meta bar */}
            <motion.div {...fadeUp(0.05)} className="flex flex-wrap items-center gap-3">
              {pkg.badge && (
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${badgeColor[pkg.badge] ?? "bg-gray-700 text-white"}`}>
                  {pkg.badge}
                </span>
              )}
              <span
                className={`text-[11px] font-semibold border rounded-full px-3 py-1 ${categoryColor[pkg.category] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}
              >
                {pkg.category}
              </span>
              <span className="flex items-center gap-1.5 text-gray-500 text-[13px]">
                <FaClock className="text-orange-400" /> {pkg.duration}
              </span>
              <span className="flex items-center gap-1.5 text-gray-500 text-[13px]">
                <FaUsers className="text-orange-400" /> {pkg.groupSize}
              </span>
              <span className="flex items-center gap-1.5 text-orange-500 font-bold text-[15px] ml-auto">
                <FaTag className="text-[12px]" /> {pkg.price}
              </span>
            </motion.div>

            {/* Destinations */}
            <motion.div {...fadeUp(0.1)}>
              <h2 className="text-[13px] font-bold text-gray-400 uppercase tracking-[3px] mb-3">Destinations</h2>
              <div className="flex flex-wrap gap-2">
                {pkg.destinations.map((d, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-orange-700 text-[12px] font-medium rounded-full px-3 py-1.5"
                  >
                    <FaMapMarkerAlt className="text-orange-400 text-[10px] shrink-0" />
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div {...fadeUp(0.15)}>
              <span className="inline-flex items-center gap-2 text-[#FFD700] text-[11px] tracking-[4px] uppercase font-semibold mb-4">
                <span className="w-5 h-px bg-[#FFD700]" /> Highlights
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-5">
                What You&apos;ll <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Experience</span>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    className="flex items-start gap-3 bg-gray-50 rounded-[14px] px-4 py-3.5 border border-gray-100"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                      <FaStar className="text-white text-[7px]" />
                    </div>
                    <span className="text-gray-700 text-[13px] leading-relaxed">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* What's Included */}
            <motion.div {...fadeUp(0.2)}>
              <span className="inline-flex items-center gap-2 text-[#FFD700] text-[11px] tracking-[4px] uppercase font-semibold mb-4">
                <span className="w-5 h-px bg-[#FFD700]" /> What&apos;s Included
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-5">
                Everything <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Taken Care Of</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.included.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-center gap-3 p-4 rounded-[14px] bg-white border border-gray-100 shadow-sm"
                  >
                    <FaCheckCircle className="text-emerald-500 text-base shrink-0" />
                    <span className="text-gray-700 text-[13px] font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Why book trust row */}
            <motion.div {...fadeUp(0.25)} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: FaShieldAlt, title: "Safe & Insured", desc: "GPS-tracked, fully insured vehicles" },
                { icon: FaHandshake, title: "Free Cancellation", desc: "Up to 48 hours before departure" },
                { icon: FaUmbrellaBeach, title: "100% Private", desc: "No shared tours — ever" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-[16px] bg-gray-50 border border-gray-100">
                  <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shrink-0">
                    <item.icon className="text-sm" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-[13px]">{item.title}</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right sidebar (sticky) ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:sticky lg:top-6 flex flex-col gap-4"
          >
            {/* Booking card */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-md overflow-hidden">
              {/* Card header */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-5">
                <p className="text-white/60 text-[11px] uppercase tracking-widest mb-1">Starting from</p>
                <p className="text-4xl font-extrabold text-white tracking-tight">{pkg.price.replace("From ", "")}</p>
                <p className="text-white/50 text-[12px] mt-1">per person · private tour</p>
              </div>

              {/* Quick facts */}
              <div className="px-6 py-4 flex flex-col gap-3 border-b border-gray-100">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-2 text-gray-500">
                    <FaClock className="text-orange-400" /> Duration
                  </span>
                  <span className="font-semibold text-gray-900">{pkg.duration}</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-2 text-gray-500">
                    <FaUsers className="text-orange-400" /> Group size
                  </span>
                  <span className="font-semibold text-gray-900">{pkg.groupSize}</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-2 text-gray-500">
                    <FaCalendarAlt className="text-orange-400" /> Availability
                  </span>
                  <span className="font-semibold text-emerald-600">Year Round</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-2 text-gray-500">
                    <FaTag className="text-orange-400" /> Category
                  </span>
                  <span className="font-semibold text-gray-900">{pkg.category}</span>
                </div>
              </div>

              {/* Included summary */}
              <div className="px-6 py-4 flex flex-col gap-2 border-b border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Included</p>
                {pkg.included.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px] text-gray-600">
                    <FaCheckCircle className="text-emerald-500 shrink-0 text-[10px]" />
                    {inc}
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="px-6 py-5 flex flex-col gap-3">
                <Link href="/contact">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-bold shadow-md shadow-orange-200 cursor-pointer"
                  >
                    Book This Package <FaArrowRight className="text-[10px]" />
                  </motion.span>
                </Link>
                <a href="https://wa.me/94700000000" target="_blank" rel="noreferrer">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-gray-200 text-gray-700 hover:border-green-400 hover:text-green-600 text-sm font-semibold transition-colors cursor-pointer"
                  >
                    <FaWhatsapp className="text-green-500 text-base" /> Ask on WhatsApp
                  </motion.span>
                </a>
                <p className="text-center text-gray-400 text-[11px] mt-1">Free cancellation up to 48h before</p>
              </div>
            </div>

            {/* Rating card */}
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4">
              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 rounded-[14px] w-14 h-14 shrink-0">
                <span className="text-white font-extrabold text-lg leading-none">4.9</span>
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-white text-[7px]" />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-[13px]">Exceptional Rating</p>
                <p className="text-gray-400 text-[12px] mt-0.5">Based on 200+ verified reviews</p>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* ── RELATED PACKAGES ─────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-14 sm:py-18 px-4 sm:px-8 md:px-12 lg:px-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp(0.05)} className="flex items-end justify-between mb-8 sm:mb-10">
              <div>
                <span className="inline-flex items-center gap-2 text-[#FFD700] text-[11px] tracking-[4px] uppercase font-semibold">
                  <span className="w-5 h-px bg-[#FFD700]" /> Similar Packages
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  You Might Also <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Like</span>
                </h2>
              </div>
              <Link href="/packages">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  className="hidden sm:flex items-center gap-2 text-orange-500 hover:text-orange-600 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  All Packages <FaArrowRight className="text-[10px]" />
                </motion.span>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {related.map((p) => (
                <RelatedCard key={p.id} pkg={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA STRIP ────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-20">
        <motion.div
          {...scaleIn(0.1)}
          className="max-w-7xl mx-auto relative bg-gray-900 rounded-[28px] sm:rounded-[36px] overflow-hidden py-12 sm:py-14 px-8 sm:px-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-orange-500 opacity-[0.08] pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#FFD700] opacity-[0.05] blur-2xl pointer-events-none" />

          <div className="relative text-center md:text-left">
            <p className="inline-flex items-center gap-2 text-[#FFD700] text-[11px] tracking-[4px] uppercase font-semibold mb-3">
              <span className="w-5 h-px bg-[#FFD700]" /> Ready to Explore?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight">Let&apos;s Plan Your Sri Lanka Adventure</h2>
            <p className="text-white/50 text-[14px] mt-2 max-w-md leading-relaxed">
              Our team will personalise this itinerary to match your exact travel dates and preferences.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-bold shadow-lg cursor-pointer"
              >
                Book Now <FaArrowRight className="text-xs" />
              </motion.span>
            </Link>
            <a href="https://wa.me/94700000000" target="_blank" rel="noreferrer">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer"
              >
                <FaWhatsapp className="text-green-400 text-base" /> WhatsApp Us
              </motion.span>
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
