import { CloudUpload } from '@styled-icons/heroicons-outline'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components/macro'

import { API } from 'api'
import { CourseContentRequest } from 'components/CoursePage'
import { ButtonSquare, LoaderAnimation } from 'components/shared'
import { toastError } from 'components/toast'

import { CourseResourceGrid } from './CourseResourceItem'

const CourseResourceContainer = () => {
  const { courseCode } = useParams()
  const history = useHistory()

  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(false)

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

  if (loading) return <LoaderAnimation />

  return (
    <>
      <Header>
        <h1 style={{ fontSize: '1.25rem' }}>Resources</h1>

        <ButtonContainer>
          <CourseContentRequest
            code={courseCode}
            type="resources"
            style={{ marginRight: '0.75rem' }}
          />

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
