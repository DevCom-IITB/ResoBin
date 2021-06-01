import styled, { css } from "styled-components";
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
  font-size: 1rem;
  font-weight: 300;
  transition-duration: 0.25s;
  opacity: 80%;

  &:hover {
    opacity: 100%;
  }

  &:focus {
    background-color: white;
    opacity: 100%;
    color: ${({ theme }) => theme.logo};
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
  background-color: ${({ theme }) => theme.logo};
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 0.25rem;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
  opacity: 80%;

  &:hover {
    opacity: 100%;
  }
  
  &:active {
    opacity: 100%;
    box-shadow: inset 0 0 5px ${HEX2RGBA("#000", 40)};
  }
`
export { StyledInput, StyledTextArea, StyledButton }
