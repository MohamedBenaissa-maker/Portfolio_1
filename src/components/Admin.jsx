import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Admin.css'

const Admin = ({ setIsAdmin }) => {
  const [projects, setProjects] = useState([])
  const [projects3D, setProjects3D] = useState([])
  const [activeTab, setActiveTab] = useState('projects')
  const [profileImage, setProfileImage] = useState('')

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech: '',
    image: '',
    link: ''
  })

  const [newProject3D, setNewProject3D] = useState({
    title: '',
    description: '',
    modelType: 'box',
    color: '#697184',
    link: ''
  })

  const modelTypes = ['box', 'sphere', 'torus', 'octahedron']

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolioProjects')
    const savedProjects3D = localStorage.getItem('portfolio3DProjects')
    const savedProfileImage = localStorage.getItem('portfolioProfileImage')
    
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
    if (savedProjects3D) {
      setProjects3D(JSON.parse(savedProjects3D))
    }
    if (savedProfileImage) {
      setProfileImage(savedProfileImage)
    }
  }, [])

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) {
      alert('Please fill in title and description')
      return
    }

    const project = {
      id: Date.now(),
      ...newProject,
      tech: newProject.tech.split(',').map(t => t.trim()).filter(t => t)
    }

    const updatedProjects = [...projects, project]
    setProjects(updatedProjects)
    localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects))
    
    setNewProject({
      title: '',
      description: '',
      tech: '',
      image: '',
      link: ''
    })
    alert('Project added successfully!')
  }

  const handleAddProject3D = () => {
    if (!newProject3D.title || !newProject3D.description) {
      alert('Please fill in title and description')
      return
    }

    const project = {
      id: Date.now(),
      ...newProject3D
    }

    const updatedProjects = [...projects3D, project]
    setProjects3D(updatedProjects)
    localStorage.setItem('portfolio3DProjects', JSON.stringify(updatedProjects))
    
    setNewProject3D({
      title: '',
      description: '',
      modelType: 'box',
      color: '#697184',
      link: ''
    })
    alert('3D Project added successfully!')
  }

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== id)
      setProjects(updatedProjects)
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects))
    }
  }

  const handleDeleteProject3D = (id) => {
    if (window.confirm('Are you sure you want to delete this 3D project?')) {
      const updatedProjects = projects3D.filter(p => p.id !== id)
      setProjects3D(updatedProjects)
      localStorage.setItem('portfolio3DProjects', JSON.stringify(updatedProjects))
    }
  }

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === 'profile') {
          setProfileImage(reader.result)
          localStorage.setItem('portfolioProfileImage', reader.result)
          alert('Profile image uploaded! Refresh the page to see it.')
        } else if (type === 'project') {
          setNewProject({ ...newProject, image: reader.result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <motion.div
      className="admin-panel"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <button onClick={() => setIsAdmin(false)} className="close-btn">×</button>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === 'projects' ? 'active' : ''}
          onClick={() => setActiveTab('projects')}
        >
          Regular Projects
        </button>
        <button
          className={activeTab === '3d' ? 'active' : ''}
          onClick={() => setActiveTab('3d')}
        >
          3D Projects
        </button>
        <button
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Profile Image
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'projects' && (
          <div className="admin-section">
            <h3>Add New Project</h3>
            <div className="admin-form">
              <input
                type="text"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows="4"
              />
              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={newProject.tech}
                onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'project')}
              />
              <input
                type="url"
                placeholder="Project Link (optional)"
                value={newProject.link}
                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              />
              <button onClick={handleAddProject} className="add-btn">Add Project</button>
            </div>

            <h3>Existing Projects</h3>
            <div className="projects-list">
              {projects.map((project) => (
                <div key={project.id} className="project-item">
                  <h4>{project.title}</h4>
                  <button onClick={() => handleDeleteProject(project.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === '3d' && (
          <div className="admin-section">
            <h3>Add New 3D Project</h3>
            <div className="admin-form">
              <input
                type="text"
                placeholder="Project Title"
                value={newProject3D.title}
                onChange={(e) => setNewProject3D({ ...newProject3D, title: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newProject3D.description}
                onChange={(e) => setNewProject3D({ ...newProject3D, description: e.target.value })}
                rows="4"
              />
              <select
                value={newProject3D.modelType}
                onChange={(e) => setNewProject3D({ ...newProject3D, modelType: e.target.value })}
              >
                {modelTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="color"
                value={newProject3D.color}
                onChange={(e) => setNewProject3D({ ...newProject3D, color: e.target.value })}
              />
              <input
                type="url"
                placeholder="Project Link (optional)"
                value={newProject3D.link}
                onChange={(e) => setNewProject3D({ ...newProject3D, link: e.target.value })}
              />
              <button onClick={handleAddProject3D} className="add-btn">Add 3D Project</button>
            </div>

            <h3>Existing 3D Projects</h3>
            <div className="projects-list">
              {projects3D.map((project) => (
                <div key={project.id} className="project-item">
                  <h4>{project.title}</h4>
                  <button onClick={() => handleDeleteProject3D(project.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="admin-section">
            <h3>Upload Profile Image</h3>
            <div className="profile-upload">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'profile')}
                id="profile-upload"
              />
              <label htmlFor="profile-upload" className="upload-label">
                Choose Profile Image
              </label>
              {profileImage && (
                <div className="profile-preview">
                  <img src={profileImage} alt="Profile" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Admin

