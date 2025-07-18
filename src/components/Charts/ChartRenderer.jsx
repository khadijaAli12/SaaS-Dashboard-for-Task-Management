import React, { useMemo } from 'react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  FunnelChart,
  Funnel
} from 'recharts'
import { Spinner } from 'react-bootstrap'

const ChartRenderer = ({ chart, isLoading, showControls }) => {
  const chartConfig = useMemo(() => {
    const config = {
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
      ...chart.config
    }
    return config
  }, [chart.config])

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="chart-loading">
          <Spinner animation="border" variant="primary" />
          <p>Loading chart data...</p>
        </div>
      )
    }

    switch (chart.type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart.data} margin={chartConfig.margin}>
              {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" opacity={0.3} />}
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow)'
                }}
              />
              {chartConfig.showLegend && <Legend />}
              {chartConfig.gradient ? (
                <defs>
                  <linearGradient id={`gradient-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartConfig.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartConfig.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
              ) : null}
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={chartConfig.color}
                strokeWidth={3}
                dot={{ fill: chartConfig.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: chartConfig.color }}
                fill={chartConfig.gradient ? `url(#gradient-${chart.id})` : 'none'}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart.data} margin={chartConfig.margin}>
              {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" opacity={0.3} />}
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow)'
                }}
              />
              {chartConfig.showLegend && <Legend />}
              <Bar 
                dataKey="value" 
                fill={chartConfig.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                innerRadius={chartConfig.innerRadius || 0}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={chartConfig.showLabels}
              >
                {chart.data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color || chartConfig.color} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow)'
                }}
              />
              {chartConfig.showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        )

      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chart.data} margin={chartConfig.margin}>
              <defs>
                <linearGradient id={`areaGradient-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.color} stopOpacity={chartConfig.fillOpacity || 0.3}/>
                  <stop offset="95%" stopColor={chartConfig.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" opacity={0.3} />}
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow)'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartConfig.color}
                strokeWidth={2}
                fill={`url(#areaGradient-${chart.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      case 'funnel':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Funnel
                dataKey="value"
                data={chart.data}
                isAnimationActive
                labelLine={false}
                label={chartConfig.showLabels}
                fill={chartConfig.color}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow)'
                }}
              />
            </FunnelChart>
          </ResponsiveContainer>
        )

      case 'heatmap':
        return (
          <div className="heatmap-container">
            <div className="heatmap-grid">
              {chart.data.map((row, rowIndex) => (
                <div key={rowIndex} className="heatmap-row">
                  {row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="heatmap-cell"
                      style={{
                        backgroundColor: cell.color,
                        opacity: cell.value / 100
                      }}
                      title={`${cell.value}%`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="chart-error">
            <p>Unsupported chart type: {chart.type}</p>
          </div>
        )
    }
  }

  return (
    <div className="chart-renderer">
      {renderChart()}
      {showControls && (
        <div className="chart-overlay-controls">
          <button className="chart-overlay-btn" title="Fullscreen">
            <Maximize2 size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ChartRenderer
