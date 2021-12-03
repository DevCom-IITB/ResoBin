import { rgba } from 'polished'
import styled, { css } from 'styled-components/macro'

const sharedStyles = css`
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto 1rem;
  padding: 0.375rem 1rem;
  color: ${({ theme }) => theme.activeMenu};
  font-size: 1rem;
  background-color: ${({ theme }) => rgba(theme.darksecondary, 0.7)};
  border: 1px solid ${({ theme }) => rgba(theme.textColor, 0.4)};
  border-radius: 0.25rem;
  outline: 0;
  opacity: 0.8;
  transition-duration: 100ms;

  &:hover {
    opacity: 1;
  }

  &:focus {
    background-color: ${({ theme }) => theme.textInactive};
    opacity: 1;
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
