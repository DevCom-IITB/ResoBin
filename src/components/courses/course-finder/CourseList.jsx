import { Pagination } from 'antd'
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
                unmountOnExit
                classNames="course_item"
              >
                <CourseItem data={data} />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </List>

      {!loading && (
        <StyledPagination
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

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin: 1rem 0;

  .ant-pagination-prev,
  .ant-pagination-next {
    width: 2rem;
    height: 2rem;
    margin: 0 0.25rem;
    border-radius: 0.5rem;

    .ant-pagination-item-link {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      font-size: 1rem;
      color: inherit;
      background-color: transparent;
    }

    &:hover {
      background: #00000030;
    }
  }

  .ant-pagination-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    margin: 0 0.25rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: transparent;

    &-active {
      background: #00000030;
    }

    a {
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.darksecondary};
    }

    &:hover {
      color: inherit;
      background: #00000030;
    }
  }

  .ant-pagination-jump-next,
  .ant-pagination-jump-prev {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    margin: 0;

    .ant-pagination-item-container .ant-pagination-item-link-icon {
      font-size: 0.75rem;
    }

    .ant-pagination-item-ellipsis {
      position: absolute;
      top: -4px;
      right: 0;
      left: -4px;
      font-size: 0.75rem;
      font-weight: 400;
      color: ${({ theme }) => theme.darksecondary};
    }

    &:hover {
      span {
        color: black;
      }
    }
  }

  .ant-pagination-disabled {
    display: none;
  }
`
