import { Divider } from 'antd'
import styled from 'styled-components/macro'

const StyledDivider = styled(Divider)`
  width: ${({ type }) => (type === 'horizontal' ? '100%' : '1px')};
  height: ${({ type }) => (type === 'vertical' ? '100%' : '1px')};
  margin: ${({ margin }) => margin};
  background: ${({ theme }) => theme.dividerColor};
`

export default StyledDivider
