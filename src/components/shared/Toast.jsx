import * as Sentry from '@sentry/react'
import { message } from 'antd'

// Configure message to have higher z-index to appear above modals
message.config({
  top: 20,
  duration: 3,
  maxCount: 3,
  getContainer: () => {
    // Create a container with high z-index
    let container = document.getElementById('toast-container')
    if (!container) {
      container = document.createElement('div')
      container.id = 'toast-container'
      container.style.position = 'fixed'
      container.style.top = '0'
      container.style.left = '0'
      container.style.right = '0'
      container.style.zIndex = '10001' // Higher than modal z-index (10000)
      container.style.pointerEvents = 'none'
      document.body.appendChild(container)
    }
    return container
  },
})

const toast = ({ content = 'Loading...', status, key }) => {
  message.destroy()

  // Convert content to string if it's not already
  const messageContent = typeof content === 'string' ? content : String(content)

  message[status]({ content: messageContent, key })
}

export default toast
