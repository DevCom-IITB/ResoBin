import { Pagination } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { CourseItem } from 'components/courses'
import { PageHeading, PageTitle } from 'components/shared'
import { device } from 'styles/responsive'

const Container = styled.div`
  width: 100%;
  @media ${device.min.lg} {
    padding-right: ${({ theme }) => theme.asideWidth};
    transition: padding-right 200ms ease-in;
  }
`

const Results = styled.span`
  opacity: 80%;
  font-weight: 600;
  font-size: 1rem;
  color: ${({ theme }) => theme.darksecondary};
`

const List = styled.ul`
  margin: 0 0.75rem;
`

const CourseList = ({ courses }) => {
  const count = courses ? courses.length : 0
  const { loading } = useSelector((state) => state.course)

  // pagination
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 10,
  })

  const handlePageChange = (page) => setPageInfo({ ...pageInfo, page })
  const { page, perPage } = pageInfo
  const paginate = (data) => data.slice((page - 1) * perPage, page * perPage)

  return (
    <Container>
      <PageHeading>
        <PageTitle>Courses</PageTitle>
        <Results>
          {count}
          &nbsp;results found
        </Results>
      </PageHeading>

      <List>
        {count > 0 ? (
          paginate(courses).map((data) => (
            <CourseItem data={data} key={data.id} />
          ))
        ) : (
          <h1>
            {loading ? 'Loading courses, please wait...' : 'No results found'}
          </h1>
        )}
      </List>

      <Pagination
        defaultPageSize={perPage}
        responsive
        hideOnSinglePage
        onChange={handlePageChange}
        showSizeChanger={false}
        total={count}
      />
    </Container>
  )
}

export default CourseList
