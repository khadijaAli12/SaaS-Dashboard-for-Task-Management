import React from 'react'
import { Modal, Button, Badge, Row, Col, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { 
  FileText, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Edit3, 
  Trash2, 
  Download,
  Share2,
  Calendar,
  User,
  Eye,
  Tag,
  Clock
} from 'lucide-react'

const ReportViewModal = ({ show, onHide, report, onEdit, onDelete }) => {
  if (!report) return null

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

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a')
    link.href = '#'
    link.download = `${report.title}.pdf`
    link.click()
  }

  const handleShare = () => {
    // Simulate sharing
    if (navigator.share) {
      navigator.share({
        title: report.title,
        text: report.description,
        url: window.location.href
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="report-view-modal">
      <Modal.Header closeButton className="report-view-header">
        <Modal.Title className="report-view-title">
          <ReportIcon size={24} className="me-2" />
          Report Details
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="report-view-body">
        <Row>
          <Col md={8}>
            <div className="report-main-info">
              <div className="report-title-section mb-4">
                <h3 className="report-main-title">{report.title}</h3>
                <div className="report-badges mb-3">
                  <Badge bg={getStatusColor(report.status)} className="status-badge-large">
                    {report.status}
                  </Badge>
                  <Badge bg="info" className="category-badge-large">
                    {report.category}
                  </Badge>
                  <Badge bg="secondary" className="type-badge-large">
                    {report.type}
                  </Badge>
                </div>
                <p className="report-main-description">{report.description}</p>
              </div>

              {report.tags && report.tags.length > 0 && (
                <div className="report-tags-section mb-4">
                  <h6 className="section-title">
                    <Tag size={16} className="me-2" />
                    Tags
                  </h6>
                  <div className="tags-list">
                    {report.tags.map((tag, index) => (
                      <Badge key={index} bg="light" text="dark" className="tag-badge">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="report-metrics mb-4">
                <h6 className="section-title">Performance Metrics</h6>
                <Row>
                  <Col sm={6}>
                    <div className="metric-item">
                      <Eye size={16} className="metric-icon" />
                      <div className="metric-info">
                        <div className="metric-value">{report.views}</div>
                        <div className="metric-label">Total Views</div>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="metric-item">
                      <Download size={16} className="metric-icon" />
                      <div className="metric-info">
                        <div className="metric-value">{report.downloads}</div>
                        <div className="metric-label">Downloads</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          
          <Col md={4}>
            <Card className="report-sidebar-info">
              <Card.Header>
                <h6 className="card-title">Report Information</h6>
              </Card.Header>
              <Card.Body>
                <div className="info-item">
                  <User size={16} className="info-icon" />
                  <div className="info-content">
                    <div className="info-label">Created by</div>
                    <div className="info-value">{report.createdBy}</div>
                  </div>
                </div>
                
                <div className="info-item">
                  <Calendar size={16} className="info-icon" />
                  <div className="info-content">
                    <div className="info-label">Created</div>
                    <div className="info-value">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="info-item">
                  <Clock size={16} className="info-icon" />
                  <div className="info-content">
                    <div className="info-label">Last Updated</div>
                    <div className="info-value">
                      {new Date(report.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {report.schedule && (
                  <div className="info-item">
                    <Calendar size={16} className="info-icon" />
                    <div className="info-content">
                      <div className="info-label">Scheduled</div>
                      <div className="info-value">
                        {new Date(report.schedule).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      
      <Modal.Footer className="report-view-footer">
        <div className="footer-actions-left">
          <Button variant="outline-info" onClick={handleDownload}>
            <Download size={16} className="me-2" />
            Download
          </Button>
          <Button variant="outline-success" onClick={handleShare}>
            <Share2 size={16} className="me-2" />
            Share
          </Button>
        </div>
        
        <div className="footer-actions-right">
          <Button variant="outline-danger" onClick={onDelete}>
            <Trash2 size={16} className="me-2" />
            Delete
          </Button>
          <Button variant="outline-primary" onClick={onEdit}>
            <Edit3 size={16} className="me-2" />
            Edit
          </Button>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ReportViewModal
