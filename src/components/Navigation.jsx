import { motion } from 'framer-motion'
import { FaMoon, FaSun, FaUserShield } from 'react-icons/fa'
import './Navigation.css'

const Navigation = ({ activeSection, scrollToSection, isAdmin, setIsAdmin, darkMode, setDarkMode }) => {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'web3d', label: 'Web 3D' },
    { id: 'contact', label: 'Contact' }
  ]

  const handleAdminToggle = () => {
    const password = prompt('Enter admin password:')
    if (password === 'admin123') {
      setIsAdmin(!isAdmin)
    } else if (password !== null) {
      alert('Incorrect password')
    }
  }

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.1, rotate: 5 }}
          onClick={() => scrollToSection('about')}
        >
          <span className="logo-text">BM</span>
          <span className="logo-dot">.</span>
        </motion.div>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <motion.button
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <motion.button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </motion.button>
          <motion.button
            className="admin-btn"
            onClick={handleAdminToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUserShield />
            <span>{isAdmin ? 'Exit' : 'Admin'}</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navigation

