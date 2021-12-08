import { Slider } from 'antd'
import styled from 'styled-components/macro'

const StyledSlider = styled(Slider)`
  .ant-slider-track {
    background: ${({ theme }) => theme.darksecondary};
  }

  .ant-slider-handle,
  .ant-slider-dot {
    border-color: ${({ theme }) => theme.logo};
    background: ${({ theme }) => theme.darksecondary};
  }
`

export default StyledSlider
