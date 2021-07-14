import styled from 'styled-components'

export const PageHeading = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0.5rem 1.5rem;
`

export const PageTitle = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.darksecondary};
`
