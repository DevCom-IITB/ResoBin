import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components/macro'

import { CourseItem, CourseItemLoading } from 'components/CourseFinder'
import {
  PageHeading,
  PageTitle,
  NotFoundSearch,
  Pagination,
  PageSubtitle,
} from 'components/shared'
import { useQueryString } from 'hooks'
import { device } from 'styles/responsive'

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
    <Container>
      <PageHeading>
        <PageTitle>{title}</PageTitle>
        {count !== undefined && (
          <PageSubtitle>{count}&nbsp;results found</PageSubtitle>
        )}
      </PageHeading>

      <List>
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
      </List>

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
    </Container>
  )
}

export default CourseFinderList

const Container = styled.div`
  width: 100%;
  @media ${device.min.lg} {
    padding-right: ${({ theme }) => theme.asideWidthRight};
    transition: padding-right 200ms ease-in;
  }
`

const List = styled.ul`
  margin: 0 0.75rem;
`
