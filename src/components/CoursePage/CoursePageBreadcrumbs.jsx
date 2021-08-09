import { BookOpen, Home } from '@styled-icons/heroicons-outline'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { useViewportContext } from 'context/ViewportContext'
import { breakpoints } from 'styles/responsive'

const StyledIcon = styled(({ Icon, className, ...props }) => {
  return <Icon {...props} className={className} />
})`
  width: 0.9rem;
  margin-right: 0.25rem;
`

const CoursePageBreadcrumbs = ({ courseTitle }) => {
  const { width } = useViewportContext()
  return (
    width >= breakpoints.md && (
      <StyledBreadcrumb separator=">">
        <Breadcrumb.Item>
          <Link to="/">
            <StyledIcon Icon={Home} />
            <span>Home</span>
          </Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <Link to="/courses">
            <StyledIcon Icon={BookOpen} />
            <span>Courses</span>
          </Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <span>{courseTitle}</span>
        </Breadcrumb.Item>
      </StyledBreadcrumb>
    )
  )
}

export default CoursePageBreadcrumbs

const StyledBreadcrumb = styled(Breadcrumb)`
  display: flex;
  align-items: center;
  height: 3rem;
  margin: 0 1.5rem;
  font-size: 1rem;

  & > span {
    display: flex;
  }

  .ant-breadcrumb-separator {
    color: ${({ theme }) => theme.textColor};
  }

  .ant-breadcrumb-link {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.primary};

    a {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.textColor};

      &:hover {
        text-decoration: underline;
        text-underline-offset: 1px;
      }
    }
  }
`
