import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { ThemeContextProvider } from 'hoc'
import store from 'store'

const StrictApp = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </Router>
      </Provider>
    </React.StrictMode>
  )
}

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<StrictApp />, rootElement)
} else {
  ReactDOM.render(<StrictApp />, rootElement)
}
