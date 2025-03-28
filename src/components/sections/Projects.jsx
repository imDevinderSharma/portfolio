import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { 
  faExternalLinkAlt, 
  faLeaf, 
  faUtensils, 
  faUser,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

// Import project images from assets
import luckyShrubImage from '../../assets/lucky-shrub.jpg';
import tableBookingImage from '../../assets/table-booking.jpg';
import bioPageImage from '../../assets/bio-page.png';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimeoutRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const carouselRef = useRef(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      // Adjust layout or behavior based on mobile view if needed
      if (isMobileView && !showAll) {
        // Mobile-specific adjustments can go here
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [showAll]);
  
  // Auto-rotate projects only in featured mode
  useEffect(() => {
    if (showAll) return;
    
    const resetProgressAnimation = () => {
      // Clear previous interval if it exists
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      // Reset progress to 0
      setProgress(0);
      
      // Start a new progress animation
      const startTime = Date.now();
      const duration = 6000; // 6 seconds
      
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(100, (elapsed / duration) * 100);
        setProgress(newProgress);
        
        if (newProgress >= 100) {
          clearInterval(progressIntervalRef.current);
        }
      }, 16); // ~60fps
    };
    
    const resetProgressTimeout = () => {
      if (progressTimeoutRef.current) {
        clearTimeout(progressTimeoutRef.current);
      }
      
      // Reset and start progress animation
      resetProgressAnimation();
      
      progressTimeoutRef.current = setTimeout(() => {
        if (!isAnimating) {
          setDirection('next');
          setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
        }
      }, 6000);
    };
    
    resetProgressTimeout();
    
    return () => {
      if (progressTimeoutRef.current) {
        clearTimeout(progressTimeoutRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isAnimating, activeProject, showAll]);
  
  const projects = [
    {
      id: 1,
      title: 'Lucky Shrub',
      description: 'A website for a garden design, creation, maintenance, and landscaping company based in Tucson, Arizona. Features an elegant layout with subtle animations that enhance the user experience.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Animation'],
      image: luckyShrubImage,
      githubUrl: 'https://github.com/imDevInderSharma/Lucky-Shrub',
      liveUrl: 'https://imdevindersharma.github.io/Lucky-Shrub/',
      category: 'Frontend',
      icon: faLeaf
    },
    {
      id: 2,
      title: 'Table Booking',
      description: 'A simple website for "Little Lemon" restaurant with integrated table booking functionality. Allows users to view restaurant information and reserve tables.',
      technologies: ['React', 'JavaScript', 'CSS', 'Responsive Design'],
      image: tableBookingImage,
      githubUrl: 'https://github.com/imDevInderSharma/table-booking',
      liveUrl: 'https://table-booking-flax.vercel.app/',
      category: 'Frontend',
      icon: faUtensils
    },
    {
      id: 3,
      title: 'Bio Page',
      description: 'A simple personal bio page showcasing favorite music artists, films, and other personal information in a clean, minimalist design.',
      technologies: ['HTML', 'CSS', 'Responsive Design'],
      image: bioPageImage,
      githubUrl: 'https://github.com/imDevInderSharma/Bio-Page',
      liveUrl: 'https://imdevindersharma.github.io/Bio-Page/',
      category: 'Frontend',
      icon: faUser
    },
  ];
  
  const navigateProjects = (direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(direction);
    
    if (direction === 'next') {
      setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    } else {
      setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    }
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    // Reset auto-rotate timer when manually navigating
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // Reset progress to 0
    setProgress(0);
    
    // Start new progress animation and timer
    const startTime = Date.now();
    const duration = 6000; // 6 seconds
    
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(progressIntervalRef.current);
      }
    }, 16); // ~60fps
    
    progressTimeoutRef.current = setTimeout(() => {
      if (!isAnimating && !showAll) {
        setDirection('next');
        setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
      }
    }, 6000);
  };
  
  // Calculate circle properties for progress indicators
  const calculateCircleProps = (index) => {
    const size = 18; // Size of the circle
    const strokeWidth = 2; // Width of the stroke
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    
    // If this is the active project, use the progress value
    // Otherwise, use 0 for inactive projects
    const progressValue = index === activeProject ? progress : 0;
    
    // Calculate the stroke-dashoffset based on progress
    const offset = circumference - (progressValue / 100) * circumference;
    
    return {
      size,
      strokeWidth,
      radius,
      circumference,
      offset
    };
  };
  
  // Variants for animations
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  
  const sliderVariants = {
    enter: (direction) => ({
      x: direction === 'next' ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (direction) => ({
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };
  
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUpVariant}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Recent work I've built</p>
          <div className="section-divider"></div>
        </motion.div>
        
        <div className="projects-view-toggle">
          <motion.button
            className={`view-toggle-btn ${!showAll ? 'active' : ''}`}
            onClick={() => setShowAll(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Featured
          </motion.button>
          <motion.button
            className={`view-toggle-btn ${showAll ? 'active' : ''}`}
            onClick={() => setShowAll(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            All Projects
          </motion.button>
        </div>

        {/* Featured Project View */}
        {!showAll && (
          <div className="featured-project-container" ref={carouselRef}>
            <div className="featured-navigation">
              <motion.button
                className="nav-arrow prev"
                onClick={() => navigateProjects('prev')}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                }}
                whileTap={{ scale: 0.95 }}
                disabled={isAnimating}
                aria-label="Previous project"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </motion.button>
              
              <div className="project-indicators">
                {projects.map((_, index) => {
                  const { size, strokeWidth, radius, circumference, offset } = calculateCircleProps(index);
                  return (
                    <motion.div
                      key={index}
                      className={`indicator-container ${index === activeProject ? 'active' : ''}`}
                      onClick={() => {
                        if (isAnimating) return;
                        const newDirection = index > activeProject ? 'next' : 'prev';
                        setDirection(newDirection);
                        setActiveProject(index);
                      }}
                      whileHover={{ scale: 1.2 }}
                      style={{ 
                        width: size, 
                        height: size, 
                        position: 'relative',
                        margin: '0 6px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {/* Background circle */}
                      <svg
                        width={size}
                        height={size}
                        style={{ 
                          position: 'absolute', 
                          transform: 'rotate(-90deg)',
                          top: 0,
                          left: 0
                        }}
                      >
                        <circle
                          cx={size / 2}
                          cy={size / 2}
                          r={radius}
                          fill="transparent"
                          stroke="rgba(255, 255, 255, 0.2)"
                          strokeWidth={strokeWidth}
                        />
                      </svg>
                      
                      {/* Progress circle */}
                      <svg
                        width={size}
                        height={size}
                        style={{ 
                          position: 'absolute', 
                          transform: 'rotate(-90deg)',
                          top: 0,
                          left: 0
                        }}
                      >
                        <circle
                          cx={size / 2}
                          cy={size / 2}
                          r={radius}
                          fill="transparent"
                          stroke="var(--primary)"
                          strokeWidth={strokeWidth}
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          strokeLinecap="round"
                        />
                      </svg>
                      
                      {/* Inner dot for active indicator */}
                      {index === activeProject && (
                        <motion.div
                          className="indicator-dot"
                          style={{
                            position: 'absolute',
                            width: size / 3,
                            height: size / 3,
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary)',
                            zIndex: 2
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              <motion.button
                className="nav-arrow next"
                onClick={() => navigateProjects('next')}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                }}
                whileTap={{ scale: 0.95 }}
                disabled={isAnimating}
                aria-label="Next project"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </motion.button>
            </div>
            
            <div className="featured-project-slide">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeProject}
                  className="featured-project-card"
                  custom={direction}
                  variants={sliderVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onAnimationComplete={() => setIsAnimating(false)}
                >
                  <div className="project-card-inner">
                    <div className="project-image-container">
                      <motion.img
                        src={projects[activeProject].image}
                        alt={projects[activeProject].title}
                        className="project-image"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/800x500?text=Project+Image';
                        }}
                      />
                      <motion.div 
                        className="project-category"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <FontAwesomeIcon icon={projects[activeProject].icon} />
                        <span>{projects[activeProject].category}</span>
                      </motion.div>
                    </div>
                    
                    <div className="project-details">
                      <motion.h3 
                        className="project-title"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {projects[activeProject].title}
                      </motion.h3>
                      
                      <motion.p 
                        className="project-description"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {projects[activeProject].description}
                      </motion.p>
                      
                      <motion.div 
                        className="project-tech-stack"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {projects[activeProject].technologies.map((tech, idx) => (
                          <motion.span 
                            key={tech} 
                            className="tech-badge"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.3 + idx * 0.05 }}
                            whileHover={{ 
                              y: -2,
                              backgroundColor: 'var(--primary)',
                              color: 'white'
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                      
                      <motion.div 
                        className="project-links"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <motion.a 
                          href={projects[activeProject].githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link github"
                          whileHover={{ 
                            y: -3,
                            backgroundColor: '#24292e',
                            color: 'white',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
                          }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <FontAwesomeIcon icon={faGithub} />
                          <span>GitHub</span>
                        </motion.a>
                        
                        <motion.a 
                          href={projects[activeProject].liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link demo"
                          whileHover={{ 
                            y: -3,
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            boxShadow: '0 4px 10px rgba(157, 78, 221, 0.2)'
                          }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} />
                          <span>Live Demo</span>
                        </motion.a>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
        
        {/* Grid View - All Projects */}
        {showAll && (
          <motion.div 
            className="projects-grid"
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariant}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="grid-project-card"
                custom={index}
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="grid-card-inner">
                  <div className="grid-image-container">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="grid-project-image"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x250?text=Project+Image';
                      }}
                    />
                    <motion.div className="grid-category-badge">
                      <FontAwesomeIcon icon={project.icon} />
                      <span>{project.category}</span>
                    </motion.div>
                  </div>
                  
                  <div className="grid-project-details">
                    <h3 className="grid-project-title">{project.title}</h3>
                    <p className="grid-project-description">{project.description}</p>
                    
                    <div className="grid-tech-stack">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="grid-tech-badge">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="grid-tech-badge more">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid-project-links">
                      <motion.a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="grid-link github"
                        whileHover={{ 
                          y: -2,
                          backgroundColor: '#24292e',
                          color: 'white' 
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <FontAwesomeIcon icon={faGithub} />
                      </motion.a>
                      
                      <motion.a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="grid-link demo"
                        whileHover={{ 
                          y: -2,
                          backgroundColor: 'var(--primary)',
                          color: 'white' 
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Background decorations */}
        <div className="projects-decoration">
          <motion.div 
            className="decoration-element element-1"
            animate={{
              y: [0, -20, 0],
              opacity: [0.15, 0.2, 0.15],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div 
            className="decoration-element element-2"
            animate={{
              x: [0, 30, 0],
              opacity: [0.1, 0.15, 0.1],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;