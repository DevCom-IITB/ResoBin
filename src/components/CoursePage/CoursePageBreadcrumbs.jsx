import { BookOpen, Home } from '@styled-icons/heroicons-outline'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { useResponsive } from 'hooks'

const CoursePageBreadcrumbs = ({ courseTitle }) => {
  const { isMobile } = useResponsive()
  if (isMobile) return null

  return (
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
}

export default CoursePageBreadcrumbs

const StyledBreadcrumb = styled(Breadcrumb)`
  display: flex;
  align-items: center;
  margin: 0.75rem;
  font-size: 1rem;

  & > span {
    display: flex;
  }

  .ant-breadcrumb-separator {
    color: ${({ theme }) => theme.textColor};
    margin: 0 1rem;
  }

  .ant-breadcrumb-link {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.primary};

    a {
      display: flex;
      align-items: flex-start;
      color: ${({ theme }) => theme.textColor};

      &:hover {
        text-decoration: underline;
        text-underline-offset: 1px;
      }
    }
  }
`

const StyledIcon = styled(({ Icon, className, ...props }) => {
  return <Icon {...props} size="20" className={className} />
})`
  margin-right: 0.25rem;
`
