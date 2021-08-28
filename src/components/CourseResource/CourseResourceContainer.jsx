import { Button } from 'antd'
import { useState } from 'react'

import sample from './__mock__/sample.pdf'
import CourseResourceUploadModal from './CourseResourceUploadModal'
import PDFViewer from './PDFViewer'

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
      <PDFViewer file={sample} />
    </>
  )
}

export default CoursePageResourcesContainer
