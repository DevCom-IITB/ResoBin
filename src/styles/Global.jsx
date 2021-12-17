import { createGlobalStyle } from 'styled-components/macro'

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.darksecondary};
  }
  .ant-popover-inner {
      background : ${({ theme }) => theme.darksecondary};

    .ant-popover-title{
      color : ${({ theme }) => theme.textColor};
    }
    .ant-popover-inner-content{
      color : ${({ theme }) => theme.textColorInactive};
    }

  }
`

export default GlobalStyles
