import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform, useScroll } from 'framer-motion';
import * as THREE from 'three';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCode, faRocket, faStar, faLaptopCode, faMagic, faLayerGroup, faBrain } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const controls = useAnimation();
  const [loaded, setLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState(true);
  const parallaxRef = useRef(null);
  
  // For scroll-based animations
  const { scrollY } = useScroll();
  const scrollYRange = useTransform(scrollY, [0, 300], [0, 1]);
  const heroOpacity = useTransform(scrollYRange, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYRange, [0, 1], [1, 0.95]);
  const heroY = useTransform(scrollYRange, [0, 1], [0, 50]);
  
  // Floating tech icons
  const [techIcons] = useState([
    { icon: faLaptopCode, color: '#9d4edd', size: 24, position: { x: '15%', y: '20%' }, delay: 0 },
    { icon: faCode, color: '#c77dff', size: 18, position: { x: '80%', y: '15%' }, delay: 0.5 },
    { icon: faMagic, color: '#7b2cbf', size: 22, position: { x: '25%', y: '80%' }, delay: 1 },
    { icon: faLayerGroup, color: '#5a189a', size: 20, position: { x: '70%', y: '75%' }, delay: 1.5 },
    { icon: faBrain, color: '#22d3ee', size: 26, position: { x: '85%', y: '60%' }, delay: 2 },
  ]);
  
  // Detect if device supports touch/mobile
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouch();
    window.addEventListener('resize', checkTouch);
    
    return () => window.removeEventListener('resize', checkTouch);
  }, []);
  
  // Mouse movement handler for particles
  useEffect(() => {
    if (isTouchDevice) return;
    
    const handleMouseMove = (e) => {
      // Update mousePosition for particles
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
      
      // Parallax effect for text and content
      if (parallaxRef.current) {
        const moveX = (e.clientX - window.innerWidth / 2) / 25;
        const moveY = (e.clientY - window.innerHeight / 2) / 25;
        parallaxRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Intro animation timing
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [isTouchDevice]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Responsive canvas
    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, canvasSizes.width / canvasSizes.height, 0.1, 100);
    camera.position.z = 3;
    scene.add(camera);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(canvasSizes.width, canvasSizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Optimize for mobile devices
    // Reduce particle count on mobile/touch devices
    const particlesCount = isTouchDevice ? 1000 : 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const particleSizes = new Float32Array(particlesCount);
    
    const colorPalette = [
      new THREE.Color('#9d4edd'),
      new THREE.Color('#c77dff'),
      new THREE.Color('#7b2cbf'),
      new THREE.Color('#5a189a'),
      new THREE.Color('#3c096c'),
      new THREE.Color('#22d3ee'), // Add accent color for variety
    ];
    
    // Create multiple particle systems
    const particleGroups = [];
    
    // First group - sphere distribution
    for (let i = 0; i < particlesCount / 2; i++) {
      // Positions - create a sphere distribution
      const radius = Math.random() * 5 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Colors
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Random sizes with more variation - smaller on mobile
      particleSizes[i] = Math.random() * (isTouchDevice ? 0.05 : 0.08) + 0.01;
    }
    
    // Second group - vortex/helix distribution
    for (let i = particlesCount / 2; i < particlesCount; i++) {
      const t = Math.random() * Math.PI * 2;
      const radius = Math.random() * 4 + 1;
      const height = (Math.random() - 0.5) * 10;
      
      const x = radius * Math.cos(t * 5);
      const y = radius * Math.sin(t * 5);
      const z = height;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Colors - use more accent colors for this group
      const color = i % 5 === 0 
        ? colorPalette[5] // Accent color
        : colorPalette[Math.floor(Math.random() * (colorPalette.length - 1))];
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Smaller particles for this group
      particleSizes[i] = Math.random() * 0.05 + 0.01;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    // Advanced shader material for better-looking particles
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute vec3 color;
        attribute float size;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          if (distanceToCenter > 0.5) {
            discard;
          }
          
          float alpha = 1.0 - (distanceToCenter * 2.0);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Create floating lights for extra effect
    const createLight = (color, intensity, position) => {
      const light = new THREE.PointLight(color, intensity, 15);
      light.position.set(...position);
      scene.add(light);
      return light;
    };
    
    const lights = [
      createLight(0x9d4edd, 2, [5, 3, 2]),
      createLight(0x22d3ee, 1.5, [-5, -2, 3]),
      createLight(0x7b2cbf, 1, [0, -5, 2])
    ];
    
    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animate lights
      lights.forEach((light, i) => {
        light.position.x = Math.sin(elapsedTime * 0.3 + i * Math.PI) * 5;
        light.position.y = Math.cos(elapsedTime * 0.2 + i * Math.PI) * 5;
        light.position.z = Math.sin(elapsedTime * 0.1 + i * Math.PI) * 3 + 5;
      });
      
      // Orbit rotation
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.03;
      
      // Mouse interaction with particles - more responsive
      particles.rotation.x += mousePosition.y * 0.015;
      particles.rotation.y += mousePosition.x * 0.015;
      
      // Wave and stretch effect - simplified for mobile
      const positions = particlesGeometry.attributes.position.array;
      
      // Optimize animations for mobile
      const animationIntensity = isTouchDevice ? 0.5 : 1;
      
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Different effects for different particle groups
        if (i < particlesCount / 2) {
          // Sphere group - pulsing effect
          const initialDist = Math.sqrt(x * x + y * y + z * z);
          const waveFactor = Math.sin(elapsedTime * 0.5 + initialDist) * 0.15 * animationIntensity;
          
          positions[i3] = x * (1 + waveFactor);
          positions[i3 + 1] = y * (1 + waveFactor);
          positions[i3 + 2] = z * (1 + waveFactor);
        } else {
          // Vortex group - rotating and twisting effect
          const angle = elapsedTime * 0.3 * animationIntensity;
          const radius = Math.sqrt(x * x + y * y);
          
          positions[i3] = Math.cos(angle + x) * radius;
          positions[i3 + 1] = Math.sin(angle + y) * radius;
          positions[i3 + 2] = z + Math.sin(elapsedTime * 0.2 + z) * 0.5 * animationIntensity;
        }
      }
      
      // On mobile devices, update position less frequently to improve performance
      if (!isTouchDevice || Math.floor(elapsedTime * 10) % 2 === 0) {
        particlesGeometry.attributes.position.needsUpdate = true;
      }
      
      // Render
      renderer.render(scene, camera);
      
      // Call animate again on the next frame
      animationRef.current = window.requestAnimationFrame(animate);
    };
    
    // Handle resize
    const handleResize = () => {
      // Update sizes
      canvasSizes.width = window.innerWidth;
      canvasSizes.height = window.innerHeight;
      
      // Update camera
      camera.aspect = canvasSizes.width / canvasSizes.height;
      camera.updateProjectionMatrix();
      
      // Update renderer
      renderer.setSize(canvasSizes.width, canvasSizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    setLoaded(true);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationRef.current);
      scene.remove(particles);
      lights.forEach(light => scene.remove(light));
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [mousePosition, isTouchDevice]);
  
  // Hero content animations
  useEffect(() => {
    if (loaded) {
      controls.start('visible');
    }
  }, [loaded, controls]);
  
  // Typing effect for description text
  const [descIndex, setDescIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const descriptionTexts = [
    "Creating stunning digital experiences with cutting-edge technologies.",
    "Specialized in building modern, responsive web applications.",
    "Passionate about clean code and immersive user interfaces.",
    "Turning innovative ideas into elegant solutions."
  ];
  
  useEffect(() => {
    let timeout;
    
    if (isTyping) {
      if (displayText.length < descriptionTexts[descIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(descriptionTexts[descIndex].substring(0, displayText.length + 1));
        }, 50);
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 30);
      } else {
        setIsTyping(true);
        setDescIndex((prevIndex) => (prevIndex + 1) % descriptionTexts.length);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isTyping, descIndex, descriptionTexts]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
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

  const textCharVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5
      }
    })
  };
  
  const titles = ['Developer', 'Innovator', 'Designer', 'Problem Solver', 'Creator'];
  const [titleIndex, setTitleIndex] = useState(0);
  
  // Rotate through titles
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [titles.length]);

  // Intro animation
  const introVariants = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  // Split text for character animation
  const nameText = "Devinder";
  const nameArray = nameText.split("");
  
  return (
    <motion.section 
      className="hero"
      style={{
        opacity: heroOpacity,
        scale: heroScale,
        y: heroY
      }}
    >
      <canvas ref={canvasRef} className="hero-canvas" />
      
      {/* Floating tech icons - only visible on non-touch devices */}
      {!isTouchDevice && techIcons.map((icon, index) => (
        <motion.div
          key={index}
          className="floating-tech-icon"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: [0, 10, -10, 0],
            y: [0, -10, 10, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            delay: icon.delay,
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            position: "absolute",
            left: icon.position.x,
            top: icon.position.y,
            color: icon.color,
            fontSize: icon.size,
            filter: `drop-shadow(0 0 10px ${icon.color})`
          }}
        >
          <FontAwesomeIcon icon={icon.icon} />
        </motion.div>
      ))}
      
      {/* Intro animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            className="intro-animation"
            variants={introVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="intro-logo"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotateY: [0, 360],
                filter: ["drop-shadow(0 0 0px rgba(157, 78, 221, 0.7))", "drop-shadow(0 0 30px rgba(157, 78, 221, 0.7))"]
              }}
              transition={{ 
                duration: 1.5, 
                times: [0, 0.7, 1],
                ease: "easeInOut"
              }}
            >
              <FontAwesomeIcon icon={faCode} />
            </motion.div>
            <motion.div 
              className="intro-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                filter: ["blur(10px)", "blur(0px)"]
              }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Welcome to my portfolio
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          ref={parallaxRef}
          style={{ 
            transform: isTouchDevice ? 'none' : undefined 
          }}
        >
          <motion.h1 
            variants={itemVariants} 
            className="hero-title"
            whileHover={{ 
              perspective: 1000,
              rotateX: 5,
              rotateY: -5,
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            Hi, I'm{" "}
            <span className="name-text-wrapper">
              {nameArray.map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={textCharVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-gradient name-char"
                  style={{ display: 'inline-block' }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, 5, -5, 0],
                    color: "#22d3ee",
                    transition: { duration: 0.3 }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          
          {/* Tech stack glitch effect */}
          <motion.div 
            className="tech-stack-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              transition: { delay: 1.2, duration: 0.5 } 
            }}
            whileHover={{
              scale: 1.05,
              filter: "hue-rotate(30deg)",
              transition: { duration: 0.2 }
            }}
          >
            <span className="tech-stack-text">Full Stack Developer</span>
            <span className="tech-stack-glitch" data-text="Full Stack Developer">Full Stack Developer</span>
            <span className="tech-stack-glow">Full Stack Developer</span>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="hero-subtitle"
            whileHover={{ 
              perspective: 1000,
              rotateX: -5,
              rotateY: 5,
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <span className="static-text">A passionate</span>
            <div className="dynamic-text-wrapper">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  className="dynamic-text"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                >
                  {titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
          
          <motion.p variants={itemVariants} className="hero-description">
            {displayText}
            <motion.span 
              className="typing-cursor"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >|</motion.span>
          </motion.p>
          
          <motion.div variants={itemVariants} className="hero-cta">
            <motion.a 
              href="#projects" 
              className="button primary-button"
              whileHover={{ 
                scale: isTouchDevice ? 1.02 : 1.05, 
                boxShadow: "0 10px 25px rgba(157, 78, 221, 0.4)",
                textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
                color: "#FFFFFF"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ boxShadow: "0 4px 15px rgba(157, 78, 221, 0.2)" }}
              animate={{ 
                boxShadow: ["0 4px 15px rgba(157, 78, 221, 0.2)", "0 6px 20px rgba(157, 78, 221, 0.4)", "0 4px 15px rgba(157, 78, 221, 0.2)"],
              }}
              transition={{
                boxShadow: {
                  repeat: Infinity,
                  duration: 2
                }
              }}
            >
              <FontAwesomeIcon icon={faRocket} className="button-icon" />
              <span className="button-text">View My Work</span>
              <motion.span 
                className="button-glow"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  background: [
                    "radial-gradient(circle at center, rgba(157, 78, 221, 0.6) 0%, transparent 70%)",
                    "radial-gradient(circle at center, rgba(157, 78, 221, 0.8) 0%, transparent 70%)",
                    "radial-gradient(circle at center, rgba(157, 78, 221, 0.6) 0%, transparent 70%)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.a>
            
            <motion.a 
              href="#contact" 
              className="button secondary-button"
              whileHover={{ 
                scale: isTouchDevice ? 1.02 : 1.05, 
                boxShadow: "0 10px 25px rgba(157, 78, 221, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faStar} className="button-icon" />
              <span className="button-text">Contact Me</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.a 
        href="#about" 
        className="scroll-down"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: [0.4, 1, 0.4], 
          y: [0, 10, 0] 
        }}
        transition={{ 
          delay: 2, 
          duration: 2, 
          repeat: Infinity,
        }}
        whileHover={{ scale: 1.2 }}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </motion.a>

      {/* Floating Elements */}
      <div className="floating-elements">
        <motion.div 
          className="floating-element fe-1"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0, -5, 0],
            filter: [
              "drop-shadow(0 0 10px rgba(157, 78, 221, 0.3))",
              "drop-shadow(0 0 20px rgba(157, 78, 221, 0.5))",
              "drop-shadow(0 0 10px rgba(157, 78, 221, 0.3))"
            ]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="floating-element fe-2"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0, 10, 0],
            filter: [
              "drop-shadow(0 0 15px rgba(34, 211, 238, 0.3))",
              "drop-shadow(0 0 25px rgba(34, 211, 238, 0.5))",
              "drop-shadow(0 0 15px rgba(34, 211, 238, 0.3))"
            ]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="floating-element fe-3"
          animate={{ 
            y: [0, -25, 0],
            x: [0, 15, 0, -15, 0],
            rotate: [0, 15, 0, -15, 0],
            filter: [
              "drop-shadow(0 0 15px rgba(123, 44, 191, 0.3))",
              "drop-shadow(0 0 25px rgba(123, 44, 191, 0.5))",
              "drop-shadow(0 0 15px rgba(123, 44, 191, 0.3))"
            ]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </motion.section>
  );
};

export default Hero; 