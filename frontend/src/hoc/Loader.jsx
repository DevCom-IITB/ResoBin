import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 1035;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
`

const LoaderTrack = styled.div`
  position: relative;
  height: 3px;
  display: block;
  width: 100%;
  overflow: hidden;
`

const LoaderFill = styled.div`
  &:after,
  &:before {
    content: '';
    background: $theme-color;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
  }

  &:before {
    animation: mbar 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }

  &:after {
    animation: m_s 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 1.15s;
  }
`

const Loader = () => {
  return (
    <Container>
      <LoaderTrack>
        <LoaderFill />
      </LoaderTrack>
    </Container>
  )
}

export default Loader
