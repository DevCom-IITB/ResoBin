import { Skeleton } from 'antd'
import styled from 'styled-components/macro'

import { Divider } from 'components/shared'
import { useResponsive } from 'hooks'
import { device } from 'styles/responsive'

import CourseItemMain from './CourseItemMain'
import CourseItemSub from './CourseItemSub'

export const CourseItemLoading = ({ active }) =>
  active && <StyledSkeleton active />

export const CourseItem = ({ courseData }) => {
  const { isMobile } = useResponsive()

  return (
    <Container>
      <Main>
        <CourseItemMain courseData={courseData} />
      </Main>

      {isMobile && (
        <Divider
          style={{ width: '100%', gridArea: 'item-divider' }}
          margin="1rem 0"
        />
      )}

      <Sub>
        <CourseItemSub courseData={courseData} />
      </Sub>
    </Container>
  )
}

const StyledSkeleton = styled(Skeleton)`
  width: 100%;
  margin: 1rem 0;

  .ant-skeleton-content {
    padding: 1.5rem 1rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.secondary};
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  }
`

const Container = styled.li`
  display: grid;
  grid-template-columns:
    [item-main] 1fr
    [item-sub] auto;
  grid-column-gap: 1rem;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.secondary};
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

  @media ${device.max.md} {
    grid-template-columns: none;
    grid-column-gap: 0;
    grid-template-rows:
      [item-main] 1fr
      [item-divider] auto
      [item-sub] auto;
  }
`

const Main = styled.div`
  grid-area: item-main;
  width: 100%;
`

const Sub = styled.div`
  grid-area: item-sub;

  > div {
    width: 10rem;
  }

  @media ${device.min.xs} and ${device.max.md} {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
`
