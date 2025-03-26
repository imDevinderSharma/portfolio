import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faEnvelope, faPhone, faMapMarkerAlt, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', icon: faGithub, url: 'https://github.com' },
    { name: 'LinkedIn', icon: faLinkedin, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: faTwitter, url: 'https://twitter.com' },
  ];
  
  const quickLinks = [
    { name: 'Home', url: '#home' },
    { name: 'About', url: '#about' },
    { name: 'Skills', url: '#skills' },
    { name: 'Projects', url: '#projects' },
    { name: 'Contact', url: '#contact' },
  ];
  
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };
  
  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="footer-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerVariants}
        >
          <motion.div className="footer-section about-section" variants={itemVariants}>
            <h3 className="footer-title">Devinder</h3>
            <p className="footer-description">
              A passionate full-stack web developer focused on creating efficient, responsive, 
              and user-friendly applications.
            </p>
            <div className="footer-social">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.name}
                >
                  <FontAwesomeIcon icon={link.icon} />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div className="footer-section links-section" variants={itemVariants}>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.url}
                    className="footer-link"
                    whileHover={{ x: 5, color: '#9d4edd' }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div className="footer-section contact-section" variants={itemVariants}>
            <h3 className="footer-title">Contact Info</h3>
            <ul className="footer-info">
              <motion.li 
                className="footer-info-item"
                whileHover={{ x: 5 }}
              >
                <div className="footer-icon-wrapper">
                  <FontAwesomeIcon icon={faEnvelope} className="footer-contact-icon" />
                </div>
                <a href="mailto:devinder@example.com" className="info-value">
                  devinder@example.com
                </a>
              </motion.li>
              <motion.li 
                className="footer-info-item"
                whileHover={{ x: 5 }}
              >
                <div className="footer-icon-wrapper">
                  <FontAwesomeIcon icon={faPhone} className="footer-contact-icon" />
                </div>
                <a href="tel:+15551234567" className="info-value">
                  +1 (555) 123-4567
                </a>
              </motion.li>
              <motion.li 
                className="footer-info-item"
                whileHover={{ x: 5 }}
              >
                <div className="footer-icon-wrapper">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="footer-contact-icon" />
                </div>
                <span className="info-value">New York, NY</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="copyright">
            <p>
              &copy; {currentYear} Devinder. All rights reserved. Made with{' '}
              <motion.span
                className="heart-icon"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.2, 1],
                  transition: { repeat: Infinity, duration: 1.5 }
                }}
              >
                <FontAwesomeIcon icon={faHeart} />
              </motion.span>{' '}
              using React & Framer Motion
            </p>
          </div>
          <div className="back-to-top">
            <motion.a
              href="#home"
              className="top-btn"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 