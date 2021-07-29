import { Skeleton } from 'antd'
import styled from 'styled-components/macro'

import {
  CourseItemMain,
  CourseItemSub,
} from 'components/courses/course-finder/item'
import { HEX2RGBA } from 'helpers'
import { device } from 'styles/responsive'

export const CourseItem = (props) => {
  return (
    <Container>
      <CourseItemMain {...props} />
      <CourseItemSub {...props} />
    </Container>
  )
}

const Container = styled.li`
  width: 100%;
  padding: 1.5rem 1rem 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);

  /* react animation classes */
  &.course_item-enter {
    opacity: 0;
    transform: scale(1.01);
  }

  &.course_item-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 200ms, transform 200ms;
  }

  &.course_item-exit {
    opacity: 1;
    transform: scale(1);
  }

  &.course_item-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 100ms, transform 100ms;
  }

  /* responsiveness */
  @media ${device.min.sm} and ${device.max.md}, ${device.min.xl} {
    display: flex;
  }
`

export const CourseItemLoading = ({ active }) =>
  active && <StyledSkeleton active />

const StyledSkeleton = styled(Skeleton)`
  width: 100%;
  margin: 1rem 0;

  .ant-skeleton-content {
    padding: 1.5rem 1rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => HEX2RGBA(theme.darksecondary, 80)};
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  }
`
