import { Badge } from 'antd'
import styled from 'styled-components/macro'

const StyledBadge = styled(Badge)`
  transform: scale(${({ scale }) => scale});
  color: ${({ theme }) => theme.textColor};

  .ant-badge-count {
    box-shadow: none;
  }
`

export default StyledBadge
