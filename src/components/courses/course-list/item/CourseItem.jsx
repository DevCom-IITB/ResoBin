import { Skeleton } from 'antd'
import styled from 'styled-components'

import {
  CourseItemMain,
  CourseItemSub,
} from 'components/courses/course-list/item'
import { device } from 'styles/responsive'

const Container = styled.li`
  width: 100%;
  padding: 1.5rem 1rem 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);

  @media ${device.min.sm} and ${device.max.md}, ${device.min.xl} {
    display: flex;
  }
`

export const CourseItem = ({ ...props }) => {
  return (
    <Container>
      <CourseItemMain {...props} />
      <CourseItemSub {...props} />
    </Container>
  )
}

export const CourseItemLoading = ({ active }) => active && <Skeleton active />
