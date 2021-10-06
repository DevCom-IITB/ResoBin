import { lighten } from 'polished'
import { css } from 'styled-components/macro'

const buttonStyles = css`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.darksecondary};

  &:active,
  &:focus {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.darksecondary};
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => lighten(0.4, theme.darksecondary)};
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  }
`

export default buttonStyles
