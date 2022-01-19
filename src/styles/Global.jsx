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

  /* Popover global styles */
  .ant-popover-inner,
  .ant-popover-arrow-content {
    background: ${({ theme }) => theme.darksecondary};
  }

  .ant-popover-title {
    color: ${({ theme }) => theme.textColor};
    border-bottom: 1px solid ${({ theme }) => theme.dividerColor};
  }

  .ant-popover-inner-content {
    color: ${({ theme }) => theme.textColorInactive};
  }
`

export default GlobalStyles
