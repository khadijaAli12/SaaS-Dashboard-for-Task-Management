import React, { useState } from 'react'
import { Card, Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { 
  Edit3, 
  Trash2, 
  Clock, 
  User, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Flag
} from 'lucide-react'

const KanbanCard = ({ 
  task, 
  index, 
  columnId,
  onEdit, 
  onDelete, 
  onDragStart 
}) => {
  const [isDragging, setIsDragging] = useState(false)

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'High':
        return { color: '#f5576c', icon: XCircle, bg: 'danger' }
      case 'Medium':
        return { color: '#fa709a', icon: AlertTriangle, bg: 'warning' }
      case 'Low':
        return { color: '#4facfe', icon: CheckCircle, bg: 'success' }
      default:
        return { color: '#6c757d', icon: Flag, bg: 'secondary' }
    }
  }

  const isOverdue = () => {
    if (!task.dueDate) return false
    return new Date(task.dueDate) < new Date()
  }

  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleDragStart = (e) => {
    setIsDragging(true)
    onDragStart(e)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const priorityConfig = getPriorityConfig(task.priority)
  const PriorityIcon = priorityConfig.icon

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 1.05, rotate: 2 }}
      className={`kanban-card-wrapper ${isDragging ? 'dragging' : ''}`}
    >
      <Card
        className="kanban-card"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Card.Body className="kanban-card-body">
          {/* Card Header */}
          <div className="kanban-card-header">
            <div className="card-priority-section">
              <Badge 
                bg={priorityConfig.bg}
                className="priority-badge"
              >
                <PriorityIcon size={12} className="me-1" />
                {task.priority}
              </Badge>
              {isOverdue() && (
                <Badge bg="danger" className="ms-1">
                  <Clock size={12} className="me-1" />
                  Overdue
                </Badge>
              )}
            </div>
            
            <div className="card-actions">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Edit Task</Tooltip>}
              >
                <Button
                  variant="link"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit()
                  }}
                  className="card-action-btn edit-btn"
                >
                  <Edit3 size={14} />
                </Button>
              </OverlayTrigger>
              
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete Task</Tooltip>}
              >
                <Button
                  variant="link"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                  }}
                  className="card-action-btn delete-btn"
                >
                  <Trash2 size={14} />
                </Button>
              </OverlayTrigger>
            </div>
          </div>
          
          {/* Card Content */}
          <div className="kanban-card-content">
            <h6 className="card-title">{task.title}</h6>
            {task.description && (
              <p className="card-description">
                {task.description.length > 80 
                  ? `${task.description.substring(0, 80)}...` 
                  : task.description
                }
              </p>
            )}
          </div>
          
          {/* Card Footer */}
          <div className="kanban-card-footer">
            <div className="card-meta">
              {task.assignee && (
                <div className="assignee-info">
                  <User size={12} className="me-1" />
                  <span className="assignee-name">{task.assignee}</span>
                </div>
              )}
              
              {task.dueDate && (
                <div className={`due-date ${isOverdue() ? 'overdue' : ''}`}>
                  <Calendar size={12} className="me-1" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}
            </div>
            
            {task.tags && task.tags.length > 0 && (
              <div className="card-tags">
                {task.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} bg="light" text="dark" className="tag-badge">
                    {tag}
                  </Badge>
                ))}
                {task.tags.length > 2 && (
                  <Badge bg="light" text="dark" className="tag-badge">
                    +{task.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default KanbanCard
