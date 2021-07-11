import { HEX2RGBA } from 'helpers'
import styled from 'styled-components'

const ButtonSquare = styled.button`
  height: 1.75rem;
  padding: 0 0.75rem;
  border-radius: 0.25rem;
  font-weight: 400;
  font-size: 0.875rem;
  letter-spacing: 1px;
  color: #ffffff;
  background-color: ${({ theme }) => theme.logo};
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 90%;
  }

  &:active {
    box-shadow: inset 0 0 5px ${HEX2RGBA('#000', 40)};
  }
`

export default ButtonSquare
