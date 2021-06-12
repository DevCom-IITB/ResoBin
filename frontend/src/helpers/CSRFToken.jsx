import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const CSRFToken = () => {
  const [CSRFToken, setCSRFToken] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(
          process.env.REACT_APP_BACKEND_URL + '/accounts/csrf_token'
        )
      } catch {
        console.log('An error occurred while getting the CSRF Token')
      }
    }

    fetchData()
    setCSRFToken(Cookies.get('csrftoken'))
  }, [setCSRFToken])

  return <input type="hidden" name="csrfmiddlewaretoken" value={CSRFToken} />
}

export default CSRFToken
