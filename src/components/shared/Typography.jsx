/* eslint-disable import/prefer-default-export */
import { Typography } from 'antd'
import styled from 'styled-components/macro'

import { fontSize } from 'styles/responsive'

export const Paragraph = styled(Typography.Paragraph)`
  font-weight: 300;
  font-size: ${fontSize.static.md};
  text-align: justify;
  color: ${({ theme }) => theme.textColor};
  font-family: 'Source Sans Pro', sans-serif;

  .ant-typography-expand {
    color: ${({ theme }) => theme.textColorInactive};
    font-weight: 600;
    font-size: 80%;
  }
`

export const Text = styled(Typography.Text)`
  font-weight: 300;
  font-size: ${fontSize.static.md};
  text-align: justify;
  color: ${({ theme }) => theme.textColor};
`
