import { UserGroup } from '@styled-icons/heroicons-outline'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Badge, ButtonIcon, ButtonSwitch, toast } from 'components/shared'
import { API } from 'config/api'
import { selectUserProfile } from 'store/userSlice'

export const useCourseContentRequest = ({ code, type, initialCount }) => {
  const profile = useSelector(selectUserProfile)

  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(initialCount)
  const [requestStatus, setRequestStatus] = useState(
    profile[`${type}Requested`]?.includes(code) ?? false
  )

  const handleRequest = async () => {
    try {
      setLoading(true)
      if (requestStatus) {
        await API[type].request.remove({ code })
        setCount(count - 1)
      } else {
        await API[type].request.add({ code })
        setCount(count + 1)
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
    count,
  }
}

// * type = reviews | resources
export const CourseContentRequestSquare = ({ code, type, ...props }) => {
  const { requestStatus, handleRequest, loading } = useCourseContentRequest({
    code,
    type,
  })

  return (
    <ButtonSwitch
      type="primary"
      $active={requestStatus}
      onClick={handleRequest}
      icon={<UserGroup size="16" />}
      loading={loading}
      {...props}
    >
      {requestStatus ? 'Revoke' : 'Request'}
    </ButtonSwitch>
  )
}

export const CourseContentRequestIcon = ({
  code,
  type,
  initialCount,
  ...props
}) => {
  const { requestStatus, handleRequest, loading, count } =
    useCourseContentRequest({ code, type, initialCount })

  return (
    <ButtonIcon
      type="primary"
      shape="round"
      size="default"
      icon={
        initialCount ? (
          <Badge scale={0.625} count={count} overflowCount={9}>
            <UserGroup size="30" />
          </Badge>
        ) : (
          <UserGroup size="20" />
        )
      }
      $active={requestStatus}
      onClick={handleRequest}
      loading={loading}
      style={{ width: '2.5rem', borderRadius: '0 0.5rem 0.5rem 0' }}
      {...props}
    />
  )
}

export default CourseContentRequestSquare
