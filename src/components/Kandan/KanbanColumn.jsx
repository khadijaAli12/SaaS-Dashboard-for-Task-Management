import React from 'react'
import { Card, Button, Badge, Dropdown } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  Clock,
  TrendingUp
} from 'lucide-react'
import KanbanCard from './KanbanCard'

const KanbanColumn = ({ 
  column, 
  tasks, 
  stats,
  isDraggedOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onAddTask,
  onEditColumn,
  onDeleteColumn,
  onTaskEdit,
  onTaskDelete,
  onDragStart
}) => {
  const getColumnHeaderColor = () => {
    return column.color || '#667eea'
  }

  const isOverLimit = () => {
    return column.limit && tasks.length >= column.limit
  }

  return (
    <motion.div
      layout
      className={`kanban-column ${isDraggedOver ? 'drag-over' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <Card className="kanban-column-card">
        {/* Column Header */}
        <Card.Header 
          className="kanban-column-header"
          style={{ borderTop: `4px solid ${getColumnHeaderColor()}` }}
        >
          <div className="column-header-content">
            <div className="column-title-section">
              <h6 className="column-title">{column.title}</h6>
              <div className="column-stats">
                <Badge bg="secondary" className="task-count">
                  {tasks.length}
                  {column.limit && ` / ${column.limit}`}
                </Badge>
                {stats.highPriority > 0 && (
                  <Badge bg="danger" className="ms-1">
                    <AlertTriangle size={12} className="me-1" />
                    {stats.highPriority}
                  </Badge>
                )}
                {stats.overdue > 0 && (
                  <Badge bg="warning" className="ms-1">
                    <Clock size={12} className="me-1" />
                    {stats.overdue}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="column-actions">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={onAddTask}
                disabled={isOverLimit()}
                className="add-task-btn"
              >
                <Plus size={14} />
              </Button>
              
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="column-menu-btn">
                  <MoreVertical size={16} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onEditColumn}>
                    <Edit3 size={14} className="me-2" />
                    Edit Column
                  </Dropdown.Item>
                  <Dropdown.Item onClick={onDeleteColumn} className="text-danger">
                    <Trash2 size={14} className="me-2" />
                    Delete Column
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          
          {/* Progress Bar */}
          {column.limit && (
            <div className="column-progress">
              <div 
                className={`progress-bar ${isOverLimit() ? 'over-limit' : ''}`}
                style={{ 
                  width: `${Math.min((tasks.length / column.limit) * 100, 100)}%`,
                  backgroundColor: isOverLimit() ? '#f5576c' : getColumnHeaderColor()
                }}
              />
            </div>
          )}
        </Card.Header>
        
        {/* Column Body */}
        <Card.Body className="kanban-column-body">
          <AnimatePresence>
            {tasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="empty-column"
              >
                <div className="empty-column-content">
                  <TrendingUp size={32} className="empty-icon" />
                  <p className="empty-text">No tasks yet</p>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={onAddTask}
                    disabled={isOverLimit()}
                  >
                    <Plus size={14} className="me-2" />
                    Add Task
                  </Button>
                </div>
              </motion.div>
            ) : (
              tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <KanbanCard
                    task={task}
                    index={index}
                    columnId={column.id}
                    onEdit={() => onTaskEdit(task)}
                    onDelete={() => onTaskDelete(task.id)}
                    onDragStart={(e) => onDragStart(e, task.id, column.id)}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default KanbanColumn
