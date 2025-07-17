import React, { useState, useMemo } from 'react'
import { Container, Badge, Button, Modal, Form, Row, Col, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Search, Filter, Download } from 'lucide-react'
import DataTable from '../components/Tables/DataTable'
import { tableData } from '../data/mockData'
import toast from 'react-hot-toast'

const Tables = () => {
  const [data, setData] = useState(tableData)
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('')

  const columns = useMemo(
    () => [
      {
        header: 'Avatar',
        accessorKey: 'avatar',
        cell: ({ row }) => (
          <div 
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--primary-gradient)',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {row.original.name.charAt(0)}
          </div>
        )
      },
      {
        header: 'ID',
        accessorKey: 'id',
        cell: ({ getValue }) => (
          <span className="badge bg-secondary">{getValue()}</span>
        )
      },
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ getValue }) => (
          <span style={{ fontWeight: '600' }}>{getValue()}</span>
        )
      },
      {
        header: 'Email',
        accessorKey: 'email',
        cell: ({ getValue }) => (
          <span style={{ color: 'var(--text-muted)' }}>{getValue()}</span>
        )
      },
      {
        header: 'Role',
        accessorKey: 'role',
        cell: ({ getValue }) => {
          const value = getValue()
          const getRoleColor = (role) => {
            switch (role) {
              case 'Admin': return 'danger'
              case 'Manager': return 'warning'
              case 'User': return 'primary'
              default: return 'secondary'
            }
          }
          return (
            <Badge bg={getRoleColor(value)} className="px-3 py-2">
              {value}
            </Badge>
          )
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ getValue }) => {
          const value = getValue()
          return (
            <Badge 
              bg={value === 'Active' ? 'success' : 'secondary'}
              className="px-3 py-2"
            >
              {value}
            </Badge>
          )
        }
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => handleEdit(row.original)}
            >
              <Edit size={16} />
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDelete(row.original.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        )
      }
    ],
    []
  )

  const handleEdit = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setData(data.filter(user => user.id !== id))
      toast.success('User deleted successfully!')
    }
  }

  const handleAdd = () => {
    setSelectedUser(null)
    setShowModal(true)
  }

  const handleExport = () => {
    toast.success('Data exported successfully!')
  }

  const filteredData = useMemo(() => {
    return data.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = filterRole === '' || user.role === filterRole
      return matchesSearch && matchesRole
    })
  }, [data, searchTerm, filterRole])

  return (
    <Container fluid className="tables-page">
      <motion.div 
        className="page-header mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">User Management</h1>
        <p className="page-description">
          Manage your users with advanced table features and real-time updates
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={6}>
                <div className="d-flex gap-3">
                  <div className="position-relative">
                    <Search 
                      size={20} 
                      className="position-absolute top-50 start-0 translate-middle-y ms-3"
                      style={{ color: 'var(--text-muted)' }}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ paddingLeft: '3rem' }}
                    />
                  </div>
                  <Form.Select 
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    style={{ width: '150px' }}
                  >
                    <option value="">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="User">User</option>
                  </Form.Select>
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex gap-2 justify-content-md-end">
                  <Button variant="outline-primary" onClick={handleExport}>
                    <Download size={16} className="me-2" />
                    Export
                  </Button>
                  <Button variant="primary" onClick={handleAdd}>
                    <Plus size={16} className="me-2" />
                    Add User
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="table-container">
          <Card.Body className="p-0">
            <DataTable 
              data={filteredData} 
              columns={columns} 
              title="Users Management"
            />
          </Card.Body>
        </Card>
      </motion.div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser ? 'Edit User' : 'Add New User'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.name || ''}
                placeholder="Enter full name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={selectedUser?.email || ''}
                placeholder="Enter email address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select defaultValue={selectedUser?.role || 'User'}>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select defaultValue={selectedUser?.status || 'Active'}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              setShowModal(false)
              toast.success(selectedUser ? 'User updated successfully!' : 'User added successfully!')
            }}
          >
            {selectedUser ? 'Update' : 'Add'} User
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Tables
