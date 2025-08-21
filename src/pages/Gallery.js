import React, { useState } from "react";
import { Cpu, Zap, Box, Hexagon, X } from "lucide-react";
import Footer from "./Footer";

const months = [
  {
    name: "Xpecto'25 IIT Mandi",
    images: [`${process.env.REACT_APP_BUCKET}xpecto1.jpg`, `${process.env.REACT_APP_BUCKET}xpecto2.jpg`, `${process.env.REACT_APP_BUCKET}xpecto3.jpg`, `${process.env.REACT_APP_BUCKET}xpecto4.jpg`, `${process.env.REACT_APP_BUCKET}xpecto5.jpg`]

  },
  {
    name: "Bharat Mobility Expo 2025",
    images: [`${process.env.REACT_APP_BUCKET}mobility1.jpg`, `${process.env.REACT_APP_BUCKET}mobility4.jpg`, `${process.env.REACT_APP_BUCKET}mobility2.jpg`, `${process.env.REACT_APP_BUCKET}mobility3.jpg`]
  },
  {
    name: "CU Tech-Invent",
    images: [`${process.env.REACT_APP_BUCKET}techinvent1.JPG`, `${process.env.REACT_APP_BUCKET}techinvent2.jpg`],
  },
  {
    name: "Technoxian WRC 2024",
    images: [
      `${process.env.REACT_APP_BUCKET}technoxian1.jpg`,
      `${process.env.REACT_APP_BUCKET}technoxian2.jpg`,
      `${process.env.REACT_APP_BUCKET}technoxian3.jpg`,
      `${process.env.REACT_APP_BUCKET}technoxian4.jpg`,
      `${process.env.REACT_APP_BUCKET}technoxian5.jpg`,
      `${process.env.REACT_APP_BUCKET}technoxian6.jpg`,
    ],
  },
];

const GlowingText = ({ children }) => (
  <span className="relative">
    <span className="absolute inset-0 -z-10 blur-[2px] text-blue-500 opacity-70">
      {children}
    </span>
    <span className="relative">{children}</span>
  </span>
);

const GlowingCard = ({ imageSrc, onClick }) => (
  <div
    className="relative group overflow-hidden rounded-lg border border-blue-500/30 bg-black/50 hover:border-blue-500 transition-all duration-300 cursor-pointer"
    onClick={onClick}
  >
    <img
      src={imageSrc}
      alt="Event"
      className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="absolute bottom-2 left-2 text-blue-300 text-sm">SAE</p>
    </div>
  </div>
);

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePreview = (image) => {
    setSelectedImage(image);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden relative z-0">
        {/* Animated Background Grid */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-[-1]">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-1 bg-blue-500/10 animate-pulse top-1/4 -skew-y-12"></div>
          <div className="absolute w-1 h-full bg-blue-500/10 animate-pulse left-1/4 -skew-x-12"></div>
          <div className="absolute w-full h-1 bg-blue-500/10 animate-pulse bottom-1/3 -skew-y-12"></div>
        </div>
        <div className="container mx-auto px-6 pt-12">
          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="relative">
              <GlowingText>🫶 Our Memories 🥹</GlowingText>
            </span>
          </h1>

          {months.map((month, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-3xl text-blue-400 font-semibold mb-4">
                {month.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {month.images.map((image, idx) => (
                  <GlowingCard
                    key={idx}
                    imageSrc={image}
                    onClick={() => openImagePreview(image)}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="absolute bottom-1/4 right-1/4">
            <Hexagon className="w-10 h-10 text-blue-500 animate-pulse opacity-10 z-[-1]" />
          </div>
          <div className="absolute top-1/4 right-1/4">
            <Box className="w-8 h-8 text-blue-500 animate-pulse z-[-1]" />
          </div>
          <div className="absolute bottom-1/4 left-1/4">
            <Zap className="w-10 h-10 text-blue-400 animate-ping z-[-1]" />
          </div>
          <div className="absolute top-1/2 right-1/3">
            <Cpu className="w-6 h-6 text-blue-300 animate-bounce z-[-1]" />
          </div>
          <div id="footer-section" className="mt-10">
            <Footer />
          </div>
        </div>
      </div>
      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-screen rounded-lg shadow-lg"
            />
            <button
              className="absolute top-4 right-4 text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition"
              onClick={closeImagePreview}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
