import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Modal, Form, Badge, Dropdown } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Filter, 
  Search, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Clock, 
  User, 
  Calendar,
  Tag,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react'
import KanbanColumn from './KanbanColumn'
import KanbanCard from './KanbanCard'
import toast from 'react-hot-toast'

const KanbanBoard = ({ initialData, onDataChange }) => {
  const [data, setData] = useState(initialData)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showColumnModal, setShowColumnModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)
  const [draggedItem, setDraggedItem] = useState(null)
  const [draggedOver, setDraggedOver] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignee: '',
    dueDate: '',
    tags: []
  })
  const [columnFormData, setColumnFormData] = useState({
    title: '',
    limit: 10,
    color: '#667eea'
  })

  const priorities = [
    { value: 'Low', color: '#4facfe', icon: CheckCircle },
    { value: 'Medium', color: '#fa709a', icon: AlertCircle },
    { value: 'High', color: '#f5576c', icon: XCircle }
  ]

  const columnColors = [
    '#667eea', '#4facfe', '#fa709a', '#f5576c', '#fee140', '#a8edea', '#d299c2', '#89f7fe'
  ]

  // Update parent component when data changes
  useEffect(() => {
    onDataChange && onDataChange(data)
  }, [data, onDataChange])

  // Handle drag and drop
  const handleDragStart = (e, taskId, sourceColumnId) => {
    setDraggedItem({ taskId, sourceColumnId })
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId, sourceColumnId }))
  }

  const handleDragOver = (e, columnId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDraggedOver(columnId)
  }

  const handleDragLeave = () => {
    setDraggedOver(null)
  }

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault()
    setDraggedOver(null)
    
    if (!draggedItem) return

    const { taskId, sourceColumnId } = draggedItem
    
    if (sourceColumnId === targetColumnId) {
      setDraggedItem(null)
      return
    }

    // Update data
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [sourceColumnId]: {
          ...data.columns[sourceColumnId],
          taskIds: data.columns[sourceColumnId].taskIds.filter(id => id !== taskId)
        },
        [targetColumnId]: {
          ...data.columns[targetColumnId],
          taskIds: [...data.columns[targetColumnId].taskIds, taskId]
        }
      }
    }

    setData(newData)
    setDraggedItem(null)
    toast.success(`Task moved to ${data.columns[targetColumnId].title}`)
  }

  // Task management functions
  const handleAddTask = (columnId) => {
    setSelectedColumn(columnId)
    setSelectedTask(null)
    setTaskFormData({
      title: '',
      description: '',
      priority: 'Medium',
      assignee: '',
      dueDate: '',
      tags: []
    })
    setShowTaskModal(true)
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
    setTaskFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      assignee: task.assignee || '',
      dueDate: task.dueDate || '',
      tags: task.tags || []
    })
    setShowTaskModal(true)
  }

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      // Find and remove task from its column
      const newData = { ...data }
      Object.keys(newData.columns).forEach(columnId => {
        newData.columns[columnId].taskIds = newData.columns[columnId].taskIds.filter(id => id !== taskId)
      })
      delete newData.tasks[taskId]
      
      setData(newData)
      toast.success('Task deleted successfully')
    }
  }

  const handleSaveTask = (e) => {
    e.preventDefault()
    
    if (selectedTask) {
      // Update existing task
      const newData = {
        ...data,
        tasks: {
          ...data.tasks,
          [selectedTask.id]: {
            ...selectedTask,
            ...taskFormData,
            updatedAt: new Date().toISOString()
          }
        }
      }
      setData(newData)
      toast.success('Task updated successfully')
    } else {
      // Create new task
      const newTaskId = `task-${Date.now()}`
      const newTask = {
        id: newTaskId,
        ...taskFormData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const newData = {
        ...data,
        tasks: {
          ...data.tasks,
          [newTaskId]: newTask
        },
        columns: {
          ...data.columns,
          [selectedColumn]: {
            ...data.columns[selectedColumn],
            taskIds: [...data.columns[selectedColumn].taskIds, newTaskId]
          }
        }
      }
      
      setData(newData)
      toast.success('Task created successfully')
    }
    
    setShowTaskModal(false)
  }

  // Column management functions
  const handleAddColumn = () => {
    setSelectedColumn(null)
    setColumnFormData({
      title: '',
      limit: 10,
      color: '#667eea'
    })
    setShowColumnModal(true)
  }

  const handleEditColumn = (columnId) => {
    const column = data.columns[columnId]
    setSelectedColumn(columnId)
    setColumnFormData({
      title: column.title,
      limit: column.limit || 10,
      color: column.color || '#667eea'
    })
    setShowColumnModal(true)
  }

  const handleDeleteColumn = (columnId) => {
    if (window.confirm('Are you sure you want to delete this column? All tasks in this column will be deleted.')) {
      const newData = { ...data }
      
      // Delete all tasks in the column
      data.columns[columnId].taskIds.forEach(taskId => {
        delete newData.tasks[taskId]
      })
      
      // Delete the column
      delete newData.columns[columnId]
      newData.columnOrder = newData.columnOrder.filter(id => id !== columnId)
      
      setData(newData)
      toast.success('Column deleted successfully')
    }
  }

  const handleSaveColumn = (e) => {
    e.preventDefault()
    
    if (selectedColumn) {
      // Update existing column
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [selectedColumn]: {
            ...data.columns[selectedColumn],
            title: columnFormData.title,
            limit: columnFormData.limit,
            color: columnFormData.color
          }
        }
      }
      setData(newData)
      toast.success('Column updated successfully')
    } else {
      // Create new column
      const newColumnId = `column-${Date.now()}`
      const newColumn = {
        id: newColumnId,
        title: columnFormData.title,
        taskIds: [],
        limit: columnFormData.limit,
        color: columnFormData.color
      }
      
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumnId]: newColumn
        },
        columnOrder: [...data.columnOrder, newColumnId]
      }
      
      setData(newData)
      toast.success('Column created successfully')
    }
    
    setShowColumnModal(false)
  }

  // Filter functions
  const getFilteredTasks = (columnTasks) => {
    return columnTasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPriority = filterPriority === '' || task.priority === filterPriority
      return matchesSearch && matchesPriority
    })
  }

  const getColumnStats = (columnId) => {
    const tasks = data.columns[columnId].taskIds.map(taskId => data.tasks[taskId])
    const highPriority = tasks.filter(task => task.priority === 'High').length
    const overdue = tasks.filter(task => {
      if (!task.dueDate) return false
      return new Date(task.dueDate) < new Date()
    }).length
    
    return { total: tasks.length, highPriority, overdue }
  }

  return (
    <div className="kanban-board-container">
      {/* Kanban Header */}
      <div className="kanban-header">
        <div className="kanban-title-section">
          <h3 className="kanban-title">Project Board</h3>
          <div className="kanban-stats">
            <Badge bg="primary" className="me-2">
              {Object.keys(data.tasks).length} Total Tasks
            </Badge>
            <Badge bg="success" className="me-2">
              {data.columns['done']?.taskIds.length || 0} Completed
            </Badge>
            <Badge bg="warning">
              {data.columns['in-progress']?.taskIds.length || 0} In Progress
            </Badge>
          </div>
        </div>
        
        <div className="kanban-controls">
          <div className="kanban-filters">
            <div className="search-container">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="priority-filter"
            >
              <option value="">All Priorities</option>
              {priorities.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.value}
                </option>
              ))}
            </select>
          </div>
          
          <div className="kanban-actions">
            <Button variant="outline-primary" onClick={handleAddColumn}>
              <Plus size={16} className="me-2" />
              Add Column
            </Button>
            <Button variant="outline-secondary" onClick={() => window.location.reload()}>
              <RefreshCw size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="kanban-board-content">
        <AnimatePresence>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId]
            const columnTasks = column.taskIds.map(taskId => data.tasks[taskId])
            const filteredTasks = getFilteredTasks(columnTasks)
            const stats = getColumnStats(columnId)
            
            return (
              <motion.div
                key={columnId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="kanban-column-wrapper"
              >
                <KanbanColumn
                  column={column}
                  tasks={filteredTasks}
                  stats={stats}
                  isDraggedOver={draggedOver === columnId}
                  onDragOver={(e) => handleDragOver(e, columnId)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, columnId)}
                  onAddTask={() => handleAddTask(columnId)}
                  onEditColumn={() => handleEditColumn(columnId)}
                  onDeleteColumn={() => handleDeleteColumn(columnId)}
                  onTaskEdit={handleEditTask}
                  onTaskDelete={handleDeleteTask}
                  onDragStart={handleDragStart}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Task Modal */}
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)} size="lg" centered>
        <Modal.Header closeButton className="task-modal-header">
          <Modal.Title>
            {selectedTask ? (
              <>
                <Edit3 size={20} className="me-2" />
                Edit Task
              </>
            ) : (
              <>
                <Plus size={20} className="me-2" />
                Create New Task
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleSaveTask}>
          <Modal.Body className="task-modal-body">
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <Tag size={16} className="me-2" />
                    Task Title *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={taskFormData.title}
                    onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
                    placeholder="Enter task title"
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <AlertCircle size={16} className="me-2" />
                    Priority
                  </Form.Label>
                  <Form.Select
                    value={taskFormData.priority}
                    onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })}
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.value}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>
                <Edit3 size={16} className="me-2" />
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={taskFormData.description}
                onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
                placeholder="Enter task description"
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <User size={16} className="me-2" />
                    Assignee
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={taskFormData.assignee}
                    onChange={(e) => setTaskFormData({ ...taskFormData, assignee: e.target.value })}
                    placeholder="Enter assignee name"
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <Calendar size={16} className="me-2" />
                    Due Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={taskFormData.dueDate}
                    onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowTaskModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {selectedTask ? 'Update Task' : 'Create Task'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Column Modal */}
      <Modal show={showColumnModal} onHide={() => setShowColumnModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedColumn ? 'Edit Column' : 'Add New Column'}
          </Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleSaveColumn}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Column Title *</Form.Label>
              <Form.Control
                type="text"
                value={columnFormData.title}
                onChange={(e) => setColumnFormData({ ...columnFormData, title: e.target.value })}
                placeholder="Enter column title"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Task Limit</Form.Label>
              <Form.Control
                type="number"
                value={columnFormData.limit}
                onChange={(e) => setColumnFormData({ ...columnFormData, limit: parseInt(e.target.value) })}
                min="1"
                max="50"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Column Color</Form.Label>
              <div className="color-picker-grid">
                {columnColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`color-picker-option ${columnFormData.color === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setColumnFormData({ ...columnFormData, color })}
                  />
                ))}
              </div>
            </Form.Group>
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowColumnModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {selectedColumn ? 'Update Column' : 'Create Column'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default KanbanBoard
