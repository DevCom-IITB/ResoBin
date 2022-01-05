import styled from 'styled-components/macro'

import { device } from 'styles/responsive'

export const PageHeading = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.75rem;

  @media ${device.max.xs} {
    flex-direction: column;
  }
`

export const PageTitle = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  font-size: 1.5rem;
`

export const PageSubtitle = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  font-size: 0.875rem;
`
