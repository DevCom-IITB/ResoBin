import { Button } from 'antd'
import { lighten } from 'polished'
import styled from 'styled-components/macro'

import { fontSize } from 'styles/responsive'

export const AuthBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  justify-content: flex-start;
  max-width: 20rem;
  margin: auto;
  padding: 1.5rem 2rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0.75rem rgb(0 0 0 / 20%);

  h4 {
    color: ${({ theme }) => theme.textColor};
    font-weight: 400;
    font-size: ${fontSize.responsive.md};
  }
`

export const AuthButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.responsive.sm};
  padding: 0.875rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};

  ${({ color }) =>
    color &&
    `
  background: ${color};
  border-color: ${color};

  &:hover {
    background: ${lighten(0.1, color)};
    border-color: ${lighten(0.1, color)};
  }
    `}
`
