import { Routes, useLocation } from 'react-router'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components/macro'

const AnimatedRoutes = ({ children }) => {
  const location = useLocation()

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} classNames="page" timeout={200}>
        <Section>
          <Routes location={location}>{children}</Routes>
        </Section>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default AnimatedRoutes

const Section = styled.section`
  &.page-enter {
    opacity: 0;
  }

  &.page-enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in;
  }

  &.page-exit {
    opacity: 1;
  }

  &.page-exit-active {
    opacity: 0;
    transition: opacity 100ms, transform 100ms;
  }
`
