/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from 'lodash'
import debounce from 'lodash/debounce'
import { useCallback } from 'react'
import { useHistory, useLocation } from 'react-router'

const useQueryString = () => {
  const location = useLocation()
  const history = useHistory()

  const setQueryString = (key, value) => {
    const queryString = new URLSearchParams(location.search)

    // ? No change
    if (value === queryString.get(key)) return

    // ? update query string or clear query string if query is empty
    if (value instanceof Array && isEmpty(value)) queryString.delete(key)
    else queryString.set(key, value)

    location.search = queryString.toString()
    history.push(location)
  }
  // ? Debouncing is necessary to avoid unnecessary API calls
  const setQueryStringDebounced = useCallback(debounce(setQueryString, 500), [
    location.search,
  ])

  const getQueryString = useCallback(
    (key) => {
      const queryString = new URLSearchParams(location.search)
      if (key) return queryString.get(key)

      return Object.fromEntries(queryString)
    },
    [location.search]
  )

  // ? If keys are passed, removes keys from qs. Else clears qs
  const deleteQueryString = useCallback(
    (...keys) => {
      const queryString = new URLSearchParams(location.search)

      if (isEmpty(keys)) {
        location.search = ''
      } else {
        keys.forEach((key) => {
          queryString.delete(key)
        })
        location.search = queryString.toString()
      }

      history.push(location)
    },
    [location.search]
  )

  return {
    deleteQueryString,
    getQueryString,
    setQueryString: setQueryStringDebounced,
  }
}

export default useQueryString
