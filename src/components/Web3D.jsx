import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import './Web3D.css'

const Box3D = ({ color = '#697184' }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

const Sphere3D = ({ color = '#697184' }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
    </mesh>
  )
}

const Torus3D = ({ color = '#697184' }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
    </mesh>
  )
}

const Octahedron3D = ({ color = '#697184' }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.7
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <octahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} wireframe={false} />
    </mesh>
  )
}

const Scene3D = ({ project }) => {
  const getModel = () => {
    switch (project.modelType) {
      case 'box':
        return <Box3D color={project.color || '#697184'} />
      case 'sphere':
        return <Sphere3D color={project.color || '#697184'} />
      case 'torus':
        return <Torus3D color={project.color || '#697184'} />
      case 'octahedron':
        return <Octahedron3D color={project.color || '#697184'} />
      default:
        return <Box3D color={project.color || '#697184'} />
    }
  }

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#697184" />
      <directionalLight position={[0, 5, 5]} intensity={0.8} />
      {getModel()}
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
      />
      <Environment preset="sunset" />
    </Canvas>
  )
}

const Web3D = ({ darkMode }) => {
  const [projects3D, setProjects3D] = useState([])

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio3DProjects')
    if (savedProjects) {
      setProjects3D(JSON.parse(savedProjects))
    }
  }, [])

  // Listen for storage changes (when admin adds new project)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedProjects = localStorage.getItem('portfolio3DProjects')
      if (savedProjects) {
        setProjects3D(JSON.parse(savedProjects))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    const interval = setInterval(handleStorageChange, 1000) // Check every second

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="web3d" className="web3d-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Web 3D Projects
        </motion.h2>
        
        {projects3D.length === 0 ? (
          <motion.div
            className="no-projects"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>No 3D projects available yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div
            className="web3d-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {projects3D.map((project) => (
              <motion.div
                key={project.id}
                className="web3d-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="web3d-canvas-container">
                  <Scene3D project={project} />
                </div>
                <div className="web3d-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="web3d-link">
                      View Details →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Web3D

