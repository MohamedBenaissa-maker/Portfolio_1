import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./Projects.css";

const Projects = ({ darkMode }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("all");

  // 🔹 Load projects from JSON file
  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  // 🔹 Apply filters when query or selected tech changes
  useEffect(() => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.tech.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedTech !== "all") {
      filtered = filtered.filter((project) =>
        project.tech.some(
          (tech) => tech.toLowerCase() === selectedTech.toLowerCase()
        )
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedTech]);

  const allTechs = [...new Set(projects.flatMap((p) => p.tech))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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

        {/* Filters Section */}
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
                onClick={() => setSearchQuery("")}
                className="clear-search"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <div className="tech-filters">
            <button
              className={`tech-filter-btn ${
                selectedTech === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedTech("all")}
            >
              All
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                className={`tech-filter-btn ${
                  selectedTech === tech ? "active" : ""
                }`}
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
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
                        <span key={index} className="tech-tag">
                          {tech}
                        </span>
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
  );
};

export default Projects;
