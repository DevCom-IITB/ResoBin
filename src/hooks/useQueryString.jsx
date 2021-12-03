/* eslint-disable react-hooks/exhaustive-deps */
import { isFinite, isEmpty, debounce, memoize } from 'lodash'
import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const useQueryString = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const setQueryString = (key, value) => {
    const queryString = new URLSearchParams(location.search)

    // ? No change
    if (value === undefined || value === queryString.get(key)) return

    // ? update query string (or clear query string if query is empty)
    if (isEmpty(value) && !isFinite(value)) queryString.delete(key)
    else queryString.set(key, value)

    location.search = queryString.toString()
    navigate(location, { replace: true })
  }

  // ? Debouncing is necessary to avoid unnecessary API calls
  const setQueryStringDebounced = useCallback(
    memoize((key) => debounce(setQueryString, 500)),
    [location.search]
  )

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

      navigate(location, { replace: true })
    },
    [location.search]
  )

  return {
    deleteQueryString,
    getQueryString,
    setQueryString: (key, value) => setQueryStringDebounced(key)(key, value),
  }
}

export default useQueryString
