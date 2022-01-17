import { Button } from 'antd'
import { lighten } from 'polished'
import styled from 'styled-components/macro'

import { buttonStyles } from './buttonStyles'

// ? ref: https://styled-components.com/docs/api#transient-props
const ButtonSwitch = styled(Button)`
  ${buttonStyles}

  background: ${({ theme }) => theme.darksecondary};

  &.ant-btn-primary {
    background: ${({ $active, theme }) =>
      lighten($active ? 0.4 : 0, theme.darksecondary)};

    &:hover {
      background: ${({ $active, theme }) =>
        lighten($active ? 0.45 : 0.4, theme.darksecondary)};
    }
  }
`

export default ButtonSwitch
