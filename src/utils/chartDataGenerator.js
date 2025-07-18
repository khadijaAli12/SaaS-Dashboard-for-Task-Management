// Chart Data Generator Utility
export const generateChartData = (type, dateRange = '7d') => {
    const getDataPoints = (range) => {
      switch (range) {
        case '1d': return 24
        case '7d': return 7
        case '30d': return 30
        case '90d': return 90
        case '1y': return 12
        default: return 7
      }
    }
  
    const dataPoints = getDataPoints(dateRange)
  
    switch (type) {
      case 'line':
      case 'bar':
      case 'area':
        return Array.from({ length: dataPoints }, (_, i) => ({
          name: `Point ${i + 1}`,
          value: Math.floor(Math.random() * 1000) + 100,
          trend: Math.random() > 0.5 ? 'up' : 'down'
        }))
  
      case 'pie':
        return [
          { name: 'Desktop', value: 45, color: '#667eea' },
          { name: 'Mobile', value: 35, color: '#4facfe' },
          { name: 'Tablet', value: 20, color: '#fa709a' }
        ]
  
      case 'funnel':
        return [
          { name: 'Visitors', value: 1000, color: '#667eea' },
          { name: 'Leads', value: 500, color: '#4facfe' },
          { name: 'Customers', value: 100, color: '#fa709a' }
        ]
  
      case 'heatmap':
        return Array.from({ length: 7 }, (_, week) =>
          Array.from({ length: 24 }, (_, hour) => ({
            value: Math.floor(Math.random() * 100),
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
          }))
        )
  
      default:
        return []
    }
  }
  
  export const chartTemplates = {
    revenue: {
      title: 'Revenue Analytics',
      type: 'line',
      category: 'revenue',
      config: {
        color: '#667eea',
        gradient: true,
        showGrid: true,
        showLegend: true
      }
    },
    sales: {
      title: 'Sales Performance',
      type: 'bar',
      category: 'sales',
      config: {
        color: '#4facfe',
        showGrid: true,
        showLegend: true
      }
    },
    traffic: {
      title: 'Traffic Sources',
      type: 'pie',
      category: 'traffic',
      config: {
        showLegend: true,
        showLabels: true
      }
    }
  }
  