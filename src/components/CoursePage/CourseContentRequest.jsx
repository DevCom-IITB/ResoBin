import { UserGroup } from '@styled-icons/heroicons-outline'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { API } from 'api'
import { ButtonIcon, ButtonSwitch, toast } from 'components/shared'
import { selectUserProfile } from 'store/userSlice'

export const useCourseContentRequest = ({ code, type }) => {
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
      toast({ status: 'error', content: error })
    } finally {
      setLoading(false)
    }
  }

  return {
    requestStatus,
    handleRequest,
    loading,
  }
}

// * type = reviews | resources
const CourseContentRequestButtonSquare = ({ code, type, ...props }) => {
  const { requestStatus, handleRequest, loading } = useCourseContentRequest({
    code,
    type,
  })

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

export const CourseContentRequestButtonIcon = ({ code, type, ...props }) => {
  const { requestStatus, handleRequest, loading } = useCourseContentRequest({
    code,
    type,
  })

  return (
    <ButtonIcon
      type="primary"
      color="white"
      shape="round"
      size="default"
      icon={<UserGroup size="18" />}
      $active={requestStatus}
      onClick={handleRequest}
      loading={loading}
      {...props}
    />
  )
}

export default CourseContentRequestButtonSquare
