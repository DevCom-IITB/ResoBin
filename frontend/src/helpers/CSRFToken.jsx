import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const CSRFToken = () => {
  const [CSRFToken, setCSRFToken] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get('http://localhost:8000/accounts/csrf_token', {
            withCredentials: true,
          })
          .then(null, (error) => console.log(error))
          .catch((error) => console.log(error))
      } catch {
        console.log('An error occurred while getting the CSRF Token')
      }
    }

    fetchData()
    setCSRFToken(Cookies.get('csrftoken') || '')
  }, [setCSRFToken])

  return <input type="hidden" name="csrfmiddlewaretoken" value={CSRFToken} />
}

export default CSRFToken
