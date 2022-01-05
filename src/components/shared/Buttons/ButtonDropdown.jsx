import { Dropdown } from 'antd'
import styled from 'styled-components/macro'

import { buttonStyles } from './buttonStyles'

const ButtonDropdown = styled(Dropdown.Button)`
  width: 100%;
  margin-top: 0.5rem;

  .ant-btn {
    ${buttonStyles}

    background: ${({ theme }) => theme.darksecondary};
    width: 100%;
    border-radius: 0;

    &:first-child:not(:last-child) {
      border-top-left-radius: ${({ theme }) => theme.borderRadius};
      border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
    }
  }

  .ant-dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;

    &:last-child:not(:first-child) {
      border-top-right-radius: ${({ theme }) => theme.borderRadius};
      border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
    }
  }
`

export default ButtonDropdown
