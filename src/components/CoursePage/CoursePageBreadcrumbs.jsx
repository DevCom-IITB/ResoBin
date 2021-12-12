import { BookOpen, Home, ChevronRight } from '@styled-icons/heroicons-outline'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { useResponsive } from 'hooks'

const CoursePageBreadcrumbs = ({ courseTitle }) => {
  const { isMobileS } = useResponsive()
  if (isMobileS) return null

  return (
    <StyledBreadcrumb separator={<StyledIcon Icon={ChevronRight} />}>
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
  margin: 1rem;
  font-size: 1rem;

  & > span {
    display: flex;
  }

  .ant-breadcrumb-link {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.primary};

    a {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      color: ${({ theme }) => theme.textColor};

      &:hover {
        text-decoration: underline;
        text-underline-offset: 1px;
      }
    }
  }
`

const StyledIcon = styled(({ Icon, className, ...props }) => (
  <Icon {...props} className={className} />
))`
  height: 24px;
  color: ${({ theme }) => theme.textColor};
`
