import styled from 'styled-components/macro'

import { device } from 'styles/responsive'

export const PageHeading = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0.5rem 0.75rem;
`

export const PageTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`

export const PageSubtitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
`

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  padding: 0 0.75rem;
  transition: margin 200ms ease-in;

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }

  @media ${device.min.lg} {
    margin-right: ${({ theme }) => theme.asideWidthRight};
  }
`
