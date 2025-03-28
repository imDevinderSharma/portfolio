import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBars, faXmark, faHome, faUser, faCode, faBriefcase, faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../hooks/useTheme';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('Home');
  const dragControls = useDragControls();
  
  // Handle scroll event to change header style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveNavItem(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
        }
      });
      
      // Check if we're at the top to set Home as active
      if (window.scrollY < 100) {
        setActiveNavItem('Home');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { name: 'Home', path: '/', icon: faHome },
    { name: 'About', path: '/#about', icon: faUser },
    { name: 'Skills', path: '/#skills', icon: faCode },
    { name: 'Projects', path: '/#projects', icon: faBriefcase },
    { name: 'Contact', path: '/#contact', icon: faEnvelope },
  ];
  
  const headerVariants = {
    initial: { 
      backgroundColor: 'rgba(10, 10, 10, 0)',
      backdropFilter: 'blur(0px)',
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
    },
    scrolled: { 
      backgroundColor: theme === 'dark' ? 'rgba(17, 17, 17, 0.45)' : 'rgba(255, 255, 255, 0.45)',
      backdropFilter: 'blur(30px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    }
  };
  
  // Enhanced mobile menu animations
  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const menuVariants = {
    closed: {
      x: '100%',
      opacity: 0.5,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 250,
        when: "beforeChildren",
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };
  
  const menuItemVariants = {
    closed: { 
      x: 50,
      opacity: 0
    },
    open: { 
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  
  // Close mobile menu when a navigation link is clicked
  const handleNavLinkClick = (path, name) => {
    setMobileMenuOpen(false);
    setActiveNavItem(name);
    
    // Handle smooth scrolling for anchor links
    if (path.includes('#')) {
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  // Close mobile menu when clicking outside or when escape key is pressed
  useEffect(() => {
    const handleClickOutside = (e) => {
      const mobileMenu = document.querySelector('.mobile-menu');
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      
      if (mobileMenuOpen && mobileMenu && mobileMenuToggle) {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
          setMobileMenuOpen(false);
        }
      }
    };
    
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    // Lock body scroll when menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  
  const startDrag = (event) => {
    dragControls.start(event);
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
          <nav className="desktop-nav" aria-label="Desktop navigation">
            <ul className="nav-list">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.name} 
                  className={`nav-item ${activeNavItem === item.name ? 'active' : ''}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a 
                    href={item.path}
                    onClick={() => handleNavLinkClick(item.path, item.name)}
                    aria-current={activeNavItem === item.name ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
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
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
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
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
          </motion.button>
        </div>
      </div>
      
      {/* Enhanced Mobile Menu Implementation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay with improved animation */}
            <motion.div 
              className="mobile-menu-backdrop"
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                backgroundColor: theme === 'dark' 
                  ? 'rgba(0, 0, 0, 0.6)' 
                  : 'rgba(240, 240, 240, 0.6)'
              }}
            />
            
            {/* Mobile menu container with gesture support */}
            <motion.div
              className="mobile-menu"
              id="mobile-navigation-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              drag="x"
              dragControls={dragControls}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(event, info) => {
                if (info.offset.x > 100) {
                  setMobileMenuOpen(false);
                }
              }}
              onPointerDown={startDrag}
            >
              <div className="mobile-menu-content">
                <motion.div 
                  className="mobile-menu-header"
                  variants={menuItemVariants}
                >
                  <h3 className="text-gradient">Menu</h3>
                  <motion.button
                    className="mobile-menu-close"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close menu"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </motion.button>
                </motion.div>
                
                <nav aria-label="Mobile navigation">
                  <ul className="mobile-nav-list">
                    {navItems.map((item) => (
                      <motion.li 
                        key={item.name} 
                        className={`mobile-nav-item ${activeNavItem === item.name ? 'active' : ''}`}
                        variants={menuItemVariants}
                      >
                        <a 
                          href={item.path}
                          onClick={() => handleNavLinkClick(item.path, item.name)}
                          className="mobile-nav-link"
                          aria-current={activeNavItem === item.name ? 'page' : undefined}
                        >
                          <span className="mobile-nav-icon">
                            <FontAwesomeIcon icon={item.icon} />
                          </span>
                          <span className="mobile-nav-text">{item.name}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                
                <motion.div 
                  className="mobile-menu-swipe-hint"
                  variants={menuItemVariants}
                >
                  <motion.div 
                    className="swipe-indicator"
                    initial={{ opacity: 0.5 }}
                    animate={{ 
                      opacity: [0.5, 0.8, 0.5],
                      x: [0, 10, 0] 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                    <span>Swipe to close</span>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="mobile-menu-footer"
                  variants={menuItemVariants}
                >
                  <button 
                    className="mobile-theme-toggle"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  >
                    <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
                    <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 