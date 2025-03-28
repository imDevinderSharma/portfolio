import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faReact, 
  faJs, 
  faHtml5, 
  faCss3Alt, 
  faNode, 
  faGit
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDatabase, 
  faServer, 
  faMobile, 
  faDesktop, 
  faLaptopCode, 
  faCode, 
  faBrain, 
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
// Import logo images
import metaLogo from '../../assets/meta-logo.png';
import harvardLogo from '../../assets/harvard-logo.png';
import odinLogo from '../../assets/odin-logo.png';
import freeCodeCampLogo from '../../assets/freecodecamp-logo.jpg';

const Skills = () => {
  const { ref } = useAnimateOnScroll(0.1);
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
  
  const skillCategories = [
    { id: 'frontend', name: 'Frontend', icon: faDesktop },
    { id: 'backend', name: 'Backend', icon: faServer },
    { id: 'database', name: 'Database', icon: faDatabase },
    { id: 'industry', name: 'Industry Knowledge', icon: faBrain },
    { id: 'tools', name: 'Tools & DevOps', icon: faLaptopCode },
    { id: 'languages', name: 'Languages', icon: faCode },
  ];
  
  const skillsData = {
    frontend: [
      { name: 'React', icon: faReact, level: 82 },
      { name: 'JavaScript', icon: faJs, level: 75 },
      { name: 'HTML5', icon: faHtml5, level: 97 },
      { name: 'CSS3', icon: faCss3Alt, level: 92 },
      { name: 'SCSS/SASS', icon: faCss3Alt, level: 85 },
    ],
    backend: [
      { name: 'Node.js', icon: faNode, level: 85 },
      { name: 'Express', icon: faNode, level: 80 },
      { name: 'RESTful APIs', icon: faServer, level: 90 },
    ],
    database: [
      { name: 'MongoDB', icon: faDatabase, level: 85 },
      { name: 'MySQL', icon: faDatabase, level: 75 },
      { name: 'Firebase', icon: faDatabase, level: 90 },
      { name: 'SQL', icon: faDatabase, level: 88 },
    ],
    industry: [
      { name: 'Web Development', icon: faDesktop, level: 92 },
      { name: 'Web Application', icon: faReact, level: 88 },
      { name: 'Programming', icon: faCode, level: 90 },
      { name: 'Responsive Design', icon: faMobile, level: 95 },
      { name: 'Problem Solving', icon: faBrain, level: 90 },
    ],
    tools: [
      { name: 'Git', icon: faGit, level: 95 },
      { name: 'CI/CD', icon: faCode, level: 80 },
      { name: 'VS Code', icon: faCode, level: 95 },
      { name: 'NPM', icon: faJs, level: 90 },
    ],
    languages: [
      { name: 'JavaScript', icon: faJs, level: 95 },
      { name: 'HTML/CSS', icon: faHtml5, level: 95 },
      { name: 'SQL', icon: faDatabase, level: 85 },
    ],
  };
  
  const handleCategoryChange = (categoryId) => {
    if (categoryId !== activeCategory) {
      setIsChangingCategory(true);
      setTimeout(() => {
        setActiveCategory(categoryId);
        setIsChangingCategory(false);
      }, 300);
    }
  };
  
  // Education and certifications
  const education = [
    {
      program: 'Meta Front-End Developer Professional Certificate',
      institution: 'Meta',
      logo: 'meta-logo',
      logoImage: metaLogo,
      year: '2025',
      skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
      certificateLink: 'https://www.coursera.org/account/accomplishments/specialization/OES0XI9V91J2'
    },
    {
      program: 'Legacy JavaScript Algorithms and Data Structures',
      institution: 'freeCodeCamp',
      logo: 'freecodecamp-logo',
      logoImage: freeCodeCampLogo,
      year: '2023',
      skills: ['JavaScript', 'Algorithms', 'Data Structures', 'ES6', 'OOP'],
      certificateLink: 'https://www.freecodecamp.org/certification/iamDevinderSharma/javascript-algorithms-and-data-structures'
    },
    {
      program: 'CS50x: Introduction to Computer Science',
      institution: 'Harvard University',
      logo: 'harvard-logo',
      logoImage: harvardLogo,
      year: '2024',
      skills: ['C', 'Python', 'SQL', 'Data Structures', 'Algorithms', 'Web Security'],
      certificateLink: 'https://certificates.cs50.io/7608b192-9e56-4504-99b4-21cabae8e936.pdf?size=letter'
    },
    {
      program: 'Full Stack JavaScript',
      institution: 'The Odin Project',
      logo: 'odin-logo',
      logoImage: odinLogo,
      year: '2025',
      skills: ['JavaScript', 'Node.js', 'React', 'SQL', 'Express'],
      projectLink: true
    },
  ];
  
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">My Skills</h2>
          <div className="section-subtitle">What I've learned so far</div>
          <div className="section-line"></div>
        </motion.div>
        
        <div className="skills-container">
          <motion.div
            className="category-selector"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={category.icon} />
                <span>{category.name}</span>
                {activeCategory === category.id && (
                  <motion.div 
                    className="active-indicator"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
          
          <AnimatePresence mode="wait">
            {!isChangingCategory && (
              <motion.div
                ref={ref}
                className="skills-grid"
                key={activeCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {skillsData[activeCategory].map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="skill-card glass-card"
                    variants={itemVariants}
                    whileHover={{ 
                      y: -10,
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="skill-icon">
                      <FontAwesomeIcon icon={skill.icon} />
                    </div>
                    <h3 className="skill-name">{skill.name}</h3>
                    <div className="skill-level">
                      <div className="skill-bar">
                        <motion.div 
                          className="skill-progress"
                          style={{ width: `${skill.level}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div
          className="education-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="education-title">Education & Certifications</h3>
          
          <div className="education-cards">
            {education.map((item, index) => (
              <motion.div
                key={item.program}
                className="education-card neu-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '5px 5px 15px var(--neu-shadow-dark), -5px -5px 15px var(--neu-shadow-light)',
                }}
              >
                <div className={`education-logo-placeholder ${item.logo}`}>
                  <img 
                    src={item.logoImage} 
                    alt={`${item.institution} logo`} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      borderRadius: '50%', 
                      objectFit: 'contain', 
                      padding: '10px',
                      backgroundColor: item.institution === 'Meta' ? 'white' : 'transparent'
                    }} 
                  />
                </div>
                <div className="education-details">
                  <h4 className="education-program">{item.program}</h4>
                  <p className="education-institution">{item.institution}</p>
                  <p className="education-year">{item.year}</p>
                  <div className="education-skills">
                    {item.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="education-skill-tag">{skill}</span>
                    ))}
                    {item.skills.length > 3 && (
                      <span className="education-skill-tag more">+{item.skills.length - 3} more</span>
                    )}
                  </div>
                  <div className="education-links">
                    {item.certificateLink && (
                      <a 
                        href={item.certificateLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="certificate-btn"
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} /> Certificate
                      </a>
                    )}
                    {item.projectLink && (
                      <a 
                        href="#" 
                        className="project-btn"
                        onClick={(e) => e.preventDefault()}
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} /> Project
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 