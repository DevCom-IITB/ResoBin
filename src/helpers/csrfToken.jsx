import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import { API } from 'api'
import { toast } from 'components/shared'

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
