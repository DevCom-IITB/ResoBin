import { Divider } from 'antd'
import styled from 'styled-components/macro'

import { fontSize } from 'styles/responsive'

const StyledDivider = styled(Divider)`
  width: ${({ type }) => (type === 'horizontal' ? '100%' : 'auto')};
  height: ${({ type }) => (type === 'vertical' ? '100%' : 'auto')};
  margin: ${({ margin }) => margin};
  border-color: ${({ theme }) => theme.dividerColor};

  &.ant-divider-with-text::before,
  &.ant-divider-with-text::after {
    border-color: ${({ theme }) => theme.dividerColor};
  }

  .ant-divider-inner-text {
    color: ${({ theme }) => theme.textColorInactive};
    font-size: ${fontSize.responsive.md};
  }
`

export default StyledDivider
