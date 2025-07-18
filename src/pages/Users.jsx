import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Badge, Modal, Table, InputGroup, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users as UsersIcon, 
  UserPlus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Edit3, 
  Trash2, 
  Eye,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  ShieldCheck,
  UserCheck,
  UserX,
  Settings,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import UserCard from '../components/Users/UserCard'
import UserModal from '../components/Users/UserModal'
import UserDetailsModal from '../components/Users/UserDetailsModal'
import { userData } from '../data/mockData'
import toast from 'react-hot-toast'

const Users = () => {
  const [users, setUsers] = useState(userData)
  const [filteredUsers, setFilteredUsers] = useState(userData)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [viewMode, setViewMode] = useState('grid') // grid or table
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showBulkActions, setShowBulkActions] = useState(false)
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(12)
  
  // Stats
  const [userStats, setUserStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
    managers: 0,
    users: 0
  })

  // Update stats when users change
  useEffect(() => {
    const stats = {
      total: users.length,
      active: users.filter(user => user.status === 'Active').length,
      inactive: users.filter(user => user.status === 'Inactive').length,
      admins: users.filter(user => user.role === 'Admin').length,
      managers: users.filter(user => user.role === 'Manager').length,
      users: users.filter(user => user.role === 'User').length
    }
    setUserStats(stats)
  }, [users])

  // Filter and search users
  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = filterRole === 'all' || user.role === filterRole
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus
      
      return matchesSearch && matchesRole && matchesStatus
    })

    // Sort users
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'name') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredUsers(filtered)
    setCurrentPage(1)
  }, [users, searchTerm, filterRole, filterStatus, sortBy, sortOrder])

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const handleAddUser = () => {
    setSelectedUser(null)
    setShowUserModal(true)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setShowDetailsModal(true)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId))
      toast.success('User deleted successfully!')
    }
  }

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...userData, updatedAt: new Date().toISOString() }
          : user
      ))
      toast.success('User updated successfully!')
    } else {
      // Add new user
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=667eea&color=fff`
      }
      setUsers([...users, newUser])
      toast.success('User created successfully!')
    }
    setShowUserModal(false)
  }

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) {
      toast.error('Please select users first')
      return
    }

    switch (action) {
      case 'activate':
        setUsers(users.map(user => 
          selectedUsers.includes(user.id) 
            ? { ...user, status: 'Active' }
            : user
        ))
        toast.success(`${selectedUsers.length} users activated`)
        break
      case 'deactivate':
        setUsers(users.map(user => 
          selectedUsers.includes(user.id) 
            ? { ...user, status: 'Inactive' }
            : user
        ))
        toast.success(`${selectedUsers.length} users deactivated`)
        break
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
          setUsers(users.filter(user => !selectedUsers.includes(user.id)))
          toast.success(`${selectedUsers.length} users deleted`)
        }
        break
    }
    setSelectedUsers([])
    setShowBulkActions(false)
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.success('Users refreshed!')
  }

  const handleExport = () => {
    const exportData = filteredUsers.map(user => ({
      Name: user.name,
      Email: user.email,
      Role: user.role,
      Status: user.status,
      'Created At': new Date(user.createdAt).toLocaleDateString()
    }))
    
    const csvContent = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users.csv'
    a.click()
    
    toast.success('Users exported successfully!')
  }

  const StatCard = ({ icon: Icon, title, value, color, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="stat-card hover-lift">
        <Card.Body>
          <div className="stat-content">
            <div className="stat-icon" style={{ backgroundColor: color }}>
              <Icon size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{value}</div>
              <div className="stat-title">{title}</div>
              <div className="stat-description">{description}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )

  return (
    <Container fluid className="users-page">
      <motion.div 
        className="page-header mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="page-header-content">
          <div className="page-title-section">
            <h1 className="page-title">
              <UsersIcon size={32} className="me-3" />
              User Management
            </h1>
            <p className="page-description">
              Manage your users with advanced features and real-time updates
            </p>
          </div>
          
          <div className="page-actions">
            <Button variant="outline-secondary" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw size={16} className={`me-2 ${isLoading ? 'spinning' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline-primary" onClick={handleExport}>
              <Download size={16} className="me-2" />
              Export
            </Button>
            <Button variant="primary" onClick={handleAddUser}>
              <UserPlus size={16} className="me-2" />
              Add User
            </Button>
          </div>
        </div>
      </motion.div>

      {/* User Statistics */}
      <Row className="mb-4">
        <Col lg={2} md={4} sm={6} className="mb-3">
          <StatCard
            icon={UsersIcon}
            title="Total Users"
            value={userStats.total}
            color="#667eea"
            description="All registered users"
          />
        </Col>
        <Col lg={2} md={4} sm={6} className="mb-3">
          <StatCard
            icon={UserCheck}
            title="Active Users"
            value={userStats.active}
            color="#4facfe"
            description="Currently active"
          />
        </Col>
        <Col lg={2} md={4} sm={6} className="mb-3">
          <StatCard
            icon={UserX}
            title="Inactive Users"
            value={userStats.inactive}
            color="#fa709a"
            description="Temporarily disabled"
          />
        </Col>
        <Col lg={2} md={4} sm={6} className="mb-3">
          <StatCard
            icon={Shield}
            title="Admins"
            value={userStats.admins}
            color="#f5576c"
            description="Full system access"
          />
        </Col>
        <Col lg={2} md={4} sm={6} className="mb-3">
          <StatCard
            icon={ShieldCheck}
            title="Managers"
            value={userStats.managers}
            color="#fee140"
            description="Team management"
          />
        </Col>
        <Col lg={2} md={4} sm={6} className="mb-3">
          <StatCard
            icon={UsersIcon}
            title="Regular Users"
            value={userStats.users}
            color="#a8edea"
            description="Standard access"
          />
        </Col>
      </Row>

      {/* Filters and Controls */}
      <Card className="filters-card mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <Search size={16} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            
            <Col md={2}>
              <Form.Select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </Form.Select>
            </Col>
            
            <Col md={2}>
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Col>
            
            <Col md={2}>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="email">Sort by Email</option>
                <option value="role">Sort by Role</option>
                <option value="createdAt">Sort by Created</option>
              </Form.Select>
            </Col>
            
            <Col md={2}>
              <div className="d-flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                >
                  Table
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bulk-actions-bar mb-4"
          >
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <span>{selectedUsers.length} users selected</span>
                  <div className="bulk-actions">
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleBulkAction('activate')}
                      className="me-2"
                    >
                      Activate
                    </Button>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => handleBulkAction('deactivate')}
                      className="me-2"
                    >
                      Deactivate
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleBulkAction('delete')}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Users Display */}
      {viewMode === 'grid' ? (
        <Row>
          <AnimatePresence>
            {currentUsers.map((user, index) => (
              <Col key={user.id} lg={4} md={6} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <UserCard
                    user={user}
                    onEdit={() => handleEditUser(user)}
                    onDelete={() => handleDeleteUser(user.id)}
                    onView={() => handleViewUser(user)}
                    isSelected={selectedUsers.includes(user.id)}
                    onSelect={(selected) => {
                      if (selected) {
                        setSelectedUsers([...selectedUsers, user.id])
                      } else {
                        setSelectedUsers(selectedUsers.filter(id => id !== user.id))
                      }
                    }}
                  />
                </motion.div>
              </Col>
            ))}
          </AnimatePresence>
        </Row>
      ) : (
        <Card>
          <Card.Body className="p-0">
            <Table responsive className="users-table">
              <thead>
                <tr>
                  <th>
                    <Form.Check
                      type="checkbox"
                      checked={selectedUsers.length === currentUsers.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(currentUsers.map(user => user.id))
                        } else {
                          setSelectedUsers([])
                        }
                      }}
                    />
                  </th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers([...selectedUsers, user.id])
                          } else {
                            setSelectedUsers(selectedUsers.filter(id => id !== user.id))
                          }
                        }}
                      />
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="user-avatar-small me-3"
                        />
                        <div>
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge 
                        bg={user.role === 'Admin' ? 'danger' : user.role === 'Manager' ? 'warning' : 'primary'}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={user.status === 'Active' ? 'success' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="table-actions">
                        <OverlayTrigger overlay={<Tooltip>View</Tooltip>}>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye size={16} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit3 size={16} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-danger"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="pagination-card mt-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <div className="pagination-controls">
                <Button
                  variant="outline-primary"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="mx-3">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline-primary"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Modals */}
      <UserModal
        show={showUserModal}
        onHide={() => setShowUserModal(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      <UserDetailsModal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        user={selectedUser}
        onEdit={() => {
          setShowDetailsModal(false)
          handleEditUser(selectedUser)
        }}
        onDelete={() => {
          setShowDetailsModal(false)
          handleDeleteUser(selectedUser.id)
        }}
      />
    </Container>
  )
}

export default Users
