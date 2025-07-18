import React, { useState } from 'react'
import { Card, Dropdown, Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Download,
  Maximize2,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import ChartRenderer from './ChartRenderer'

const ChartCard = ({ 
  chart, 
  onEdit, 
  onDelete, 
  onVisibilityToggle, 
  onRefresh 
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    onRefresh()
    setIsLoading(false)
  }

  const handleDownload = () => {
    // Create a temporary canvas to render the chart
    const canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 400
    
    // This would normally render the chart to canvas
    // For now, we'll just show a success message
    
    const link = document.createElement('a')
    link.download = `${chart.title.replace(/\s+/g, '-').toLowerCase()}.png`
    link.href = canvas.toDataURL()
    link.click()
    
    // toast.success('Chart downloaded successfully')
  }

  const getCategoryColor = (category) => {
    const colors = {
      revenue: '#667eea',
      sales: '#4facfe',
      traffic: '#fa709a',
      growth: '#fee140',
      conversion: '#a8edea',
      activity: '#d299c2'
    }
    return colors[category] || '#6c757d'
  }

  const getLastUpdatedText = () => {
    const now = new Date()
    const diff = now - new Date(chart.lastUpdated)
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="chart-card">
        <Card.Header className="chart-card-header">
          <div className="chart-header-content">
            <div className="chart-title-section">
              <h6 className="chart-title">{chart.title}</h6>
              <div className="chart-meta">
                <Badge 
                  style={{ backgroundColor: getCategoryColor(chart.category) }}
                  className="category-badge"
                >
                  {chart.category}
                </Badge>
                <span className="last-updated">
                  Updated {getLastUpdatedText()}
                </span>
              </div>
            </div>
            
            <div className="chart-actions">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Refresh Chart</Tooltip>}
              >
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="chart-action-btn"
                >
                  <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
                </Button>
              </OverlayTrigger>
              
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="chart-menu-btn">
                  <MoreVertical size={16} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onEdit}>
                    <Edit3 size={14} className="me-2" />
                    Edit Chart
                  </Dropdown.Item>
                  <Dropdown.Item onClick={onVisibilityToggle}>
                    {chart.isVisible ? (
                      <>
                        <EyeOff size={14} className="me-2" />
                        Hide Chart
                      </>
                    ) : (
                      <>
                        <Eye size={14} className="me-2" />
                        Show Chart
                      </>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleDownload}>
                    <Download size={14} className="me-2" />
                    Download
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onDelete} className="text-danger">
                    <Trash2 size={14} className="me-2" />
                    Delete Chart
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Card.Header>
        
        <Card.Body className="chart-card-body">
          <div className="chart-container">
            <ChartRenderer 
              chart={chart}
              isLoading={isLoading}
              showControls={isHovered}
            />
          </div>
          
          {chart.stats && (
            <div className="chart-stats">
              <div className="stat-item">
                <TrendingUp size={16} className="stat-icon positive" />
                <span className="stat-value">{chart.stats.trend || '+12%'}</span>
                <span className="stat-label">vs last period</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{chart.stats.total || '1,234'}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default ChartCard
