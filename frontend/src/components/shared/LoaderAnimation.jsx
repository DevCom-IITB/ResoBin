import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.25rem;
  z-index: 10000;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
`

const LoaderTrack = styled.div`
  position: relative;
  height: 0.25rem;
  display: block;
  width: 100%;
  overflow: hidden;
`

const Anim1 = keyframes`
  0%   { left: -35%; right: 100%; }
  60%  { left: 100%; right: -90%; }
  100% { left: 100%; right: -35%; }
`

const Anim2 = keyframes`
  0%   { left: -200%; right: 100%; }
  60%  { left:  107%; right:  -8%; }
  100% { left:  107%; right:  -8%; }
`

const LoaderFill = styled.div`
  &:after,
  &:before {
    content: '';
    background: linear-gradient(
      -135deg,
      ${({ theme }) => theme.logo} 0%,
      ${({ theme }) => theme.logo} 30%,
      ${({ theme }) => theme.darksecondary} 100%
    );
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
  }

  &:before {
    animation: ${Anim1} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }

  &:after {
    animation: ${Anim2} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 1.15s;
  }
`

const LoaderAnimation = () => {
  return (
    <Container>
      <LoaderTrack>
        <LoaderFill />
      </LoaderTrack>
    </Container>
  )
}

export default LoaderAnimation
