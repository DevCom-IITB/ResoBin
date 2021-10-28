import { UserGroup, CloudUpload } from '@styled-icons/heroicons-outline'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components/macro'

import { API } from 'api'
import { ButtonSquare, ButtonSwitch, LoaderAnimation } from 'components/shared'
import { toastError } from 'components/toast'
import { selectUserProfile } from 'store/userSlice'

import { CourseResourceGrid } from './CourseResourceItem'

const CourseResourceContainer = () => {
  const profile = useSelector(selectUserProfile)
  const { courseCode } = useParams()
  const history = useHistory()

  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(false)
  const [requestResource, setRequestResource] = useState({
    status: profile.resourcesRequested?.includes(courseCode) ?? false,
    loading: false,
  })

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true)
        const response = await API.courses.listResources({ code: courseCode })
        setResources(response)
      } catch (error) {
        toastError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [courseCode])

  const redirectContribute = () => {
    history.push(`/contribute?course=${courseCode}`)
  }

  const handleResourceRequest = async () => {
    try {
      setRequestResource((value) => ({ ...value, loading: true }))

      if (requestResource.status) {
        await API.resources.request.remove({ code: courseCode })
      } else {
        await API.resources.request.add({ code: courseCode })
      }

      setRequestResource((value) => ({ ...value, status: !value.status }))
    } catch (error) {
      toastError(error)
    } finally {
      setRequestResource((value) => ({ ...value, loading: false }))
    }
  }

  return loading ? (
    <LoaderAnimation />
  ) : (
    <>
      <Header>
        <h1 style={{ fontSize: '1.25rem' }}>Resources</h1>

        <ButtonContainer>
          <ButtonSwitch
            type="primary"
            $active={requestResource.status}
            onClick={handleResourceRequest}
            style={{ marginRight: '0.75rem' }}
            icon={<UserGroup size="18" style={{ marginRight: '0.25rem' }} />}
            loading={requestResource.loading}
          >
            {!requestResource.status ? <>Request</> : <>Revoke</>}
          </ButtonSwitch>

          <ButtonSquare
            type="primary"
            onClick={redirectContribute}
            icon={<CloudUpload size="18" style={{ marginRight: '0.25rem' }} />}
          >
            Upload
          </ButtonSquare>
        </ButtonContainer>
      </Header>

      <CourseResourceGrid items={resources} />
    </>
  )
}

export default CourseResourceContainer

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`
