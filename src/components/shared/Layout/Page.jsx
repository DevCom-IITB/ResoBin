import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { Header } from 'components/Header'
import { Menu } from 'components/Menu'
import { selectIsAuthenticated } from 'store/authSlice'
import { device } from 'styles/responsive'

import Footer from './Footer'

const PageContainer = ({ disable = [], children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  if (!isAuthenticated) disable.push('menu')

  return (
    <>
      {!disable.includes('header') && <Header />}
      {!disable.includes('menu') && <Menu />}
      <PageContainerLayout disable={disable}>
        {children}
        {!disable.includes('footer') && <Footer />}
      </PageContainerLayout>
    </>
  )
}

export default PageContainer

const PageContainerLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  padding: 0 0.75rem;
  transition: margin 200ms ease-in;

  ${({ disable, theme }) =>
    !disable.includes('menu') &&
    `
    @media ${device.min.md} {
      margin-left: ${theme.asideWidthLeft};
    }
    `}

   ${({ disable, theme }) =>
    !disable.includes('aside') &&
    `
    @media ${device.min.lg} {
      margin-right: ${theme.asideWidthRight};
    }
    `}
`
