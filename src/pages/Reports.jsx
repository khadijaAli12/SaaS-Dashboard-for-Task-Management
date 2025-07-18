import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Badge, Dropdown, Modal, Table, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Upload,
  Plus,
  Search,
  Filter,
  Calendar,
  Eye,
  Edit3,
  Trash2,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  RefreshCw,
  Share2,
  Printer,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import ReportCard from '../components/Reports/ReportCard'
import ReportModal from '../components/Reports/ReportModal'
import ReportViewModal from '../components/Reports/ReportViewModal'
// import ReportChart from '../components/Reports/ReportChart'
import { reportsData } from '../data/mockData'
import toast from 'react-hot-toast'

const Reports = () => {
  const [reports, setReports] = useState(ReportsData)
  const [filteredReports, setFilteredReports] = useState(ReportsData)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [viewMode, setViewMode] = useState('grid')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [reportsPerPage] = useState(12)

  // Report Statistics
  const [reportStats, setReportStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    scheduled: 0,
    categories: {}
  })

  // Categories and types
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'sales', label: 'Sales Reports' },
    { value: 'financial', label: 'Financial Reports' },
    { value: 'marketing', label: 'Marketing Reports' },
    { value: 'analytics', label: 'Analytics Reports' },
    { value: 'inventory', label: 'Inventory Reports' },
    { value: 'customer', label: 'Customer Reports' }
  ]

  const reportTypes = [
    { value: 'table', label: 'Data Table', icon: FileText },
    { value: 'chart', label: 'Chart Report', icon: BarChart3 },
    { value: 'dashboard', label: 'Dashboard', icon: PieChart },
    { value: 'summary', label: 'Summary Report', icon: TrendingUp }
  ]

  // Calculate statistics
  useEffect(() => {
    const stats = {
      total: reports.length,
      published: reports.filter(r => r.status === 'Published').length,
      draft: reports.filter(r => r.status === 'Draft').length,
      scheduled: reports.filter(r => r.status === 'Scheduled').length,
      categories: {}
    }

    categories.forEach(cat => {
      if (cat.value !== 'all') {
        stats.categories[cat.value] = reports.filter(r => r.category === cat.value).length
      }
    })

    setReportStats(stats)
  }, [reports])

  // Filter and search reports
  useEffect(() => {
    let filtered = reports.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory
      const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus
      
      let matchesDate = true
      if (dateRange !== 'all') {
        const reportDate = new Date(report.createdAt)
        const now = new Date()
        const daysDiff = (now - reportDate) / (1000 * 60 * 60 * 24)
        
        switch (dateRange) {
          case '7d':
            matchesDate = daysDiff <= 7
            break
          case '30d':
            matchesDate = daysDiff <= 30
            break
          case '90d':
            matchesDate = daysDiff <= 90
            break
          default:
            matchesDate = true
        }
      }
      
      return matchesSearch && matchesCategory && matchesStatus && matchesDate
    })

    // Sort reports
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'date') {
        aValue = new Date(a.createdAt)
        bValue = new Date(b.createdAt)
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredReports(filtered)
    setCurrentPage(1)
  }, [reports, searchTerm, selectedCategory, selectedStatus, dateRange, sortBy, sortOrder])

  // Pagination
  const indexOfLastReport = currentPage * reportsPerPage
  const indexOfFirstReport = indexOfLastReport - reportsPerPage
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport)
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage)

  const handleCreateReport = () => {
    setSelectedReport(null)
    setShowReportModal(true)
  }

  const handleEditReport = (report) => {
    setSelectedReport(report)
    setShowReportModal(true)
  }

  const handleViewReport = (report) => {
    setSelectedReport(report)
    setShowViewModal(true)
  }

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(report => report.id !== reportId))
      toast.success('Report deleted successfully!')
    }
  }

  const handleSaveReport = (reportData) => {
    if (selectedReport) {
      // Update existing report
      setReports(reports.map(report => 
        report.id === selectedReport.id 
          ? { ...report, ...reportData, updatedAt: new Date().toISOString() }
          : report
      ))
      toast.success('Report updated successfully!')
    } else {
      // Create new report
      const newReport = {
        id: Date.now(),
        ...reportData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        downloads: 0
      }
      setReports([...reports, newReport])
      toast.success('Report created successfully!')
    }
    setShowReportModal(false)
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.success('Reports refreshed!')
  }

  const handleExportReports = () => {
    const exportData = filteredReports.map(report => ({
      Title: report.title,
      Category: report.category,
      Status: report.status,
      'Created At': new Date(report.createdAt).toLocaleDateString(),
      Views: report.views,
      Downloads: report.downloads
    }))
    
    const csvContent = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'reports-export.csv'
    a.click()
    
    toast.success('Reports exported successfully!')
  }

  const StatCard = ({ icon: Icon, title, value, color, trend, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="report-stat-card">
        <Card.Body>
          <div className="stat-content">
            <div className="stat-icon" style={{ backgroundColor: color }}>
              <Icon size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{value}</div>
              <div className="stat-title">{title}</div>
              <div className="stat-description">{description}</div>
              {trend && (
                <div className={`stat-trend ${trend.direction}`}>
                  {trend.direction === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span>{trend.value}</span>
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )

  return (
    <Container fluid className="reports-page">
      <motion.div 
        className="page-header mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="page-header-content">
          <div className="page-title-section">
            <h1 className="page-title">
              <FileText size={32} className="me-3" />
              Reports Management
            </h1>
            <p className="page-description">
              Generate, manage, and analyze comprehensive business reports
            </p>
          </div>
          
          <div className="page-actions">
            <Button variant="outline-secondary" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw size={16} className={`me-2 ${isLoading ? 'spinning' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline-primary" onClick={handleExportReports}>
              <Download size={16} className="me-2" />
              Export All
            </Button>
            <Button variant="primary" onClick={handleCreateReport}>
              <Plus size={16} className="me-2" />
              Create Report
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Report Statistics */}
      <motion.div 
        className="reports-stats-section mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Row>
          <Col lg={3} md={6} className="mb-3">
            <StatCard
              icon={FileText}
              title="Total Reports"
              value={reportStats.total}
              color="#667eea"
              description="All reports"
              trend={{ direction: 'up', value: '+12%' }}
            />
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <StatCard
              icon={Eye}
              title="Published"
              value={reportStats.published}
              color="#4facfe"
              description="Live reports"
              trend={{ direction: 'up', value: '+8%' }}
            />
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <StatCard
              icon={Edit3}
              title="Draft Reports"
              value={reportStats.draft}
              color="#fa709a"
              description="Work in progress"
              trend={{ direction: 'down', value: '-5%' }}
            />
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <StatCard
              icon={Calendar}
              title="Scheduled"
              value={reportStats.scheduled}
              color="#fee140"
              description="Auto-generated"
              trend={{ direction: 'up', value: '+15%' }}
            />
          </Col>
        </Row>
      </motion.div>

      {/* Filters and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-4"
      >
        <Card className="filters-card">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text>
                    <Search size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              
              <Col md={2}>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </Form.Select>
              </Col>
              
              <Col md={2}>
                <Form.Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Scheduled">Scheduled</option>
                </Form.Select>
              </Col>
              
              <Col md={2}>
                <Form.Select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </Form.Select>
              </Col>
              
              <Col md={2}>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                  <option value="views">Sort by Views</option>
                  <option value="downloads">Sort by Downloads</option>
                </Form.Select>
              </Col>
              
              <Col md={1}>
                <div className="d-flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                  >
                    Table
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </motion.div>

      {/* Reports Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {viewMode === 'grid' ? (
          <Row>
            <AnimatePresence>
              {currentReports.map((report, index) => (
                <Col key={report.id} lg={4} md={6} className="mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ReportCard
                      report={report}
                      onEdit={() => handleEditReport(report)}
                      onDelete={() => handleDeleteReport(report.id)}
                      onView={() => handleViewReport(report)}
                    />
                  </motion.div>
                </Col>
              ))}
            </AnimatePresence>
          </Row>
        ) : (
          <Card>
            <Card.Body className="p-0">
              <Table responsive className="reports-table">
                <thead>
                  <tr>
                    <th>Report</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Views</th>
                    <th>Downloads</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentReports.map((report) => (
                    <tr key={report.id}>
                      <td>
                        <div className="report-info">
                          <h6 className="report-title">{report.title}</h6>
                          <p className="report-description">{report.description}</p>
                        </div>
                      </td>
                      <td>
                        <Badge bg="info" className="category-badge">
                          {report.category}
                        </Badge>
                      </td>
                      <td>
                        <Badge 
                          bg={report.status === 'Published' ? 'success' : 
                              report.status === 'Draft' ? 'warning' : 'primary'}
                        >
                          {report.status}
                        </Badge>
                      </td>
                      <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                      <td>{report.views}</td>
                      <td>{report.downloads}</td>
                      <td>
                        <div className="table-actions">
                          <OverlayTrigger overlay={<Tooltip>View Report</Tooltip>}>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => handleViewReport(report)}
                            >
                              <Eye size={16} />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger overlay={<Tooltip>Edit Report</Tooltip>}>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => handleEditReport(report)}
                            >
                              <Edit3 size={16} />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger overlay={<Tooltip>Delete Report</Tooltip>}>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => handleDeleteReport(report.id)}
                              className="text-danger"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="pagination-card mt-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                Showing {indexOfFirstReport + 1} to {Math.min(indexOfLastReport, filteredReports.length)} of {filteredReports.length} reports
              </div>
              <div className="pagination-controls">
                <Button
                  variant="outline-primary"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="mx-3">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline-primary"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Modals */}
      <ReportModal
        show={showReportModal}
        onHide={() => setShowReportModal(false)}
        report={selectedReport}
        onSave={handleSaveReport}
        reportTypes={reportTypes}
        categories={categories}
      />

      <ReportViewModal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        report={selectedReport}
        onEdit={() => {
          setShowViewModal(false)
          handleEditReport(selectedReport)
        }}
        onDelete={() => {
          setShowViewModal(false)
          handleDeleteReport(selectedReport.id)
        }}
      />
    </Container>
  )
}

export default Reports
