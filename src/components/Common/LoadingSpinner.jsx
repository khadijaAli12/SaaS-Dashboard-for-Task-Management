import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = ({ size = 'md', variant = 'primary' }) => {
  return (
    <div className="d-flex justify-content-center align-items-center p-3">
      <Spinner animation="border" variant={variant} size={size} />
    </div>
  )
}

export default LoadingSpinner
