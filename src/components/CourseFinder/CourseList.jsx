import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { CourseItem, CourseItemLoading } from 'components/CourseFinder'
import {
  PageHeading,
  PageTitle,
  NotFoundSearch,
  Pagination,
  PageSubtitle,
} from 'components/shared'
import { useQueryString } from 'hooks'

const CourseFinderList = ({
  title,
  count,
  courseList,
  loading = false,
  setLoading,
}) => {
  const { getQueryString, setQueryString } = useQueryString()
  const pageNo = getQueryString('p') || 1

  const handlePageChange = (page) => {
    setLoading(true)
    setQueryString('p', page)
  }

  return (
    <>
      <PageHeading>
        <PageTitle>{title}</PageTitle>
        {!loading && <PageSubtitle>{count}&nbsp;results found</PageSubtitle>}
      </PageHeading>

      <CourseItemLoading active={loading} />
      <NotFoundSearch active={!loading && !count} />

      <TransitionGroup>
        {!loading &&
          courseList?.map((courseData) => (
            <CSSTransition
              key={courseData.code}
              timeout={200}
              unmountOnExit
              classNames="course_item"
            >
              <CourseItem courseData={courseData} />
            </CSSTransition>
          ))}
      </TransitionGroup>

      {!loading && (
        <Pagination
          defaultPageSize="10"
          defaultCurrent={pageNo}
          responsive
          showSizeChanger={false}
          hideOnSinglePage
          onChange={handlePageChange}
          total={count}
        />
      )}
    </>
  )
}

export default CourseFinderList
