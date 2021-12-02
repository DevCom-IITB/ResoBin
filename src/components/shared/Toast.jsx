import { message } from 'antd'

const toast = ({ content = 'Loading...', status, key }) => {
  message.destroy()
  message[status]({ content, key })
}

export default toast
