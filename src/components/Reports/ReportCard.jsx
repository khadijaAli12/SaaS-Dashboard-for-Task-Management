import React from 'react'
import { Card, Button, Badge, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { 
  FileText, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Edit3, 
  Trash2, 
  Eye, 
  Download,
  Share2,
  MoreVertical,
  Calendar,
  User
} from 'lucide-react'

const ReportCard = ({ report, onEdit, onDelete, onView }) => {
  const getReportIcon = (type) => {
    switch (type) {
      case 'chart': return BarChart3
      case 'dashboard': return PieChart
      case 'summary': return TrendingUp
      default: return FileText
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'success'
      case 'Draft': return 'warning'
      case 'Scheduled': return 'info'
      default: return 'secondary'
    }
  }

  const ReportIcon = getReportIcon(report.type)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="report-card">
        <Card.Header className="report-card-header">
          <div className="report-header-content">
            <div className="report-icon-section">
              <div className="report-type-icon">
                <ReportIcon size={24} />
              </div>
              <div className="report-meta">
                <Badge bg={getStatusColor(report.status)} className="status-badge">
                  {report.status}
                </Badge>
                <Badge bg="light" text="dark" className="category-badge">
                  {report.category}
                </Badge>
              </div>
            </div>
            
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="report-menu-btn">
                <MoreVertical size={16} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={onView}>
                  <Eye size={14} className="me-2" />
                  View Report
                </Dropdown.Item>
                <Dropdown.Item onClick={onEdit}>
                  <Edit3 size={14} className="me-2" />
                  Edit Report
                </Dropdown.Item>
                <Dropdown.Item>
                  <Download size={14} className="me-2" />
                  Download
                </Dropdown.Item>
                <Dropdown.Item>
                  <Share2 size={14} className="me-2" />
                  Share
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onDelete} className="text-danger">
                  <Trash2 size={14} className="me-2" />
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>
        
        <Card.Body className="report-card-body">
          <h5 className="report-title">{report.title}</h5>
          <p className="report-description">{report.description}</p>
          
          <div className="report-stats">
            <div className="stat-item">
              <Eye size={16} />
              <span>{report.views} views</span>
            </div>
            <div className="stat-item">
              <Download size={16} />
              <span>{report.downloads} downloads</span>
            </div>
          </div>
          
          <div className="report-meta-info">
            <div className="meta-item">
              <User size={14} />
              <span>{report.createdBy}</span>
            </div>
            <div className="meta-item">
              <Calendar size={14} />
              <span>{new Date(report.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </Card.Body>
        
        <Card.Footer className="report-card-footer">
          <div className="report-actions">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={onView}
              className="action-btn"
            >
              <Eye size={14} className="me-1" />
              View
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={onEdit}
              className="action-btn"
            >
              <Edit3 size={14} className="me-1" />
              Edit
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </motion.div>
  )
}

export default ReportCard
