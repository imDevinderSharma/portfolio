import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../hooks/useTheme';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll event to change header style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Contact', path: '/#contact' },
  ];
  
  const headerVariants = {
    initial: { 
      backgroundColor: 'rgba(10, 10, 10, 0)',
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
    },
    scrolled: { 
      backgroundColor: theme === 'dark' ? 'rgba(17, 17, 17, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    }
  };
  
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };
  
  return (
    <motion.header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial="initial"
      animate={scrolled ? 'scrolled' : 'initial'}
      variants={headerVariants}
      transition={{ duration: 0.4 }}
    >
      <div className="container header-container">
        <Link to="/" className="logo">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gradient"
          >
            Devinder
          </motion.span>
        </Link>
        
        <div className="header-right">
          <nav className="desktop-nav">
            <ul className="nav-list">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.name} 
                  className="nav-item"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a href={item.path}>{item.name}</a>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
          </motion.button>
          
          <motion.button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu glass-card"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <ul className="mobile-nav-list">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.name} 
                  className="mobile-nav-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a 
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 