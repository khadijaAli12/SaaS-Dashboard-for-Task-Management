import React from 'react'
import { Modal, Button, Row, Col, Badge, Card } from 'react-bootstrap'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield,
  Edit3,
  Trash2,
  Activity,
  Clock
} from 'lucide-react'

const UserDetailsModal = ({ show, onHide, user, onEdit, onDelete }) => {
  if (!user) return null

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Admin': return Shield
      case 'Manager': return Shield
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
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Row>
          <Col md={4} className="text-center">
            <div className="user-avatar-large mb-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="user-avatar-xl"
              />
              <div className="user-status-indicator-large">
                <div className={`status-dot-large ${user.status.toLowerCase()}`}></div>
              </div>
            </div>
            
            <h4 className="user-name-large">{user.name}</h4>
            
            <div className="user-badges-large mb-3">
              <Badge bg={getRoleColor(user.role)} className="role-badge-large">
                <RoleIcon size={14} className="me-1" />
                {user.role}
              </Badge>
              <Badge bg={user.status === 'Active' ? 'success' : 'secondary'} className="status-badge-large">
                {user.status}
              </Badge>
            </div>
          </Col>
          
          <Col md={8}>
            <Card className="user-info-card">
              <Card.Body>
                <h5 className="mb-3">Contact Information</h5>
                
                <div className="user-detail-item">
                  <Mail size={16} className="detail-icon" />
                  <div>
                    <strong>Email:</strong><br />
                    {user.email}
                  </div>
                </div>
                
                {user.phone && (
                  <div className="user-detail-item">
                    <Phone size={16} className="detail-icon" />
                    <div>
                      <strong>Phone:</strong><br />
                      {user.phone}
                    </div>
                  </div>
                )}
                
                {user.location && (
                  <div className="user-detail-item">
                    <MapPin size={16} className="detail-icon" />
                    <div>
                      <strong>Location:</strong><br />
                      {user.location}
                    </div>
                  </div>
                )}
                
                <div className="user-detail-item">
                  <Calendar size={16} className="detail-icon" />
                  <div>
                    <strong>Joined:</strong><br />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="user-detail-item">
                  <Clock size={16} className="detail-icon" />
                  <div>
                    <strong>Last Updated:</strong><br />
                    {new Date(user.updatedAt || user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Card.Body>
            </Card>
            
            {user.department && (
              <Card className="user-info-card mt-3">
                <Card.Body>
                  <h5 className="mb-3">Work Information</h5>
                  <div className="user-detail-item">
                    <strong>Department:</strong> {user.department}
                  </div>
                  {user.jobTitle && (
                    <div className="user-detail-item">
                      <strong>Job Title:</strong> {user.jobTitle}
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}
            
            {user.bio && (
              <Card className="user-info-card mt-3">
                <Card.Body>
                  <h5 className="mb-3">About</h5>
                  <p>{user.bio}</p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onDelete}>
          <Trash2 size={16} className="me-2" />
          Delete User
        </Button>
        <Button variant="outline-primary" onClick={onEdit}>
          <Edit3 size={16} className="me-2" />
          Edit User
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserDetailsModal
