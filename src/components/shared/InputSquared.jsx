import styled, { css } from 'styled-components'
import { HEX2RGBA } from 'helpers'

const sharedStyles = css`
  display: block;
  width: 100%;
  padding: 0.5rem 1.25rem;
  margin: 0 auto 1.25rem auto;

  outline: 0;
  border: 1px solid ${({ theme }) => HEX2RGBA(theme.textColor, 40)};
  border-radius: 0.25rem;
  background-color: ${({ theme }) => HEX2RGBA(theme.textColor, 20)};
  box-sizing: border-box;

  color: ${({ theme }) => theme.activeMenu};
  font-size: 1.25rem;
  font-weight: 600;
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

const InputSquared = styled.input`
  ${sharedStyles}
`

const TextAreaSquared = styled.textarea`
  height: 12rem;
  resize: none;
  ${sharedStyles}
`

export { InputSquared, TextAreaSquared }
