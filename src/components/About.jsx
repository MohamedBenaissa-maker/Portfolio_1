import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./About.css";
import profilePic from "../images/ess.jpg";

const About = ({ darkMode }) => {
  const [profileImage, setProfileImage] = useState("");

  // Load image from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem("portfolioProfileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }

    // Listen for storage changes (in case another tab updates it)
    const handleStorageChange = () => {
      const updatedImage = localStorage.getItem("portfolioProfileImage");
      if (updatedImage) {
        setProfileImage(updatedImage);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000); // optional fallback

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Profile Image */}
          <motion.div
            className="profile-image-container"
            variants={itemVariants}
          >
            <div className="profile-image-placeholder">
              <img
                src={profileImage || profilePic} // always show something
                alt="Benaissa Mohamed"
              />
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div className="about-text" variants={itemVariants}>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Benaissa Mohamed
            </motion.h1>

            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>mohamedbenaissa735@gmail.com</p>
              <p>+213 0796352552</p>
              <p>
                <a
                  href="https://github.com/MohamedBenaissamaker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/MohamedBenaissamaker
                </a>
              </p>
              <p>Sétif, Algeria</p>
            </motion.div>

            <motion.div
              className="profile-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2>Profile</h2>
              <p>
                Motivated and detail-oriented Master's student in Computer
                Science (IDTW) at Université Ferhat Abbas Sétif 1, passionate
                about full-stack development, artificial intelligence, and cloud
                technologies. Experienced in modern frameworks and software
                engineering tools with strong problem-solving and teamwork
                skills.
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              className="education"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2>Education</h2>
              <div className="education-item">
                <h3>Université Ferhat Abbas Sétif 1, Sétif, Algeria</h3>
                <p>
                  <strong>Master 2 en Informatique — IDTW</strong> | 2024 – 2026
                </p>
              </div>
              <div className="education-item">
                <h3>Université Ferhat Abbas Sétif 1, Sétif, Algeria</h3>
                <p>
                  <strong>Licence en Informatique</strong> | 2021 – 2024
                </p>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              className="experience"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2>Experience</h2>
              <div className="experience-item">
                <h3>Employee — SOCOEMOD SARL, Sétif</h3>
                <p className="period">2023 – 2024</p>
                <p className="company">Industrial Plastic Packaging Company</p>
                <ul>
                  <li>
                    Contributed to process optimization and quality assurance.
                  </li>
                  <li>
                    Supported production coordination across multiple industrial
                    sectors.
                  </li>
                </ul>
              </div>
              <div className="experience-item">
                <h3>Factory Worker — Plastic Bicycle Manufacturing, Sétif</h3>
                <p className="period">2019 – 2022</p>
                <p className="company">Production and Assembly Department</p>
                <ul>
                  <li>
                    Assisted in production, assembly, and quality control.
                  </li>
                  <li>
                    Collaborated with technical teams to maintain product
                    standards.
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
