// Reference: www.usehooks.com/useLocalStorage
import { useState } from 'react'

import { toast } from 'components/shared'

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      toast({ status: 'error', content: error })
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      toast({ status: 'error', content: error })
    }
  }
  return [storedValue, setValue]
}

export default useLocalStorage
