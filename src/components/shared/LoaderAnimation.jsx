import { Helmet } from 'react-helmet-async'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 0.1rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
`

const LoaderTrack = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 0.1rem;
`

const Anim1 = keyframes`
  0%   {
    right: 100%;
    left: -35%;
  }
  60%  {
    right: -90%;
    left: 100%;
  }
  100% {
    right: -35%;
  left: 100%;
  }
`

const Anim2 = keyframes`
  0%   {
    right: 100%;
    left: -200%;
  }
  60%  {
    right:  -8%;
    left:  107%;
  }

  100% {
    right:  -8%;
    left:  107%;
  }
`

const LoaderFill = styled.div`
  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      -135deg,
      ${({ theme }) => theme.logo} 0%,
      ${({ theme }) => theme.logo} 30%,
      transparent 100%
    );
    will-change: left, right;
  }

  &::before {
    animation: ${Anim1} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }

  &::after {
    animation: ${Anim2} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 1.15s;
  }
`

const LoaderAnimation = () => {
  return (
    <Container>
      <Helmet>
        <title>ResoBin</title>
        <meta name="description" content="Please wait, your page is loading" />
      </Helmet>

      <LoaderTrack>
        <LoaderFill />
      </LoaderTrack>
    </Container>
  )
}

export default LoaderAnimation
