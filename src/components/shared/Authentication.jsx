import { Button } from 'antd'
import { lighten } from 'polished'
import styled from 'styled-components/macro'

import { fontSize } from 'styles/responsive'

export const AuthBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  margin: auto;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0.75rem rgb(0 0 0 / 20%);
  max-width: 20rem;
  padding: 1.5rem 2rem;

  h4 {
    font-size: ${fontSize.responsive.md};
    font-weight: 400;
    color: ${({ theme }) => theme.textColor};
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
  background-color: ${color};
  border-color: ${color};

  &:hover {
    background-color: ${lighten(0.1, color)};
    border-color: ${lighten(0.1, color)};
  }
    `}
`
