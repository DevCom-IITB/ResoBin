import { Button, Tooltip } from 'antd'
import styled from 'styled-components/macro'

import { fontSize } from 'styles/responsive'

const ButtonIconContainer = ({
  children,
  icon,
  tooltip = null,
  color = null,
  defaultstyle = {},
  hoverstyle = {},
  onClick,
}) => {
  return (
    <>
      <Tooltip title={tooltip}>
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
      </Tooltip>
    </>
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
