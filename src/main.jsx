import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/globals.css'
import './styles/themes.css'
import './styles/components.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--card-bg)',
          color: 'var(--text-color)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow)'
        },
        success: {
          iconTheme: {
            primary: 'var(--success-color)',
            secondary: 'white'
          }
        },
        error: {
          iconTheme: {
            primary: 'var(--danger-color)',
            secondary: 'white'
          }
        }
      }}
    />
  </React.StrictMode>
)
