import { motion } from 'framer-motion'
import './Contact.css'

const Contact = ({ darkMode }) => {
  const contactInfo = [
    {
      type: 'Email',
      value: 'mohamedbenaissa735@gmail.com',
      link: 'mailto:mohamedbenaissa735@gmail.com',
      icon: '✉️'
    },
    {
      type: 'Phone',
      value: '+213 0796352552',
      link: 'tel:+2130796352552',
      icon: '📱'
    },
    {
      type: 'GitHub',
      value: 'github.com/MohamedBenaissamaker',
      link: 'https://github.com/MohamedBenaissamaker',
      icon: '💻'
    },
    {
      type: 'Location',
      value: 'Sétif, Algeria',
      link: null,
      icon: '📍'
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
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>
        
        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className="contact-intro"
            variants={itemVariants}
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </motion.p>
          
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="contact-item"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="contact-icon">{info.icon}</div>
                <div className="contact-details">
                  <h3>{info.type}</h3>
                  {info.link ? (
                    <a href={info.link} target={info.link.startsWith('http') ? '_blank' : '_self'} rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}>
                      {info.value}
                    </a>
                  ) : (
                    <p>{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

