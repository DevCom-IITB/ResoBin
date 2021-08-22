import { Button, Dropdown } from 'antd'
import { lighten } from 'polished'
import styled, { css } from 'styled-components/macro'

const ButtonStyles = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.75rem;
  padding-left: 1rem;
  border: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.darksecondary};

  &:active,
  &:focus {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.darksecondary};
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => lighten(0.4, theme.darksecondary)};
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  }
`

export const ButtonDropdown = styled(Dropdown.Button)`
  width: 100%;
  margin-top: 0.5rem;

  .ant-btn {
    ${ButtonStyles}

    &:first-child:not(:last-child) {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }
  }

  .ant-dropdown-trigger {
    display: flex;
    justify-content: center;
    width: 2rem;
    padding: 0;

    &:last-child:not(:first-child) {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
  }
`

export const ButtonSwitch = styled(Button)`
  ${ButtonStyles}

  padding: 0 1rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;

  &.ant-btn-primary {
    margin-bottom: 1rem;
    background-color: ${({ active, theme }) =>
      lighten(active ? 0.4 : 0, theme.darksecondary)};

    &:hover {
      background: ${({ active, theme }) =>
        lighten(active ? 0.45 : 0.4, theme.darksecondary)};
    }
  }
`
