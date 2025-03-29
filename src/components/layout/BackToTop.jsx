import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const BackToTop = () => {
  return (
    <div className="back-to-top">
      <motion.a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}
        className="top-btn"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </motion.a>
    </div>
  );
};

export default BackToTop; 