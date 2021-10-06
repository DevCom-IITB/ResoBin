import { Button } from 'antd'
import { rgba } from 'polished'
import styled from 'styled-components/macro'

import buttonStyles from './buttonStyles'

const ButtonSquare = styled(Button)`
  ${buttonStyles}

  background-color: ${({ theme }) => theme.logo};

  &:hover,
  &:active {
    opacity: 90%;
    background-color: ${({ theme }) => theme.logo};
  }

  &:active {
    box-shadow: inset 0 0 5px ${rgba('#000', 0.4)};
  }
`

export default ButtonSquare
