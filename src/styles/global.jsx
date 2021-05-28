import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
	    margin: 0;
        padding: 0;
        font-family: 'Mulish', sans-serif;
      	font-size: 16px;
        box-sizing: border-box;
    	-webkit-font-smoothing: antialiased;
    	-moz-osx-font-smoothing: grayscale;
    }
    
    body {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.textColor};
        font-family: 'Mulish', sans-serif;
        height: 100vh;
        margin: 0;
        padding: 0;
    }
    
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
`
