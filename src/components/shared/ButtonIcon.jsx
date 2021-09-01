import { Button, Tooltip } from 'antd'
import styled from 'styled-components/macro'

import { fontSize } from 'styles/responsive'

const ButtonIconContainer = ({
  children,
  icon,
  onClick,
  defaultstyle = {},
  hoverstyle = {},
  tooltip = null,
  color = null,
}) => {
  const ButtonIcon = (
    <StyledButton
      shape="circle"
      type="text"
      icon={icon}
      onClick={onClick}
      size="large"
      color={color}
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
  color: ${({ color, theme }) => color || theme.textColor};
  ${({ defaultstyle }) => defaultstyle};

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
