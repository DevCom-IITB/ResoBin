import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import 'styles/index.css'
import App from './App'
import { ContextProvider } from 'context'
import store from 'store'

const StrictApp = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <ContextProvider>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </ContextProvider>
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
