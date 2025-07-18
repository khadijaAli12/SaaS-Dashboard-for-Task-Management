import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { 
  Kanban as KanbanIcon, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  Target,
  Zap
} from 'lucide-react'
import KanbanBoard from '../components/Kandan/KanbanBoard'
import { kanbanData } from '../data/mockData'
import toast from 'react-hot-toast'

const Kanban = () => {
  const [boardData, setBoardData] = useState(kanbanData)
  const [boardStats, setBoardStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    todoTasks: 0,
    overdueTask: 0
  })

  // Calculate board statistics
  useEffect(() => {
    const calculateStats = () => {
      const allTasks = Object.values(boardData.tasks)
      const completedTasks = boardData.columns['done']?.taskIds.length || 0
      const inProgressTasks = boardData.columns['in-progress']?.taskIds.length || 0
      const todoTasks = boardData.columns['todo']?.taskIds.length || 0
      
      const overdueTask = allTasks.filter(task => {
        if (!task.dueDate) return false
        return new Date(task.dueDate) < new Date()
      }).length

      setBoardStats({
        totalTasks: allTasks.length,
        completedTasks,
        inProgressTasks,
        todoTasks,
        overdueTask
      })
    }

    calculateStats()
  }, [boardData])

  const handleDataChange = (newData) => {
    setBoardData(newData)
  }

  const resetBoard = () => {
    if (window.confirm('Are you sure you want to reset the board? This will restore the default tasks.')) {
      setBoardData(kanbanData)
      toast.success('Board reset successfully!')
    }
  }

  const StatCard = ({ icon: Icon, title, value, color, description, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="kanban-stat-card">
        <Card.Body>
          <div className="stat-kanban-content">
            <div className="stat-kanban-icon" style={{ backgroundColor: color }}>
              <Icon size={24} />
            </div>
            <div className="stat-kanban-info">
              <div className="stat-kanban-header">
                <div className="stat-kanban-value">{value}</div>
                {trend && (
                  <div className={`stat-trend ${trend > 0 ? 'positive' : 'negative'}`}>
                    <TrendingUp size={16} />
                    {trend > 0 ? '+' : ''}{trend}%
                  </div>
                )}
              </div>
              <div className="stat-kanban-title">{title}</div>
              <div className="stat-kanban-desc">{description}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )

  const completionRate = boardStats.totalTasks > 0 
    ? Math.round((boardStats.completedTasks / boardStats.totalTasks) * 100) 
    : 0

  return (
    <Container fluid className="kanban-page">
      <motion.div 
        className="page-header mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="kanban-page-header">
          <div className="kanban-title-section">
            <h1 className="page-title">
              <KanbanIcon size={32} className="me-3" />
              Kanban Board
            </h1>
            <p className="page-description">
              Manage your tasks with intuitive drag-and-drop functionality and real-time collaboration
            </p>
          </div>
          
          <div className="kanban-header-actions">
            <Button variant="outline-secondary" onClick={resetBoard}>
              <Zap size={16} className="me-2" />
              Reset Board
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Kanban Statistics */}
      <motion.div 
        className="kanban-stats-section mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Row>
          <Col lg={3} md={6} className="mb-3">
            <StatCard
              icon={Target}
              title="Total Tasks"
              value={boardStats.totalTasks}
              color="#667eea"
              description="All tasks in board"
              trend={5}
            />
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <StatCard
              icon={CheckCircle}
              title="Completed"
              value={boardStats.completedTasks}
              color="#4facfe"
              description={`${completionRate}% completion rate`}
              trend={12}
            />
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <StatCard
              icon={Clock}
              title="In Progress"
              value={boardStats.inProgressTasks}
              color="#fa709a"
              description="Currently active tasks"
              trend={-2}
            />
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <StatCard
              icon={AlertCircle}
              title="To Do"
              value={boardStats.todoTasks}
              color="#fee140"
              description="Pending tasks"
              trend={8}
            />
          </Col>
        </Row>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-4"
      >
        <Card className="progress-overview-card">
          <Card.Body>
            <div className="progress-overview-header">
              <h5 className="progress-title">
                <BarChart3 size={20} className="me-2" />
                Project Progress
              </h5>
              <div className="progress-stats">
                <span className="completion-rate">{completionRate}% Complete</span>
                {boardStats.overdueTask > 0 && (
                  <Badge bg="danger" className="ms-2">
                    {boardStats.overdueTask} Overdue
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="progress-bar-container">
              <div className="progress-bar-track">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <div className="progress-labels">
                <span className="progress-label">
                  <Users size={14} className="me-1" />
                  {boardStats.totalTasks} Tasks
                </span>
                <span className="progress-label">
                  <CheckCircle size={14} className="me-1" />
                  {boardStats.completedTasks} Done
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <KanbanBoard 
          initialData={boardData}
          onDataChange={handleDataChange}
        />
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-4"
      >
        <Alert variant="info" className="kanban-tips">
          <Target size={20} className="me-2" />
          <strong>Pro Tips:</strong> Drag tasks between columns to update their status. 
          Use the search and filter options to find specific tasks quickly. 
          Click the + button to add new tasks to any column.
        </Alert>
      </motion.div>
    </Container>
  )
}

export default Kanban
