import { Pagination } from 'antd'
import { useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components/macro'

import { CourseItem, CourseItemLoading } from 'components/courses/course-finder'
import { PageHeading, PageTitle, NotFoundSearch } from 'components/shared'
import { device } from 'styles/responsive'

const Container = styled.div`
  width: 100%;
  @media ${device.min.lg} {
    padding-right: ${({ theme }) => theme.asideWidthRight};
    transition: padding-right 200ms ease-in;
  }
`

const Results = styled.span`
  opacity: 80%;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.darksecondary};
`

const List = styled.ul`
  margin: 0 0.75rem;
`

const CourseList = ({ courses, loading = false }) => {
  const location = useLocation()
  const history = useHistory()

  // pagination
  const count = courses ? courses.length : 0
  const perPage = 10

  const searchParams = new URLSearchParams(location.search)
  const pageNo = searchParams.get('p') || 1

  const handlePageChange = (page) => {
    searchParams.set('p', page)
    history.push({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    })
  }

  const paginate = (data) =>
    data.slice((pageNo - 1) * perPage, pageNo * perPage)

  return (
    <Container>
      <PageHeading>
        <PageTitle>Courses</PageTitle>
        <Results>{count}&nbsp;results found</Results>
      </PageHeading>

      <List>
        <CourseItemLoading active={loading} />
        <NotFoundSearch active={!loading && !count} />
        <TransitionGroup>
          {!loading &&
            paginate(courses).map((data) => (
              <CSSTransition
                key={data.Code}
                timeout={200}
                classNames="course_item"
              >
                <CourseItem data={data} />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </List>

      {!loading && (
        <Pagination
          defaultPageSize={perPage}
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

export default CourseList
