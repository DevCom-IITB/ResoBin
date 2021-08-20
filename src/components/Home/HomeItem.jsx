import styled from 'styled-components/macro'

import { device } from 'styles/responsive'

const HomeItem = () => {
  return (
    <Container>
      <h1>Home Page</h1>
    </Container>
  )
}

export default HomeItem

const Container = styled.li`
  display: grid;
  grid-template-columns:
    [item-main] 1fr
    [item-sub] auto;
  grid-column-gap: 1rem;
  width: 100%;
  padding: 1.5rem 1rem 1rem;
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

  /* @media ${device.min.sm} and ${device.max.md}, ${device.min.xl} {} */
`
