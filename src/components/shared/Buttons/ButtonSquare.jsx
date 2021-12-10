import { Button } from 'antd'
import { rgba } from 'polished'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { buttonStyles } from './buttonStyles'

const ButtonSquare = styled(Button)`
  ${buttonStyles}
  background: ${({ theme }) => theme.ssecondary};

  &.ant-btn-primary {
    background: ${({ theme }) => theme.logo};
  }

  &:hover,
  &:active {
    opacity: 0.9;
  }

  &:active {
    box-shadow: inset 0 0 5px ${rgba('#000', 0.4)};
  }
`

export const ButtonSquareLink = styled(Link)`
  ${buttonStyles}

  padding: 0.25rem 0.75rem;
  background: ${({ type, theme }) =>
    type === 'primary' ? theme.logo : theme.darksecondary};

  &:hover,
  &:active {
    background: ${({ type, theme }) =>
      type === 'primary' ? theme.logoHover : theme.darksecondaryHover};
    box-shadow: inset 0 0 5px ${rgba('#000', 0.1)};
  }
`

export default ButtonSquare
