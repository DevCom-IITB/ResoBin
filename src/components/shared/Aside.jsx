import styled from 'styled-components/macro'

import { Divider, LoaderAnimation } from 'components/shared'

const Aside = ({ title, subtitle, loading, visible, children }) => {
  return (
    <Container visible={visible}>
      {title && (
        <>
          <Header>
            <Title>{title}</Title>
            {subtitle}
          </Header>

          <Divider />
        </>
      )}
      {loading && <LoaderAnimation />}

      <Children>{children}</Children>
    </Container>
  )
}

export default Aside

const Container = styled.div`
  position: fixed;
  top: 3rem;
  right: ${({ visible }) => (visible ? '0' : '-100%')};
  z-index: 5;
  width: ${({ theme }) => theme.asideWidthRight};
  height: calc(100% - 3rem);
  padding: 1rem;
  background: ${({ theme }) => theme.secondary};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transition: right 200ms ease-in;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 2.25rem;
  padding-bottom: 0.5rem;
`

const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.textColor};
`

const Children = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 1rem 0 20rem;
`
