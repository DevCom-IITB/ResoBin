import { Button, Popconfirm, Tooltip } from 'antd'
import { useState } from 'react'
import styled from 'styled-components/macro'
import { ExclamationCircle } from 'styled-icons/heroicons-outline'

import { fontSize } from 'styles/responsive'

const defaultPopoverIcon = (
  <ExclamationCircle
    style={{ position: 'absolute', top: '6px', color: 'red' }}
    size="16"
  />
)

const ButtonIconContainer = ({
  children,
  shape = 'circle',
  size = 'large',
  icon,
  tooltip = null,
  color = null,
  extrastyle = {},
  hoverstyle = {},
  onClick,
  loading,

  // ? popover props
  popover = false,
  popoverIcon = defaultPopoverIcon,
  popoverTitle = 'Are you sure?',
  onConfirm = null,
  onCancel = () => {},
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
        <StyledButton
          shape={shape}
          type="text"
          icon={icon}
          size={size}
          color={color}
          extrastyle={extrastyle}
          hoverstyle={hoverstyle}
          loading={loading}
        >
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
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  color: ${({ color, theme }) => color || theme.textColor};
  ${({ extrastyle }) => extrastyle};

  > svg {
    width: ${({ size }) => fontSize.responsive[size]};
  }

  &:hover {
    color: ${({ color, theme }) => color || theme.textColor};
    background: rgba(0, 0, 0, 0.1);
    ${({ hoverstyle }) => hoverstyle};
  }

  &:focus {
    color: ${({ color, theme }) => color || theme.textColor};
  }
`
