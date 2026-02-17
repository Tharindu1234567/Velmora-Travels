"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaShieldAlt, FaStar, FaMapMarkedAlt, FaUserTie, FaArrowRight, FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { MdLuggage, MdSupportAgent } from "react-icons/md";
import { heroData, storyData, highlights, stats, missionVision, values, valuesSectionMeta, team, teamSectionMeta, ctaData } from "@/data/aboutusData";

/* ── icon map (string key → component) ────────────────────── */
const iconMap = {
  FaShieldAlt: <FaShieldAlt className="text-2xl" />,
  FaStar: <FaStar className="text-2xl" />,
  FaMapMarkedAlt: <FaMapMarkedAlt className="text-2xl" />,
  MdSupportAgent: <MdSupportAgent className="text-2xl" />,
  MdLuggage: <MdLuggage className="text-2xl" />,
  FaUserTie: <FaUserTie className="text-2xl" />,
};
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.85 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

/* ══════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════ */
export default function AboutUsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* ── 1. HERO BANNER ─────────────────────────────────────── */}
      <section className="relative h-[55vh]  sm:h-[60vh] md:h-[65vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 mx-10 rounded-t-[30px] rounded-b-[20px] bg-cover bg-center scale-100"
          style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 mx-10 rounded-t-[30px] rounded-b-[20px] bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Text */}
        <div className="relative z-10 text-center px-4">
          <motion.p {...fadeUp(0.1)} className="text-[#FFD700] text-xs sm:text-sm tracking-[4px] uppercase font-semibold mb-3">
            {heroData.brandLabel}
          </motion.p>
          <motion.h1 {...fadeUp(0.25)} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {heroData.title}
          </motion.h1>
          <motion.p {...fadeUp(0.4)} className="mt-4 text-white/70 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {heroData.subtitle}
          </motion.p>

          {/* Breadcrumb */}
          <motion.div {...fadeUp(0.5)} className="mt-6 flex items-center justify-center gap-2 text-white/50 text-xs sm:text-sm">
            <span className="hover:text-white cursor-pointer transition-colors">{heroData.breadcrumb.home}</span>
            <span>/</span>
            <span className="text-[#FFD700]">{heroData.breadcrumb.current}</span>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
            <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── 2. OUR STORY ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image stack */}
          <motion.div {...fadeLeft(0.1)} className="relative flex justify-center">
            {/* Main image */}
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] h-[360px] sm:h-[420px] md:h-[460px] rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-2xl">
              <img src={storyData.image} alt={storyData.imageAlt} className="w-full h-full object-cover" />
            </div>

            {/* Floating accent card */}
            <motion.div
              {...scaleIn(0.4)}
              className="absolute -bottom-6 -right-4 sm:-right-8 bg-white rounded-[20px] shadow-xl px-5 py-4 flex items-center gap-3 max-w-[200px]"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shrink-0">
                <FaStar className="text-sm" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm leading-none">{storyData.floatingCard.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{storyData.floatingCard.label}</p>
              </div>
            </motion.div>

            {/* Dashed border decoration */}
            <div className="absolute -top-4 -left-4 sm:-left-6 w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] h-[360px] sm:h-[420px] md:h-[460px] rounded-[30px] sm:rounded-[40px] border-2 border-dashed border-gray-200 -z-10" />
          </motion.div>

          {/* Text */}
          <motion.div {...fadeRight(0.2)} className="flex flex-col gap-5">
            <motion.span {...fadeUp(0.25)} className="text-[#FFD700] text-xs tracking-[3px] uppercase font-semibold">
              {storyData.label}
            </motion.span>
            <motion.h2 {...fadeUp(0.3)} className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold text-gray-900 leading-snug">
              {storyData.heading}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{storyData.headingAccent}</span>
            </motion.h2>
            {storyData.paragraphs.map((para, i) => (
              <motion.p key={i} {...fadeUp(0.38 + i * 0.06)} className="text-gray-500 text-[15px] leading-relaxed">
                {para}
              </motion.p>
            ))}

            {/* Highlights */}
            <motion.ul {...fadeUp(0.5)} className="flex flex-col gap-2 mt-1">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.07 }}
                  className="flex items-start gap-2 text-gray-700 text-[14px]"
                >
                  <FaCheckCircle className="text-orange-500 mt-0.5 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* ── 3. STATS ───────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              {...scaleIn(i * 0.1)}
              className="flex flex-col items-center justify-center bg-white rounded-[20px] py-8 px-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {s.value}
              </span>
              <span className="text-gray-500 text-xs sm:text-sm text-center mt-1">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. MISSION & VISION ────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <motion.div {...fadeUp(0.1)} className="text-center mb-12">
          <span className="text-[#FFD700] text-xs tracking-[3px] uppercase font-semibold">{missionVision.sectionLabel}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">{missionVision.sectionHeading}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Mission */}
          <motion.div {...fadeLeft(0.2)} className="relative bg-gray-900 rounded-[28px] sm:rounded-[32px] p-8 sm:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-orange-500 opacity-10 translate-x-12 -translate-y-12" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#FFD700] opacity-5 -translate-x-8 translate-y-8" />
            <span className="text-[#FFD700] text-xs tracking-[3px] uppercase font-semibold">{missionVision.mission.label}</span>
            <h3 className="text-white text-xl sm:text-2xl font-bold mt-3 mb-4">{missionVision.mission.title}</h3>
            <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed">{missionVision.mission.desc}</p>
          </motion.div>

          {/* Vision */}
          <motion.div
            {...fadeRight(0.2)}
            className="relative border border-gray-100 rounded-[28px] sm:rounded-[32px] p-8 sm:p-10 overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-orange-100 opacity-60 translate-x-12 -translate-y-12" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-yellow-50 -translate-x-8 translate-y-8" />
            <span className="text-orange-500 text-xs tracking-[3px] uppercase font-semibold">{missionVision.vision.label}</span>
            <h3 className="text-gray-900 text-xl sm:text-2xl font-bold mt-3 mb-4">{missionVision.vision.title}</h3>
            <p className="text-gray-500 text-[14px] sm:text-[15px] leading-relaxed">{missionVision.vision.desc}</p>
          </motion.div>
        </div>
      </section>

      {/* ── 5. VALUES GRID ─────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp(0.1)} className="text-center mb-12">
            <span className="text-[#FFD700] text-xs tracking-[3px] uppercase font-semibold">{valuesSectionMeta.label}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">{valuesSectionMeta.heading}</h2>
            <p className="mt-3 text-gray-500 text-[14px] sm:text-[15px] max-w-lg mx-auto">{valuesSectionMeta.subheading}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                {...scaleIn(i * 0.08)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-[22px] p-6 sm:p-7 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">
                  {iconMap[v.icon]}
                </div>
                <h3 className="text-gray-900 font-semibold text-[16px]">{v.title}</h3>
                <p className="text-gray-500 text-[13px] sm:text-[14px] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TEAM ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <motion.div {...fadeUp(0.1)} className="text-center mb-12">
          <span className="text-[#FFD700] text-xs tracking-[3px] uppercase font-semibold">{teamSectionMeta.label}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">{teamSectionMeta.heading}</h2>
          <p className="mt-3 text-gray-500 text-[14px] sm:text-[15px] max-w-lg mx-auto">{teamSectionMeta.subheading}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.12)}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[22px] overflow-hidden shadow-lg">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                {/* Gold accent ring */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white flex items-center justify-center">
                  <FaCheckCircle className="text-white text-[10px]" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-[16px]">{member.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 7. CTA BANNER ──────────────────────────────────────── */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 pb-16 sm:pb-20">
        <motion.div
          {...scaleIn(0.1)}
          className="max-w-7xl mx-auto relative bg-gray-900 rounded-[28px] sm:rounded-[36px] overflow-hidden py-14 sm:py-16 px-8 sm:px-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Glow circles */}
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-orange-500 opacity-10 -translate-x-24 -translate-y-24 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#FFD700] opacity-5 translate-x-16 translate-y-16 pointer-events-none" />

          {/* Text */}
          <div className="relative text-center md:text-left">
            <motion.p {...fadeUp(0.2)} className="text-[#FFD700] text-xs tracking-[3px] uppercase font-semibold mb-2">
              {ctaData.label}
            </motion.p>
            <motion.h2 {...fadeUp(0.3)} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
              {ctaData.heading}
            </motion.h2>
            <motion.p {...fadeUp(0.4)} className="text-white/60 text-[14px] sm:text-[15px] mt-3 max-w-md">
              {ctaData.subheading}
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div {...fadeRight(0.35)} className="relative flex flex-col sm:flex-row gap-3 shrink-0">
            <motion.a
              href={ctaData.bookButton.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-semibold shadow-lg"
            >
              {ctaData.bookButton.label} <FaArrowRight className="text-xs" />
            </motion.a>
            <motion.a
              href={ctaData.whatsappButton.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <FaWhatsapp className="text-green-400 text-base" /> {ctaData.whatsappButton.label}
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
