import { useState, useEffect } from 'react'
import axios from 'axios'
// import Cookies from 'js-cookie'

const CSRFToken = () => {
  const [CSRFToken, setCSRFToken] = useState('')

  const getCookie = (name) => {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }
    return cookieValue
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(
          process.env.REACT_APP_BACKEND_URL + '/accounts/csrf_token/'
        )
      } catch {
        console.log('An error occurred while getting the CSRF Token')
      }
    }

    fetchData()
    // setCSRFToken(Cookies.get('csrftoken'))
    setCSRFToken(getCookie('csrftoken'))
  }, [])

  return <input type="hidden" name="csrfmiddlewaretoken" value={CSRFToken} />
}

export default CSRFToken
