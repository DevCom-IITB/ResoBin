import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import {
  ButtonSquare,
  LoaderAnimation,
  toast,
  Tabs,
  NotFoundSearch,
} from 'components/shared'
import { API } from 'config/api'

const CourseGradingContainer = () => {
  return (
    <div className="course-grading-container">
      <h1>Course Grading</h1>
      <p>This is the course grading container.</p>
      {/* Additional components and logic will go here */}
    </div>
  )
}

export default CourseGradingContainer
