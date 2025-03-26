import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faArrowLeft, faArrowRight, faCode, faLaptopCode, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const Projects = () => {
  const { ref, controls } = useAnimateOnScroll(0.1);
  const [activeProject, setActiveProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const progressTimeoutRef = useRef(null);
  
  // Handle mouse movement for tilt effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Auto-rotate projects
  useEffect(() => {
    const resetProgressTimeout = () => {
      if (progressTimeoutRef.current) {
        clearTimeout(progressTimeoutRef.current);
      }
      
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
    };
  }, [isAnimating, activeProject]);
  
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce website with user authentication, product catalog, cart functionality, and payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe'],
      image: 'https://picsum.photos/id/1/600/400',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      category: 'Full Stack',
      icon: faLaptopCode
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A sleek task management application with drag-and-drop functionality, team collaboration features, and real-time updates.',
      technologies: ['React', 'Firebase', 'Material UI', 'React DnD', 'Redux'],
      image: 'https://picsum.photos/id/2/600/400',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      category: 'Frontend',
      icon: faCode
    },
    {
      id: 3,
      title: 'AI Image Generator',
      description: 'An application that uses AI to generate unique images based on text descriptions provided by users.',
      technologies: ['Next.js', 'OpenAI API', 'TailwindCSS', 'TypeScript'],
      image: 'https://picsum.photos/id/3/600/400',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com', 
      category: 'AI/ML',
      icon: faLaptopCode
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'A real-time weather application that provides detailed forecasts, radar maps, and weather alerts for locations worldwide.',
      technologies: ['React', 'Weather API', 'Chart.js', 'Styled Components'],
      image: 'https://picsum.photos/id/4/600/400',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      category: 'Frontend',
      icon: faCode
    },
    {
      id: 5,
      title: 'Social Media Platform',
      description: 'A social networking application with features for creating posts, following users, direct messaging, and content discovery.',
      technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'AWS S3'],
      image: 'https://picsum.photos/id/5/600/400',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      category: 'Full Stack',
      icon: faLaptopCode
    },
    {
      id: 6,
      title: 'Finance Tracker',
      description: 'A personal finance management tool that helps users track expenses, set budgets, and visualize spending patterns.',
      technologies: ['React', 'D3.js', 'Firebase', 'PWA', 'IndexedDB'],
      image: 'https://picsum.photos/id/6/600/400',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      category: 'Frontend',
      icon: faCode
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
    }, 600);
    
    // Reset auto-rotate timer when manually navigating
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
      progressTimeoutRef.current = setTimeout(() => {
        if (!isAnimating) {
          setDirection('next');
          setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
        }
      }, 6000);
    }
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
  
  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const sliderVariants = {
    enter: (direction) => ({
      x: direction === 'next' ? 500 : -500,
      opacity: 0,
      scale: 0.85,
      rotateY: direction === 'next' ? -15 : 15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (direction) => ({
      x: direction === 'next' ? -500 : 500,
      opacity: 0,
      scale: 0.85,
      rotateY: direction === 'next' ? 15 : -15,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Calculate tilt effect based on mouse position
  const calcTiltX = useSpring(useTransform(
    useMotionValue(mousePosition.x),
    [-0.5, 0.5],
    [-10, 10]
  ));
  
  const calcTiltY = useSpring(useTransform(
    useMotionValue(mousePosition.y),
    [-0.5, 0.5],
    [10, -10]
  ));
  
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">My Projects</h2>
          <div className="section-subtitle">Check out my latest work</div>
          <div className="section-line"></div>
        </motion.div>
        
        <div className="projects-showcase">
          <motion.div 
            className="featured-project"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              perspective: 1000
            }}
          >
            {/* Progress bar */}
            <motion.div 
              className="projects-progress-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="projects-progress-track">
                {projects.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`progress-item-btn ${index === activeProject ? 'active' : ''}`}
                    onClick={() => {
                      if (isAnimating) return;
                      const newDirection = index > activeProject ? 'next' : 'prev';
                      setDirection(newDirection);
                      setActiveProject(index);
                      setIsAnimating(true);
                      setTimeout(() => {
                        setIsAnimating(false);
                      }, 600);
                      
                      // Reset auto-rotate timer when manually selecting
                      if (progressTimeoutRef.current) {
                        clearTimeout(progressTimeoutRef.current);
                        progressTimeoutRef.current = setTimeout(() => {
                          if (!isAnimating) {
                            setDirection('next');
                            setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
                          }
                        }, 6000);
                      }
                    }}
                  >
                    <motion.div 
                      className="progress-item"
                      initial={false}
                      animate={{
                        width: index === activeProject ? '100%' : '0%',
                        backgroundColor: index === activeProject ? 'var(--primary)' : 'var(--border)'
                      }}
                      transition={{
                        duration: index === activeProject ? 6 : 0.3,
                        ease: 'linear'
                      }}
                    />
                    <motion.div 
                      className="progress-icon"
                      initial={false}
                      animate={{
                        backgroundColor: index === activeProject ? 'var(--primary)' : 'var(--glass-background)',
                        scale: index === activeProject ? 1.1 : 1,
                        boxShadow: index === activeProject ? '0 0 15px rgba(157, 78, 221, 0.5)' : 'none'
                      }}
                      whileHover={{
                        scale: 1.2,
                        backgroundColor: 'var(--primary-light)'
                      }}
                    >
                      <FontAwesomeIcon icon={projects[index].icon} />
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            <div className="featured-controls">
              <motion.button 
                className="nav-button prev"
                onClick={() => navigateProjects('prev')}
                whileHover={{ x: -5, backgroundColor: 'var(--primary)', color: 'white' }}
                whileTap={{ scale: 0.9 }}
                disabled={isAnimating}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </motion.button>
              
              <motion.button 
                className="nav-button next"
                onClick={() => navigateProjects('next')}
                whileHover={{ x: 5, backgroundColor: 'var(--primary)', color: 'white' }}
                whileTap={{ scale: 0.9 }}
                disabled={isAnimating}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </motion.button>
            </div>
            
            <div className="featured-slider" style={{ perspective: 1000 }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div 
                  className="featured-card glass-card"
                  key={activeProject}
                  custom={direction}
                  variants={sliderVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onAnimationComplete={() => setIsAnimating(false)}
                  style={{
                    rotateX: calcTiltY,
                    rotateY: calcTiltX,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="featured-image">
                    <motion.img 
                      src={projects[activeProject].image} 
                      alt={projects[activeProject].title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="featured-category"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {projects[activeProject].category}
                    </motion.div>
                  </div>
                  
                  <div className="featured-content">
                    <motion.h3 
                      className="featured-title"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {projects[activeProject].title}
                    </motion.h3>
                    <motion.p 
                      className="featured-description"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {projects[activeProject].description}
                    </motion.p>
                    
                    <motion.div 
                      className="technologies"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {projects[activeProject].technologies.map((tech, idx) => (
                        <motion.span 
                          key={tech} 
                          className="tech-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            boxShadow: '0 5px 15px rgba(157, 78, 221, 0.3)'
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                    
                    <motion.div 
                      className="featured-links"
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
                          y: -5, 
                          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                          backgroundColor: '#24292e',
                          color: 'white'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FontAwesomeIcon icon={faGithub} />
                        <span>Source Code</span>
                      </motion.a>
                      
                      <motion.a 
                        href={projects[activeProject].liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link live"
                        whileHover={{ 
                          y: -5, 
                          boxShadow: '0 5px 15px rgba(157, 78, 221, 0.3)',
                          backgroundColor: 'var(--primary)',
                          color: 'white'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                        <span>Live Demo</span>
                      </motion.a>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          
          <motion.div
            ref={ref}
            className="project-grid"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card-wrapper"
                variants={cardVariants}
                whileHover={{ 
                  z: 20,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="project-card"
                  whileHover={{
                    rotateY: 180,
                    transition: { duration: 0.6, ease: "easeOut" }
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div 
                    className="card-front"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="card-image">
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div 
                        className="image-overlay"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <motion.span 
                          className="view-project"
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          View Details 
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ms-2" />
                        </motion.span>
                      </motion.div>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{project.title}</h3>
                      <div className="card-category">{project.category}</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="card-back glass-card"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-description">{project.description}</p>
                    
                    <div className="card-technologies">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <motion.span 
                          key={tech} 
                          className="tech-tag"
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: 'var(--primary)',
                            color: 'white'
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 3 && (
                        <motion.span 
                          className="tech-tag more"
                          whileHover={{ scale: 1.1 }}
                        >
                          +{project.technologies.length - 3}
                        </motion.span>
                      )}
                    </div>
                    
                    <div className="card-links">
                      <motion.a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="card-link"
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: '#24292e',
                          color: 'white'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FontAwesomeIcon icon={faGithub} />
                        <span>GitHub</span>
                      </motion.a>
                      
                      <motion.a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="card-link"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: 'var(--primary)',
                          color: 'white'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                        <span>Live</span>
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Project background decoration */}
          <div className="projects-decoration">
            <motion.div 
              className="proj-deco proj-deco-1"
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.3, 0.2],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="proj-deco proj-deco-2"
              animate={{
                x: [0, 50, 0],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, -180, -360]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 