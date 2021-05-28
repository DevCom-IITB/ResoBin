import React from 'react'
import ReactDOM from 'react-dom'
import '@app/index.css'
import App from '@app/App'
import { ThemeContextProvider } from './context/ThemeContext'

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
