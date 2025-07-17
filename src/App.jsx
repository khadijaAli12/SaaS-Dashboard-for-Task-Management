import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Layout/Navbar'
import Sidebar from './components/Layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Tables from './pages/Tables'
import Calendar from './pages/Calendar'
import Kanban from './pages/Kanban'
import Settings from './pages/Settings'

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="loading-screen"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--primary-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}
  >
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="mb-4"
      >
        <div 
          style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%'
          }}
        />
      </motion.div>
      <h3 style={{ color: 'white', fontWeight: 'bold' }}>AdminFlow</h3>
      <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Loading your dashboard...</p>
    </div>
  </motion.div>
)

function App() {
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <ThemeProvider>
      <Router>
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loading" />
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="app"
            >
              <Navbar toggleSidebar={toggleSidebar} />
              <div className="app-body">
                <Sidebar isOpen={sidebarOpen} />
                <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/tables" element={<Tables />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/kanban" element={<Kanban />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  )
}

export default App
