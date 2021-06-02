import styled, { css } from 'styled-components'
import HEX2RGBA from 'helpers/HEX2RGBA'

const sharedStyles = css`
  display: block;
  width: 100%;
  padding: 0.75rem 1.25rem;
  margin: 0 auto 1.5rem auto;

  outline: 0;
  border: 1px solid ${({ theme }) => HEX2RGBA(theme.textColor, 40)};
  border-radius: 0.25rem;
  background-color: ${({ theme }) => HEX2RGBA(theme.textColor, 20)};
  box-sizing: border-box;

  color: ${({ theme }) => theme.activeMenu};
  font-size: 1.25rem;
  font-weight: 500;
  transition-duration: 100ms;
  opacity: 80%;

  &:hover {
    opacity: 100%;
  }

  &:focus {
    background-color: white;
    opacity: 100%;
    color: #1f1c2e;
  }
`

const StyledInput = styled.input`
  ${sharedStyles}
`

const StyledTextArea = styled.textarea`
  min-height: 200px;
  resize: none;
  ${sharedStyles}
`

const StyledButton = styled.button`
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

export { StyledInput, StyledTextArea, StyledButton }
