import { StrictMode, useEffect } from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from 'App'
import { LoaderAnimation } from 'components/shared'
import { initSentry } from 'config'
import * as serviceWorkerRegistration from 'serviceWorkerRegistration'
import { store, persistor } from 'store'
import 'styles/styles.css'

const rootElement = document.getElementById('root')

const StrictApp = () => {
  useEffect(() => {
    initSentry()
  }, [])

  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={<LoaderAnimation />} persistor={persistor}>
          <Router>
            <HelmetProvider>
              <CookiesProvider>
                <App />
              </CookiesProvider>
            </HelmetProvider>
          </Router>
        </PersistGate>
      </Provider>
    </StrictMode>
  )
}

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<StrictApp />, rootElement)
} else {
  ReactDOM.render(<StrictApp />, rootElement)
}

serviceWorkerRegistration.register()
