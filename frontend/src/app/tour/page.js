"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FaMapMarkerAlt,
  FaArrowRight,
  FaWhatsapp,
  FaTrash,
  FaCheck,
  FaCity,
  FaLandmark,
  FaMountain,
  FaPrayingHands,
  FaMonument,
  FaTrain,
  FaLeaf,
  FaPaw,
  FaWater,
  FaAnchor,
  FaUmbrellaBeach,
  FaMapMarkedAlt,
  FaRoad,
  FaCar,
  FaStar,
  FaUsers,
  FaMinus,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { GiAncientSword, GiBigWave } from "react-icons/gi";
import PageHero from "@/components/PageHero";
import { heroData, plannerMeta, destinations, costConfig, tourHighlights, ctaData } from "@/data/tourData";

/* ── icon map ────────────────────────────────────────────── */
const iconMap = {
  FaCity: FaCity,
  FaLandmark: FaLandmark,
  FaMountain: FaMountain,
  FaPrayingHands: FaPrayingHands,
  FaMonument: FaMonument,
  FaTrain: FaTrain,
  FaLeaf: FaLeaf,
  FaPaw: FaPaw,
  FaWater: FaWater,
  FaAnchor: FaAnchor,
  FaUmbrellaBeach: FaUmbrellaBeach,
  FaFortAwesome: GiAncientSword,
  FaMapMarkedAlt: FaMapMarkedAlt,
  FaRoad: FaRoad,
  FaCar: FaCar,
  FaStar: FaStar,
};

/* ── region colour map ───────────────────────────────────── */
const regionColor = {
  Western: "bg-blue-100  text-blue-700  border-blue-200",
  Central: "bg-green-100 text-green-700 border-green-200",
  "North Central": "bg-amber-100 text-amber-700 border-amber-200",
  Uva: "bg-rose-100  text-rose-700  border-rose-200",
  Southern: "bg-orange-100 text-orange-700 border-orange-200",
  Eastern: "bg-cyan-100  text-cyan-700  border-cyan-200",
};

/* ── animation helpers ───────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
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

/* ── distance helper ─────────────────────────────────────── */
function getDistance(a, b) {
  const key1 = `${a}-${b}`;
  const key2 = `${b}-${a}`;
  return costConfig.distances[key1] ?? costConfig.distances[key2] ?? 150;
}

/* ── cost calculator ─────────────────────────────────────── */
function calcCost(selected, persons, tier, meals) {
  if (selected.length === 0) return { total: 0, breakdown: [] };
  const tierMult = costConfig.accommodationTiers.find((t) => t.id === tier)?.multiplier ?? 1;
  const mealCost = costConfig.mealsTiers.find((m) => m.id === meals)?.pricePerDay ?? 0;

  let transferTotal = 0;
  for (let i = 0; i < selected.length - 1; i++) {
    const km = getDistance(selected[i].id, selected[i + 1].id);
    transferTotal += costConfig.baseTransferCost + km * costConfig.perKmCost;
  }

  const totalNights = selected.reduce((s, d) => s + d.nights, 0);
  const accommodation = selected.reduce((s, d) => s + d.pricePerNight * d.nights * tierMult * persons, 0);
  const chauffeur = totalNights * costConfig.chauffeurDayRate;
  const mealsTotal = totalNights * mealCost * persons;
  const total = Math.round(transferTotal + accommodation + chauffeur + mealsTotal);

  return {
    total,
    totalNights,
    breakdown: [
      { label: "Accommodation", value: Math.round(accommodation) },
      { label: "Transfers & Chauffeur", value: Math.round(transferTotal + chauffeur) },
      { label: "Meals", value: Math.round(mealsTotal) },
    ],
  };
}

