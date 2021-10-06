import { Dropdown } from 'antd'
import styled from 'styled-components/macro'

import buttonStyles from './buttonStyles'

const ButtonDropdown = styled(Dropdown.Button)`
  width: 100%;
  margin-top: 0.5rem;

  .ant-btn {
    ${buttonStyles}

    width: 100%;
    border-radius: 0;

    &:first-child:not(:last-child) {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }
  }

  .ant-dropdown-trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;

    &:last-child:not(:first-child) {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
  }
`

export default ButtonDropdown
