import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ photos, onClose }) => {
  const [index, setIndex] = useState(0);

  const nextStep = () => {
    setIndex((prev) => (prev + 1 === photos.length ? 0 : prev + 1));
  };

  const prevStep = () => {
    setIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  return (
    <div className="gallery-wrapper">
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="gallery-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="slide"
          >
            <img src={photos[index].url} alt="Memory" className="gallery-img" />
            <div className="caption-box">
              <p className="pirate-font">{photos[index].caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button className="nav-btn prev" onClick={prevStep}>❮</button>
        <button className="nav-btn next" onClick={nextStep}>❯</button>
      </div>
      
      {/* Dots Indicator */}
      <div className="dots">
        {photos.map((_, i) => (
          <div key={i} className={`dot ${i === index ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;