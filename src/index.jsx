import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ThemeContextProvider } from 'context/ThemeContext'

import AppTemp from '.temp/Form.jsx'

const StrictApp = () => (
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
)

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) ReactDOM.hydrate(<StrictApp />, rootElement)
else ReactDOM.render(<StrictApp />, rootElement)
