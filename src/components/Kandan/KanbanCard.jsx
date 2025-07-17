import React from 'react'
import { Card, Badge } from 'react-bootstrap'

const KanbanCard = ({ task, index, onDragStart, onDragEnd }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'danger'
      case 'Medium': return 'warning'
      case 'Low': return 'success'
      default: return 'secondary'
    }
  }

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      taskId: task.id,
      sourceIndex: index
    }))
    e.dataTransfer.effectAllowed = 'move'
    onDragStart && onDragStart(task, index)
  }

  const handleDragEnd = (e) => {
    onDragEnd && onDragEnd()
  }

  return (
    <Card 
      className="kanban-card mb-2"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="card-title mb-0">{task.title}</h6>
          <Badge bg={getPriorityColor(task.priority)} className="priority-badge">
            {task.priority}
          </Badge>
        </div>
        <p className="card-text text-muted small">{task.description}</p>
      </Card.Body>
    </Card>
  )
}

export default KanbanCard
