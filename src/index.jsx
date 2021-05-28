import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import '@app/index.css'
import App from '@app/App'
import { ThemeContextProvider } from '@app/context/ThemeContext'

ReactDOM.render(
  <StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </StrictMode>,
  document.getElementById('root')
)
