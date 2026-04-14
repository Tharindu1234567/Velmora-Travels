"use client";

import { FaArrowRight } from "react-icons/fa"; // Assuming react-icons is installed
import { motion } from "framer-motion";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us min-h-screen ">
      {/* Header text and desciption */}
      <motion.div
        className="flex flex-col items-center justify-center text-center max-w-4xl -mt-10 mb-10 mx-auto py-8 px-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium mb-4">About Us</h1>
        <p className="text-[14px] sm:text-[15px] lg:text-[16px] mb-4 text-gray-500 lg:max-w-[530px] px-2">
          Our mission is to elevate Sri Lanka travel through premium rides, reliable service, and exceptional comfort.
        </p>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        {/* Image Element */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Rectangle image Element */}
          <motion.div
            className="absolute w-40 sm:w-48 md:w-60 z-50 h-28 sm:h-32 md:h-40 left-[50%] -translate-x-1/2 lg:translate-x-0 lg:left-[26.8rem] -top-[40px] sm:-top-[60px] lg:-top-[85px] rounded-[30px] sm:rounded-[35px] lg:rounded-[45px] bg-red-100 mx-auto mt-10 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img
              src={"https://images.unsplash.com/photo-1733712999262-82edf53279a7?q=80&w=1200"}
              alt="Image 1"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="relative mx-4 sm:mx-8 md:mx-12 lg:mx-20 h-[400px] sm:h-[450px] md:h-[500px] lg:h-full w-auto sm:w-[400px] md:w-[450px] lg:w-[30rem] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              backgroundImage: `url(/aboutusimage1.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="aboutus-rec1 absolute w-24 h-20 sm:w-28 sm:h-24 md:w-32 md:h-28 lg:w-36 lg:h-32 right-0 top-0 rounded-tr-[30px] sm:rounded-tr-[40px] lg:rounded-tr-[50px] rounded-bl-[30px] sm:rounded-bl-[40px] lg:rounded-bl-[50px] bg-white"></div>

            <div className="aboutus-rec2 absolute w-40 h-20 sm:w-48 sm:h-24 md:w-52 md:h-28 lg:w-60 lg:h-32 right-0 bottom-0 rounded-tl-[30px] sm:rounded-tl-[40px] lg:rounded-tl-[50px] rounded-br-[30px] sm:rounded-br-[40px] lg:rounded-br-[50px] bg-white"></div>
          </motion.div>

          <motion.div
            className="absolute -z-10 left-20 -top-16 border-[2px] border-dashed   w-full mx-4 sm:mx-8 md:mx-12 lg:mx-20 h-[400px] sm:h-[450px] md:h-[500px] lg:h-full  sm:w-[400px] md:w-[450px] lg:w-[30rem] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="aboutus-rec1 absolute w-24 h-20 sm:w-28 sm:h-24 md:w-32 md:h-28 lg:w-36 lg:h-32 right-0 top-0 rounded-tr-[30px] sm:rounded-tr-[40px] lg:rounded-tr-[50px] rounded-bl-[30px] sm:rounded-bl-[40px] lg:rounded-bl-[50px] bg-white"></div>

            <div className="aboutus-rec2 absolute w-40 h-20 sm:w-48 sm:h-24 md:w-52 md:h-28 lg:w-60 lg:h-32 right-0 bottom-0 rounded-tl-[30px] sm:rounded-tl-[40px] lg:rounded-tl-[50px] rounded-br-[30px] sm:rounded-br-[40px] lg:rounded-br-[50px] bg-white"></div>
          </motion.div>

          {/* Know More  Element */}
          <motion.div
            className="hidden lg:flex justify-center border-none items-end -gap-10 flex-col absolute left-[330px] -bottom-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex border-none justify-between px-5 p-2 pt-6 rounded-t-[30px] right-0 w-[190px] bg-gray-100 gap-6 items-center h-[78px] ">
              <div className="text-xl font-semibold  text-gray-900 h-full">Know More</div>
              <FaArrowRight className="text-gray-500 text-md  -mt-3" />
            </div>

            <div className="flex items-center border-none gap-4 h-36 w-[430px] px-[5px] pr-16 rounded-tl-[45px]  rounded-br-[50px] rounded-bl-[45px] bg-gray-100 ">
              <div className="flex -space-x-5 px-1 about-us-rectangle2 ">
                <div
                  className="w-20 h-20 rounded-full border-2 border-white bg-cover bg-center"
                  style={{ backgroundImage: "url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop)" }}
                ></div>
              </div>
              <div>
                <strong className="block text-gray-900">Awesome Places</strong>
                <p className="text-gray-500 text-xs text-wrap max-w-44">Discover The Sri Lanka one Adventure At a Time!</p>
              </div>
            </div>
            <div className="about-us-rectangle1 absolute w-32 h-36 bg-white rounded-tl-[60px] right-0 bottom-0"></div>
          </motion.div>

          <div className="w-20 h-64 bg-cover bg-center mb-10" style={{ backgroundImage: "url('/images/about-us.jpg')" }}></div>
        </motion.div>

        {/* About Us Description */}
        <motion.div
          className="flex flex-col justify-center text-left px-6 sm:px-8 md:px-10 max-w-4xl mx-auto py-8 sm:py-12 md:py-16 gap-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.h1
            className="text-xl sm:text-2xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Why Choose Us
          </motion.h1>
          <motion.p
            className="mb-4 text-gray-700 text-[14px] sm:text-[15px] lg:text-[16px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            We offer luxury travel services in Sri Lanka designed for travellers who value comfort, safety, and exclusivity. Our premium tourist rides
            are powered by professional chauffeurs, high-end vehicles, and carefully curated travel experiences, ensuring every journey is seamless
            and memorable.
          </motion.p>
          <motion.p
            className="mb-4 text-gray-700 text-[14px] sm:text-[15px] lg:text-[16px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            We believe that travel is not just about visiting new places, but about creating lasting memories and meaningful connections. That's why
            we go above and beyond to understand your travel goals and preferences, allowing us to design a trip that exceeds your expectations.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};
export default AboutUs;
