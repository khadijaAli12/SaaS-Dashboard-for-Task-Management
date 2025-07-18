import React from 'react'
import { Card } from 'react-bootstrap'
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const ReportChart = ({ type = 'bar', data, title, height = 300 }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12 },
          color: 'var(--text-color)'
        }
      },
      tooltip: {
        backgroundColor: 'var(--card-bg)',
        titleColor: 'var(--text-color)',
        bodyColor: 'var(--text-color)',
        borderColor: 'var(--border-color)',
        borderWidth: 1,
        cornerRadius: 8
      }
    },
    scales: type !== 'pie' && type !== 'doughnut' ? {
      x: {
        grid: { display: false },
        ticks: { color: 'var(--text-muted)' }
      },
      y: {
        grid: { color: 'var(--border-color)' },
        ticks: { color: 'var(--text-muted)' }
      }
    } : {}
  }

  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sample Data',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(79, 172, 254, 0.8)',
          'rgba(250, 112, 154, 0.8)',
          'rgba(254, 225, 64, 0.8)',
          'rgba(168, 237, 234, 0.8)',
          'rgba(211, 153, 194, 0.8)'
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(79, 172, 254, 1)',
          'rgba(250, 112, 154, 1)',
          'rgba(254, 225, 64, 1)',
          'rgba(168, 237, 234, 1)',
          'rgba(211, 153, 194, 1)'
        ],
        borderWidth: 2
      }
    ]
  }

  const chartData = data || defaultData

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={chartData} options={chartOptions} />
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />
      case 'doughnut':
        return <Doughnut data={chartData} options={chartOptions} />
      default:
        return <Bar data={chartData} options={chartOptions} />
    }
  }

  return (
    <Card className="report-chart-card">
      {title && (
        <Card.Header>
          <h6 className="chart-title">{title}</h6>
        </Card.Header>
      )}
      <Card.Body>
        <div style={{ height: `${height}px` }}>
          {renderChart()}
        </div>
      </Card.Body>
    </Card>
  )
}

export default ReportChart
