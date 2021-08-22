import { Tabs } from 'components/shared'

import { CoursePageResourcesContainer } from './CoursePageResources'
import { CoursePageReviewsContainer } from './CoursePageReviews'

const CoursePageBottomTabs = () => {
  const reviewCount = 2
  const resourceCount = 2
  const tabInitialValue = 'reviews'

  return (
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
        <CoursePageReviewsContainer />
      </Tabs.TabPane>

      <Tabs.TabPane
        key="resources"
        tab={`Resources (${resourceCount})`}
        disabled={false}
      >
        <CoursePageResourcesContainer />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default CoursePageBottomTabs
