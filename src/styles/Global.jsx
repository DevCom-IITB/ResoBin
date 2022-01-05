import { createGlobalStyle } from 'styled-components/macro'

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.darksecondary};
  }

  a {
    color: ${({ theme }) => theme.primary};

    &:hover {
      text-decoration: underline;
    }
  }
`

export default GlobalStyles
