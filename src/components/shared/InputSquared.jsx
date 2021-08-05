import { rgba } from 'polished'
import styled, { css } from 'styled-components/macro'

const sharedStyles = css`
  box-sizing: border-box;
  display: block;
  opacity: 80%;
  width: 100%;
  padding: 0.375rem 1rem;
  margin: 0 auto 1rem auto;
  border: 1px solid ${({ theme }) => rgba(theme.textColor, 0.4)};
  border-radius: 0.25rem;
  outline: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.activeMenu};
  background-color: ${({ theme }) => rgba(theme.textColor, 0.2)};
  transition-duration: 100ms;

  &:hover {
    opacity: 100%;
  }

  &:focus {
    opacity: 100%;
    background-color: ${({ theme }) => theme.textInactive};
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
