import styled from 'styled-components'
import { HEX2RGBA } from 'helpers'

const ButtonSquare = styled.button`
  display: block;
  height: 2.5rem;
  padding: 0 20px;
  margin: 0 0 1.5rem;

  cursor: pointer;
  background-color: ${({ theme }) => theme.logo};
  opacity: 80%;
  color: #fff;
  font-size: 0.9rem;

  border: 0;
  border-radius: 0.25rem;
  box-sizing: border-box;

  &:hover {
    opacity: 100%;
  }

  &:active {
    opacity: 100%;
    box-shadow: inset 0 0 5px ${HEX2RGBA('#000', 40)};
  }
`

export default ButtonSquare
