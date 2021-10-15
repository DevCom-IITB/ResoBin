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
    if (isEmpty(value)) queryString.delete(key)
    else queryString.set(key, value)

    // ? reset pagination
    queryString.delete('p')

    location.search = queryString.toString()
    history.push(location)
  }

  // ? Debouncing is necessary to avoid unnecessary API calls
  const setQueryStringDebounced = useCallback(debounce(setQueryString, 500), [
    location.search,
  ])

  const getQueryStringValue = (key) => {
    const queryString = new URLSearchParams(location.search)
    return queryString.get(key)
  }

  return {
    setQueryString: setQueryStringDebounced,
    getQueryStringValue,
  }
}

export default useQueryString

// import { getQueryStringValue, setQueryStringValue } from './queryString'

// const useQueryString = (key, initialValue, options) => {
//   const [value, setValue] = useState(getQueryStringValue(key) || initialValue)
//   const onSetValue = useCallback(
//     (newValue) => {
//       setValue(newValue)
//       setQueryStringValue(key, newValue)
//     },
//     [key]
//   )

//   return [value, onSetValue]
// }

// export default useQueryString
