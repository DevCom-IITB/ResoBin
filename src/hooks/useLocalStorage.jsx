// Reference: www.usehooks.com/useLocalStorage
import { useState } from 'react'

import { toastError } from 'components/toast'

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      toastError(error.message)
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
      toastError(error.message)
    }
  }
  return [storedValue, setValue]
}

export default useLocalStorage
