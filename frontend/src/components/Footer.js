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

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 w-full mx-10 mb-5 rounded-lg">
      <div className=" mx-[10px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <motion.h2
                whileHover={{ scale: 1.05 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 cursor-pointer"
                style={{ fontFamily: "Brush Script MT, cursive" }}
              >
                Arrowline
              </motion.h2>
            </Link>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="flex flex-col space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">{section.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href}>
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors cursor-pointer block"
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
        <div className="my-6 sm:my-8 md:my-10 border-t border-gray-300"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">© 2026 Your Tourpoint. All Rights Reserved.</p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map((social, index) => {
              const Icon = iconMap[social.icon];
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                  style={{ backgroundColor: social.color }}
                  aria-label={social.label}
                >
                  {Icon && <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />}
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
