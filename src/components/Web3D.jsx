import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import "./Web3D.css";

// === Individual 3D Models ===
const Box3D = ({ color }) => {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

const Sphere3D = ({ color }) => {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
    </mesh>
  );
};

const Torus3D = ({ color }) => {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
  });
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
    </mesh>
  );
};

const Octahedron3D = ({ color }) => {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.7;
  });
  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

// === Scene Loader ===
const Scene3D = ({ project }) => {
  const getModel = () => {
    switch (project.modelType) {
      case "box":
        return <Box3D color={project.color} />;
      case "sphere":
        return <Sphere3D color={project.color} />;
      case "torus":
        return <Torus3D color={project.color} />;
      case "octahedron":
        return <Octahedron3D color={project.color} />;
      default:
        return <Box3D color={project.color} />;
    }
  };

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#697184" />
      <directionalLight position={[0, 5, 5]} intensity={0.8} />
      {getModel()}
      <OrbitControls
        enableZoom
        enablePan
        enableRotate
        minDistance={3}
        maxDistance={10}
      />
      <Environment preset="sunset" />
    </Canvas>
  );
};

// === Project Modal Component ===
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <h2>{project.title}</h2>
          <div className="project-tools">
            {project.tools &&
              project.tools.map((tool, index) => (
                <span key={index} className="tech-tag">
                  {tool}
                </span>
              ))}
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-image">
            {project.image ? (
              <img src={project.image} alt={project.title} />
            ) : (
              <div className="image-placeholder">
                <Scene3D project={project} />
              </div>
            )}
          </div>

          <div className="modal-details">
            <div className="project-description">
              <h3>Description</h3>
              <p>{project.description}</p>
            </div>

            <div className="project-links">
              {project.rapport && (
                <a
                  href={project.rapport}
                  className="download-btn-primary"
                  download
                >
                  Download Project Report (PDF)
                </a>
              )}
              {project.downloadLink && (
                <a
                  href={project.downloadLink}
                  className="download-btn-primary"
                  download
                >
                  Download Project Files
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// === Main Web3D Component ===
const Web3D = ({ darkMode }) => {
  const [projects3D, setProjects3D] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Load projects from JSON file
  useEffect(() => {
    fetch("/data/projects3D.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects3D(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading 3D projects:", err);
        // Fallback data
        setProjects3D([
          {
            id: 1,
            title: "Simple Table & Chairs",
            description:
              "A 3D model of a simple table with chairs created in Blender, featuring realistic wood textures and proper proportions.",
            modelType: "box",
            color: "#8B4513",
            image: "/images/table-chairs.jpg",
            tools: [
              "Blender",
              "3D Modeling",
              "UV Mapping",
              "Texturing",
              "Lighting",
            ],
            rapport: "/documents/table-chairs-report.pdf",
            downloadLink: "/downloads/table-chairs.blend",
          },
          {
            id: 2,
            title: "Domino Effect Animation",
            description:
              "A dynamic domino effect simulation created in Blender, showing sequential falling dominoes with physics simulation.",
            modelType: "sphere",
            color: "#000000",
            image: "/images/domino-effect.jpg",
            tools: [
              "Blender",
              "Physics Simulation",
              "Rigid Body",
              "Animation",
              "Keyframing",
              "Rendering",
            ],
            rapport: "/documents/domino-effect-report.pdf",
            downloadLink: "/downloads/domino-effect.blend",
          },
        ]);
        setLoading(false);
      });
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="web3d" className="web3d-section">
      <div className="container">
        <h2 className="section-title">Web 3D Projects</h2>

        {loading ? (
          <div className="no-projects">
            <p>Loading projects...</p>
          </div>
        ) : projects3D.length === 0 ? (
          <div className="no-projects">
            <p>No 3D projects available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="web3d-grid">
            {projects3D.map((project) => (
              <div
                key={project.id}
                className="web3d-card"
                onClick={() => handleProjectClick(project)}
              >
                <div className="web3d-image-container">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="web3d-image"
                    />
                  ) : (
                    <div className="web3d-canvas-container">
                      <Scene3D project={project} />
                    </div>
                  )}
                  <div className="project-overlay">
                    <span className="project-link-overlay">View Details →</span>
                  </div>
                </div>

                <div className="web3d-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tools &&
                      project.tools.slice(0, 4).map((tool, index) => (
                        <span key={index} className="tech-tag">
                          {tool}
                        </span>
                      ))}
                    {project.tools && project.tools.length > 4 && (
                      <span className="tech-tag">
                        +{project.tools.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </section>
  );
};

export default Web3D;
