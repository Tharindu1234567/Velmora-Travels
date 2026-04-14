"use client";

import { motion } from "framer-motion";
import { ctaData } from "@/data/aboutusData";
import {  FaArrowRight, FaWhatsapp } from "react-icons/fa";

 const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.85 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

 const CTABanner = () => {
    return(
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
    )
 }
    
 export default CTABanner;
