import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import { API } from 'api'

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

      {resources.map((resource) => (
        <div key={resource.id}>
          <h2>
            <a href={resource.file}>{resource.title}</a>
          </h2>
          <p>{resource.description}</p>
        </div>
      ))}
      {/* <CourseResourceItem /> */}
    </>
  )
}

export default CoursePageResourcesContainer
