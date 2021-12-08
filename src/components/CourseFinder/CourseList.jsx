import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components/macro'

import {
  PageHeading,
  PageTitle,
  NotFoundSearch,
  Pagination,
  PageSubtitle,
  CardSplit,
  CardSplitSkeleton,
} from 'components/shared'
import { useQueryString } from 'hooks'

import { CourseItemMain, CourseItemSub } from './item'

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

      <CardSplitSkeleton active={loading} />
      <NotFoundSearch active={!loading && !count} />

      <TransitionGroup>
        {!loading &&
          courseList?.map((courseData) => (
            <CSSTransition
              key={courseData.code}
              timeout={200}
              unmountOnExit
              classNames="card"
            >
              <CardTransition>
                <CardSplit
                  main={<CourseItemMain courseData={courseData} />}
                  sub={<CourseItemSub courseData={courseData} />}
                  subWidth="13rem"
                />
              </CardTransition>
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

// ? react animation classes
const CardTransition = styled.div`
  margin-bottom: 1rem;

  &.card-enter {
    transform: scale(1.01);
    opacity: 0;
  }

  &.card-enter-active {
    transform: scale(1);
    opacity: 1;
    transition: opacity 200ms, transform 200ms;
  }

  &.card-exit {
    transform: scale(1);
    opacity: 1;
  }

  &.card-exit-active {
    transform: scale(0.9);
    opacity: 0;
    transition: opacity 100ms, transform 100ms;
  }
`
