import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col, Card, Badge } from 'react-bootstrap'
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp,
  Plus,
  Edit3
} from 'lucide-react'

const ChartModal = ({ show, onHide, chart, onSave, templates }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'line',
    category: 'revenue',
    size: 'medium',
    config: {
      color: '#667eea',
      gradient: true,
      showGrid: true,
      showLegend: true,
      animation: true
    }
  })

  const chartTypes = [
    { value: 'line', label: 'Line Chart', icon: LineChart },
    { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { value: 'pie', label: 'Pie Chart', icon: PieChart },
    { value: 'area', label: 'Area Chart', icon: TrendingUp },
    { value: 'funnel', label: 'Funnel Chart', icon: BarChart3 },
    { value: 'heatmap', label: 'Heatmap', icon: BarChart3 }
  ]

  const categories = [
    'revenue', 'sales', 'traffic', 'growth', 'conversion', 'activity'
  ]

  const sizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ]

  const colors = [
    '#667eea', '#4facfe', '#fa709a', '#fee140', '#a8edea', '#d299c2', '#89f7fe', '#ffeaa7'
  ]

  useEffect(() => {
    if (chart) {
      setFormData({
        title: chart.title,
        type: chart.type,
        category: chart.category,
        size: chart.size,
        config: { ...chart.config }
      })
    } else {
      setFormData({
        title: '',
        type: 'line',
        category: 'revenue',
        size: 'medium',
        config: {
          color: '#667eea',
          gradient: true,
          showGrid: true,
          showLegend: true,
          animation: true
        }
      })
    }
  }, [chart])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleConfigChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      config: {
        ...prev.config,
        [key]: value
      }
    }))
  }

  const ChartTypeCard = ({ type }) => {
    const Icon = type.icon
    return (
      <Card 
        className={`chart-type-card ${formData.type === type.value ? 'selected' : ''}`}
        onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
      >
        <Card.Body className="text-center">
          <Icon size={32} className="chart-type-icon" />
          <h6 className="chart-type-label">{type.label}</h6>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {chart ? (
            <>
              <Edit3 size={20} className="me-2" />
              Edit Chart
            </>
          ) : (
            <>
              <Plus size={20} className="me-2" />
              Create New Chart
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Chart Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter chart title"
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-4">
            <Form.Label>Chart Type</Form.Label>
            <div className="chart-type-grid">
              {chartTypes.map(type => (
                <ChartTypeCard key={type.value} type={type} />
              ))}
            </div>
          </Form.Group>
          
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Size</Form.Label>
                <Form.Select
                  value={formData.size}
                  onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                >
                  {sizes.map(size => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <div className="color-picker-row">
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`color-picker-btn ${formData.config.color === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleConfigChange('color', color)}
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Chart Options</Form.Label>
            <div className="chart-options">
              <Form.Check
                type="switch"
                id="show-grid"
                label="Show Grid"
                checked={formData.config.showGrid}
                onChange={(e) => handleConfigChange('showGrid', e.target.checked)}
              />
              <Form.Check
                type="switch"
                id="show-legend"
                label="Show Legend"
                checked={formData.config.showLegend}
                onChange={(e) => handleConfigChange('showLegend', e.target.checked)}
              />
              <Form.Check
                type="switch"
                id="gradient"
                label="Gradient Fill"
                checked={formData.config.gradient}
                onChange={(e) => handleConfigChange('gradient', e.target.checked)}
              />
              <Form.Check
                type="switch"
                id="animation"
                label="Animation"
                checked={formData.config.animation}
                onChange={(e) => handleConfigChange('animation', e.target.checked)}
              />
            </div>
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {chart ? 'Update Chart' : 'Create Chart'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ChartModal
