import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Modal, Button, Form } from 'react-bootstrap'

const CalendarComponent = ({ events, onEventAdd, onEventClick }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [newEvent, setNewEvent] = useState({ title: '', description: '' })

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr)
    setShowModal(true)
  }

  const handleEventSubmit = (e) => {
    e.preventDefault()
    if (newEvent.title && selectedDate) {
      onEventAdd({
        id: Date.now(),
        title: newEvent.title,
        date: selectedDate,
        description: newEvent.description,
        color: '#007bff'
      })
      setNewEvent({ title: '', description: '' })
      setShowModal(false)
    }
  }

  return (
    <>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={onEventClick}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
        />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEventSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                value={selectedDate || ''}
                readOnly
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Event
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default CalendarComponent
