import React from 'react'
import { Card, Button, Form, ButtonGroup, Badge } from 'react-bootstrap'
import { 
  Calendar, 
  Filter, 
  RefreshCw, 
  Grid, 
  List,
  Play,
  Pause
} from 'lucide-react'

const ChartControls = ({ 
  dateRange, 
  onDateRangeChange, 
  chartFilter, 
  onChartFilterChange, 
  categories, 
  viewMode, 
  onViewModeChange, 
  onRefresh, 
  isAutoRefresh, 
  onAutoRefreshToggle 
}) => {
  const dateRangeOptions = [
    { value: '1d', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ]

  return (
    <Card className="chart-controls-card">
      <Card.Body>
        <div className="chart-controls-content">
          <div className="controls-left">
            <div className="control-group">
              <Calendar size={16} className="control-icon" />
              <Form.Label className="control-label">Time Range</Form.Label>
              <ButtonGroup>
                {dateRangeOptions.map(option => (
                  <Button
                    key={option.value}
                    variant={dateRange === option.value ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => onDateRangeChange(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            
            <div className="control-group">
              <Filter size={16} className="control-icon" />
              <Form.Label className="control-label">Category</Form.Label>
              <Form.Select
                value={chartFilter}
                onChange={(e) => onChartFilterChange(e.target.value)}
                className="category-filter"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
          
          <div className="controls-right">
            <div className="control-group">
              <Form.Label className="control-label">View</Form.Label>
              <ButtonGroup>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => onViewModeChange('grid')}
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => onViewModeChange('list')}
                >
                  <List size={16} />
                </Button>
              </ButtonGroup>
            </div>
            
            <div className="control-group">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={onRefresh}
                className="refresh-btn"
              >
                <RefreshCw size={16} className="me-2" />
                Refresh
              </Button>
              
              <Button
                variant={isAutoRefresh ? 'success' : 'outline-secondary'}
                size="sm"
                onClick={() => onAutoRefreshToggle(!isAutoRefresh)}
                className="auto-refresh-btn"
              >
                {isAutoRefresh ? <Pause size={16} /> : <Play size={16} />}
                <span className="ms-2">Auto</span>
              </Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ChartControls
