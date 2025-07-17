import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import KanbanColumn from './KanbanColumn'

const KanbanBoard = ({ initialData }) => {
  const [data, setData] = useState(initialData)
  const [draggedOver, setDraggedOver] = useState(null)

  const handleDrop = (dragData, targetColumnId) => {
    const { taskId, sourceIndex } = dragData
    
    // Find source column
    const sourceColumn = Object.values(data.columns).find(col => 
      col.taskIds.includes(taskId)
    )
    
    if (!sourceColumn) return

    // If dropping in same column, do nothing
    if (sourceColumn.id === targetColumnId) {
      setDraggedOver(null)
      return
    }

    // Remove task from source column
    const newSourceTaskIds = sourceColumn.taskIds.filter(id => id !== taskId)
    
    // Add task to target column
    const targetColumn = data.columns[targetColumnId]
    const newTargetTaskIds = [...targetColumn.taskIds, taskId]

    // Update state
    setData({
      ...data,
      columns: {
        ...data.columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          taskIds: newSourceTaskIds
        },
        [targetColumnId]: {
          ...targetColumn,
          taskIds: newTargetTaskIds
        }
      }
    })

    setDraggedOver(null)
  }

  const handleDragOver = (columnId) => {
    setDraggedOver(columnId)
  }

  const handleDragLeave = () => {
    setDraggedOver(null)
  }

  return (
    <Container fluid>
      <Row>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId]
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId])

          return (
            <Col key={column.id} md={4} className="mb-4">
              <KanbanColumn 
                column={column} 
                tasks={tasks}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              />
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default KanbanBoard
