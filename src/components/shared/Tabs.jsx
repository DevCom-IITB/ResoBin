import { Tabs } from 'antd'
import { rgba, darken } from 'polished'
import styled from 'styled-components/macro'

const StyledTabs = styled(Tabs)`
  color: ${({ theme }) => theme.textColor};

  .ant-tabs-nav {
    margin-bottom: 0.5rem;

    .ant-tabs-ink-bar {
      height: 3px;
      background: ${({ theme }) => theme.textColor};
    }
  }

  .ant-tabs-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ tabWidth }) => tabWidth};
    height: ${({ tabHeight }) => tabHeight};
    padding: 0;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    font-size: 0.75rem;

    & + .ant-tabs-tab {
      margin: 0;
    }

    .ant-tabs-tab-btn {
      color: ${({ theme }) => theme.textColor};
    }

    /* Disabled button */
    &.ant-tabs-tab-disabled {
      .ant-tabs-tab-btn,
      .ant-tabs-tab-btn:active {
        color: ${({ theme }) => rgba(theme.textColor, 0.2)};
      }
    }

    /* Normal button */
    &:not(.ant-tabs-tab-disabled) {
      &:hover {
        color: ${({ theme }) => darken(0.2, theme.textColor)};
      }

      &.ant-tabs-tab-active {
        color: ${({ theme }) => theme.textColor};
        background: ${({ theme }) => theme.darksecondary};
      }

      &:not(.ant-tabs-tab-active):hover {
        background: ${rgba('#000000', 0.15)};
      }
    }
  }
`

export default StyledTabs
