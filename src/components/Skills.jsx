import { motion } from 'framer-motion'
import './Skills.css'

const Skills = ({ darkMode }) => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React.js', 'HTML5', 'CSS3']
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express.js', 'PHP']
    },
    {
      title: 'Databases',
      skills: ['MongoDB', 'PostgreSQL', 'SQL']
    },
    {
      title: 'Mobile',
      skills: ['React Native']
    },
    {
      title: 'Programming Languages',
      skills: ['JavaScript', 'Python', 'C++', 'Java']
    },
    {
      title: 'Tools & Platforms',
      skills: ['Git', 'Docker', 'REST APIs', 'VS Code']
    },
    {
      title: 'Soft Skills',
      skills: ['Teamwork', 'Problem Solving', 'Communication']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Technical Skills
        </motion.h2>
        
        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-category"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <h3>{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

