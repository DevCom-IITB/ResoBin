import { message } from 'antd'

const toast = ({ content = 'Loading...', status, key }) => {
  message.destroy()
  if (content.message) {
    message[status]({ content: content.message, key })
  } else {
    message[status]({ content, key })
  }
}

export default toast
