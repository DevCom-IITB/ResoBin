import { Button, Tooltip } from 'antd'
import { darken } from 'polished'
import styled from 'styled-components/macro'

import { fontSize } from 'styles/responsive'

const ButtonIconContainer = ({
  children,
  Icon,
  onClick,
  size = 'lg',
  tooltip = null,
}) => {
  const ButtonIcon = (
    <StyledButton
      shape="circle"
      ghost
      icon={Icon && <Icon />}
      onClick={onClick}
      size={size}
    >
      {children}
    </StyledButton>
  )

  return tooltip ? <Tooltip title={tooltip}>{ButtonIcon}</Tooltip> : ButtonIcon
}
export default ButtonIconContainer

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;

  > svg {
    width: ${({ size }) => fontSize.responsive[size]};
  }

  &:hover {
    color: ${({ theme }) => darken(0.3, theme.textColor)};
  }

  &:focus {
    color: ${({ theme }) => theme.textColor};
  }
`
