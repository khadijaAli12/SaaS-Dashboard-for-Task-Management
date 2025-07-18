import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
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

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      bg: 'rgba(102, 126, 234, 0.1)'
    },
    {
      title: 'Revenue',
      value: '$45,21',
      change: '+8.2%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      bg: 'rgba(79, 172, 254, 0.1)'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '-3.1%',
      changeType: 'negative',
      icon: ShoppingCart,
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      bg: 'rgba(250, 112, 154, 0.1)'
    },
    {
      title: 'Growth',
      value: '15.8%',
      change: '+2.4%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      bg: 'rgba(240, 147, 251, 0.1)'
    }
  ]

  const revenueData = [
    { name: 'Jan', revenue: 12000, profit: 4000 },
    { name: 'Feb', revenue: 19000, profit: 6000 },
    { name: 'Mar', revenue: 15000, profit: 4500 },
    { name: 'Apr', revenue: 25000, profit: 8000 },
    { name: 'May', revenue: 22000, profit: 7000 },
    { name: 'Jun', revenue: 30000, profit: 9500 }
  ]

  const pieData = [
    { name: 'Desktop', value: 55, color: '#667eea' },
    { name: 'Mobile', value: 35, color: '#764ba2' },
    { name: 'Tablet', value: 10, color: '#f093fb' }
  ]

  const activityData = [
    { name: 'Mon', users: 120, sessions: 240 },
    { name: 'Tue', users: 180, sessions: 320 },
    { name: 'Wed', users: 150, sessions: 280 },
    { name: 'Thu', users: 220, sessions: 380 },
    { name: 'Fri', users: 200, sessions: 350 },
    { name: 'Sat', users: 160, sessions: 290 },
    { name: 'Sun', users: 140, sessions: 260 }
  ]

  const StatCard = ({ stat, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="stat-card hover-lift"
    >
      <div className="stat-card-content">
        <div 
          className="stat-icon"
          style={{ background: stat.color }}
        >
          <stat.icon size={32} />
        </div>
        <div className="stat-details">
          <div className="stat-title">{stat.title}</div>
          <div className="stat-value">{stat.value}</div>
          <div className={`stat-change ${stat.changeType}`}>
            {stat.changeType === 'positive' ? (
              <ArrowUp size={16} />
            ) : (
              <ArrowDown size={16} />
            )}
            {stat.change} from last month
          </div>
        </div>
      </div>
    </motion.div>
  )

  if (isLoading) {
    return (
      <Container fluid className="dashboard-page">
        <div className="page-header mb-4">
          <div className="skeleton skeleton-title" style={{ width: '200px' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '300px' }}></div>
        </div>
        <div className="stats-grid">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="skeleton skeleton-card"></div>
          ))}
        </div>
      </Container>
    )
  }

  return (
    <Container fluid className="dashboard-page">
      <motion.div 
        className="page-header mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          Welcome back! Here's what's happening with your business today.
        </p>
      </motion.div>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>

      {/* Charts Section */}
      <Row className="mb-4">
        <Col lg={8} className="mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="chart-card">
              <Card.Header>
                <h5 className="chart-title">Revenue & Profit Trend</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#667eea" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4facfe" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4facfe" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow)'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#667eea" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#revenueGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="#4facfe" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#profitGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        
        <Col lg={4} className="mb-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="chart-card">
              <Card.Header>
                <h5 className="chart-title">Traffic Sources</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Activity Chart */}
      <Row>
        <Col lg={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="chart-card">
              <Card.Header>
                <h5 className="chart-title">Weekly Activity</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#667eea" 
                      strokeWidth={3}
                      dot={{ fill: '#667eea', strokeWidth: 2, r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sessions" 
                      stroke="#4facfe" 
                      strokeWidth={3}
                      dot={{ fill: '#4facfe', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
