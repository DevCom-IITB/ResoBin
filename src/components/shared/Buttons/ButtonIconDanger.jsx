import { Popconfirm } from 'antd'
import { useState } from 'react'
import { ExclamationCircle } from 'styled-icons/heroicons-outline'

import ButtonIcon from './ButtonIcon'

const defaultPopoverIcon = (
  <ExclamationCircle
    style={{ position: 'absolute', top: '6px', color: 'red' }}
    size="16"
  />
)

const ButtonIconDanger = ({
  children,
  icon,
  tooltip = null,
  // ? button props
  defaultstyle = {},
  onClick,
  hoverstyle = {},
  color = null,
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
      <ButtonIcon
        icon={icon}
        tooltip={tooltip}
        color={color || 'red'}
        defaultstyle={{ color: '#ff5050', ...defaultstyle }}
        hoverstyle={hoverstyle}
      >
        {children}
      </ButtonIcon>
    </Popconfirm>
  )
}

export default ButtonIconDanger
