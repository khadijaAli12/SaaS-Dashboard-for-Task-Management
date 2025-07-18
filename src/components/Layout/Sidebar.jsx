import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { 
  BarChart3, 
  Table, 
  Calendar, 
  Kanban, 
  Settings, 
  PieChart,
  Users,
  FileText,
  TrendingUp
} from 'lucide-react'
import { motion } from 'framer-motion'

const Sidebar = ({ isOpen }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard' },
    { path: '/tables', icon: Table, label: 'Tables' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/kanban', icon: Kanban, label: 'Kanban' },
    { path: '/charts', icon: PieChart, label: 'Charts' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ]

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div 
      className={`sidebar-compact ${isOpen ? 'open' : 'closed'}`}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <Nav className="flex-column sidebar-nav-compact">
        {menuItems.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Nav.Link 
              as={Link} 
              to={item.path} 
              className={`sidebar-link-compact ${location.pathname === item.path ? 'active' : ''}`}
            >
              <motion.div
                className="sidebar-icon-compact"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon size={18} />
              </motion.div>
              <span className="sidebar-text-compact">{item.label}</span>
            </Nav.Link>
          </motion.div>
        ))}
      </Nav>
    </motion.div>
  )
}

export default Sidebar
