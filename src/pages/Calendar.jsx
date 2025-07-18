import React, { useState } from 'react'
import { Container, Card, Alert } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, CheckCircle, AlertCircle, Info } from 'lucide-react'
import CalendarComponent from '../components/Calendar/CalendarComponent'
import { calendarEvents } from '../data/mockData'
import toast from 'react-hot-toast'

const Calendar = () => {
  const [events, setEvents] = useState(calendarEvents)
  const [stats, setStats] = useState({
    totalEvents: calendarEvents.length,
    thisWeek: 3,
    thisMonth: 8,
    upcoming: 5
  })

  const handleEventAdd = (newEvent) => {
    setEvents([...events, newEvent])
    setStats(prev => ({
      ...prev,
      totalEvents: prev.totalEvents + 1,
      thisMonth: prev.thisMonth + 1
    }))
    toast.success('Event created successfully!')
  }

  const handleEventUpdate = (updatedEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ))
    toast.success('Event updated successfully!')
  }

  const handleEventDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId))
    setStats(prev => ({
      ...prev,
      totalEvents: prev.totalEvents - 1,
      thisMonth: prev.thisMonth - 1
    }))
    toast.success('Event deleted successfully!')
  }

  const handleEventClick = (clickInfo) => {
    const event = events.find(e => e.id === parseInt(clickInfo.event.id))
    if (event) {
      toast.custom((t) => (
        <div className="custom-toast">
          <div className="toast-icon">
            <CalendarIcon size={20} />
          </div>
          <div className="toast-content">
            <h4>{event.title}</h4>
            <p>{event.description || 'No description'}</p>
            {event.location && <small>📍 {event.location}</small>}
          </div>
        </div>
      ))
    }
  }

  const StatCard = ({ icon: Icon, title, value, color, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="stat-card-calendar">
        <Card.Body>
          <div className="stat-calendar-content">
            <div className="stat-calendar-icon" style={{ backgroundColor: color }}>
              <Icon size={24} />
            </div>
            <div className="stat-calendar-info">
              <div className="stat-calendar-value">{value}</div>
              <div className="stat-calendar-title">{title}</div>
              <div className="stat-calendar-desc">{description}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )

  return (
    <Container fluid className="calendar-page">
      <motion.div 
        className="page-header mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="calendar-page-header">
          <div className="calendar-title-section">
            <h1 className="page-title">
              <CalendarIcon size={32} className="me-3" />
              Calendar Management
            </h1>
            <p className="page-description">
              Schedule and manage your events with an intuitive calendar interface
            </p>
          </div>
        </div>
      </motion.div>

      {/* Calendar Stats */}
      <motion.div 
        className="calendar-stats mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="stats-grid-calendar">
          <StatCard
            icon={CalendarIcon}
            title="Total Events"
            value={stats.totalEvents}
            color="#667eea"
            description="All scheduled events"
          />
          <StatCard
            icon={CheckCircle}
            title="This Week"
            value={stats.thisWeek}
            color="#4facfe"
            description="Events this week"
          />
          <StatCard
            icon={AlertCircle}
            title="This Month"
            value={stats.thisMonth}
            color="#fa709a"
            description="Events this month"
          />
          <StatCard
            icon={Info}
            title="Upcoming"
            value={stats.upcoming}
            color="#fee140"
            description="Future events"
          />
        </div>
      </motion.div>

      {/* Calendar Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="calendar-main-card">
          <Card.Body className="p-0">
            <CalendarComponent
              events={events}
              onEventAdd={handleEventAdd}
              onEventUpdate={handleEventUpdate}
              onEventDelete={handleEventDelete}
              onEventClick={handleEventClick}
            />
          </Card.Body>
        </Card>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <Alert variant="info" className="calendar-tips">
          <Info size={20} className="me-2" />
          <strong>Quick Tips:</strong> Click on any date to create a new event, or click on existing events to edit them. 
          Use the view buttons to switch between month, week, and day views.
        </Alert>
      </motion.div>
    </Container>
  )
}

export default Calendar
