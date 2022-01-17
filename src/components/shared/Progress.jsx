import { Progress } from 'antd'
import styled from 'styled-components/macro'

const StyledProgress = styled(Progress)`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  .ant-progress-bg {
    background: ${({ theme }) => theme.logo};
  }

  .ant-progress-text {
    color: ${({ theme }) => theme.textColor};
    font-weight: 500;
  }

  .ant-progress-outer {
    margin: 0;
    padding: 0;
  }
`

export default StyledProgress
