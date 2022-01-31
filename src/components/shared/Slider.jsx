import { Slider } from 'antd'
import styled from 'styled-components/macro'

const StyledSlider = styled(Slider)`
  .ant-slider-track {
    background: ${({ theme }) => theme.darksecondary};
  }

  .ant-slider-handle,
  .ant-slider-dot {
    background: ${({ theme }) => theme.darksecondary};
    border-color: ${({ theme }) => theme.primary};
  }
`

export default StyledSlider
