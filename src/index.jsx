import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import App from 'App'
import { LoaderAnimation } from 'components/shared'
import ContextProvider from 'context'
import store from 'store'
import 'styles/styles.scss'

const persistor = persistStore(store)

const StrictApp = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        {/* <PersistGate loading={<LoaderAnimation />} persistor={persistor}> */}
        <Router>
          <ContextProvider>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </ContextProvider>
        </Router>
        {/* </PersistGate> */}
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
