import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components/macro'

const PageTransition = ({ children, page }) => {
  return (
    <TransitionGroup>
      <CSSTransition key={page} timeout={300} classNames="page" exit={false}>
        <Section>{children}</Section>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default PageTransition

const Section = styled.section`
  &.page-enter {
    opacity: 0;
  }

  &.page-enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in;
  }

  /* &.page-exit {
    opacity: 1;
  }

  &.page-exit-active {
    opacity: 0;
    transition: opacity 100ms, transform 100ms;
  } */
`
