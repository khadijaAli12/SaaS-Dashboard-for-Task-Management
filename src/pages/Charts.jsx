import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Badge, Dropdown, Modal, Form } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  Download, 
  RefreshCw, 
  Settings, 
  Plus,
  Eye,
  TrendingUp,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react'
import { 
  LineChart as RechartsLineChart, 
  Line, 
  BarChart as RechartsBarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import toast from 'react-hot-toast'

const Charts = () => {
  const [charts, setCharts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  // Sample chart data
  const sampleData = {
    line: [
      { name: 'Jan', value: 400, value2: 240 },
      { name: 'Feb', value: 300, value2: 456 },
      { name: 'Mar', value: 200, value2: 139 },
      { name: 'Apr', value: 278, value2: 980 },
      { name: 'May', value: 189, value2: 800 },
      { name: 'Jun', value: 239, value2: 380 }
    ],
    bar: [
      { name: 'Product A', sales: 4000, target: 3500 },
      { name: 'Product B', sales: 3000, target: 3200 },
      { name: 'Product C', sales: 2000, target: 2800 },
      { name: 'Product D', sales: 2780, target: 2500 },
      { name: 'Product E', sales: 1890, target: 2200 }
    ],
    pie: [
      { name: 'Desktop', value: 55, color: '#667eea' },
      { name: 'Mobile', value: 35, color: '#4facfe' },
      { name: 'Tablet', value: 10, color: '#fa709a' }
    ],
    area: [
      { name: 'Jan', revenue: 12000, profit: 4000 },
      { name: 'Feb', revenue: 19000, profit: 6000 },
      { name: 'Mar', revenue: 15000, profit: 4500 },
      { name: 'Apr', revenue: 25000, profit: 8000 },
      { name: 'May', revenue: 22000, profit: 7000 }
    ]
  }

  useEffect(() => {
    // Initialize charts
    const initialCharts = [
      {
        id: 1,
        title: 'Revenue Analytics',
        type: 'line',
        data: sampleData.line,
        size: 'large',
        color: '#667eea'
      },
      {
        id: 2,
        title: 'Sales Performance',
        type: 'bar',
        data: sampleData.bar,
        size: 'medium',
        color: '#4facfe'
      },
      {
        id: 3,
        title: 'Traffic Sources',
        type: 'pie',
        data: sampleData.pie,
        size: 'small',
        color: '#fa709a'
      },
      {
        id: 4,
        title: 'Growth Metrics',
        type: 'area',
        data: sampleData.area,
        size: 'large',
        color: '#fee140'
      }
    ]

    setCharts(initialCharts)
    setIsLoading(false)
  }, [])

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.success('Charts refreshed successfully!')
  }

  const handleExport = () => {
    toast.success('Charts exported successfully!')
  }

  const renderChart = (chart) => {
    const commonProps = {
      width: "100%",
      height: chart.size === 'large' ? 400 : chart.size === 'medium' ? 300 : 250
    }

    switch (chart.type) {
      case 'line':
        return (
          <ResponsiveContainer {...commonProps}>
            <RechartsLineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={chart.color} 
                strokeWidth={3}
                dot={{ fill: chart.color, strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="value2" 
                stroke="#4facfe" 
                strokeWidth={3}
                dot={{ fill: '#4facfe', strokeWidth: 2, r: 4 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        )

      case 'bar':
        return (
          <ResponsiveContainer {...commonProps}>
            <RechartsBarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="sales" fill={chart.color} radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#4facfe" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        )

      case 'pie':
        return (
          <ResponsiveContainer {...commonProps}>
            <RechartsPieChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {chart.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        )

      case 'area':
        return (
          <ResponsiveContainer {...commonProps}>
            <AreaChart data={chart.data}>
              <defs>
                <linearGradient id={`gradient-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chart.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={chart.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke={chart.color} 
                strokeWidth={3}
                fillOpacity={1} 
                fill={`url(#gradient-${chart.id})`} 
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stroke="#4facfe" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#gradient-2)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      default:
        return <div>Unsupported chart type</div>
    }
  }

  const ChartCard = ({ chart, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`chart-item ${chart.size}`}
    >
      <Card className="chart-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div className="chart-header-info">
            <h5 className="chart-title mb-0">{chart.title}</h5>
            <Badge bg="primary" className="chart-type-badge">
              {chart.type.charAt(0).toUpperCase() + chart.type.slice(1)}
            </Badge>
          </div>
          <div className="chart-actions">
            <Button
              variant="link"
              size="sm"
              onClick={handleRefresh}
              className="chart-action-btn"
            >
              <RefreshCw size={16} />
            </Button>
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" size="sm">
                <Settings size={16} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleExport}>
                  <Download size={14} className="me-2" />
                  Export
                </Dropdown.Item>
                <Dropdown.Item>
                  <Eye size={14} className="me-2" />
                  View Details
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>
        <Card.Body>
          {isLoading ? (
            <div className="chart-loading">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading chart...</p>
            </div>
          ) : (
            renderChart(chart)
          )}
        </Card.Body>
      </Card>
    </motion.div>
  )

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="stat-card">
        <Card.Body>
          <div className="stat-content">
            <div className="stat-icon" style={{ backgroundColor: color }}>
              <Icon size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{value}</div>
              <div className="stat-title">{title}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )

  return (
    <Container fluid className="charts-page">
      <motion.div 
        className="page-header mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="page-header-content">
          <div>
            <h1 className="page-title">
              <BarChart3 size={32} className="me-3" />
              Analytics Dashboard
            </h1>
            <p className="page-description">
              Comprehensive data visualization with interactive charts
            </p>
          </div>
          <div className="page-actions">
            <Button variant="outline-primary" onClick={handleRefresh}>
              <RefreshCw size={16} className="me-2" />
              Refresh All
            </Button>
            <Button variant="outline-secondary" onClick={handleExport}>
              <Download size={16} className="me-2" />
              Export
            </Button>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <Plus size={16} className="me-2" />
              Add Chart
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Chart Statistics */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <StatCard
            icon={BarChart3}
            title="Total Charts"
            value={charts.length}
            color="#667eea"
          />
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <StatCard
            icon={Activity}
            title="Active Charts"
            value={charts.filter(c => c.type).length}
            color="#4facfe"
          />
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <StatCard
            icon={TrendingUp}
            title="Data Points"
            value="1,234"
            color="#fa709a"
          />
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <StatCard
            icon={Eye}
            title="Views Today"
            value="5,678"
            color="#fee140"
          />
        </Col>
      </Row>

      {/* Charts Grid */}
      <div className="charts-grid">
        <AnimatePresence>
          {charts.map((chart, index) => (
            <ChartCard key={chart.id} chart={chart} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Add Chart Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Chart Title</Form.Label>
              <Form.Control type="text" placeholder="Enter chart title" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Chart Type</Form.Label>
              <Form.Select>
                <option>Select chart type</option>
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="area">Area Chart</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            setShowModal(false)
            toast.success('Chart added successfully!')
          }}>
            Add Chart
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Charts
