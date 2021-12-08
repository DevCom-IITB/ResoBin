import { Switch } from 'antd'
import styled from 'styled-components/macro'

const SwitchContainer = styled.div`
  .ant-switch {
    display: flex;
    align-items: center;

    .ant-switch-inner {
      position: relative;
      right: -0.25rem;
    }
  }

  .ant-switch-checked {
    background: ${({ theme }) => theme.logo};

    .ant-switch-inner {
      left: -0.25rem;
    }
  }
`

const StyledSwitch = (props) => (
  <SwitchContainer>
    <Switch {...props} />
  </SwitchContainer>
)

export default StyledSwitch
