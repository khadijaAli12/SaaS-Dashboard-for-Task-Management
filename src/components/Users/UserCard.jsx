import React from 'react'
import { Card, Button, Badge, Form, Dropdown } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { 
  Edit3, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  MoreVertical,
  Shield,
  ShieldCheck,
  User
} from 'lucide-react'

const UserCard = ({ user, onEdit, onDelete, onView, isSelected, onSelect }) => {
  const getRoleIcon = (role) => {
    switch (role) {
      case 'Admin': return Shield
      case 'Manager': return ShieldCheck
      default: return User
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'danger'
      case 'Manager': return 'warning'
      default: return 'primary'
    }
  }

  const RoleIcon = getRoleIcon(user.role)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`user-card ${isSelected ? 'selected' : ''}`}>
        <Card.Body>
          <div className="user-card-header">
            <Form.Check
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(e.target.checked)}
              className="user-select-checkbox"
            />
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="user-menu-btn">
                <MoreVertical size={16} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={onView}>
                  <Eye size={14} className="me-2" />
                  View Details
                </Dropdown.Item>
                <Dropdown.Item onClick={onEdit}>
                  <Edit3 size={14} className="me-2" />
                  Edit User
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onDelete} className="text-danger">
                  <Trash2 size={14} className="me-2" />
                  Delete User
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="user-avatar-section">
            <img
              src={user.avatar}
              alt={user.name}
              className="user-avatar"
            />
            <div className="user-status-indicator">
              <div className={`status-dot ${user.status.toLowerCase()}`}></div>
            </div>
          </div>

          <div className="user-info">
            <h5 className="user-name">{user.name}</h5>
            <div className="user-email">
              <Mail size={14} className="me-2" />
              {user.email}
            </div>
            {user.phone && (
              <div className="user-phone">
                <Phone size={14} className="me-2" />
                {user.phone}
              </div>
            )}
            {user.location && (
              <div className="user-location">
                <MapPin size={14} className="me-2" />
                {user.location}
              </div>
            )}
          </div>

          <div className="user-badges">
            <Badge bg={getRoleColor(user.role)} className="role-badge">
              <RoleIcon size={12} className="me-1" />
              {user.role}
            </Badge>
            <Badge bg={user.status === 'Active' ? 'success' : 'secondary'} className="status-badge">
              {user.status}
            </Badge>
          </div>

          <div className="user-meta">
            <div className="joined-date">
              <Calendar size={14} className="me-2" />
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="user-actions">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={onView}
              className="action-btn"
            >
              <Eye size={14} className="me-2" />
              View
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={onEdit}
              className="action-btn"
            >
              <Edit3 size={14} className="me-2" />
              Edit
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default UserCard
