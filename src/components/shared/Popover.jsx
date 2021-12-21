import { Popover } from 'antd'
import styled from 'styled-components/macro'

const StyledPopover = styled(Popover)`
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

export default StyledPopover
