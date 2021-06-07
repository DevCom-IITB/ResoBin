import { alertTypes } from 'store/actions/types'

const alert = (state = {}, action) => {
  switch (action.type) {
    case alertTypes.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message,
      }
    case alertTypes.ERROR:
      return {
        type: 'alert-danger',
        message: action.message,
      }
    case alertTypes.CLEAR:
      return {}
    default:
      return state
  }
}

export default alert
