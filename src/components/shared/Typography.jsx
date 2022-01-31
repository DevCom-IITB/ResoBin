import { Typography } from 'antd'
import styled from 'styled-components/macro'

import { fontSize } from 'styles/responsive'

export const Paragraph = styled(Typography.Paragraph)`
  color: ${({ theme }) => theme.textColor};
  font-weight: 300;
  font-size: ${fontSize.static.md};
  font-family: 'Source Sans Pro', sans-serif;
  text-align: justify;

  .ant-typography-expand {
    color: ${({ theme }) => theme.textColorInactive};
    font-weight: 600;
    font-size: 80%;
  }
`

export const Link = styled(Typography.Link)`
  font-size: 0.75rem;
`
