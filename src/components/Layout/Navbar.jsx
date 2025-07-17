import React, { useState } from 'react'
import { Navbar, Nav, Button, Container, Dropdown, Badge } from 'react-bootstrap'
import { useTheme } from '../../context/ThemeContext'
import { 
  Menu, 
  Moon, 
  Sun, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  MessageCircle 
} from 'lucide-react'
import { motion } from 'framer-motion'

const AppNavbar = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme()
  const [notifications] = useState(3)

  return (
    <Navbar expand="lg" className="navbar-compact">
      <Container fluid>
        <motion.div 
          className="navbar-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            variant="link" 
            onClick={toggleSidebar} 
            className="sidebar-toggle-compact"
          >
            <Menu size={18} />
          </Button>
          
          <Navbar.Brand href="/" className="brand-logo-compact">
            <span className="brand-icon">⚡</span>
            <span className="brand-text">AdminFlow</span>
          </Navbar.Brand>
        </motion.div>

        <motion.div 
          className="navbar-controls-compact"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button 
            variant="link" 
            className="nav-button-compact theme-btn"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          
          <Button variant="link" className="nav-button-compact position-relative">
            <Bell size={18} />
            {notifications > 0 && (
              <Badge 
                bg="danger" 
                pill 
                className="notification-badge"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          <Button variant="link" className="nav-button-compact">
            <MessageCircle size={18} />
          </Button>

          <Dropdown align="end">
            <Dropdown.Toggle 
              variant="link" 
              className="nav-button-compact user-dropdown"
            >
              <div className="user-avatar-compact">
                <User size={16} />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="user-dropdown-menu">
              <Dropdown.Item href="#/profile">
                <User size={16} className="me-2" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item href="#/settings">
                <Settings size={16} className="me-2" />
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/logout">
                <LogOut size={16} className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </motion.div>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
