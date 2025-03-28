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
      description: 'I am Devinder Sharma, a dedicated student from Haryana, passionate about technology and web development. I have been innovating online since class 10.',
    },
    {
      icon: faCode,
      title: 'What I Do',
      description: 'I design and develop modern, user-friendly websites and digital solutions. I blend creative design with efficient code to craft experiences that engage users.',
    },
    {
      icon: faLightbulb,
      title: 'How I Work',
      description: 'My work is driven by continuous learning, experimental design, and a focus on user experience. I build projects through self-education, creativity, and practical efforts.',
    },
    {
      icon: faBriefcase,
      title: 'My Journey',
      description: 'My journey began with a successful website in class 10 and evolved through self-learning and experimentation, fueling my passion for full-stack and AI-enhanced development.',
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
              I’m Devinder Sharma from Haryana. My passion for technology began in class 10 when I built a website that reached over 50K visitors and ranked on Google. This achievement ignited my creative spirit and set me on a lifelong path in web development.
            </p>
            <p>
              I experimented by launching over ten's of gaming websites. Though not all succeeded, each   project taught me the vital role of a well-designed user interface. This journey encouraged me to pursue self-learning through platforms like YouTube, CS50, Meta, and freeCodeCamp.
            </p>
            <p>
              I am eager to master full-stack development, blending front-end and back-end technologies. I continuously build scalable projects—often integrating AI—to enhance efficiency and innovation.
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