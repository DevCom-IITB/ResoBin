import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.primary};
  }
`

export default GlobalStyles
