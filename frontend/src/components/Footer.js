"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { footerSections, socialLinks } from "../data/footerData";

const iconMap = {
  FaXTwitter: FaXTwitter,
  FaFacebookF: FaFacebookF,
  FaInstagram: FaInstagram,
  FaTiktok: FaTiktok,
};

// Custom gradients for 3D effect
const gradients = {
  "#000000": "from-gray-700 to-black", // X & TikTok
  "#1877F2": "from-blue-400 to-blue-600", // Facebook
  "#E4405F": "from-pink-500 via-red-500 to-yellow-500", // Instagram
};

export default function Footer() {
  return (
    <footer className=" w-full mb-0 md:mb-5 overflow-hidden">
      <div className="mx-5 bg-gray-50 rounded-none md:rounded-[20px] px-6 sm:px-8 lg:px-12 py-5 sm:py-12 md:py-5 md:pt-6 ">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <motion.h2
                whileHover={{ scale: 1.05 }}
                className="text-4xl text-center md:text-left md:text-5xl font-bold text-gray-900 cursor-pointer tracking-tight"
                style={{ fontFamily: "Brush Script MT, cursive" }}
              >
                Arrowline
              </motion.h2>
            </Link>

            {/* Added Description Paragraph */}
            <p className="text-[14px] w-full text-center md:text-left text-gray-500 md:max-w-[250px] leading-relaxed ">
              Your trusted partner for creating unforgettable journeys. From magical sunsets to golden trails, explore Sri Lanka with confidence and
              style.
            </p>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="flex flex-col space-y-4 pt-0 md:pt-5 ">
              <h3 className="text-[15px]  font-bold text-center md:text-left text-gray-900 uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href}>
                      <motion.span
                        whileHover={{ x: 3, color: "#111827" }}
                        className="text-[14px] text-gray-500 text-center md:text-left transition-colors cursor-pointer block"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-gray-200"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 ">
          {/* Copyright */}
          <p className="text-[13px] md:text-[14px] md:mb-0 mb-2 text-gray-400 text-center sm:text-left font-medium">
            © 2026 Your Tourpoint. All Rights Reserved.
          </p>

          {/* 3D Social Media Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = iconMap[social.icon];
              const gradient = gradients[social.color] || "from-gray-400 to-gray-600";

              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_15px_rgba(0,0,0,0.3)] bg-gradient-to-br ${gradient}`}
                  aria-label={social.label}
                >
                  {/* Inner bevel/shine effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none"></div>

                  {Icon && <Icon className="w-3.5 h-3.5 text-white drop-shadow-md relative z-10" />}
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
