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
    background: ${({ theme }) => theme.secondary};
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgb(0 0 0 / 20%);
  }
`

const Container = styled.li`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns:
    [item-main] 1fr
    [item-sub] auto;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 40%);

  /* react animation classes */
  &.course-item-enter {
    transform: scale(1.01);
    opacity: 0;
  }

  &.course-item-enter-active {
    transform: scale(1);
    opacity: 1;
    transition: opacity 200ms, transform 200ms;
  }

  &.course-item-exit {
    transform: scale(1);
    opacity: 1;
  }

  &.course-item-exit-active {
    transform: scale(0.9);
    opacity: 0;
    transition: opacity 100ms, transform 100ms;
  }

  @media ${device.max.md} {
    grid-column-gap: 0;
    grid-template-rows:
      [item-main] 1fr
      [item-divider] auto
      [item-sub] auto;
    grid-template-columns: none;
  }
`

const Main = styled.div`
  grid-area: item-main;
  width: 100%;
`

const Sub = styled.div`
  grid-area: item-sub;

  > div {
    width: 13rem;
  }

  @media ${device.min.xs} and ${device.max.md} {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`
