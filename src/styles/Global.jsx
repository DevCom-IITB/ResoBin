import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	*,
	*::after,
	*::before {
		margin: 0;
		padding: 0;
		font-family: 'Montserrat', sans-serif;
		font-size: 80%;
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-tap-highlight-color: transparent;
	}
	
	body {
		background: ${({ theme }) => theme.primary};
		color: ${({ theme }) => theme.textColor};
	}
	
	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	}
`
