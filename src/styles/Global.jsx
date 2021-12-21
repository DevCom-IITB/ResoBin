import { createGlobalStyle } from 'styled-components/macro'

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.darksecondary};
  }
`

export default GlobalStyles
