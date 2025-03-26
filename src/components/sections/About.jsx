import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCode, faLightbulb, faBriefcase } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const { ref, controls } = useAnimateOnScroll();
  
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
  
  const highlights = [
    {
      icon: faUser,
      title: 'Who I Am',
      description: 'A passionate technologist driven by creativity and innovation, constantly exploring the intersection of design and technology.',
    },
    {
      icon: faCode,
      title: 'What I Do',
      description: 'I create stunning digital experiences with modern JavaScript frameworks, always striving for the perfect balance of form and function.',
    },
    {
      icon: faLightbulb,
      title: 'How I Work',
      description: 'I approach each project with a thoughtful methodology focused on efficient problem-solving and user-centric design principles.',
    },
    {
      icon: faBriefcase,
      title: 'My Journey',
      description: 'Self-taught developer with a dedication to continuous learning and improving my skills through hands-on projects and challenges.',
    },
  ];
  
  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="section-subtitle">Get to know me better</div>
          <div className="section-line"></div>
        </motion.div>
        
        <motion.div
          ref={ref}
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div 
            className="about-intro glass-card"
            variants={itemVariants}
          >
            <h3>Hello, I'm <span className="text-gradient">Devinder</span></h3>
            <p>
              I'm a passionate self-taught developer with a keen eye for design and a love for creating
              beautiful, functional digital experiences. My journey in technology started with a
              curiosity about how things work and has evolved into a professional pursuit of excellence
              in web development.
            </p>
            <p>
              I believe in the power of continuous learning, which has led me to expand my skills through
              various courses and programs, including those from Meta and Harvard. I enjoy tackling complex
              problems and finding elegant solutions that prioritize user experience.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source
              projects, or working on personal creative endeavors that blend technology with art.
            </p>
          </motion.div>
          
          <div className="about-highlights">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className="highlight-card neu-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: '8px 8px 15px var(--neu-shadow-dark), -8px -8px 15px var(--neu-shadow-light)',
                  transition: { duration: 0.3 }
                }}
              >
                <div className="highlight-icon">
                  <FontAwesomeIcon icon={highlight.icon} />
                </div>
                <h3 className="highlight-title">{highlight.title}</h3>
                <p className="highlight-description">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 