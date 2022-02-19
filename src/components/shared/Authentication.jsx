import { Button } from 'antd'
import { lighten } from 'polished'
import styled from 'styled-components/macro'

import { fontSize } from 'styles/responsive'

export const AuthBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  justify-content: flex-start;
  max-width: 20rem;
  margin: auto;
  padding: 1.5rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0.75rem rgb(0 0 0 / 20%);
  color: ${({ theme }) => theme.textColor};

  h1 {
    font-weight: 400;
    font-size: ${fontSize.responsive.xl};
    text-align: center;
  }

  span {
    text-align: center;
  }
`

export const AuthButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
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
