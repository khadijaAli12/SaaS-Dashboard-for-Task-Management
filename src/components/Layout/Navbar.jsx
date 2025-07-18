import React, { useState } from 'react'
import { Navbar, Nav, Button, Container, Dropdown, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useTheme } from '../../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  Moon, 
  Sun, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  MessageCircle,
  Search,
  Command,
  Zap,
  Shield,
  HelpCircle,
  Palette,
  Monitor,
  Smartphone
} from 'lucide-react'
import ThemeSettings from '../Theme/ThemeSettings'

const AppNavbar = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme()
  const [notifications] = useState(5)
  const [messages] = useState(3)
  const [showSearch, setShowSearch] = useState(false)
  const [showThemeSettings, setShowThemeSettings] = useState(false)

  const navItems = [
    {
      icon: Search,
      label: 'Search',
      action: () => setShowSearch(!showSearch),
      tooltip: 'Search (Ctrl+K)',
      variant: 'search'
    },
    {
      icon: theme === 'light' ? Moon : Sun,
      label: 'Theme',
      action: toggleTheme,
      tooltip: theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode',
      variant: 'theme'
    },
    {
      icon: Palette,
      label: 'Customize',
      action: () => setShowThemeSettings(true),
      tooltip: 'Theme Customization',
      variant: 'customize'
    },
    {
      icon: MessageCircle,
      label: 'Messages',
      badge: messages,
      action: () => console.log('Messages'),
      tooltip: 'Messages',
      variant: 'messages'
    },
    {
      icon: Bell,
      label: 'Notifications',
      badge: notifications,
      action: () => console.log('Notifications'),
      tooltip: 'Notifications',
      variant: 'notifications'
    }
  ]

  const NavButton = ({ item, index }) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id={`tooltip-${item.variant}`}>{item.tooltip}</Tooltip>}
      >
        <Button
          variant="ghost"
          className={`nav-btn nav-btn-${item.variant}`}
          onClick={item.action}
        >
          <div className="nav-btn-content">
            <item.icon size={18} />
            {item.badge && item.badge > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`nav-badge ${item.variant}-badge`}
              >
                {item.badge > 9 ? '9+' : item.badge}
              </motion.div>
            )}
          </div>
          <div className="nav-btn-glow"></div>
        </Button>
      </OverlayTrigger>
    </motion.div>
  )

  return (
    <>
      <Navbar expand="lg" className="modern-navbar">
        <Container fluid>
          {/* Left Section */}
          <motion.div 
            className="navbar-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              className="sidebar-toggle-modern"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
              <div className="ripple-effect"></div>
            </Button>
            
            <Navbar.Brand href="/" className="brand-modern">
              <motion.div 
                className="brand-icon"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Zap size={28} />
              </motion.div>
              <div className="brand-text-container">
                <span className="brand-text">AdminFlow</span>
                <span className="brand-subtitle">Dashboard</span>
              </div>
            </Navbar.Brand>
          </motion.div>
          {/* Right Section */}
          <motion.div 
            className="navbar-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="nav-buttons-container">
              {navItems.map((item, index) => (
                <NavButton key={item.variant} item={item} index={index} />
              ))}
            </div>
            
            {/* User Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle className="user-dropdown-modern">
                <div className="user-avatar-modern">
                  <div className="avatar-image">
                    <User size={20} />
                  </div>
                  <div className="avatar-status"></div>
                </div>
                <div className="user-info-modern">
                  <span className="user-name">John Doe</span>
                  <span className="user-role">Administrator</span>
                </div>
              </Dropdown.Toggle>
              
              <Dropdown.Menu className="user-menu-modern">
                <div className="menu-header">
                  <div className="menu-avatar">
                    <User size={24} />
                  </div>
                  <div className="menu-info">
                    <h6>John Doe</h6>
                    <p>john.doe@adminflow.com</p>
                  </div>
                </div>
                
                <Dropdown.Divider />
                
                <Dropdown.Item className="menu-item-modern">
                  <User size={16} />
                  <span>Profile Settings</span>
                </Dropdown.Item>
                
                <Dropdown.Item 
                  className="menu-item-modern"
                  onClick={() => setShowThemeSettings(true)}
                >
                  <Palette size={16} />
                  <span>Theme Customization</span>
                </Dropdown.Item>
                
                <Dropdown.Item className="menu-item-modern">
                  <Settings size={16} />
                  <span>Preferences</span>
                </Dropdown.Item>
                
                <Dropdown.Item className="menu-item-modern">
                  <Shield size={16} />
                  <span>Privacy & Security</span>
                </Dropdown.Item>
                
                <Dropdown.Item className="menu-item-modern">
                  <HelpCircle size={16} />
                  <span>Help & Support</span>
                </Dropdown.Item>
                
                <Dropdown.Divider />
                
                <Dropdown.Item className="menu-item-modern logout-item">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </motion.div>
        </Container>
      </Navbar>

      {/* Theme Settings Modal */}
      <ThemeSettings 
        show={showThemeSettings}
        onHide={() => setShowThemeSettings(false)}
      />
    </>
  )
}

export default AppNavbar
