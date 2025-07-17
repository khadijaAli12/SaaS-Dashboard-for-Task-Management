import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const StatsCards = ({ stats }) => {
  const StatCard = ({ stat, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="stat-card-modern hover-lift"
    >
      <div className="stat-card-content-horizontal">
        <div 
          className="stat-icon-compact"
          style={{ background: stat.color }}
        >
          <stat.icon size={24} />
        </div>
        <div className="stat-details-compact">
          <div className="stat-title-compact">{stat.title}</div>
          <div className="stat-value-compact">{stat.value}</div>
          <div className={`stat-change-compact ${stat.changeType}`}>
            {stat.changeType === 'positive' ? (
              <ArrowUp size={12} />
            ) : (
              <ArrowDown size={12} />
            )}
            {stat.change}
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <Row className="stats-row-horizontal mb-4">
      {stats.map((stat, index) => (
        <Col key={index} lg={3} md={6} className="mb-3">
          <StatCard stat={stat} index={index} />
        </Col>
      ))}
    </Row>
  )
}

export default StatsCards
