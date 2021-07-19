import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from 'App'
import { LoaderAnimation } from 'components/shared'
import ContextProvider from 'context'
import { store, persistor } from 'store'
import 'styles/styles.scss'

const StrictApp = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <ContextProvider>
            <HelmetProvider>
              <PersistGate loading={<LoaderAnimation />} persistor={persistor}>
                <App />
              </PersistGate>
            </HelmetProvider>
          </ContextProvider>
        </Router>
      </Provider>
    </React.StrictMode>
  )
}

const rootElement = document.getElementById('root')

ReactDOM.render(<StrictApp />, rootElement)

// if (rootElement.hasChildNodes()) {
//   ReactDOM.hydrate(<StrictApp />, rootElement)
// } else {
//   ReactDOM.render(<StrictApp />, rootElement)
// }
