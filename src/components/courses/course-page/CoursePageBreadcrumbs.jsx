import { BookOpen, Home } from '@styled-icons/heroicons-outline'
import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

const CoursePageBreadcrumbs = ({ courseTitle }) => {
  const location = useLocation()

  return (
    <StyledBreadcrumb separator=">">
      <Breadcrumb.Item>
        <Link to="/">
          <Home size="20" />
          <span>Home</span>
        </Link>
      </Breadcrumb.Item>

      <Breadcrumb.Item>
        <Link to="/courses">
          <BookOpen size="20" />
          <span>Courses</span>
        </Link>
      </Breadcrumb.Item>

      <Breadcrumb.Item>
        <span>{courseTitle}</span>
      </Breadcrumb.Item>
    </StyledBreadcrumb>
  )
}

export default CoursePageBreadcrumbs

const StyledBreadcrumb = styled(Breadcrumb)`
  display: flex;
  align-items: center;
  height: 3rem;
  margin: 0 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;

  & > span {
    display: flex;
  }

  .ant-breadcrumb-link {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    color: ${({ theme }) => theme.darksecondary};

    a {
      display: flex;
      align-items: center;
    }
  }
`
