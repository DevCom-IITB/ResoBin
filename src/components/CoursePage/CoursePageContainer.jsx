import styled from 'styled-components/macro'

import { CourseResourceContainer } from 'components/CourseResource'
import { CourseReviewContainer } from 'components/CourseReview'
import { Tabs } from 'components/shared'
import { device } from 'styles/responsive'

import CoursePageBody from './CoursePageBody'

const CoursePageContainer = ({ courseData }) => {
  const reviewCount = 2
  const resourceCount = 2
  const tabInitialValue = 'reviews'

  return (
    <>
      <CoursePageBody courseData={courseData} />

      <Container>
        <Tabs
          tabHeight="2.25rem"
          tabWidth="7.5rem"
          defaultActiveKey={tabInitialValue}
        >
          <Tabs.TabPane
            key="reviews"
            tab={`Reviews (${reviewCount})`}
            disabled={false}
          >
            <CourseReviewContainer />
          </Tabs.TabPane>

          <Tabs.TabPane
            key="resources"
            tab={`Resources (${resourceCount})`}
            disabled={false}
          >
            <CourseResourceContainer />
          </Tabs.TabPane>
        </Tabs>
      </Container>
    </>
  )
}

export default CoursePageContainer

const Container = styled.div`
  padding: 1.5rem 1rem;
  margin: 0 0.75rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};

  @media ${device.max.md} {
    margin: 1rem 0.75rem;
  }
`
