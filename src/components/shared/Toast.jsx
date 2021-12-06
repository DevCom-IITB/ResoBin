import * as Sentry from '@sentry/react'
import { message } from 'antd'

const toast = ({ content = 'Loading...', status, key }) => {
  message.destroy()
  if (content.message) {
    message[status]({ content: content.message, key })
    Sentry.captureException(content.message)
  } else {
    // ? api errors
    message[status]({ content, key })
  }
}

export default toast
