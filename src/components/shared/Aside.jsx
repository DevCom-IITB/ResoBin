import styled from 'styled-components/macro'

import { Divider, LoaderAnimation } from 'components/shared'
import { useResponsive } from 'hooks'

export const AsideHeader = ({ title, subtitle, loading, loadingComponent }) => (
  <>
    <Header>
      <Title>{title}</Title>
      {subtitle}
    </Header>

    <Divider margin="0" />

    {loading && (
      <>
        <LoaderAnimation />
        {loadingComponent}
      </>
    )}
  </>
)

export const AsideContainer = ({
  title,
  subtitle,
  loading,
  loadingComponent,
  visible,
  children,
}) => (
  <Container visible={visible}>
    {title && (
      <AsideHeader loading={loading} title={title} subtitle={subtitle} />
    )}

    {!title && loading && (
      <>
        <LoaderAnimation />
        {loadingComponent}
      </>
    )}

    <Children>{children}</Children>
  </Container>
)

const Aside = (params) => {
  const { isDesktop } = useResponsive()

  return <AsideContainer {...params} visible={isDesktop} />
}

export default Aside

const Container = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.headerHeight};
  right: ${({ visible }) => (visible ? '0' : '-100%')};
  z-index: 5;
  width: ${({ theme }) => theme.asideWidthRight};
  height: calc(100vh - 3rem);
  padding: 0 1rem;
  background: ${({ theme }) => theme.secondary};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transition: right 200ms ease-in;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 2.25rem;
  margin-top: 1rem;
  padding-bottom: 0.5rem;
`

const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
`

const Children = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 1rem 0 20rem;
`
