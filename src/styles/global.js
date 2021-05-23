import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700;800;900&display=swap');

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
