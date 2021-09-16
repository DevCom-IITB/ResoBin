import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import { toastError } from 'components/toast'
import axiosAuth from 'helpers/axiosAuth'

const CSRFToken = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosAuth.get('/csrftoken')
      } catch (error) {
        toastError(error.message)
      }
    }
    fetchData()
    setToken(Cookies.get('csrftoken') || '')
  }, [setToken])

  return <input type="hidden" name="csrfmiddlewaretoken" value={token} />
}

export default CSRFToken
