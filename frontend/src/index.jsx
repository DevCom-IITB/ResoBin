import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { ThemeContextProvider } from 'context/ThemeContext'
// import store from './store'

const StrictApp = () => (
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
    {/* </Provider> */}
  </React.StrictMode>
)

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<StrictApp />, rootElement)
} else {
  ReactDOM.render(<StrictApp />, rootElement)
}
