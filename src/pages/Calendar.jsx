import React, { useState } from 'react'
import { Container, Card, Button, Modal, Form, Row, Col, Badge } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Plus, Edit, Trash2, Clock, MapPin } from 'lucide-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { calendarEvents } from '../data/mockData'
import toast from 'react-hot-toast'

const Calendar = () => {
  const [events, setEvents] = useState(calendarEvents)
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [viewType, setViewType] = useState('dayGridMonth')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    color: '#667eea',
    location: '',
    type: 'meeting'
  })

  const eventTypes = [
    { value: 'meeting', label: 'Meeting', color: '#667eea' },
    { value: 'deadline', label: 'Deadline', color: '#f5576c' },
    { value: 'reminder', label: 'Reminder', color: '#fa709a' },
    { value: 'event', label: 'Event', color: '#4facfe' }
  ]

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr)
    setSelectedEvent(null)
    setFormData({
      title: '',
      description: '',
      start: arg.dateStr,
      end: arg.dateStr,
      color: '#667eea',
      location: '',
      type: 'meeting'
    })
    setShowModal(true)
  }

  const handleEventClick = (clickInfo) => {
    const event = events.find(e => e.id === parseInt(clickInfo.event.id))
    setSelectedEvent(event)
    setFormData({
      title: event.title,
      description: event.description || '',
      start: event.date,
      end: event.date,
      color: event.color,
      location: event.location || '',
      type: event.type || 'meeting'
    })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...formData }
          : event
      ))
      toast.success('Event updated successfully!')
    } else {
      // Create new event
      const newEvent = {
        id: Date.now(),
        title: formData.title,
        date: formData.start,
        color: formData.color,
        description: formData.description,
        location: formData.location,
        type: formData.type
      }
      setEvents([...events, newEvent])
      toast.success('Event created successfully!')
    }
    
    setShowModal(false)
    resetForm()
  }

  const handleDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id))
      toast.success('Event deleted successfully!')
      setShowModal(false)
      resetForm()
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      start: '',
      end: '',
      color: '#667eea',
      location: '',
      type: 'meeting'
    })
    setSelectedEvent(null)
    setSelectedDate(null)
  }

  const getEventTypeColor = (type) => {
    const eventType = eventTypes.find(t => t.value === type)
    return eventType ? eventType.color : '#667eea'
  }

  return (
    <Container fluid className="calendar-page">
      <motion.div 
        className="page-header mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">Calendar</h1>
        <p className="page-description">
          Manage your events and schedule with an intuitive calendar interface
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="calendar-container">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <CalendarIcon size={24} style={{ color: 'var(--primary-color)' }} />
              <h5 className="mb-0">Schedule Overview</h5>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button
                variant={viewType === 'dayGridMonth' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setViewType('dayGridMonth')}
              >
                Month
              </Button>
              <Button
                variant={viewType === 'timeGridWeek' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setViewType('timeGridWeek')}
              >
                Week
              </Button>
              <Button
                variant={viewType === 'timeGridDay' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setViewType('timeGridDay')}
              >
                Day
              </Button>
              <Button variant="success" onClick={() => setShowModal(true)}>
                <Plus size={16} className="me-2" />
                Add Event
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={viewType}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: ''
              }}
              events={events}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              height="auto"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              eventDisplay="block"
              eventColor="#667eea"
              eventTextColor="#ffffff"
              eventBorderColor="transparent"
              eventBackgroundColor="var(--primary-color)"
            />
          </Card.Body>
        </Card>
      </motion.div>

      {/* Add/Edit Event Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEvent ? 'Edit Event' : 'Add New Event'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter event title"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Type</Form.Label>
                  <Form.Select
                    value={formData.type}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      type: e.target.value,
                      color: getEventTypeColor(e.target.value)
                    })}
                  >
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date *</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={formData.start}
                    onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={formData.end}
                    onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter event location"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter event description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <div className="d-flex gap-2">
                {eventTypes.map(type => (
                  <Button
                    key={type.value}
                    variant={formData.color === type.color ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => setFormData({ ...formData, color: type.color })}
                    style={{ 
                      backgroundColor: type.color,
                      borderColor: type.color,
                      color: 'white'
                    }}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-between w-100">
              <div>
                {selectedEvent && (
                  <Button variant="danger" onClick={handleDelete}>
                    <Trash2 size={16} className="me-2" />
                    Delete
                  </Button>
                )}
              </div>
              <div className="d-flex gap-2">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {selectedEvent ? 'Update' : 'Create'} Event
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default Calendar
