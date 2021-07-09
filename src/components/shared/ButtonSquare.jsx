import { HEX2RGBA } from 'helpers'
import styled from 'styled-components'

const ButtonSquare = styled.button`
  box-sizing: border-box;
  display: block;
  opacity: 100%;
  height: 2.5rem;
  padding: 0 20px;

  /* margin: 0 0 1.5rem; */
  border: 0;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  color: #ffffff;
  background-color: ${({ theme }) => theme.logo};
  cursor: pointer;

  &:hover {
    opacity: 90%;
  }

  &:active {
    opacity: 90%;
    box-shadow: inset 0 0 5px ${HEX2RGBA('#000', 40)};
  }
`

export default ButtonSquare
