import { UserAdd } from '@styled-icons/heroicons-outline'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components/macro'

import { API } from 'api'
import { ButtonSquare, LoaderAnimation } from 'components/shared'
import { ButtonSwitch } from 'components/shared/Buttons/Button'
import { toastError } from 'components/toast'
import { selectUserProfile } from 'store/userSlice'

import CourseResourceItem from './CourseResourceItem'

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
      setRequestResource((_requestResource) => ({
        ..._requestResource,
        loading: true,
      }))

      if (requestResource.status) {
        await API.resources.request.remove({ code: courseCode })
      } else {
        await API.resources.request.add({ code: courseCode })
      }
      setRequestResource({
        ...requestResource,
        status: !requestResource.status,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setRequestResource((_requestResource) => ({
        status: !_requestResource.status,
        loading: false,
      }))
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
            active={requestResource.status ? 1 : 0}
            onClick={handleResourceRequest}
            style={{ height: '2rem', marginRight: '0.75rem' }}
          >
            {!requestResource.status ? (
              <>
                <UserAdd size="18" style={{ marginRight: '0.5rem' }} />
                Request
              </>
            ) : (
              <>Cancel request</>
            )}
          </ButtonSwitch>

          <ButtonSquare type="primary" onClick={redirectContribute}>
            Upload
          </ButtonSquare>
        </ButtonContainer>
      </Header>

      <h3>Available resources</h3>

      <GridContainer>
        {resources.map((resource) => (
          <CourseResourceItem key={resource.id} content={resource} />
        ))}
      </GridContainer>
    </>
  )
}

export default CourseResourceContainer

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  grid-auto-rows: 12rem;
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  padding: 1rem 0;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0 1rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
