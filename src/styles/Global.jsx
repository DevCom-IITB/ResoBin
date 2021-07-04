import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	*,
	*::after,
	*::before {
		margin: 0;
		padding: 0;
		font-family: 'Montserrat', sans-serif;
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-tap-highlight-color: transparent;
	}

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

	body {
		background: ${({ theme }) => theme.primary};
		color: ${({ theme }) => theme.textColor};
		
		margin: 0;
	}
	
	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	}
`
