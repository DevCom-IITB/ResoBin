import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const CSRFToken = () => {
  const [CSRFToken, setCSRFToken] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get('/accounts/csrf_token')
        .catch((error) => console.log(error))
    }
    fetchData()
    setCSRFToken(Cookies.get('csrftoken') || '')
  }, [setCSRFToken])

  return <input type="hidden" name="csrfmiddlewaretoken" value={CSRFToken} />
}

export default CSRFToken
