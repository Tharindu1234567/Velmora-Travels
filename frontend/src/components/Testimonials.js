"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { testimonialsMeta, testimonials } from "@/data/homeData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const total = testimonials.length;

  /* auto-advance every 5s unless hovered */
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % total);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, total]);

  const prev = () => setActive((p) => (p - 1 + total) % total);
  const next = () => setActive((p) => (p + 1) % total);

  const current = testimonials[active];

  return (
    <section
      className="bg-gray-50 py-20 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div {...fadeUp(0.05)} className="text-center mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-2 text-[#FFD700] text-[11px] tracking-[4px] uppercase font-semibold">
            <span className="w-6 h-px bg-[#FFD700]" />
            {testimonialsMeta.label}
            <span className="w-6 h-px bg-[#FFD700]" />
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-[46px] font-bold text-gray-900 tracking-tight leading-tight">
            {testimonialsMeta.heading}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{testimonialsMeta.headingAccent}</span>
          </h2>
          <p className="mt-3 text-gray-500 text-[14px] sm:text-[15px] max-w-lg mx-auto leading-relaxed">{testimonialsMeta.subheading}</p>
        </motion.div>

        {/* Main testimonial card + side cards */}
        <motion.div {...fadeUp(0.15)} className="relative">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-200 transition-all"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-200 transition-all"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-xs" />
          </button>

          {/* Cards strip */}
          <div className="flex gap-5 sm:gap-6 justify-center items-stretch px-6 sm:px-8">
            {/* Previous preview (desktop only) */}
            <motion.div
              className="hidden xl:flex flex-col justify-center w-64 shrink-0 bg-white rounded-[22px] p-6 border border-gray-100 shadow-sm opacity-50 scale-95 origin-right cursor-pointer transition-all hover:opacity-70"
              onClick={prev}
              style={{ transformOrigin: "right center" }}
            >
              <QuoteCard data={testimonials[(active - 1 + total) % total]} compact />
            </motion.div>

            {/* Active card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.97 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex-1 max-w-2xl bg-white rounded-[26px] p-7 sm:p-9 shadow-md border border-gray-100"
              >
                <QuoteCard data={current} />
              </motion.div>
            </AnimatePresence>

            {/* Next preview (desktop only) */}
            <motion.div
              className="hidden xl:flex flex-col justify-center w-64 shrink-0 bg-white rounded-[22px] p-6 border border-gray-100 shadow-sm opacity-50 scale-95 origin-left cursor-pointer transition-all hover:opacity-70"
              onClick={next}
              style={{ transformOrigin: "left center" }}
            >
              <QuoteCard data={testimonials[(active + 1) % total]} compact />
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-7">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all ${
                  i === active ? "w-6 h-2 bg-gradient-to-r from-orange-400 to-orange-600" : "w-2 h-2 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Quote card inner content ──────────────────────────── */
function QuoteCard({ data, compact = false }) {
  return (
    <div className="flex flex-col h-full">
      {/* Quote icon */}
      <FaQuoteLeft className={`text-orange-100 mb-4 ${compact ? "text-2xl" : "text-3xl"}`} />

      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[...Array(data.rating)].map((_, i) => (
          <FaStar key={i} className="text-[#FFD700] text-xs sm:text-sm" />
        ))}
      </div>

      {/* Quote */}
      <p className={`text-gray-700 leading-relaxed flex-1 ${compact ? "text-[13px] line-clamp-4" : "text-[14px] sm:text-[15px]"}`}>"{data.quote}"</p>

      {/* Package badge */}
      {!compact && (
        <div className="mt-5 mb-4">
          <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">
            {data.packageName}
          </span>
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
          <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-gray-900 truncate ${compact ? "text-[12px]" : "text-[13px] sm:text-[14px]"}`}>{data.name}</p>
          <p className={`text-gray-400 flex items-center gap-1 ${compact ? "text-[10px]" : "text-[12px]"}`}>
            <span>{data.flag}</span>
            <span>{data.country}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
