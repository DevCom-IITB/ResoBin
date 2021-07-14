import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.darksecondary};
    > * {
      background: ${({ theme }) => theme.primary};
    }
  }
`

export default GlobalStyles
