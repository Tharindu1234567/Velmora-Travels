"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaClock, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import { packages } from "@/data/packagesData";
import { featuredPackagesMeta, featuredPackageIds } from "@/data/homeData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const badgeColor = {
  "Best Seller": "bg-orange-500 text-white",
  Popular: "bg-blue-500 text-white",
  Adventure: "bg-emerald-500 text-white",
  Relaxing: "bg-cyan-500 text-white",
  Heritage: "bg-amber-500 text-white",
  Luxury: "bg-purple-500 text-white",
};

function FeaturedCard({ pkg, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col bg-white rounded-[22px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-52 sm:h-56 overflow-hidden shrink-0">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Badge */}
        <span
          className={`absolute top-3.5 right-3.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${badgeColor[pkg.badge] ?? "bg-gray-700 text-white"}`}
        >
          {pkg.badge}
        </span>

        {/* Category */}
        <span className="absolute top-3.5 left-3.5 text-[10px] font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/30 px-2.5 py-1 rounded-full">
          {pkg.category}
        </span>

        {/* Title + price pinned to bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3.5 pt-6">
          <h3 className="text-white font-bold text-[15px] sm:text-[16px] leading-snug tracking-tight drop-shadow">{pkg.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-white/80 text-[12px] font-medium flex items-center gap-1.5">
              <FaClock className="text-[10px]" /> {pkg.duration}
            </span>
            <span className="text-orange-300 font-extrabold text-[13px]">{pkg.price}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col p-5">
        {/* Meta pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="flex items-center gap-1.5 text-[11px] text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
            <FaUsers className="text-orange-400 text-[9px]" /> {pkg.groupSize}
          </span>
          {pkg.destinations.slice(0, 2).map((d, i) => (
            <span
              key={i}
              className="flex items-center gap-1 text-[11px] text-orange-600 bg-orange-50 border border-orange-100 rounded-full px-2.5 py-1"
            >
              <FaMapMarkerAlt className="text-[9px]" /> {d}
            </span>
          ))}
          {pkg.destinations.length > 2 && (
            <span className="text-[11px] text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
              +{pkg.destinations.length - 2}
            </span>
          )}
        </div>

        {/* Highlights — top 2 */}
        <ul className="flex-1 space-y-1.5 mb-5">
          {pkg.highlights.slice(0, 2).map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] text-gray-600">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href={pkg.href}>
          <motion.span
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            View Package <FaArrowRight className="text-[10px]" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function HomePackages() {
  const featured = packages.filter((p) => featuredPackageIds.includes(p.id));

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div {...fadeUp(0.05)} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-5 mb-12 sm:mb-14">
          <div>
            <span className="inline-flex items-center gap-2 text-[#FFD700] text-[11px] tracking-[4px] uppercase font-semibold">
              <span className="w-6 h-px bg-[#FFD700]" />
              {featuredPackagesMeta.label}
              <span className="w-6 h-px bg-[#FFD700]" />
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-[46px] font-bold text-gray-900 tracking-tight leading-tight">
              {featuredPackagesMeta.heading}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {featuredPackagesMeta.headingAccent}
              </span>
            </h2>
            <p className="mt-3 text-gray-500 text-[14px] sm:text-[15px] max-w-lg leading-relaxed">{featuredPackagesMeta.subheading}</p>
          </div>

          <Link href={featuredPackagesMeta.viewAllHref}>
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-semibold text-sm transition-colors cursor-pointer shrink-0"
            >
              {featuredPackagesMeta.viewAllLabel} <FaArrowRight className="text-xs" />
            </motion.span>
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
          {featured.map((pkg, i) => (
            <FeaturedCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Bottom CTA pill */}
        <motion.div {...fadeUp(0.4)} className="flex justify-center mt-10 sm:mt-12">
          <Link href="/packages">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-semibold shadow-md shadow-orange-200 cursor-pointer"
            >
              Explore All Packages <FaArrowRight className="text-xs" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
