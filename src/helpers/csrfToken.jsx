import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import { toast } from 'components/shared'
import { API } from 'config/api'

const CSRFToken = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        await API.auth.csrftoken()
      } catch (error) {
        toast({ status: 'error', content: error })
      }
    }

    fetchData()
    setToken(Cookies.get('csrftoken') || '')
  }, [setToken])

  return <input type="hidden" name="csrfmiddlewaretoken" value={token} />
}

export default CSRFToken
