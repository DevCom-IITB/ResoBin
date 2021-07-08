import App from 'App'
import ContextProvider from 'context'
import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from 'store'
import 'styles/styles.scss'

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
