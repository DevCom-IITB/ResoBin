import { css } from 'styled-components'

const scrollBar = css`
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 2rem;
  }
`

export { scrollBar }
