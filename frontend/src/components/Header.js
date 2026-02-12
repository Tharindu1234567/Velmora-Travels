"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { headerLinks as links } from "../data/headerData";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);



  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "100%", opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="w-full z-50 bg-white shadow-sm"
    >
      <div className="mx-2 sm:mx-4 md:mx-[10px] px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Reduced Height: h-14 sm:h-16 md:h-18 */}
        <div className="relative flex justify-between items-center h-14 sm:h-16 md:h-18">
          
          {/* LEFT: Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-lg sm:text-xl md:text-2xl font-bold cursor-pointer text-[#454545]"
            >
              Wanderlust
            </motion.div>
          </Link>

          {/* CENTER: Desktop Navigation Links - Absolutely Centered */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 lg:space-x-8 items-center">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href}>
                  <div
                    className="relative cursor-pointer px-1 py-1"
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span
                      className={`font-medium text-xs lg:text-sm transition-colors relative z-10 ${
                        isActive ? "text-[#FFD700]" : "text-[#454545] hover:text-[#FFD700]"
                      }`}
                    >
                      {link.name}
                    </span>
                    {/* Active State Underline */}
                    {isActive && (
                      <motion.div
                        layoutId="active-underline"
                        className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#FFD700]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {/* Hover State Underline (only if not active) */}
                    {hoveredLink === link.href && !isActive && (
                      <motion.div
                        layoutId="hover-underline"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#FFD700] origin-left"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Button & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            
            {/* Desktop Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-4 py-2 text-xs lg:text-sm font-semibold rounded-full shadow-lg bg-black text-white hover:bg-gray-900"
            >
              Book Now
            </motion.button>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="text-[#454545] focus:outline-none"
              >
                <FiMenu className="w-6 h-6" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#454545] focus:outline-none"
            >
              <FiX className="w-8 h-8" />
            </button>

            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-2xl font-semibold ${
                      isActive ? "text-[#FFD700]" : "text-[#454545]"
                    }`}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              );
            })}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-lg font-semibold rounded-full shadow-lg bg-black text-white hover:bg-gray-900 mt-4"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
