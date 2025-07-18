import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { chartData } from '../../data/mockData'
import { Maximize2 } from 'lucide-react'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Charts = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  return (
    <Row className="mb-4">
      <Col lg={8} className="mb-4">
        <Card className="chart-card">
          <Card.Header>
            <h5 className="mb-0">Revenue Trend</h5>
          </Card.Header>
          <Card.Body>
            <div style={{ height: '300px' }}>
              <Line data={chartData.line} options={chartOptions} />
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col lg={4} className="mb-4">
        <Card className="chart-card">
          <Card.Header>
            <h5 className="mb-0">Device Usage</h5>
          </Card.Header>
          <Card.Body>
            <div style={{ height: '300px' }}>
              <Doughnut data={chartData.doughnut} options={chartOptions} />
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col lg={6}>
        <Card className="chart-card">
          <Card.Header>
            <h5 className="mb-0">Quarterly Sales</h5>
          </Card.Header>
          <Card.Body>
            <div style={{ height: '250px' }}>
              <Bar data={chartData.bar} options={chartOptions} />
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col lg={6}>
        <Card className="chart-card">
          <Card.Header>
            <h5 className="mb-0">Recent Activity</h5>
          </Card.Header>
          <Card.Body>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon bg-primary">
                  <i className="fas fa-user"></i>
                </div>
                <div className="activity-content">
                  <p className="mb-1">New user registered</p>
                  <small className="text-muted">2 minutes ago</small>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon bg-success">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="activity-content">
                  <p className="mb-1">Order completed</p>
                  <small className="text-muted">5 minutes ago</small>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon bg-warning">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="activity-content">
                  <p className="mb-1">Server maintenance scheduled</p>
                  <small className="text-muted">1 hour ago</small>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default Charts
