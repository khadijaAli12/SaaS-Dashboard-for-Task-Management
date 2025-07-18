import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { User, Mail, Phone, MapPin, Shield, Calendar } from 'lucide-react'

const UserModal = ({ show, onHide, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: 'User',
    status: 'Active',
    department: '',
    jobTitle: '',
    bio: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        role: user.role || 'User',
        status: user.status || 'Active',
        department: user.department || '',
        jobTitle: user.jobTitle || '',
        bio: user.bio || ''
      })
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        role: 'User',
        status: 'Active',
        department: '',
        jobTitle: '',
        bio: ''
      })
    }
    setErrors({})
  }, [user, show])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      onSave(formData)
      onHide()
    } catch (error) {
      console.error('Error saving user:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {user ? (
            <>
              <User size={20} className="me-2" />
              Edit User
            </>
          ) : (
            <>
              <User size={20} className="me-2" />
              Add New User
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <User size={16} className="me-2" />
                  Full Name *
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  isInvalid={!!errors.name}
                  placeholder="Enter full name"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <Mail size={16} className="me-2" />
                  Email Address *
                </Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  isInvalid={!!errors.email}
                  placeholder="Enter email address"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <Phone size={16} className="me-2" />
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  isInvalid={!!errors.phone}
                  placeholder="Enter phone number"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <MapPin size={16} className="me-2" />
                  Location
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Enter location"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <Shield size={16} className="me-2" />
                  Role
                </Form.Label>
                <Form.Select
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  placeholder="Enter department"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="Enter job title"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="Enter bio or description"
            />
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : user ? 'Update User' : 'Create User'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default UserModal
