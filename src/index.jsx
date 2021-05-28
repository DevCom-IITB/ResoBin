import React from 'react'
import ReactDOM from 'react-dom'
import '@app/index.css'
import App from '@app/App'
import { ThemeContextProvider } from '@app/context/ThemeContext'

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
