import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col, Badge } from 'react-bootstrap'
import { FileText, BarChart3, PieChart, TrendingUp } from 'lucide-react'

const ReportModal = ({ show, onHide, report, onSave, reportTypes, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'table',
    category: 'sales',
    status: 'Draft',
    schedule: '',
    tags: '',
    createdBy: 'Current User'
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (report) {
      setFormData({
        title: report.title || '',
        description: report.description || '',
        type: report.type || 'table',
        category: report.category || 'sales',
        status: report.status || 'Draft',
        schedule: report.schedule || '',
        tags: report.tags?.join(', ') || '',
        createdBy: report.createdBy || 'Current User'
      })
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'table',
        category: 'sales',
        status: 'Draft',
        schedule: '',
        tags: '',
        createdBy: 'Current User'
      })
    }
    setErrors({})
  }, [report, show])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const reportData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    onSave(reportData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
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
          {report ? 'Edit Report' : 'Create New Report'}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Report Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  isInvalid={!!errors.title}
                  placeholder="Enter report title"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Report Type</Form.Label>
                <Form.Select
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                >
                  {reportTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {categories.filter(cat => cat.value !== 'all').map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              isInvalid={!!errors.description}
              placeholder="Enter report description"
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Scheduled">Scheduled</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Schedule (Optional)</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formData.schedule}
                  onChange={(e) => handleChange('schedule', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              placeholder="Enter tags separated by commas"
            />
            <Form.Text className="text-muted">
              Add relevant tags to help categorize and search for this report
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {report ? 'Update Report' : 'Create Report'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ReportModal
