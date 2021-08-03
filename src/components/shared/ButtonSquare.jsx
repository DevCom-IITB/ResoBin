import { rgba } from 'polished'
import styled from 'styled-components/macro'

const ButtonSquare = styled.button`
  height: 1.75rem;
  padding: 0 1rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 1px;
  color: #ffffff;
  background-color: ${({ theme }) => theme.logo};
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 90%;
  }

  &:active {
    box-shadow: inset 0 0 5px ${rgba('#000', 0.4)};
  }
`

export default ButtonSquare
