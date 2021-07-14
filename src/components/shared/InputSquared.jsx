import styled, { css } from 'styled-components'

import { HEX2RGBA } from 'helpers'

const sharedStyles = css`
  box-sizing: border-box;
  display: block;
  opacity: 80%;
  width: 100%;
  padding: 0.5rem 1.25rem;
  margin: 0 auto 1.25rem auto;
  border: 1px solid ${({ theme }) => HEX2RGBA(theme.textColor, 40)};
  border-radius: 0.25rem;
  outline: 0;
  font-weight: 600;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.activeMenu};
  background-color: ${({ theme }) => HEX2RGBA(theme.textColor, 20)};
  transition-duration: 100ms;

  &:hover {
    opacity: 100%;
  }

  &:focus {
    opacity: 100%;
    color: #1f1c2e;
    background-color: white;
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
