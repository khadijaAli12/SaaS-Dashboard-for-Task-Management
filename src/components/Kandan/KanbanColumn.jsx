import React from 'react'
import { Card } from 'react-bootstrap'
import KanbanCard from './KanbanCard'

const KanbanColumn = ({ column, tasks, onDrop, onDragOver, onDragLeave }) => {
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    onDragOver && onDragOver(column.id)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    onDragLeave && onDragLeave()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const dragData = JSON.parse(e.dataTransfer.getData('text/plain'))
    onDrop && onDrop(dragData, column.id)
  }

  return (
    <div className="kanban-column">
      <Card>
        <Card.Header className="kanban-column-header">
          <h5 className="mb-0">{column.title}</h5>
          <small className="text-muted">{tasks.length} tasks</small>
        </Card.Header>
        <Card.Body
          className="kanban-column-content"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {tasks.map((task, index) => (
            <KanbanCard key={task.id} task={task} index={index} />
          ))}
        </Card.Body>
      </Card>
    </div>
  )
}

export default KanbanColumn
