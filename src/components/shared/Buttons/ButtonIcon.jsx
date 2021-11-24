import { Button, Popconfirm, Tooltip } from 'antd'
import { lighten } from 'polished'
import { useState } from 'react'
import styled from 'styled-components/macro'
import { ExclamationCircle } from 'styled-icons/heroicons-outline'

import { fontSize } from 'styles/responsive'

import { buttonStyles } from './buttonStyles'

const defaultPopoverIcon = (
  <ExclamationCircle
    style={{ position: 'absolute', top: '6px', color: 'red' }}
    size="16"
  />
)

const ButtonIconContainer = ({
  children,

  // ? popover props
  popover = false,
  popoverIcon = defaultPopoverIcon,
  popoverTitle = 'Are you sure?',
  onConfirm = null,
  onCancel = () => {},

  // ? button props
  shape = 'circle',
  size = 'large',
  tooltip = null,
  onClick,
  ...props
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false)

  const handleVisibleChange = (visible) => {
    if (!visible) {
      setPopoverVisible(false)
      return
    }

    if (popover) setPopoverVisible(true)
    else if (onConfirm) onConfirm()
    else onClick()
  }

  return (
    <Popconfirm
      title={popoverTitle}
      icon={popoverIcon}
      visible={popoverVisible}
      onVisibleChange={handleVisibleChange}
      onConfirm={onConfirm || onClick}
      onCancel={onCancel}
      okText="Yes"
    >
      <Tooltip title={tooltip}>
        <StyledButton shape={shape} type="text" size={size} {...props}>
          {children}
        </StyledButton>
      </Tooltip>
    </Popconfirm>
  )
}

export const ButtonIconDanger = ({ extrastyle, color, ...props }) => (
  <ButtonIconContainer
    {...props}
    color={color || 'red'}
    extrastyle={{ color: '#ff5050', ...extrastyle }}
  />
)

export default ButtonIconContainer

const StyledButton = styled(Button)`
  ${buttonStyles}

  justify-content: center;
  color: ${({ color }) => color};
  ${({ extrastyle }) => extrastyle};

  > svg {
    width: ${({ size }) => fontSize.responsive[size]};
  }

  &:hover {
    color: ${({ color }) => color};
    background: rgba(0, 0, 0, 0.1);
    ${({ hoverstyle }) => hoverstyle};
  }

  &:focus {
    color: ${({ color }) => color};
  }

  &.ant-btn-primary {
    background-color: ${({ $active, theme }) =>
      lighten($active ? 0.4 : 0, theme.darksecondary)};

    &:hover {
      background: ${({ $active, theme }) =>
        lighten($active ? 0.45 : 0.4, theme.darksecondary)};
    }
  }
`
