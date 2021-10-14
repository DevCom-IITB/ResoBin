import { useLocation, useHistory } from 'react-router-dom'
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
import { device } from 'styles/responsive'

// const CourseList = ({ title, courseCodes, loading = false }) => {
//   const location = useLocation()
//   const history = useHistory()

//   // pagination
//   const count = courseCodes ? courseCodes.length : 0
//   const perPage = 10

//   const searchParams = new URLSearchParams(location.search)
//   const pageNo = searchParams.get('p') || 1

//   const handlePageChange = (page) => {
//     searchParams.set('p', page)
//     history.push({
//       pathname: location.pathname,
//       search: `?${searchParams.toString()}`,
//     })
//   }

//   const paginate = (data) =>
//     data.slice((pageNo - 1) * perPage, pageNo * perPage)

//   return (
//     <Container>
//       <PageHeading>
//         <PageTitle>{title}</PageTitle>
//         <PageSubtitle>{count}&nbsp;results found</PageSubtitle>
//       </PageHeading>

//       <List>
//         <CourseItemLoading active={loading} />
//         <NotFoundSearch active={!loading && !count} />

//         <TransitionGroup>
//           {!loading &&
//             paginate(courseCodes).map((Code) => (
//               <CSSTransition
//                 key={Code}
//                 timeout={200}
//                 unmountOnExit
//                 classNames="course_item"
//               >
//                 <CourseItem courseCode={Code} />
//               </CSSTransition>
//             ))}
//         </TransitionGroup>
//       </List>

//       {!loading && (
//         <Pagination
//           defaultPageSize={perPage}
//           defaultCurrent={pageNo}
//           responsive
//           showSizeChanger={false}
//           hideOnSinglePage
//           onChange={handlePageChange}
//           total={count}
//         />
//       )}
//     </Container>
//   )
// }

const CourseFinderList = ({ title, count, courseList, loading = false }) => {
  const location = useLocation()
  const history = useHistory()

  const searchParams = new URLSearchParams(location.search)
  const pageNo = searchParams.get('p') || 1

  const handlePageChange = (page) => {
    searchParams.set('p', page)

    history.push({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    })
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
            courseList.map((courseData) => (
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
