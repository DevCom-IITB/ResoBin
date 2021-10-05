/* eslint-disable import/prefer-default-export */
import { css } from 'styled-components/macro'

export const limitLines = ({ count = 1, height }) => css`
  display: -webkit-box;
  overflow: hidden;
  height: ${height};
  line-height: calc(${height} / ${count});
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${count};
`
