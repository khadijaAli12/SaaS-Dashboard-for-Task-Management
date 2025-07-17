import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">&copy; 2025 Admin Dashboard. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0">Built with React & Bootstrap</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
