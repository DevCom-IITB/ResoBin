import { Avatar } from 'antd'
import styled from 'styled-components/macro'

const StyledAvatar = styled(Avatar)`
  width: ${({ size }) => size};
  height: ${({ size }) => size};

  img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

export default StyledAvatar
