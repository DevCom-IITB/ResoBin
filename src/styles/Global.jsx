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

  #toolbar {
    background: ${({ theme }) => theme.darksecondary};
    color : ${({ theme }) => theme.textColor};
    border-radius: 0.5rem;
    border: none;
  }

  .ql-snow .ql-stroke {
    fill: none;
    stroke: ${({ theme }) => theme.textColor};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }

  .ql-snow .ql-picker-label::before {
    color: ${({ theme }) => theme.textColor}
  }
`

export default GlobalStyles
