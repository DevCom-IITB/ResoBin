import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import { toastError } from 'components/toast'

const CSRFToken = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get('/accounts/csrf_token')
        .catch((error) => toastError(error.message))
    }
    fetchData()
    setToken(Cookies.get('csrftoken') || '')
  }, [setToken])

  return <input type="hidden" name="csrfmiddlewaretoken" value={token} />
}

export default CSRFToken
