import { alertTypes } from 'store/actions/types'

const success = (message) => {
  return { type: alertTypes.SUCCESS, message }
}

const error = (message) => {
  return { type: alertTypes.ERROR, message }
}

const clear = () => {
  return { type: alertTypes.CLEAR }
}

const alertActions = {
  success,
  error,
  clear,
}

export default alertActions
