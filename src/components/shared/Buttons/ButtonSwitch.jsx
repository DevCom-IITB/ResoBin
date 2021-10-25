import { Button } from 'antd'
import { lighten } from 'polished'
import styled from 'styled-components/macro'

import buttonStyles from './buttonStyles'

const ButtonSwitch = styled(Button)`
  ${buttonStyles}

  &.ant-btn-primary {
    background-color: ${({ $active, theme }) =>
      lighten($active ? 0.4 : 0, theme.darksecondary)};

    &:hover {
      background: ${({ $active, theme }) =>
        lighten($active ? 0.45 : 0.4, theme.darksecondary)};
    }
  }
`

export default ButtonSwitch
