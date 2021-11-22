import 'antd/dist/antd.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-quill/dist/quill.snow.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import App from 'App'
import { store } from 'store'
import 'styles/styles.scss'

const rootElement = document.getElementById('root')

const StrictApp = () => (
  <StrictMode>
    <Provider store={store}>
      <Router>
        <HelmetProvider>
          <App />
        </HelmetProvider>
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
