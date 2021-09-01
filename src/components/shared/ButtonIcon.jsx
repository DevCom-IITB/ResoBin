import { Button, Tooltip } from 'antd'
import styled from 'styled-components/macro'

import { fontSize } from 'styles/responsive'

const ButtonIconContainer = ({
  children,
  icon,
  onClick,
  defaultstyle = {},
  hoverstyle = {},
  size = 'lg',
  tooltip = null,
}) => {
  const ButtonIcon = (
    <StyledButton
      shape="circle"
      ghost
      icon={icon}
      onClick={onClick}
      size={size}
      defaultstyle={defaultstyle}
      hoverstyle={hoverstyle}
    >
      {children}
    </StyledButton>
  )

  return tooltip ? (
    <Tooltip zIndex={5} title={tooltip}>
      {ButtonIcon}
    </Tooltip>
  ) : (
    ButtonIcon
  )
}

export default ButtonIconContainer

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  ${({ defaultstyle }) => defaultstyle};

  > svg {
    width: ${({ size }) => fontSize.responsive[size]};
  }

  &:hover {
    ${({ hoverstyle }) => hoverstyle};
  }

  &:focus {
    color: ${({ theme }) => theme.textColor};
  }
`
