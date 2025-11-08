import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaTimes } from 'react-icons/fa'
import './Projects.css'

const Projects = ({ darkMode }) => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTech, setSelectedTech] = useState('all')

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolioProjects')
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      // Default projects
      const defaultProjects = [
        {
          id: 1,
          title: 'Codo File',
          description: 'Web-based code editor with support for multiple languages (Python, JavaScript, Dart). Integrated Image-to-Text and Voice-to-Text features for accessibility.',
          tech: ['React', 'Node.js', 'Judge0 API'],
          image: '',
          link: ''
        },
        {
          id: 2,
          title: 'StudyNotion',
          description: 'Full-stack education platform for course management and user authentication. Developed additional mobile applications using React Native.',
          tech: ['MERN Stack', 'React Native'],
          image: '',
          link: ''
        }
      ]
      setProjects(defaultProjects)
      localStorage.setItem('portfolioProjects', JSON.stringify(defaultProjects))
    }
    
    // Listen for storage changes
    const handleStorageChange = () => {
      const savedProjects = localStorage.getItem('portfolioProjects')
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects))
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    const interval = setInterval(handleStorageChange, 1000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    let filtered = projects

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filter by technology
    if (selectedTech !== 'all') {
      filtered = filtered.filter(project =>
        project.tech.some(tech => tech.toLowerCase() === selectedTech.toLowerCase())
      )
    }

    setFilteredProjects(filtered)
  }, [projects, searchQuery, selectedTech])

  // Get all unique technologies
  const allTechs = [...new Set(projects.flatMap(p => p.tech))]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Selected Projects
        </motion.h2>
        
        <motion.div
          className="projects-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="clear-search"
              >
                <FaTimes />
              </button>
            )}
          </div>
          
          <div className="tech-filters">
            <button
              className={`tech-filter-btn ${selectedTech === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedTech('all')}
            >
              All
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                className={`tech-filter-btn ${selectedTech === tech ? 'active' : ''}`}
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="projects"
              className="projects-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -10 }}
                  layout
                >
                  <div className="project-image">
                    {project.image ? (
                      <img src={project.image} alt={project.title} />
                    ) : (
                      <div className="project-placeholder">
                        <span>Project Image</span>
                      </div>
                    )}
                    <div className="project-overlay">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-overlay"
                        >
                          View Live →
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-projects"
              className="no-projects-found"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>No projects found matching your criteria.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects

