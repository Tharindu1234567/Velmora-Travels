"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import galleryImages from "../../data/galleryData";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetails, setShowDetails] = useState(true);
  const imagesPerPage = 8; // 2x4 grid

  // Get unique categories
  const categories = ["All", ...new Set(galleryImages.map((img) => img.category.split(",")[0]))];

  // Filter images by category
  const filteredImages = selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category.includes(selectedCategory));

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const visibleThumbnails = filteredImages.slice(startIndex, startIndex + imagesPerPage);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Auto-switch to next image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      const nextImage = filteredImages[nextIndex];

      setSelectedImage(nextImage);

      // Check if next image is on a different page
      const nextImagePageIndex = filteredImages.indexOf(nextImage);
      const nextImagePage = Math.floor(nextImagePageIndex / imagesPerPage) + 1;
      if (nextImagePage !== currentPage) {
        setCurrentPage(nextImagePage);
      }
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, [selectedImage, filteredImages, currentPage, imagesPerPage]);

  return (
    <div className="min-h-screen bg-white flex flex-col ">
      {/* Navigation */}
      <Header activeLink="gallery" />
      <section className="relative inset-0 mx-3 sm:mx-4 md:mx-10  rounded-[30px] overflow-hidden overflow-y-auto lg:overflow-y-hidden">
        {/* Blurred Background - Full Screen */}
        <motion.div
          key={selectedImage.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${selectedImage.src})`,
            filter: "blur(15px) brightness(0.6)",
            transform: "scale(1.05)",
          }}
        ></motion.div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col lg:flex-row gap-0 overflow-y-auto lg:overflow-y-hidden scroll-smooth">
          {/* Center - Preview Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex lg:ml-4 items-center px-4 sm:px-6 md:px-6 py-4 sm:py-6 md:py-10 min-h-[250px] sm:min-h-[350px] md:min-h-full  lg:min-h-0"
          >
            <motion.div
              key={selectedImage.id + "-main"}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative w-full z-30 h-full max-h-[400px] md:max-h-full sm:max-h-[500px] lg:max-h-full rounded-[20px] overflow-hidden shadow-2xl"
            >
              <div
                className="absolute z-30 flex items-center inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedImage.src})` }}
              ></div>

              {/*Text Content */}
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={selectedImage.id + "-content"}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative flex flex-col  h-full  justify-center space-y-3 sm:space-y-4 md:space-y-6 z-50 px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 md:py-6 w-full lg:w-[350px] xl:w-[450px] 2xl:w-[500px]"
                >
                  <div
                    className="transition-opacity duration-200"
                    style={{
                      opacity: showDetails ? 1 : 0,
                      visibility: showDetails ? "visible" : "hidden",
                      pointerEvents: showDetails ? "auto" : "none",
                    }}
                  >
                    <div className="inline-block z-50  pb-2">
                      <span className="inline-block  px-3 sm:px-4 md:px-5 py-1.5 sm:py-1.5 bg-white backdrop-blur-sm rounded-full text-gray-700 font-medium text-xs sm:text-sm shadow-lg">
                        {selectedImage.category}
                      </span>
                    </div>

                    <h1 className="text-2xl  z-50 sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight">
                      {selectedImage.title}
                    </h1>

                    <p className="text-sm  z-50 sm:text-base md:text-lg lg:text-[16px] text-white/95 leading-relaxed line-clamp-4 md:line-clamp-none">
                      {selectedImage.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dark Overlay */}
              <div className="absolute inset-0 w-[75%] z-40 bg-gradient-to-r from-black/80 to-transparent " />
            </motion.div>
          </motion.div>

          {/* Separator - Vertical for desktop, Horizontal for mobile/tablet */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block w-px mx-2 xl:mx-4"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), transparent)",
            }}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="block lg:hidden h-px my-2 sm:my-3"
            style={{
              background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)",
            }}
          ></motion.div>

          {/* Right Side - Thumbnail Selector Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col h-auto lg:h-full backdrop-blur-sm px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 w-full lg:w-[280px] xl:w-[340px] 2xl:w-[380px]"
          >
            {/* Category Filter Buttons */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6 justify-center lg:justify-start"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full font-medium text-[10px] sm:text-xs transition-all ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white shadow-lg ring-2 ring-blue-300"
                      : "bg-white/80 text-gray-700 hover:bg-white"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Thumbnails Container - Responsive Grid */}
            <div className="flex-1 w-full overflow-hidden mb-3 sm:mb-4 md:mb-6  lg:min-h-[35.50rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 h-auto lg:h-full p-1 sm:p-2"
                >
                  {visibleThumbnails.map((image, index) => {
                    return (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleImageSelect(image)}
                        className={`relative w-full h-20 sm:h-24 md:h-32 lg:h-32 xl:h-32 rounded-[6px] overflow-hidden cursor-pointer transition-all active:scale-95 ${
                          selectedImage.id === image.id ? "ring-2 ring-blue-500 shadow-xl" : "ring-0 ring-white/30 hover:ring-white/50 shadow-lg"
                        }`}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-110"
                          style={{ backgroundImage: `url(${image.src})` }}
                        ></div>
                        {selectedImage.id === image.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-blue-500/20 flex items-center justify-center"
                          >
                            <div className="bg-white rounded-full p-1 sm:p-1.5 md:p-2 shadow-lg">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls at Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-between border-t border-white/20 pt-3 sm:pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                  currentPage === 1 ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100 hover:bg-white/20 cursor-pointer"
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <span className="text-xs sm:text-sm font-semibold text-white">
                {currentPage} / {totalPages}
              </span>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                  currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100 hover:bg-white/20 cursor-pointer"
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>

            <div className="mt-3 sm:mt-4 lg:hidden flex justify-center">
              <button
                type="button"
                onClick={() => setShowDetails((prev) => !prev)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold bg-white/80 text-gray-800 shadow-md hover:bg-white transition-colors"
              >
                {showDetails ? "Hide Description" : "Show Description"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
