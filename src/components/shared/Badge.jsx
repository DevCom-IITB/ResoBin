import { Badge } from 'antd'
import styled from 'styled-components/macro'

const StyledBadge = styled(Badge)`
  color: ${({ theme }) => theme.textColor};
  transform: scale(${({ scale }) => scale});

  .ant-badge-count {
    box-shadow: none;
  }
`

export default StyledBadge
