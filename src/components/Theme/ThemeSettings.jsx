import React, { useState } from 'react'
import { Modal, Button, Card, Row, Col, Form, Badge } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { 
  Palette, 
  Monitor, 
  Smartphone, 
  Sun, 
  Moon,
  Zap,
  Eye,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Waves,
  Grid,
  Circle
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import toast from 'react-hot-toast'

const ThemeSettings = ({ show, onHide }) => {
  const { 
    theme, 
    setTheme, 
    background, 
    setBackground, 
    primaryColor, 
    setPrimaryColor,
    themes,
    backgrounds,
    primaryColors
  } = useTheme()

  const [previewMode, setPreviewMode] = useState(false)

  const handleExportTheme = () => {
    const themeConfig = {
      theme,
      background,
      primaryColor,
      exportDate: new Date().toISOString()
    }
    
    const dataStr = JSON.stringify(themeConfig, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = 'adminflow-theme.json'
    link.click()
    
    URL.revokeObjectURL(url)
    toast.success('Theme exported successfully!')
  }

  const handleImportTheme = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const themeConfig = JSON.parse(e.target.result)
        
        if (themeConfig.theme) setTheme(themeConfig.theme)
        if (themeConfig.background) setBackground(themeConfig.background)
        if (themeConfig.primaryColor) setPrimaryColor(themeConfig.primaryColor)
        
        toast.success('Theme imported successfully!')
      } catch (error) {
        toast.error('Invalid theme file!')
      }
    }
    reader.readAsText(file)
  }

  const handleResetTheme = () => {
    setTheme('light')
    setBackground('default')
    setPrimaryColor('blue')
    toast.success('Theme reset to defaults!')
  }

  const ThemeCard = ({ themeKey, themeData, isSelected, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`theme-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(themeKey)}
    >
      <div className={`theme-preview theme-preview-${themeKey}`}>
        <div className="theme-preview-header">
          <div className="theme-preview-nav"></div>
        </div>
        <div className="theme-preview-content">
          <div className="theme-preview-sidebar"></div>
          <div className="theme-preview-main">
            <div className="preview-card"></div>
            <div className="preview-card"></div>
          </div>
        </div>
      </div>
      <div className="theme-info">
        <span className="theme-icon">{themeData.icon}</span>
        <span className="theme-name">{themeData.name}</span>
        {isSelected && <Badge bg="primary" className="ms-2">Active</Badge>}
      </div>
    </motion.div>
  )

  const BackgroundCard = ({ bgKey, bgData, isSelected, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`background-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(bgKey)}
    >
      <div className={`background-preview bg-preview-${bgKey}`}>
        {bgKey === 'gradient' && <div className="gradient-demo"></div>}
        {bgKey === 'particles' && (
          <div className="particles-demo">
            <Sparkles size={16} />
            <Circle size={8} />
            <Sparkles size={12} />
          </div>
        )}
        {bgKey === 'geometric' && (
          <div className="geometric-demo">
            <Grid size={16} />
          </div>
        )}
        {bgKey === 'waves' && (
          <div className="waves-demo">
            <Waves size={16} />
          </div>
        )}
        {bgKey === 'dots' && (
          <div className="dots-demo">
            <Circle size={4} />
            <Circle size={4} />
            <Circle size={4} />
          </div>
        )}
      </div>
      <div className="background-info">
        <span className="background-icon">{bgData.icon}</span>
        <span className="background-name">{bgData.name}</span>
        {isSelected && <Badge bg="success" className="ms-1">Active</Badge>}
      </div>
    </motion.div>
  )

  return (
    <Modal show={show} onHide={onHide} size="xl" centered className="theme-settings-modal">
      <Modal.Header closeButton className="theme-modal-header">
        <Modal.Title className="theme-modal-title">
          <Palette size={24} className="me-2" />
          Theme Customization
          <Badge bg="primary" className="ms-2">Pro</Badge>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="theme-modal-body">
        <Row>
          {/* Theme Selection */}
          <Col lg={12} className="mb-4">
            <Card className="settings-section">
              <Card.Header className="settings-header">
                <div className="settings-header-content">
                  <div>
                    <h5 className="settings-title">
                      <Sun size={20} className="me-2" />
                      Color Themes
                    </h5>
                    <p className="settings-subtitle">Choose your preferred color scheme and mode</p>
                  </div>
                  <Badge bg="info" className="feature-badge">
                    {Object.keys(themes).length} Themes Available
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  {Object.entries(themes).map(([themeKey, themeData]) => (
                    <Col key={themeKey} md={6} lg={3} className="mb-3">
                      <ThemeCard
                        themeKey={themeKey}
                        themeData={themeData}
                        isSelected={theme === themeKey}
                        onClick={setTheme}
                      />
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Background Selection */}
          <Col lg={12} className="mb-4">
            <Card className="settings-section">
              <Card.Header className="settings-header">
                <div className="settings-header-content">
                  <div>
                    <h5 className="settings-title">
                      <Monitor size={20} className="me-2" />
                      Background Patterns
                    </h5>
                    <p className="settings-subtitle">Add visual interest with beautiful background effects</p>
                  </div>
                  <Badge bg="success" className="feature-badge">
                    {Object.keys(backgrounds).length} Patterns
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  {Object.entries(backgrounds).map(([bgKey, bgData]) => (
                    <Col key={bgKey} md={4} lg={2} className="mb-3">
                      <BackgroundCard
                        bgKey={bgKey}
                        bgData={bgData}
                        isSelected={background === bgKey}
                        onClick={setBackground}
                      />
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Primary Color Selection - SINGLE ROW */}
          <Col lg={12} className="mb-4">
            <Card className="settings-section">
              <Card.Header className="settings-header">
                <div className="settings-header-content">
                  <div>
                    <h5 className="settings-title">
                      <Palette size={20} className="me-2" />
                      Primary Colors
                    </h5>
                    <p className="settings-subtitle">Customize your brand colors and accent hues</p>
                  </div>
                  <Badge bg="warning" className="feature-badge">
                    {Object.keys(primaryColors).length} Colors
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="colors-row-container">
                  {Object.entries(primaryColors).map(([colorKey, colorData]) => (
                    <motion.div
                      key={colorKey}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`color-row-card ${primaryColor === colorKey ? 'selected' : ''}`}
                      onClick={() => setPrimaryColor(colorKey)}
                    >
                      <div 
                        className="color-row-preview"
                        style={{ background: colorData.gradient }}
                      >
                        {primaryColor === colorKey && <Eye size={14} className="color-selected-icon" />}
                      </div>
                      <span className="color-row-name">{colorData.name}</span>
                    </motion.div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Theme Management */}
          <Col lg={12}>
            <Card className="settings-section">
              <Card.Header className="settings-header">
                <div className="settings-header-content">
                  <div>
                    <h5 className="settings-title">
                      <Eye size={20} className="me-2" />
                      Theme Management
                    </h5>
                    <p className="settings-subtitle">Import, export, and manage your custom themes</p>
                  </div>
                  <Badge bg="secondary" className="feature-badge">
                    Advanced
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6} lg={3} className="mb-3">
                    <Button
                      variant="outline-primary"
                      className="w-100 theme-action-btn"
                      onClick={handleExportTheme}
                    >
                      <Download size={16} className="me-2" />
                      Export Theme
                    </Button>
                  </Col>
                  
                  <Col md={6} lg={3} className="mb-3">
                    <Form.Group>
                      <Form.Label className="btn btn-outline-success w-100 theme-action-btn mb-0">
                        <Upload size={16} className="me-2" />
                        Import Theme
                        <Form.Control
                          type="file"
                          accept=".json"
                          onChange={handleImportTheme}
                          style={{ display: 'none' }}
                        />
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} lg={3} className="mb-3">
                    <Button
                      variant="outline-warning"
                      className="w-100 theme-action-btn"
                      onClick={handleResetTheme}
                    >
                      <RotateCcw size={16} className="me-2" />
                      Reset Theme
                    </Button>
                  </Col>
                  
                  <Col md={6} lg={3} className="mb-3">
                    <Button
                      variant={previewMode ? "success" : "outline-secondary"}
                      className="w-100 theme-action-btn"
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      <Eye size={16} className="me-2" />
                      {previewMode ? 'Exit Preview' : 'Preview Mode'}
                    </Button>
                  </Col>
                </Row>
                
                {/* Current Theme Summary */}
                <div className="current-theme-summary mt-4">
                  <h6 className="text-muted mb-3">Current Configuration</h6>
                  <div className="theme-summary-cards">
                    <div className="summary-card">
                      <strong>Theme:</strong> {themes[theme]?.name} {themes[theme]?.icon}
                    </div>
                    <div className="summary-card">
                      <strong>Background:</strong> {backgrounds[background]?.name} {backgrounds[background]?.icon}
                    </div>
                    <div className="summary-card">
                      <strong>Primary Color:</strong> {primaryColors[primaryColor]?.name}
                      <div 
                        className="color-swatch ms-2"
                        style={{ backgroundColor: primaryColors[primaryColor]?.value }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      
      <Modal.Footer className="theme-modal-footer">
        <div className="footer-content">
          <div className="footer-info">
            <small className="text-muted">
              Changes are applied instantly. Your preferences are saved automatically.
            </small>
          </div>
          <div className="footer-actions">
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={onHide}>
              Done
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ThemeSettings
