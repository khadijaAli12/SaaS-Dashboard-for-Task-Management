import React, { useState } from 'react'
import { Container, Card, Row, Col, Form, Button, Alert, Nav, Tab } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Database,
  Save,
  Upload,
  Lock,
  Mail,
  Phone,
  Key
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import toast from 'react-hot-toast'

const Settings = () => {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: null,
    bio: 'Full-stack developer passionate about creating amazing user experiences.',
    company: 'Tech Corp',
    position: 'Senior Developer',
    location: 'San Francisco, CA'
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    monthlyReports: false,
    securityAlerts: true
  })

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    loginAlerts: true
  })

  const handleProfileSave = () => {
    toast.success('Profile settings saved successfully!')
  }

  const handleNotificationSave = () => {
    toast.success('Notification preferences updated!')
  }

  const handleSecuritySave = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }
    toast.success('Security settings updated!')
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const SettingsCard = ({ children, title, icon: Icon }) => (
    <Card className="settings-card mb-4">
      <Card.Header className="d-flex align-items-center gap-2">
        <Icon size={20} style={{ color: 'var(--primary-color)' }} />
        <h5 className="mb-0">{title}</h5>
      </Card.Header>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  )

  return (
    <Container fluid className="settings-page">
      <motion.div 
        className="page-header mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">Settings</h1>
        <p className="page-description">
          Manage your account settings and preferences
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Row>
            <Col lg={3} className="mb-4">
              <Card>
                <Card.Body>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="profile" className="d-flex align-items-center gap-2">
                        <User size={18} />
                        Profile
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="security" className="d-flex align-items-center gap-2">
                        <Shield size={18} />
                        Security
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="notifications" className="d-flex align-items-center gap-2">
                        <Bell size={18} />
                        Notifications
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="appearance" className="d-flex align-items-center gap-2">
                        <Palette size={18} />
                        Appearance
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="system" className="d-flex align-items-center gap-2">
                        <Database size={18} />
                        System
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={9}>
              <Tab.Content>
                {/* Profile Tab */}
                <Tab.Pane eventKey="profile">
                  <SettingsCard title="Profile Information" icon={User}>
                    <Row>
                      <Col md={4} className="text-center mb-4">
                        <div className="profile-avatar-container">
                          <div 
                            className="profile-avatar"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              margin: '0 auto 1rem',
                              background: profileData.avatar 
                                ? `url(${profileData.avatar}) center/cover` 
                                : 'var(--primary-gradient)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '2.5rem',
                              fontWeight: 'bold'
                            }}
                          >
                            {!profileData.avatar && `${profileData.firstName[0]}${profileData.lastName[0]}`}
                          </div>
                          <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            style={{ display: 'none' }}
                          />
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => document.getElementById('avatar-upload').click()}
                          >
                            <Upload size={16} className="me-2" />
                            Upload Photo
                          </Button>
                        </div>
                      </Col>
                      <Col md={8}>
                        <Form>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={profileData.firstName}
                                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={profileData.lastName}
                                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  value={profileData.email}
                                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                  type="tel"
                                  value={profileData.phone}
                                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Company</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={profileData.company}
                                  onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Position</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={profileData.position}
                                  onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                              type="text"
                              value={profileData.location}
                              onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={profileData.bio}
                              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            />
                          </Form.Group>
                          <Button variant="primary" onClick={handleProfileSave}>
                            <Save size={16} className="me-2" />
                            Save Changes
                          </Button>
                        </Form>
                      </Col>
                    </Row>
                  </SettingsCard>
                </Tab.Pane>

                {/* Security Tab */}
                <Tab.Pane eventKey="security">
                  <SettingsCard title="Change Password" icon={Lock}>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={security.currentPassword}
                          onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={security.newPassword}
                          onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={security.confirmPassword}
                          onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                        />
                      </Form.Group>
                      <Button variant="primary" onClick={handleSecuritySave}>
                        <Key size={16} className="me-2" />
                        Update Password
                      </Button>
                    </Form>
                  </SettingsCard>

                  <SettingsCard title="Two-Factor Authentication" icon={Shield}>
                    <Form.Check
                      type="switch"
                      id="2fa-switch"
                      label="Enable Two-Factor Authentication"
                      checked={security.twoFactorAuth}
                      onChange={(e) => setSecurity({...security, twoFactorAuth: e.target.checked})}
                    />
                    <small className="text-muted">
                      Add an extra layer of security to your account
                    </small>
                  </SettingsCard>

                  <SettingsCard title="Login Alerts" icon={Bell}>
                    <Form.Check
                      type="switch"
                      id="login-alerts"
                      label="Notify me of new login attempts"
                      checked={security.loginAlerts}
                      onChange={(e) => setSecurity({...security, loginAlerts: e.target.checked})}
                    />
                  </SettingsCard>
                </Tab.Pane>

                {/* Notifications Tab */}
                <Tab.Pane eventKey="notifications">
                  <SettingsCard title="Email Notifications" icon={Mail}>
                    <Form.Check
                      type="switch"
                      id="email-notifications"
                      label="Email notifications"
                      checked={notifications.emailNotifications}
                      onChange={(e) => setNotifications({...notifications, emailNotifications: e.target.checked})}
                      className="mb-3"
                    />
                    <Form.Check
                      type="switch"
                      id="weekly-reports"
                      label="Weekly reports"
                      checked={notifications.weeklyReports}
                      onChange={(e) => setNotifications({...notifications, weeklyReports: e.target.checked})}
                      className="mb-3"
                    />
                    <Form.Check
                      type="switch"
                      id="monthly-reports"
                      label="Monthly reports"
                      checked={notifications.monthlyReports}
                      onChange={(e) => setNotifications({...notifications, monthlyReports: e.target.checked})}
                    />
                  </SettingsCard>

                  <SettingsCard title="Push Notifications" icon={Bell}>
                    <Form.Check
                      type="switch"
                      id="push-notifications"
                      label="Browser push notifications"
                      checked={notifications.pushNotifications}
                      onChange={(e) => setNotifications({...notifications, pushNotifications: e.target.checked})}
                      className="mb-3"
                    />
                    <Form.Check
                      type="switch"
                      id="security-alerts"
                      label="Security alerts"
                      checked={notifications.securityAlerts}
                      onChange={(e) => setNotifications({...notifications, securityAlerts: e.target.checked})}
                    />
                  </SettingsCard>

                  <SettingsCard title="SMS Notifications" icon={Phone}>
                    <Form.Check
                      type="switch"
                      id="sms-notifications"
                      label="SMS notifications"
                      checked={notifications.smsNotifications}
                      onChange={(e) => setNotifications({...notifications, smsNotifications: e.target.checked})}
                    />
                    <small className="text-muted">
                      Receive important updates via SMS
                    </small>
                  </SettingsCard>

                  <Button variant="primary" onClick={handleNotificationSave}>
                    <Save size={16} className="me-2" />
                    Save Preferences
                  </Button>
                </Tab.Pane>

                {/* Appearance Tab */}
                <Tab.Pane eventKey="appearance">
                  <SettingsCard title="Theme Preferences" icon={Palette}>
                    <div className="mb-4">
                      <h6>Color Scheme</h6>
                      <div className="d-flex gap-3">
                        <Button
                          variant={theme === 'light' ? 'primary' : 'outline-primary'}
                          onClick={() => theme === 'dark' && toggleTheme()}
                        >
                          ☀️ Light Mode
                        </Button>
                        <Button
                          variant={theme === 'dark' ? 'primary' : 'outline-primary'}
                          onClick={() => theme === 'light' && toggleTheme()}
                        >
                          🌙 Dark Mode
                        </Button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h6>Primary Color</h6>
                      <div className="d-flex gap-2">
                        {[
                          { name: 'Blue', value: '#667eea' },
                          { name: 'Purple', value: '#764ba2' },
                          { name: 'Pink', value: '#f093fb' },
                          { name: 'Green', value: '#4facfe' },
                          { name: 'Orange', value: '#fa709a' }
                        ].map(color => (
                          <Button
                            key={color.name}
                            variant="outline-secondary"
                            size="sm"
                            style={{ backgroundColor: color.value, borderColor: color.value }}
                            onClick={() => toast.success(`${color.name} theme applied!`)}
                          >
                            {color.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </SettingsCard>

                  <SettingsCard title="Display Settings" icon={Globe}>
                    <Form.Group className="mb-3">
                      <Form.Label>Language</Form.Label>
                      <Form.Select>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Timezone</Form.Label>
                      <Form.Select>
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Time</option>
                        <option value="PST">Pacific Time</option>
                        <option value="GMT">GMT</option>
                      </Form.Select>
                    </Form.Group>
                  </SettingsCard>
                </Tab.Pane>

                {/* System Tab */}
                <Tab.Pane eventKey="system">
                  <SettingsCard title="System Information" icon={Database}>
                    <Row>
                      <Col md={6}>
                        <p><strong>Version:</strong> 1.0.0</p>
                        <p><strong>Build:</strong> 2025.07.16</p>
                        <p><strong>Environment:</strong> Production</p>
                      </Col>
                      <Col md={6}>
                        <p><strong>Server:</strong> AWS EC2</p>
                        <p><strong>Database:</strong> PostgreSQL</p>
                        <p><strong>Cache:</strong> Redis</p>
                      </Col>
                    </Row>
                  </SettingsCard>

                  <SettingsCard title="Data Management" icon={Database}>
                    <div className="d-flex gap-3">
                      <Button variant="outline-primary">
                        Export Data
                      </Button>
                      <Button variant="outline-warning">
                        Clear Cache
                      </Button>
                      <Button variant="outline-danger">
                        Reset Settings
                      </Button>
                    </div>
                  </SettingsCard>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </motion.div>
    </Container>
  )
}

export default Settings
