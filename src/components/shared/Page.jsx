import styled from 'styled-components/macro'

import { device } from 'styles/responsive'

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
