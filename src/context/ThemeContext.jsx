import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('adminflow-theme')
    return savedTheme || 'light'
  })

  const [background, setBackground] = useState(() => {
    const savedBg = localStorage.getItem('adminflow-background')
    return savedBg || 'default'
  })

  const [primaryColor, setPrimaryColor] = useState(() => {
    const savedColor = localStorage.getItem('adminflow-primary-color')
    return savedColor || 'blue'
  })

  const themes = {
    light: {
      name: 'Light',
      icon: '☀️',
      colors: {
        '--bg-color': '#f8fafc',
        '--bg-secondary': '#ffffff',
        '--text-color': '#1a202c',
        '--text-muted': '#64748b',
        '--sidebar-bg': 'rgba(255, 255, 255, 0.95)',
        '--card-bg': 'rgba(255, 255, 255, 0.9)',
        '--border-color': 'rgba(226, 232, 240, 0.8)',
        '--shadow': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '--shadow-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
        '--glass-bg': 'rgba(255, 255, 255, 0.25)',
        '--glass-border': 'rgba(255, 255, 255, 0.18)'
      }
    },
    dark: {
      name: 'Dark',
      icon: '🌙',
      colors: {
        '--bg-color': '#0f1419',
        '--bg-secondary': '#1a1f2e',
        '--text-color': '#e2e8f0',
        '--text-muted': '#64748b',
        '--sidebar-bg': 'rgba(26, 31, 46, 0.95)',
        '--card-bg': 'rgba(26, 31, 46, 0.9)',
        '--border-color': 'rgba(51, 65, 85, 0.8)',
        '--shadow': '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        '--shadow-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
        '--glass-bg': 'rgba(26, 31, 46, 0.25)',
        '--glass-border': 'rgba(255, 255, 255, 0.1)'
      }
    },
    midnight: {
      name: 'Midnight',
      icon: '🌌',
      colors: {
        '--bg-color': '#030712',
        '--bg-secondary': '#111827',
        '--text-color': '#f9fafb',
        '--text-muted': '#6b7280',
        '--sidebar-bg': 'rgba(17, 24, 39, 0.95)',
        '--card-bg': 'rgba(17, 24, 39, 0.9)',
        '--border-color': 'rgba(75, 85, 99, 0.8)',
        '--shadow': '0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
        '--shadow-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
        '--glass-bg': 'rgba(17, 24, 39, 0.3)',
        '--glass-border': 'rgba(255, 255, 255, 0.05)'
      }
    },
    ocean: {
      name: 'Ocean',
      icon: '🌊',
      colors: {
        '--bg-color': '#0c1821',
        '--bg-secondary': '#1e3a8a',
        '--text-color': '#f0f9ff',
        '--text-muted': '#93c5fd',
        '--sidebar-bg': 'rgba(30, 58, 138, 0.95)',
        '--card-bg': 'rgba(30, 58, 138, 0.8)',
        '--border-color': 'rgba(59, 130, 246, 0.3)',
        '--shadow': '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
        '--shadow-hover': '0 20px 25px -5px rgba(59, 130, 246, 0.4)',
        '--glass-bg': 'rgba(30, 58, 138, 0.3)',
        '--glass-border': 'rgba(59, 130, 246, 0.2)'
      }
    }
  }

  const backgrounds = {
    default: {
      name: 'Default',
      icon: '⚪',
      class: 'bg-default'
    },
    gradient: {
      name: 'Gradient',
      icon: '🌈',
      class: 'bg-gradient'
    },
    particles: {
      name: 'Particles',
      icon: '✨',
      class: 'bg-particles'
    },
    geometric: {
      name: 'Geometric',
      icon: '🔶',
      class: 'bg-geometric'
    },
    waves: {
      name: 'Waves',
      icon: '〰️',
      class: 'bg-waves'
    },
    dots: {
      name: 'Dots',
      icon: '⚫',
      class: 'bg-dots'
    }
  }

  const primaryColors = {
    blue: {
      name: 'Blue',
      value: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    purple: {
      name: 'Purple',
      value: '#764ba2',
      gradient: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
    },
    pink: {
      name: 'Pink',
      value: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    green: {
      name: 'Green',
      value: '#4facfe',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    orange: {
      name: 'Orange',
      value: '#fa709a',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    red: {
      name: 'Red',
      value: '#f5576c',
      gradient: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)'
    },
    teal: {
      name: 'Teal',
      value: '#a8edea',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    indigo: {
      name: 'Indigo',
      value: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  }

  useEffect(() => {
    localStorage.setItem('adminflow-theme', theme)
    localStorage.setItem('adminflow-background', background)
    localStorage.setItem('adminflow-primary-color', primaryColor)
    
    // Apply theme colors
    const themeColors = themes[theme]?.colors || themes.light.colors
    Object.entries(themeColors).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value)
    })

    // Apply primary color
    const colorConfig = primaryColors[primaryColor]
    if (colorConfig) {
      document.documentElement.style.setProperty('--primary-color', colorConfig.value)
      document.documentElement.style.setProperty('--primary-gradient', colorConfig.gradient)
    }

    // Apply theme and background classes
    document.documentElement.setAttribute('data-theme', theme)
    document.body.className = `theme-${theme} ${backgrounds[background]?.class || ''}`
  }, [theme, background, primaryColor])

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes)
    const currentIndex = themeKeys.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themeKeys.length
    setTheme(themeKeys[nextIndex])
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      background, 
      setBackground, 
      primaryColor, 
      setPrimaryColor,
      toggleTheme,
      themes,
      backgrounds,
      primaryColors
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
