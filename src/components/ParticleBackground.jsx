import { useCallback, useMemo, useState } from 'react'
import Particles from 'react-particles'
import { loadSlim } from 'tsparticles-slim'
import './ParticleBackground.css'

const ParticleBackground = ({ darkMode }) => {
  const [particlesError, setParticlesError] = useState(false)

  const particlesInit = useCallback(async (engine) => {
    try {
      await loadSlim(engine)
    } catch (error) {
      console.error('Error loading particles:', error)
      setParticlesError(true)
    }
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    // Particles loaded successfully
  }, [])

  // Don't render if there's an error
  if (particlesError) {
    return null
  }

  const options = useMemo(() => ({
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: darkMode ? '#697184' : '#697184',
      },
      links: {
        color: darkMode ? '#697184' : '#697184',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }), [darkMode])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      className="particles-background"
      options={options}
    />
  )
}

export default ParticleBackground

