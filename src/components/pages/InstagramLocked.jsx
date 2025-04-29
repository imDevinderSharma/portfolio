import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const InstagramLocked = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  const lockIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }
    },
    hover: { 
      scale: 1.1,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { 
        duration: 0.5
      }
    }
  };
  
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  };
  
  const glowAnimation = {
    boxShadow: [
      "0 0 10px rgba(157, 78, 221, 0.3)",
      "0 0 20px rgba(157, 78, 221, 0.5)",
      "0 0 10px rgba(157, 78, 221, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  };

  return (
    <div className="locked-page">
      <div className="locked-container">
        <motion.div 
          className="locked-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div 
            className="lock-icon-wrapper"
            variants={lockIconVariants}
            whileHover="hover"
            animate={pulseAnimation}
          >
            <FontAwesomeIcon icon={faLock} className="lock-icon" />
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="locked-title"
          >
            Instagram Link Locked
          </motion.h1>
          
          <motion.div 
            className="locked-divider"
            variants={itemVariants}
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.p 
            variants={itemVariants}
            className="locked-description"
          >
            This Instagram link is currently locked. Please message me on Discord to request access.
          </motion.p>
          
          <motion.div 
            className="discord-info" 
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            animate={glowAnimation}
          >
            <FontAwesomeIcon icon={faDiscord} className="discord-icon" />
            <span className="discord-username">Discord: idevsharma</span>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link to="/" className="back-link">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="back-button"
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default InstagramLocked; 