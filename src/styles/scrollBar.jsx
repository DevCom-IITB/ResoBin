import { css } from 'styled-components'
import { HEX2RGBA } from 'helpers'

const scrollBar = css`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.75rem;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => HEX2RGBA(theme.textColor, 10)};
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.textColorInactive};
    border-radius: 2rem;
  }
`

export { scrollBar }
