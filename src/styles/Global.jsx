import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.primary};
  }
`

export default GlobalStyles
