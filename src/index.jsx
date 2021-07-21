import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from 'App'
import ContextProvider from 'context'
import { store } from 'store'
import 'styles/styles.scss'

const rootElement = document.getElementById('root')

const StrictApp = () => (
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ContextProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ContextProvider>
      </Router>
    </Provider>
  </StrictMode>
)

ReactDOM.render(<StrictApp />, rootElement)

// if (rootElement.hasChildNodes()) {
//   ReactDOM.hydrate(<StrictApp />, rootElement)
// } else {
//   ReactDOM.render(<StrictApp />, rootElement)
// }
