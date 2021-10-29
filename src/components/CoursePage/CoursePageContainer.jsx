import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { CourseResourceContainer } from 'components/CourseResource'
import { CourseReviewContainer } from 'components/CourseReview'
import { Aside, Tabs } from 'components/shared'

import CoursePageBody from './CoursePageBody'

const CoursePageContainer = ({ courseData }) => {
  const { hash } = useLocation()

  return (
    <>
      <CoursePageBody courseData={courseData} />

      <Container>
        <Tabs
          tabheight="2.25rem"
          tabwidth="7.5rem"
          animated
          defaultActiveKey={hash.split('#')[1]}
        >
          <Tabs.TabPane
            key="reviews"
            tab={`Reviews (${courseData.reviews?.length})`}
          >
            <CourseReviewContainer />
          </Tabs.TabPane>

          <Tabs.TabPane
            key="resources"
            tab={`Resources (${courseData.resources?.length})`}
          >
            <CourseResourceContainer />
          </Tabs.TabPane>
        </Tabs>
      </Container>

      <Aside title="Course stats">
        <h1>Hello World</h1>
      </Aside>
    </>
  )
}

export default CoursePageContainer

const Container = styled.div`
  padding: 1.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
`
