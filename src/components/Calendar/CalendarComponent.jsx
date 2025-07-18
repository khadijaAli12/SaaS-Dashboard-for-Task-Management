import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col, Badge, InputGroup } from 'react-bootstrap'
import { motion } from 'framer-motion'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  MapPin, 
  Users, 
  Tag,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  List,
  Eye
} from 'lucide-react'

const CalendarComponent = ({ events, onEventAdd, onEventClick, onEventUpdate, onEventDelete }) => {
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
    type: 'meeting',
    attendees: ''
  })

  const eventTypes = [
    { 
      value: 'meeting', 
      label: 'Meeting', 
      color: '#667eea',
      icon: Users
    },
    { 
      value: 'deadline', 
      label: 'Deadline', 
      color: '#f5576c',
      icon: Clock
    },
    { 
      value: 'reminder', 
      label: 'Reminder', 
      color: '#fa709a',
      icon: Tag
    },
    { 
      value: 'event', 
      label: 'Event', 
      color: '#4facfe',
      icon: CalendarIcon
    }
  ]

  const handleDateClick = (arg) => {
    const clickedDate = new Date(arg.dateStr)
    const now = new Date()
    
    // Set default time to current time or next hour
    const defaultTime = now.getHours() < 23 ? now.getHours() + 1 : 9
    clickedDate.setHours(defaultTime, 0, 0, 0)
    
    setSelectedDate(arg.dateStr)
    setSelectedEvent(null)
    setFormData({
      title: '',
      description: '',
      start: clickedDate.toISOString().slice(0, 16),
      end: new Date(clickedDate.getTime() + 3600000).toISOString().slice(0, 16), // +1 hour
      color: '#667eea',
      location: '',
      type: 'meeting',
      attendees: ''
    })
    setShowModal(true)
  }

  const handleEventClick = (clickInfo) => {
    const event = events.find(e => e.id === parseInt(clickInfo.event.id))
    setSelectedEvent(event)
    setFormData({
      title: event.title,
      description: event.description || '',
      start: event.start || event.date,
      end: event.end || event.date,
      color: event.color || '#667eea',
      location: event.location || '',
      type: event.type || 'meeting',
      attendees: event.attendees || ''
    })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (selectedEvent) {
      onEventUpdate && onEventUpdate({ ...selectedEvent, ...formData })
    } else {
      const newEvent = {
        id: Date.now(),
        title: formData.title,
        start: formData.start,
        end: formData.end,
        color: formData.color,
        description: formData.description,
        location: formData.location,
        type: formData.type,
        attendees: formData.attendees,
        allDay: false
      }
      onEventAdd && onEventAdd(newEvent)
    }
    
    setShowModal(false)
    resetForm()
  }

  const handleDelete = () => {
    if (selectedEvent && onEventDelete) {
      onEventDelete(selectedEvent.id)
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
      type: 'meeting',
      attendees: ''
    })
    setSelectedEvent(null)
    setSelectedDate(null)
  }

  const getEventTypeIcon = (type) => {
    const eventType = eventTypes.find(t => t.value === type)
    return eventType ? eventType.icon : CalendarIcon
  }

  const getEventTypeColor = (type) => {
    const eventType = eventTypes.find(t => t.value === type)
    return eventType ? eventType.color : '#667eea'
  }

  const ViewButton = ({ view, icon: Icon, label, isActive }) => (
    <Button
      variant={isActive ? 'primary' : 'outline-primary'}
      size="sm"
      onClick={() => setViewType(view)}
      className="view-button"
    >
      <Icon size={16} className="me-1" />
      {label}
    </Button>
  )

  return (
    <>
      <div className="modern-calendar-container">
        {/* Calendar Header */}
        <div className="calendar-header">
          <div className="calendar-title-section">
            <h3 className="calendar-title">
              <CalendarIcon size={24} className="me-2" />
              Event Calendar
            </h3>
            <p className="calendar-subtitle">Manage your schedule efficiently</p>
          </div>
          
          <div className="calendar-controls">
            <div className="view-controls">
              <ViewButton
                view="dayGridMonth"
                icon={Grid3x3}
                label="Month"
                isActive={viewType === 'dayGridMonth'}
              />
              <ViewButton
                view="timeGridWeek"
                icon={List}
                label="Week"
                isActive={viewType === 'timeGridWeek'}
              />
              <ViewButton
                view="timeGridDay"
                icon={Eye}
                label="Day"
                isActive={viewType === 'timeGridDay'}
              />
            </div>
            
            <Button variant="success" onClick={() => setShowModal(true)} className="add-event-btn">
              <Plus size={18} className="me-2" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Calendar Body */}
        <div className="calendar-body">
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
            dayMaxEvents={3}
            weekends={true}
            eventDisplay="block"
            eventTextColor="#ffffff"
            eventBorderColor="transparent"
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
            nowIndicator={true}
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5],
              startTime: '09:00',
              endTime: '17:00'
            }}
            eventMouseEnter={(info) => {
              info.el.style.transform = 'scale(1.02)'
              info.el.style.zIndex = '999'
            }}
            eventMouseLeave={(info) => {
              info.el.style.transform = 'scale(1)'
              info.el.style.zIndex = 'auto'
            }}
          />
        </div>
      </div>

      {/* Enhanced Event Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered className="event-modal">
        <Modal.Header closeButton className="event-modal-header">
          <Modal.Title className="event-modal-title">
            {selectedEvent ? (
              <>
                <Edit3 size={20} className="me-2" />
                Edit Event
              </>
            ) : (
              <>
                <Plus size={20} className="me-2" />
                Create New Event
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="event-modal-body">
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-enhanced">
                    <Tag size={16} className="me-2" />
                    Event Title *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter event title"
                    className="form-control-enhanced"
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-enhanced">
                    <CalendarIcon size={16} className="me-2" />
                    Event Type
                  </Form.Label>
                  <Form.Select
                    value={formData.type}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      type: e.target.value,
                      color: getEventTypeColor(e.target.value)
                    })}
                    className="form-select-enhanced"
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
                  <Form.Label className="form-label-enhanced">
                    <Clock size={16} className="me-2" />
                    Start Date & Time *
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={formData.start}
                    onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                    className="form-control-enhanced"
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-enhanced">
                    <Clock size={16} className="me-2" />
                    End Date & Time
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={formData.end}
                    onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                    className="form-control-enhanced"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-enhanced">
                    <MapPin size={16} className="me-2" />
                    Location
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter event location"
                    className="form-control-enhanced"
                  />
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-enhanced">
                    <Users size={16} className="me-2" />
                    Attendees
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                    placeholder="john@example.com"
                    className="form-control-enhanced"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="form-label-enhanced">
                <Edit3 size={16} className="me-2" />
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add event description..."
                className="form-control-enhanced"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="form-label-enhanced">Event Color</Form.Label>
              <div className="color-picker-section">
                {eventTypes.map(type => (
                  <button
                    key={type.value}
                    type="button"
                    className={`color-option ${formData.color === type.color ? 'active' : ''}`}
                    style={{ backgroundColor: type.color }}
                    onClick={() => setFormData({ ...formData, color: type.color, type: type.value })}
                    title={type.label}
                  >
                    <type.icon size={16} />
                  </button>
                ))}
              </div>
            </Form.Group>
          </Modal.Body>
          
          <Modal.Footer className="event-modal-footer">
            <div className="footer-actions">
              <div className="left-actions">
                {selectedEvent && (
                  <Button variant="danger" onClick={handleDelete} className="delete-btn">
                    <Trash2 size={16} className="me-2" />
                    Delete Event
                  </Button>
                )}
              </div>
              
              <div className="right-actions">
                <Button variant="secondary" onClick={() => setShowModal(false)} className="cancel-btn">
                  <X size={16} className="me-2" />
                  Cancel
                </Button>
                <Button variant="primary" type="submit" className="save-btn">
                  <Save size={16} className="me-2" />
                  {selectedEvent ? 'Update Event' : 'Create Event'}
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default CalendarComponent
