import { Progress } from 'antd'
import styled from 'styled-components/macro'

const StyledProgress = styled(Progress)`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;

  .ant-progress-bg {
    background: ${({ theme }) => theme.logo};
  }

  .ant-progress-text {
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
  }

  .ant-progress-outer {
    padding: 0;
    margin: 0;
  }
`

export default StyledProgress
