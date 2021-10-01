import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components/macro'

import { API } from 'api'

import CourseResourceItem from './CourseResourceItem'

const CoursePageResourcesContainer = () => {
  const [resources, setResources] = useState([])
  const { courseCode } = useParams()
  const history = useHistory()

  useEffect(() => {
    const getResources = async () => {
      const response = await API.courses.listResources({ code: courseCode })
      setResources(response)
    }

    getResources()
  }, [courseCode])

  const redirectContribute = () => {
    history.push(`/contribute?course=${courseCode}`)
  }

  return (
    <>
      <h1>Course Resources</h1>

      <Button type="primary" onClick={redirectContribute}>
        Upload resources
      </Button>

      <GridContainer>
        {resources.map((resource) => (
          <CourseResourceItem key={resource.id} resource={resource} />
        ))}
      </GridContainer>
    </>
  )
}

export default CoursePageResourcesContainer

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-auto-rows: 15rem;
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  padding: 1rem 0;
`
