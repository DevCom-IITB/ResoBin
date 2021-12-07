import styled from 'styled-components/macro'

import { Header } from 'components/header'
import { Menu } from 'components/menu'
import { device } from 'styles/responsive'

import Footer from './Footer'

export const PageHeading = styled.h3`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 0.5rem 0.75rem;
`

export const PageTitle = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  font-size: 1.5rem;
`

export const PageSubtitle = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  font-size: 1rem;
`

const PageContainerLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${({ theme }) => theme.headerHeight});
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

export const PageContainer = ({ disable = [], children }) => (
  <>
    {!disable.includes('header') && <Header />}
    {!disable.includes('menu') && <Menu />}
    <PageContainerLayout disable={disable}>
      {children}

      {!disable.includes('footer') && <Footer />}
    </PageContainerLayout>
  </>
)
