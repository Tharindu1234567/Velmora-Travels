"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaLongArrowAltRight, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Assuming react-icons is installed

import { heroSlides as slides } from "../data/heroData";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Changed to 5s for better UX or keep 3s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-between overflow-hidden px-4 md:px-10">
      <div className="relative w-full h-[88vh] top-0 rounded-[30px] overflow-hidden shadow-2xl flex flex-col justify-center">
        {/* Background Images with Fade Transition */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${slides[currentIndex].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>

        {/* Dark Overlay */}
        <div className="absolute inset-0 w-[60vw] bg-gradient-to-r from-black/60 to-transparent z-10" />

        {/* Removed internal Navbar as per clean up */}

        <div className="relative z-20 flex flex-col md:flex-row items-end justify-between px-8 md:px-16  h-full w-full">
          {/* Left Indicators (Desktop only) */}
          <div className="hidden md:flex flex-col items-center -mt-2 mr-8 self-center">
            {slides.map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-sm transition-all duration-300 ${
                    index === currentIndex ? "bg-white text-black border-white scale-110" : "text-white hover:bg-white/20"
                  }`}
                >
                  {index + 1}
                </button>
                {index < 2 ? <div className="w-[1px] h-20 bg-white/30 "></div> : <div className="w-[1px] h-16 bg-transparent "></div>}
              </div>
            ))}
          </div>

          {/* Main Text Content */}
          <div className="flex-1 h-full flex  items-center left-0 mb-10 md:mb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-left"
              >
                <p className="text-white/90 text-sm md:text-base tracking-[2px] font-medium uppercase mb-4">{slides[currentIndex].subtitle}</p>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight whitespace-pre-line mb-8">{slides[currentIndex].title}</h1>

                <div className="flex items-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:block px-4 ring-0 outline-none py-2 text-xs lg:text-sm font-semibold rounded-full  bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:bg-gray-900"
                  >
                    Book a Trip Now
                  </motion.button>
                  <button className="w-8 h-8 bg-white rounded-full ring-0 outline-none flex items-center justify-center text-blue-600 hover:scale-110 transition-transform">
                    <FaPlay className="ml-1" size={14} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Glass Card (Bottom Right) */}
          <div className="hidden lg:flex absolute right-0 bottom-0 bg-white w-[400px] h-[200px] rounded-tl-[60px] p-8 flex-col justify-between shadow-lg">
            <div className="flex justify-between items-center w-full">
              <span className="text-xl font-bold text-gray-900">Know More</span>
              <FaLongArrowAltRight className="text-gray-500 text-xl" />
            </div>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex -space-x-3">
                <div
                  className="w-12 h-12 rounded-full border-2 border-white bg-cover bg-center"
                  style={{ backgroundImage: "url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop)" }}
                ></div>
                <div
                  className="w-12 h-12 rounded-full border-2 border-white bg-cover bg-center"
                  style={{ backgroundImage: "url(https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop)" }}
                ></div>
                <div
                  className="w-12 h-12 rounded-full border-2 border-white bg-cover bg-center"
                  style={{ backgroundImage: "url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop)" }}
                ></div>
              </div>
              <div>
                <strong className="block text-gray-900">Awesome Places</strong>
                <p className="text-gray-500 text-xs">Discover The Sri Lanka one Adventure At a Time!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Social & Brands) */}
        <div className="absolute top-5  right-8 z-30 hidden md:flex justify-between items-center text-white/80 text-sm font-medium">
          <div className="flex items-center gap-6">
            <span>Follow</span>
            <div className="flex gap-4">
              <FaTwitter className="hover:text-white cursor-pointer" />
              <FaFacebookF className="hover:text-white cursor-pointer" />
              <FaInstagram className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
