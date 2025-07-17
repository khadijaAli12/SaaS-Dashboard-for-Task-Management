import React from 'react'
import { Card, Badge } from 'react-bootstrap'

const ActivityList = () => {
  const activities = [
    { id: 1, type: 'user', message: 'New user registered', time: '2 min ago', color: 'primary' },
    { id: 2, type: 'order', message: 'Order #1234 completed', time: '5 min ago', color: 'success' },
    { id: 3, type: 'system', message: 'System backup completed', time: '1 hour ago', color: 'info' },
    { id: 4, type: 'warning', message: 'Server maintenance required', time: '2 hours ago', color: 'warning' },
    { id: 5, type: 'update', message: 'Software update available', time: '3 hours ago', color: 'secondary' }
  ]

  return (
    <Card className="activity-card">
      <Card.Header>
        <h5 className="mb-0">Recent Activities</h5>
      </Card.Header>
      <Card.Body>
        <div className="activity-list">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <Badge bg={activity.color} className="activity-badge">
                {activity.type}
              </Badge>
              <div className="activity-content">
                <p className="mb-1">{activity.message}</p>
                <small className="text-muted">{activity.time}</small>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}

export default ActivityList
