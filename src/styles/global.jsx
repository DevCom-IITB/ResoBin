import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }
    
    body {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.textColor};
        font-family: 'Mulish', sans-serif;
        height: 100vh;
        margin: 0;
        padding: 0;
        transition: all 0.25 linear;
    }
`
