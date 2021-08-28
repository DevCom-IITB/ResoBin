import { Button } from 'antd'
import { useState } from 'react'

import CourseResourceUploadModal from './CourseResourceUploadModal'

const CoursePageResourcesContainer = () => {
  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true)

  return (
    <>
      <h1>Course Resources</h1>

      <Button type="primary" onClick={showModal}>
        Upload resources
      </Button>

      <CourseResourceUploadModal visible={visible} setVisible={setVisible} />
    </>
  )
}

export default CoursePageResourcesContainer