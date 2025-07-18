import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Nav, Badge, Dropdown, Modal, Form, InputGroup } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Table as TableIcon, 
  Plus, 
  Download, 
  Upload, 
  RefreshCw, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2,
  MoreVertical,
  Package,
  ShoppingCart,
  FileText,
  Activity,
  TrendingUp,
  Calendar
} from 'lucide-react'
import DataTable from '../components/Tables/DataTable'
import { productsData, ordersData, reportsData, logsData } from '../data/mockData'
import toast from 'react-hot-toast'

const Tables = () => {
  const [activeTab, setActiveTab] = useState('products')
  const [tableData, setTableData] = useState({})
  const [filteredData, setFilteredData] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [tableStats, setTableStats] = useState({
    products: { total: 0, active: 0, lowStock: 0 },
    orders: { total: 0, pending: 0, completed: 0 },
    reports: { total: 0, published: 0, draft: 0 },
    logs: { total: 0, errors: 0, warnings: 0 }
  })

  const tableTypes = [
    {
      key: 'products',
      label: 'Products',
      icon: Package,
      description: 'E-commerce inventory management',
      color: '#667eea'
    },
    {
      key: 'orders',
      label: 'Orders',
      icon: ShoppingCart,
      description: 'Transaction and order history',
      color: '#4facfe'
    },
    {
      key: 'reports',
      label: 'Reports',
      icon: FileText,
      description: 'Analytics and business reports',
      color: '#fa709a'
    },
    {
      key: 'logs',
      label: 'Activity Logs',
      icon: Activity,
      description: 'System activity and error logs',
      color: '#fee140'
    }
  ]

  // Initialize data
  useEffect(() => {
    const initialData = {
      products: productsData,
      orders: ordersData,
      reports: reportsData,
      logs: logsData
    }
    setTableData(initialData)
    setFilteredData(initialData)
    
    // Calculate stats
    const stats = {
      products: {
        total: productsData.length,
        active: productsData.filter(p => p.status === 'Active').length,
        lowStock: productsData.filter(p => p.stock < 10).length
      },
      orders: {
        total: ordersData.length,
        pending: ordersData.filter(o => o.status === 'Pending').length,
        completed: ordersData.filter(o => o.status === 'Completed').length
      },
      reports: {
        total: reportsData.length,
        published: reportsData.filter(r => r.status === 'Published').length,
        draft: reportsData.filter(r => r.status === 'Draft').length
      },
      logs: {
        total: logsData.length,
        errors: logsData.filter(l => l.level === 'Error').length,
        warnings: logsData.filter(l => l.level === 'Warning').length
      }
    }
    setTableStats(stats)
  }, [])

  // Handle search
  useEffect(() => {
    if (searchTerm) {
      const filtered = {}
      Object.keys(tableData).forEach(key => {
        filtered[key] = tableData[key].filter(item => 
          Object.values(item).some(value => 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      })
      setFilteredData(filtered)
    } else {
      setFilteredData(tableData)
    }
  }, [searchTerm, tableData])

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.success(`${tableTypes.find(t => t.key === activeTab)?.label} table refreshed!`)
  }

  const handleExport = () => {
    const currentData = filteredData[activeTab] || []
    const csv = convertToCSV(currentData)
    downloadCSV(csv, `${activeTab}-export.csv`)
    toast.success(`${tableTypes.find(t => t.key === activeTab)?.label} data exported!`)
  }

  const convertToCSV = (data) => {
    if (!data.length) return ''
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(row => Object.values(row).join(','))
    return [headers, ...rows].join('\n')
  }

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getTableColumns = (tableType) => {
    switch (tableType) {
      case 'products':
        return [
          { header: 'Product', accessorKey: 'name' },
          { header: 'SKU', accessorKey: 'sku' },
          { header: 'Category', accessorKey: 'category' },
          { header: 'Price', accessorKey: 'price', cell: ({ getValue }) => `$${getValue()}` },
          { header: 'Stock', accessorKey: 'stock' },
          { 
            header: 'Status', 
            accessorKey: 'status',
            cell: ({ getValue }) => (
              <Badge bg={getValue() === 'Active' ? 'success' : 'secondary'}>
                {getValue()}
              </Badge>
            )
          }
        ]
      
      case 'orders':
        return [
          { header: 'Order ID', accessorKey: 'orderId' },
          { header: 'Customer', accessorKey: 'customer' },
          { header: 'Amount', accessorKey: 'amount', cell: ({ getValue }) => `$${getValue()}` },
          { header: 'Date', accessorKey: 'date' },
          { 
            header: 'Status', 
            accessorKey: 'status',
            cell: ({ getValue }) => {
              const status = getValue()
              const variant = status === 'Completed' ? 'success' : 
                           status === 'Pending' ? 'warning' : 'danger'
              return <Badge bg={variant}>{status}</Badge>
            }
          }
        ]
      
      case 'reports':
        return [
          { header: 'Report Name', accessorKey: 'name' },
          { header: 'Type', accessorKey: 'type' },
          { header: 'Created By', accessorKey: 'createdBy' },
          { header: 'Date', accessorKey: 'date' },
          { 
            header: 'Status', 
            accessorKey: 'status',
            cell: ({ getValue }) => (
              <Badge bg={getValue() === 'Published' ? 'success' : 'warning'}>
                {getValue()}
              </Badge>
            )
          }
        ]
      
      case 'logs':
        return [
          { header: 'Timestamp', accessorKey: 'timestamp' },
          { header: 'User', accessorKey: 'user' },
          { header: 'Action', accessorKey: 'action' },
          { 
            header: 'Level', 
            accessorKey: 'level',
            cell: ({ getValue }) => {
              const level = getValue()
              const variant = level === 'Error' ? 'danger' : 
                           level === 'Warning' ? 'warning' : 'info'
              return <Badge bg={variant}>{level}</Badge>
            }
          },
          { header: 'Details', accessorKey: 'details' }
        ]
      
      default:
        return []
    }
  }

  const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="table-stat-card">
        <Card.Body>
          <div className="table-stat-content">
            <div className="table-stat-icon" style={{ backgroundColor: color }}>
              <Icon size={24} />
            </div>
            <div className="table-stat-info">
              <div className="table-stat-value">{value}</div>
              <div className="table-stat-title">{title}</div>
              <div className="table-stat-subtitle">{subtitle}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )

  const currentTable = tableTypes.find(t => t.key === activeTab)
  const currentStats = tableStats[activeTab]

  return (
    <Container fluid className="tables-page">
      <motion.div 
        className="page-header mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="page-header-content">
          <div className="page-title-section">
            <h1 className="page-title">
              <TableIcon size={32} className="me-3" />
              Data Management Hub
            </h1>
            <p className="page-description">
              Comprehensive data tables with advanced features for different business needs
            </p>
          </div>
          
          <div className="page-actions">
            <Button variant="outline-secondary" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw size={16} className={`me-2 ${isLoading ? 'spinning' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline-primary" onClick={handleExport}>
              <Download size={16} className="me-2" />
              Export
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="outline-success">
                <Upload size={16} className="me-2" />
                Import
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <FileText size={14} className="me-2" />
                  Import CSV
                </Dropdown.Item>
                <Dropdown.Item>
                  <FileText size={14} className="me-2" />
                  Import Excel
                </Dropdown.Item>
                <Dropdown.Item>
                  <FileText size={14} className="me-2" />
                  Import JSON
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </motion.div>

      {/* Table Type Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4"
      >
        <Card className="table-nav-card">
          <Card.Body>
            <Nav variant="pills" className="table-nav">
              {tableTypes.map((table) => (
                <Nav.Item key={table.key}>
                  <Nav.Link
                    active={activeTab === table.key}
                    onClick={() => setActiveTab(table.key)}
                    className="table-nav-link"
                  >
                    <table.icon size={16} className="me-2" />
                    {table.label}
                    <Badge bg="light" text="dark" className="ms-2">
                      {tableStats[table.key]?.total || 0}
                    </Badge>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Card.Body>
        </Card>
      </motion.div>

      {/* Current Table Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-4"
      >
        <Row>
          {activeTab === 'products' && (
            <>
              <Col lg={4} md={6} className="mb-3">
                <StatCard
                  icon={Package}
                  title="Total Products"
                  value={currentStats.total}
                  color="#667eea"
                  subtitle="All inventory items"
                />
              </Col>
              <Col lg={4} md={6} className="mb-3">
                <StatCard
                  icon={TrendingUp}
                  title="Active Products"
                  value={currentStats.active}
                  color="#4facfe"
                  subtitle="Currently available"
                />
              </Col>
              <Col lg={4} md={6} className="mb-3">
                <StatCard
                  icon={Activity}
                  title="Low Stock"
                  value={currentStats.lowStock}
                  color="#fa709a"
                  subtitle="Needs restocking"
                />
              </Col>
            </>
          )}

          {activeTab === 'orders' && (
            <>
              <Col lg={4} md={6} className="mb-3">
                <StatCard
                  icon={ShoppingCart}
                  title="Total Orders"
                  value={currentStats.total}
                  color="#667eea"
                  subtitle="All time orders"
                />
              </Col>
              <Col lg={4} md={6} className="mb-3">
                <StatCard
                  icon={Calendar}
                  title="Pending Orders"
                  value={currentStats.pending}
                  color="#fee140"
                  subtitle="Awaiting processing"
                />
              </Col>
              <Col lg={4} md={6} className="mb-3">
                <StatCard
                  icon={TrendingUp}
                  title="Completed"
                  value={currentStats.completed}
                  color="#4facfe"
                  subtitle="Successfully delivered"
                />
              </Col>
            </>
          )}

          {activeTab === 'reports' && (
            <>
              <Col lg={4} md={6} className="mb-3">
                <StatCard
                  icon={FileText}
                  title="Total Reports"
                  value={currentStats.total}
                  color="#667eea"
                  subtitle="All reports"
                />
              </Col>
              <Col lg={4} md={6} className="mb-3">
                <StatCard
                  icon={TrendingUp}
                  title="Published"
                  value={currentStats.published}
                  color="#4facfe"
                  subtitle="Live reports"
                />
              </Col>
              <Col lg={4} md={6} className="mb-3">
                <StatCard
                  icon={Edit3}
                  title="Draft"
                  value={currentStats.draft}
                  color="#fa709a"
                  subtitle="Work in progress"
                />
              </Col>
            </>
          )}

          {activeTab === 'logs' && (
            <>
              <Col lg={4} md={6} className="mb-3">
                <StatCard
                  icon={Activity}
                  title="Total Logs"
                  value={currentStats.total}
                  color="#667eea"
                  subtitle="All activity logs"
                />
              </Col>
              <Col lg={4} md={6} className="mb-3">
                <StatCard
                  icon={Activity}
                  title="Errors"
                  value={currentStats.errors}
                  color="#f5576c"
                  subtitle="Critical issues"
                />
              </Col>
              <Col lg={4} md={6} className="mb-3">
                <StatCard
                  icon={Activity}
                  title="Warnings"
                  value={currentStats.warnings}
                  color="#fee140"
                  subtitle="Attention needed"
                />
              </Col>
            </>
          )}
        </Row>
      </motion.div>

      {/* Search and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-4"
      >
        <Card>
          <Card.Body>
            <Row className="align-items-center">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>
                    <Search size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={`Search ${currentTable?.label.toLowerCase()}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={6} className="text-end">
                <div className="table-description">
                  <strong>{currentTable?.label}:</strong> {currentTable?.description}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </motion.div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <DataTable
          data={filteredData[activeTab] || []}
          columns={getTableColumns(activeTab)}
          title={`${currentTable?.label} Management`}
          loading={isLoading}
        />
      </motion.div>
    </Container>
  )
}

export default Tables
