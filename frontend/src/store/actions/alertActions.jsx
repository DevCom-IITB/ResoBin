import { alertTypes } from 'store/actions/types'
// import { toast } from 'react-toastify'
// const notify = () =>
//   toast.success('Sign up succesful!', {
//     position: 'top-center',
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: '',
//   })

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
