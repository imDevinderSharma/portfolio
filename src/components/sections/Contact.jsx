import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const { ref, controls } = useAnimateOnScroll();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  const [touched, setTouched] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };
  
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message) errors.message = 'Message is required';
    
    return errors;
  };
  
  const errors = validateForm();
  const isValid = Object.keys(errors).length === 0;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Touch all fields to show validation
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);
    
    if (!isValid) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }
    
    // Simulate form submission
    setFormStatus({ submitted: true, success: false, message: 'Sending...' });
    
    // Mock API call
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: '',
        });
      }, 3000);
    }, 2000);
  };
  
  const getInputClasses = (fieldName) => {
    if (touched[fieldName] && errors[fieldName]) {
      return 'form-input error';
    }
    if (touched[fieldName] && !errors[fieldName]) {
      return 'form-input valid';
    }
    return 'form-input';
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };
  
  const contactInfo = [
    {
      icon: faEnvelope,
      title: 'Email',
      value: 'iamDevinderSharma15122005@gmail.com',
      link: 'mailto:iamDevinderSharma15122005@gmail.com',
    },
    {
      icon: faPhone,
      title: 'Phone',
      value: '+91 63987 95334',
      link: 'tel:+916398795334',
    },
    {
      icon: faMapMarkerAlt,
      title: 'Location',
      value: 'Haryana, India',
      link: 'https://maps.google.com/?q=Haryana,India',
    },
  ];
  
  const socialLinks = [
    { name: 'LinkedIn', icon: faLinkedin, url: 'https://www.linkedin.com/in/imdevindersharma/' },
    { name: 'GitHub', icon: faGithub, url: 'https://github.com/imDevinderSharma' },
    { name: 'Instagram', icon: faInstagram, url: 'https://www.instagram.com/imdevindersharma/' },
  ];
  
  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-subtitle">Let's work together</div>
          <div className="section-line"></div>
        </motion.div>
        
        <div className="contact-content">
          <motion.div
            ref={ref}
            className="contact-info"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div className="contact-heading" variants={itemVariants}>
              <h3>Let's talk about your project</h3>
              <p>
                I'm interested in freelance opportunities – especially ambitious or large
                projects. However, if you have any other requests or questions, don't
                hesitate to use the form.
              </p>
            </motion.div>
            
            <div className="info-items">
              {contactInfo.map((item) => (
                <motion.div 
                  key={item.title} 
                  className="info-item glass-card"
                  variants={itemVariants}
                  whileHover={{ 
                    cursor: 'pointer',
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.06)',
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                >
                  <div className="info-icon">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <div className="info-content">
                    <h4 className="info-title">{item.title}</h4>
                    <a 
                      href={item.link} 
                      className="info-value"
                      target={item.title === 'Location' ? '_blank' : ''}
                      rel={item.title === 'Location' ? 'noopener noreferrer' : ''}
                    >
                      {item.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div className="social-links-container" variants={itemVariants}>
              <h4 className="social-title">Find me on</h4>
              <div className="social-links">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="social-link"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={link.icon} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="form-wrapper glass-card">
              <h3 className="form-title">Send me a message</h3>
              
              <AnimatePresence>
                {formStatus.submitted && (
                  <motion.div 
                    className={`form-status ${formStatus.success ? 'success' : 'error'}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="status-icon">
                      <FontAwesomeIcon icon={formStatus.success ? faCheck : faExclamationTriangle} />
                    </span>
                    {formStatus.message}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <motion.div className="input-container">
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClasses('name')}
                      placeholder="John Doe"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      aria-invalid={touched.name && errors.name ? 'true' : 'false'}
                    />
                    {touched.name && !errors.name && (
                      <span className="valid-icon">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    )}
                  </motion.div>
                  {touched.name && errors.name && (
                    <span className="error-message">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
                      {errors.name}
                    </span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Your Email
                  </label>
                  <motion.div className="input-container">
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClasses('email')}
                      placeholder="john@example.com"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      aria-invalid={touched.email && errors.email ? 'true' : 'false'}
                    />
                    {touched.email && !errors.email && (
                      <span className="valid-icon">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    )}
                  </motion.div>
                  {touched.email && errors.email && (
                    <span className="error-message">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
                      {errors.email}
                    </span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject (Optional)
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-input"
                    placeholder="Project Inquiry"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClasses('message')}
                    placeholder="Hello! I'm interested in working with you on..."
                    rows={5}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    aria-invalid={touched.message && errors.message ? 'true' : 'false'}
                  ></motion.textarea>
                  {touched.message && errors.message && (
                    <span className="error-message">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
                      {errors.message}
                    </span>
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  className="submit-button"
                  disabled={formStatus.submitted && !formStatus.success}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 