import React, { useState } from 'react'
import { Container, Button, Modal, Form, Badge } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MoreHorizontal, Clock, User, Flag } from 'lucide-react'
import { kanbanData } from '../data/mockData'
import toast from 'react-hot-toast'

const Kanban = () => {
  const [data, setData] = useState(kanbanData)
  const [showModal, setShowModal] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)
  const [draggedOver, setDraggedOver] = useState(null)

  const handleDragStart = (e, taskId) => {
    setDraggedItem(taskId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.outerHTML)
  }

  const handleDragOver = (e, columnId) => {
    e.preventDefault()
    setDraggedOver(columnId)
  }

  const handleDragLeave = () => {
    setDraggedOver(null)
  }

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault()
    setDraggedOver(null)
    
    if (!draggedItem) return

    const sourceColumn = Object.values(data.columns).find(col => 
      col.taskIds.includes(draggedItem)
    )
    
    if (!sourceColumn || sourceColumn.id === targetColumnId) return

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          taskIds: sourceColumn.taskIds.filter(id => id !== draggedItem)
        },
        [targetColumnId]: {
          ...data.columns[targetColumnId],
          taskIds: [...data.columns[targetColumnId].taskIds, draggedItem]
        }
      }
    }

    setData(newData)
    setDraggedItem(null)
    toast.success('Task moved successfully!')
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return { bg: 'danger', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }
      case 'Medium': return { bg: 'warning', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }
      case 'Low': return { bg: 'success', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
      default: return { bg: 'secondary', gradient: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)' }
    }
  }

  const TaskCard = ({ task, index }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="kanban-card hover-lift"
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
      style={{
        cursor: draggedItem === task.id ? 'grabbing' : 'grab',
        opacity: draggedItem === task.id ? 0.5 : 1
      }}
    >
      <div className="kanban-card-header">
        <h6 className="kanban-card-title">{task.title}</h6>
        <div className="d-flex align-items-center gap-2">
          <Badge 
            className={`priority-badge ${getPriorityColor(task.priority).bg.toLowerCase()}`}
            style={{ background: getPriorityColor(task.priority).gradient }}
          >
            <Flag size={12} className="me-1" />
            {task.priority}
          </Badge>
          <Button variant="link" size="sm" className="p-0">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </div>
      <p className="kanban-card-description">{task.description}</p>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center gap-2">
          <Clock size={14} style={{ color: 'var(--text-muted)' }} />
          <small style={{ color: 'var(--text-muted)' }}>2 days left</small>
        </div>
        <div className="d-flex align-items-center gap-1">
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}
          >
            JD
          </div>
          <User size={14} style={{ color: 'var(--text-muted)' }} />
        </div>
      </div>
    </motion.div>
  )

  const KanbanColumn = ({ column, tasks }) => (
    <motion.div
      className="kanban-column"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="kanban-column-header">
        <h5 className="kanban-column-title">{column.title}</h5>
        <div className="d-flex align-items-center gap-2">
          <span className="kanban-column-count">{tasks.length}</span>
          <Button variant="link" size="sm" className="p-0">
            <Plus size={16} />
          </Button>
        </div>
      </div>
      <div
        className={`kanban-column-content ${draggedOver === column.id ? 'drag-over' : ''}`}
        onDragOver={(e) => handleDragOver(e, column.id)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, column.id)}
      >
        <AnimatePresence>
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )

  return (
    <Container fluid className="kanban-page">
      <motion.div 
        className="page-header mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">Project Board</h1>
        <p className="page-description">
          Manage your tasks with intuitive drag-and-drop functionality
        </p>
      </motion.div>

      <div className="kanban-board">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId]
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId])
          return (
            <KanbanColumn key={column.id} column={column} tasks={tasks} />
          )
        })}
      </div>
    </Container>
  )
}

export default Kanban