/* ══════════════════════════════════════════════════════════
   SRI LANKA MAP  (accurate self-contained SVG + markers)
══════════════════════════════════════════════════════════ */
function SriLankaMap({ selected, onToggle, hovered, setHovered }) {
  const selectedIds = new Set(selected.map((d) => d.id));
  const W = 100,
    H = 132;

  return (
    <div className="relative w-full select-none rounded-[18px] overflow-visible shadow-md" style={{ aspectRatio: `${W}/${H}`, maxHeight: 620 }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="slOcean" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </linearGradient>
          <linearGradient id="slLand" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#d6efb8" />
            <stop offset="45%" stopColor="#aed188" />
            <stop offset="80%" stopColor="#c3e09c" />
            <stop offset="100%" stopColor="#dff0b8" />
          </linearGradient>
          <radialGradient id="slHills" cx="48%" cy="46%" r="28%">
            <stop offset="0%" stopColor="#7aae60" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7aae60" stopOpacity="0" />
          </radialGradient>
          <filter id="slGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="slShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Ocean */}
        <rect width={W} height={H} fill="url(#slOcean)" />

        {/* Subtle wave lines */}
        {[15, 30, 45, 60, 75, 90, 110].map((y) => (
          <path key={y} d={`M0,${y} Q25,${y - 1} 50,${y} Q75,${y + 1} 100,${y}`} stroke="white" strokeWidth="0.3" fill="none" opacity="0.35" />
        ))}

        {/* Sri Lanka landmass — accurate geographic outline */}
        <path
          d="M44,2 C47,2 51,2.5 55,4 C60,6 64,9 68,13 C72,17.5 75,23 76.5,29
             C78,35 77.5,41 75.5,46.5 C74,51 71.5,55 70.5,60 C69.5,65 70,70.5 69,75.5
             C67.5,81 65,85.5 62,89.5 C59,93.5 55.5,97 52,100.5
             C48.5,104 45,107 41.5,109 C38,111 34,112.5 30.5,112
             C26.5,111.5 22.5,109 19.5,105.5 C16.5,102 14.5,97 13.5,92
             C12.5,87 12.5,81.5 13.5,76 C14.5,70.5 16,65 17.5,59.5
             C19,54 19.5,48 19,42.5 C18.5,37 17.5,31 18.5,25.5
             C19.5,20 22,15 25.5,11 C29,7 34,4 38.5,2.5 Z"
          fill="url(#slLand)"
          stroke="#5a9648"
          strokeWidth="0.55"
          filter="url(#slShadow)"
        />

        {/* Hill shading — central highlands */}
        <ellipse cx="47" cy="50" rx="18" ry="22" fill="url(#slHills)" />

        {/* Coastline shimmer */}
        <path
          d="M44,2 C47,2 51,2.5 55,4 C60,6 64,9 68,13 C72,17.5 75,23 76.5,29
             C78,35 77.5,41 75.5,46.5 C74,51 71.5,55 70.5,60 C69.5,65 70,70.5 69,75.5
             C67.5,81 65,85.5 62,89.5 C59,93.5 55.5,97 52,100.5
             C48.5,104 45,107 41.5,109 C38,111 34,112.5 30.5,112
             C26.5,111.5 22.5,109 19.5,105.5 C16.5,102 14.5,97 13.5,92
             C12.5,87 12.5,81.5 13.5,76 C14.5,70.5 16,65 17.5,59.5
             C19,54 19.5,48 19,42.5 C18.5,37 17.5,31 18.5,25.5
             C19.5,20 22,15 25.5,11 C29,7 34,4 38.5,2.5 Z"
          fill="none"
          stroke="white"
          strokeWidth="0.7"
          opacity="0.45"
        />

        {/* Province dividers (subtle) */}
        <g stroke="#4a8a38" strokeWidth="0.25" strokeDasharray="1.2 2" fill="none" opacity="0.55">
          <path d="M22,37 Q38,33 62,39" />
          <path d="M16,63 Q38,58 68,64" />
          <path d="M19,84 Q40,79 62,84" />
        </g>

        {/* Compass rose */}
        <g transform="translate(88,8)" opacity="0.82">
          <circle r="4.5" fill="white" fillOpacity="0.88" stroke="#94a3b8" strokeWidth="0.4" />
          <text x="0" y="0.8" textAnchor="middle" dominantBaseline="middle" fontSize="3.2" fontWeight="700" fill="#374151">
            N
          </text>
          <line x1="0" y1="-2.5" x2="0" y2="-3.8" stroke="#f97316" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="0" y1="2.5" x2="0" y2="3.8" stroke="#94a3b8" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="-2.5" y1="0" x2="-3.8" y2="0" stroke="#94a3b8" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="2.5" y1="0" x2="3.8" y2="0" stroke="#94a3b8" strokeWidth="0.9" strokeLinecap="round" />
        </g>

        {/* Scale bar */}
        <g transform="translate(7,126)" opacity="0.65">
          <rect x="0" y="0" width="18" height="1.5" fill="#374151" rx="0.5" />
          <rect x="9" y="0" width="9" height="1.5" fill="white" rx="0.5" opacity="0.7" />
          <text x="0" y="-1" fontSize="2" fill="#374151">
            0
          </text>
          <text x="16" y="-1" fontSize="2" fill="#374151">
            100km
          </text>
        </g>

        {/* Route lines */}
        {selected.length > 1 &&
          selected.slice(0, -1).map((d, i) => {
            const next = selected[i + 1];
            const x1 = (d.x / 100) * W,
              y1 = (d.y / 100) * H;
            const x2 = (next.x / 100) * W,
              y2 = (next.y / 100) * H;
            return (
              <line
                key={`rt-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f97316"
                strokeWidth="1.3"
                strokeDasharray="2.2 2"
                strokeLinecap="round"
                opacity="0.9"
                filter="url(#slGlow)"
              />
            );
          })}

        {/* Destination pins */}
        {destinations.map((dest) => {
          const isSel = selectedIds.has(dest.id);
          const isHov = hovered === dest.id;
          const order = selected.findIndex((d) => d.id === dest.id) + 1;
          const cx = (dest.x / 100) * W;
          const cy = (dest.y / 100) * H;
          const r = isSel ? 3.0 : isHov ? 2.6 : 2.2;
          const labelX = cx > W * 0.62 ? cx - r - 1.5 : cx + r + 1.5;
          const anchor = cx > W * 0.62 ? "end" : "start";

          return (
            <g
              key={dest.id}
              style={{ cursor: "pointer" }}
              onClick={() => onToggle(dest)}
              onMouseEnter={() => setHovered(dest.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Selection glow */}
              {isSel && <circle cx={cx} cy={cy} r={r + 3.5} fill="#f97316" opacity="0.15" />}

              {/* Pin */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={isSel ? "#f97316" : isHov ? "#fff7ed" : "white"}
                stroke={isSel ? "#ea580c" : isHov ? "#f97316" : "#6b7280"}
                strokeWidth={isSel ? "0.9" : "0.65"}
                filter="url(#slGlow)"
              />

              {/* Order badge */}
              {isSel && (
                <text
                  x={cx}
                  y={cy + 0.6}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="1.9"
                  fontWeight="800"
                  fill="white"
                  style={{ pointerEvents: "none" }}
                >
                  {order}
                </text>
              )}

              {/* Centre dot */}
              {!isSel && <circle cx={cx} cy={cy} r="0.65" fill={isHov ? "#f97316" : "#6b7280"} />}

              {/* Label with white stroke for legibility */}
              <text
                x={labelX}
                y={cy + 0.4}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize="2.3"
                fontWeight={isSel ? "700" : "500"}
                fill={isSel ? "#c2410c" : isHov ? "#ea580c" : "#1f2937"}
                paintOrder="stroke"
                stroke="white"
                strokeWidth="2.2"
                strokeLinejoin="round"
                style={{ pointerEvents: "none" }}
              >
                {dest.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* HTML tooltip — above pin, uses % coords matching SVG */}
      <AnimatePresence>
        {hovered &&
          (() => {
            const dest = destinations.find((x) => x.id === hovered);
            if (!dest) return null;
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 8, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.94 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="absolute bg-white rounded-[14px] shadow-2xl border border-gray-100 overflow-hidden pointer-events-none"
                style={{
                  width: 210,
                  zIndex: 60,
                  left: `${dest.x}%`,
                  top: `${dest.y}%`,
                  transform: "translate(-50%, calc(-100% - 14px))",
                }}
              >
                <div className="h-[84px] overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-bold text-gray-900 text-[13px] leading-tight">{dest.name}</p>
                    <span
                      className={`shrink-0 text-[9px] font-semibold border rounded-full px-1.5 py-0.5 ${regionColor[dest.region] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}
                    >
                      {dest.region}
                    </span>
                  </div>
                  <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">{dest.description}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <span className="text-gray-400 text-[10px]">{dest.nights}n stay</span>
                    <span className="text-orange-500 font-bold text-[11px]">${dest.pricePerNight}/night</span>
                  </div>
                </div>
                {/* Down arrow */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderTop: "7px solid white",
                  }}
                />
              </motion.div>
            );
          })()}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 border border-gray-100 shadow-sm pointer-events-none z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
        <span className="text-[10px] text-gray-500 font-medium">Selected</span>
        <span className="w-px h-3 bg-gray-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-white border border-gray-400" />
        <span className="text-[10px] text-gray-500 font-medium">Available</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   COST PANEL
══════════════════════════════════════════════════════════ */
function CostPanel({ selected, onRemove, onMoveUp, onMoveDown }) {
  const [persons, setPersons] = useState(2);
  const [tier, setTier] = useState("standard");
  const [meals, setMeals] = useState("breakfast");
  const [expanded, setExpanded] = useState(false);

  const { total, totalNights, breakdown } = useMemo(() => calcCost(selected, persons, tier, meals), [selected, persons, tier, meals]);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Route list */}
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-[15px]">Your Route</h3>
          <span className="text-orange-500 text-xs font-semibold bg-orange-50 px-2.5 py-1 rounded-full">
            {selected.length} stop{selected.length !== 1 ? "s" : ""}
          </span>
        </div>

        {selected.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <FaMapMarkerAlt className="text-gray-200 text-3xl mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Click destinations on the map to start building your route.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {selected.map((dest, i) => {
              const Icon = iconMap[dest.icon] ?? FaMapMarkerAlt;
              return (
                <motion.li
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3 px-5 py-3"
                >
                  {/* Order badge */}
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-8 h-8 rounded-[8px] bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                    <Icon className="text-sm" />
                  </div>

                  {/* Name + meta */}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-semibold text-[13px] truncate">{dest.name}</p>
                    <p className="text-gray-400 text-[11px]">
                      {dest.nights}n · {dest.region}
                    </p>
                  </div>

                  {/* Reorder + remove */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onMoveUp(i)}
                      disabled={i === 0}
                      className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 disabled:opacity-20 transition-colors"
                    >
                      <FaChevronUp className="text-[9px]" />
                    </button>
                    <button
                      onClick={() => onMoveDown(i)}
                      disabled={i === selected.length - 1}
                      className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 disabled:opacity-20 transition-colors"
                    >
                      <FaChevronDown className="text-[9px]" />
                    </button>
                    <button
                      onClick={() => onRemove(dest.id)}
                      className="w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <FaTrash className="text-[9px]" />
                    </button>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Cost Calculator */}
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-[15px]">Cost Estimate</h3>
          <p className="text-gray-400 text-[11px] mt-0.5">All prices in USD · per group</p>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Persons */}
          <div>
            <label className="text-gray-600 text-xs font-semibold mb-2 block">Travellers</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPersons((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-colors"
              >
                <FaMinus className="text-[10px]" />
              </button>
              <div className="flex-1 text-center">
                <span className="text-xl font-bold text-gray-900">{persons}</span>
                <span className="text-gray-400 text-xs ml-1">person{persons !== 1 ? "s" : ""}</span>
              </div>
              <button
                onClick={() => setPersons((p) => Math.min(20, p + 1))}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-colors"
              >
                <FaPlus className="text-[10px]" />
              </button>
            </div>
          </div>

          {/* Accommodation tier */}
          <div>
            <label className="text-gray-600 text-xs font-semibold mb-2 block">Accommodation</label>
            <div className="grid grid-cols-2 gap-1.5">
              {costConfig.accommodationTiers.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTier(t.id)}
                  className={`py-1.5 rounded-[10px] text-[12px] font-semibold transition-all border ${
                    tier === t.id
                      ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white border-transparent shadow-sm"
                      : "bg-gray-50 text-gray-600 border-gray-100 hover:border-orange-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Meals */}
          <div>
            <label className="text-gray-600 text-xs font-semibold mb-2 block">Meals</label>
            <div className="flex flex-col gap-1.5">
              {costConfig.mealsTiers.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMeals(m.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-[10px] text-[12px] font-semibold transition-all border ${
                    meals === m.id
                      ? "bg-orange-50 text-orange-700 border-orange-200"
                      : "bg-gray-50 text-gray-600 border-gray-100 hover:border-orange-100"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {meals === m.id && <FaCheck className="text-orange-500 text-[10px]" />}
                    {m.label}
                  </span>
                  {m.pricePerDay > 0 && <span className="text-gray-400 font-normal">+${m.pricePerDay}/day</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Total */}
          {selected.length > 0 ? (
            <>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-gray-400 text-xs">Estimated Total</p>
                  <p className="text-3xl font-extrabold text-gray-900 tracking-tight mt-0.5">${total.toLocaleString()}</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    {totalNights} nights · {persons} person{persons !== 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  onClick={() => setExpanded((p) => !p)}
                  className="text-orange-500 text-[11px] font-semibold hover:text-orange-600 transition-colors flex items-center gap-1"
                >
                  Breakdown {expanded ? <FaChevronUp className="text-[9px]" /> : <FaChevronDown className="text-[9px]" />}
                </button>
              </div>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="bg-gray-50 rounded-[12px] p-3 flex flex-col gap-2">
                      {breakdown.map((b, i) => (
                        <li key={i} className="flex justify-between text-[12px]">
                          <span className="text-gray-500">{b.label}</span>
                          <span className="font-semibold text-gray-900">${b.value.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-semibold shadow-md shadow-orange-200 cursor-pointer"
                >
                  Get a Quote <FaArrowRight className="text-[10px]" />
                </motion.span>
              </Link>
            </>
          ) : (
            <p className="text-center text-gray-400 text-sm py-2">Add destinations to see your cost estimate.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function TourPage() {
  const [selected, setSelected] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [activeRegion, setActiveRegion] = useState("All");

  const regions = ["All", ...new Set(destinations.map((d) => d.region))];

  const filteredDests = activeRegion === "All" ? destinations : destinations.filter((d) => d.region === activeRegion);

  function toggleDest(dest) {
    setSelected((prev) => (prev.find((d) => d.id === dest.id) ? prev.filter((d) => d.id !== dest.id) : [...prev, dest]));
  }
  function removeDest(id) {
    setSelected((prev) => prev.filter((d) => d.id !== id));
  }
  function moveUp(i) {
    if (i === 0) return;
    setSelected((prev) => {
      const next = [...prev];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      return next;
    });
  }
  function moveDown(i) {
    setSelected((prev) => {
      if (i === prev.length - 1) return prev;
      const next = [...prev];
      [next[i], next[i + 1]] = [next[i + 1], next[i]];
      return next;
    });
  }

  return (
    <main className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <PageHero
        backgroundImage={heroData.backgroundImage}
        brandLabel={heroData.brandLabel}
        title={heroData.title}
        subtitle={heroData.subtitle}
        breadcrumb={heroData.breadcrumb}
        stats={[
          { value: "12+", label: "Destinations" },
          { value: "2,000km", label: "Scenic Routes" },
          { value: "100%", label: "Private Chauffeur" },
        ]}
      />

      {/* ── 2. PLANNER SECTION ───────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        {/* Heading */}
        <motion.div {...fadeUp(0.1)} className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-[#FFD700] text-[11px] tracking-[4px] uppercase font-semibold">
            <span className="w-6 h-px bg-[#FFD700]" />
            {plannerMeta.label}
            <span className="w-6 h-px bg-[#FFD700]" />
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {plannerMeta.heading}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{plannerMeta.headingAccent}</span>
          </h2>
          <p className="mt-3 text-gray-500 text-[14px] sm:text-[15px] max-w-xl mx-auto leading-relaxed">{plannerMeta.subheading}</p>
        </motion.div>

        {/* Map + Cost panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 xl:gap-8 items-start">
          {/* Left: Map */}
          <motion.div {...scaleIn(0.15)} className="flex flex-col gap-5">
            {/* Map card */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-[15px]">Sri Lanka Map</h3>
                <span className="text-gray-400 text-xs">Hover to preview · Click to select</span>
              </div>
              <SriLankaMap selected={selected} onToggle={toggleDest} hovered={hovered} setHovered={setHovered} />
            </div>

            {/* Destination grid below map */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-[15px]">All Destinations</h3>
                {/* Region filter */}
                <div className="flex flex-wrap gap-1.5">
                  {regions.map((r) => (
                    <button
                      key={r}
                      onClick={() => setActiveRegion(r)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all ${
                        activeRegion === r
                          ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AnimatePresence mode="popLayout">
                  {filteredDests.map((dest, i) => {
                    const isSelected = selected.find((d) => d.id === dest.id);
                    const Icon = iconMap[dest.icon] ?? FaMapMarkerAlt;
                    const order = selected.findIndex((d) => d.id === dest.id) + 1;

                    return (
                      <motion.button
                        key={dest.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, delay: i * 0.03 }}
                        onClick={() => toggleDest(dest)}
                        onMouseEnter={() => setHovered(dest.id)}
                        onMouseLeave={() => setHovered(null)}
                        className={`flex items-center gap-3 p-3.5 rounded-[16px] text-left transition-all border group ${
                          isSelected
                            ? "bg-orange-50 border-orange-200 shadow-sm"
                            : "bg-gray-50 border-gray-100 hover:border-orange-200 hover:bg-orange-50/50"
                        }`}
                      >
                        {/* Icon */}
                        <div
                          className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                              : "bg-white text-orange-400 group-hover:bg-orange-100"
                          }`}
                        >
                          <Icon className="text-base" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-[13px] truncate ${isSelected ? "text-orange-700" : "text-gray-900"}`}>{dest.name}</p>
                          <p className="text-gray-400 text-[11px]">
                            {dest.nights}n · ${dest.pricePerNight}/night
                          </p>
                        </div>

                        {/* Check / number */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold transition-all ${
                            isSelected
                              ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                              : "bg-white border border-gray-200 text-gray-300"
                          }`}
                        >
                          {isSelected ? order : "+"}
                        </div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right: Cost panel (sticky on desktop) */}
          <motion.div {...fadeUp(0.2)} className="lg:sticky lg:top-6">
            <CostPanel selected={selected} onRemove={removeDest} onMoveUp={moveUp} onMoveDown={moveDown} />
          </motion.div>
        </div>
      </section>

      {/* ── 3. HIGHLIGHTS STRIP ──────────────────────────────── */}
      <section className="bg-gray-50 py-12 sm:py-14 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {tourHighlights.map((h, i) => {
            const Icon = iconMap[h.icon] ?? FaStar;
            return (
              <motion.div
                key={i}
                {...scaleIn(i * 0.09)}
                className="flex flex-col items-center justify-center bg-white rounded-[20px] py-7 px-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white mb-3">
                  <Icon className="text-lg" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 tracking-tight">
                  {h.value}
                </span>
                <span className="text-gray-500 text-xs text-center mt-1">{h.label}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 4. CTA ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-20">
        <motion.div
          {...scaleIn(0.1)}
          className="max-w-7xl mx-auto relative bg-gray-900 rounded-[28px] sm:rounded-[36px] overflow-hidden py-14 sm:py-16 px-8 sm:px-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8"
        >
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
