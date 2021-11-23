import { UserGroup } from '@styled-icons/heroicons-outline'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { API } from 'api'
import { ButtonSwitch } from 'components/shared'
import { toastError } from 'components/toast'
import { selectUserProfile } from 'store/userSlice'

// * type = reviews | resources
const CourseContentRequest = ({ code, type, ...props }) => {
  const profile = useSelector(selectUserProfile)

  const [loading, setLoading] = useState(false)
  const [requestStatus, setRequestStatus] = useState(
    profile[`${type}Requested`]?.includes(code) ?? false
  )

  const handleRequest = async () => {
    try {
      setLoading(true)
      if (requestStatus) {
        await API[type].request.remove({ code })
      } else {
        await API[type].request.add({ code })
      }

      setRequestStatus(!requestStatus)
    } catch (error) {
      toastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ButtonSwitch
      type="primary"
      $active={requestStatus}
      onClick={handleRequest}
      icon={<UserGroup size="18" style={{ marginRight: '0.25rem' }} />}
      loading={loading}
      {...props}
    >
      {requestStatus ? 'Revoke' : 'Request'}
    </ButtonSwitch>
  )
}

export default CourseContentRequest
