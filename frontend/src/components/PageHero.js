"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * PageHero — shared modern hero banner used across all inner pages.
 *
 * Props:
 *  backgroundImage  string   full URL for the bg photo
 *  brandLabel       string   small gold uppercase label (e.g. "Velmora Travels")
 *  title            string   large white heading
 *  titleAccent      string?  optional second line / accent word (orange gradient)
 *  subtitle         string   sub-paragraph
 *  breadcrumb       { home: string, current: string }
 *  stats            Array<{ value: string, label: string }>?  optional 3-4 stat pills shown bottom-left
 *  accentColor      string?  tailwind text-* class for the accent gradient (default orange)
 *  height           string?  tailwind h-* class (default "h-[62vh] sm:h-[68vh] md:h-[72vh]")
 */
export default function PageHero({
  backgroundImage,
  brandLabel,
  title,
  titleAccent,
  subtitle,
  breadcrumb,
  stats,
  height = "h-[62vh] sm:h-[68vh] md:h-[72vh]",
}) {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="w-full relative flex flex-col items-center justify-between overflow-hidden px-4 md:px-10">
      <div className={`relative w-full ${height} rounded-[30px] overflow-hidden flex flex-col justify-center`}>
        {/* ── Background photo ───────────────────────────────── */}
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        {/* ── Multi-layer overlay ────────────────────────────── */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
        <div className="absolute inset-0 w-[60vw] bg-gradient-to-r from-black/65 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

        {/* ── Decorative floating rings ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full border border-white pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.07, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="absolute -top-8 -right-8 w-[340px] h-[340px] rounded-full border border-[#FFD700] pointer-events-none"
        />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-orange-500 opacity-[0.08] blur-3xl pointer-events-none" />

        {/* ── Hero content layout aligned like home hero ───── */}
        <div className="relative z-20 flex flex-col md:flex-row items-end justify-between px-6 sm:px-8 md:px-16 h-full w-full">
          <div className="flex-1 h-full flex items-center mb-8 md:mb-0">
            <div className="text-left max-w-4xl">
              <motion.div {...fadeUp(0.1)}>
                <span className="inline-flex items-center gap-2 border border-[#FFD700]/40 bg-[#FFD700]/10 backdrop-blur-sm text-[#FFD700] text-[10px] sm:text-[11px] tracking-[4px] uppercase font-bold px-4 py-2 rounded-full mb-5">
                  <span className="w-4 h-px bg-[#FFD700]" />
                  {brandLabel}
                  <span className="w-4 h-px bg-[#FFD700]" />
                </span>
              </motion.div>

              <motion.h1
                {...fadeUp(0.22)}
                className="text-[36px] sm:text-[48px] md:text-[62px] lg:text-[72px] font-extrabold text-white leading-[1.05] tracking-tight"
              >
                {title}
                {titleAccent && (
                  <>
                    {" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">{titleAccent}</span>
                  </>
                )}
              </motion.h1>

              <motion.p
                {...fadeUp(0.36)}
                className="mt-5 text-white/75 text-[14px] sm:text-[15px] md:text-[16px] max-w-lg sm:max-w-xl leading-relaxed"
              >
                {subtitle}
              </motion.p>

              <motion.nav {...fadeUp(0.46)} className="mt-7 flex items-center gap-2 text-white/55 text-[12px] sm:text-[13px]">
                <Link href="/" aria-label="Go to homepage" className="hover:text-white transition-colors duration-200">
                  {breadcrumb.home}
                </Link>
                <span className="text-white/25">›</span>
                <span className="text-[#FFD700] font-medium">{breadcrumb.current}</span>
              </motion.nav>

              {stats && stats.length > 0 && (
                <motion.div {...fadeUp(0.56)} className="mt-8 flex flex-wrap gap-3">
                  {stats.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2">
                      <span className="text-orange-400 font-extrabold text-[15px] sm:text-[16px] leading-none">{s.value}</span>
                      <span className="text-white/70 text-[11px] sm:text-[12px]">{s.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* ── Diagonal light streak ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: [0, 0.06, 0] }}
          transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg] pointer-events-none"
        />
      </div>
    </section>
  );
}
