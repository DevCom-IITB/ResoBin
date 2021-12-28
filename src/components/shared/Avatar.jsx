import { User } from '@styled-icons/heroicons-outline'
import { Avatar } from 'antd'
import styled from 'styled-components/macro'

import { useResponsive } from 'hooks'
import { useColorPicker } from 'styles/utils'

const StyledAvatar = styled(Avatar)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ size }) => size};
  min-height: ${({ size }) => size};
  color: ${({ theme }) => theme.darksecondary};

  img {
    width: 100%;
    height: 100%;
  }
`

export const UserAvatar = ({
  size: initialSize,
  src,
  alt = 'Profile picture',
}) => {
  const colorPicker = useColorPicker()
  const { isMobileS } = useResponsive()

  const size = isMobileS ? '1rem' : initialSize ?? '2rem'

  if (src) return <StyledAvatar size={size} src={src} alt={alt} />

  return (
    <StyledAvatar
      size={size}
      icon={<User size={`calc(${size}/1.5)`} />}
      style={{ backgroundColor: colorPicker() }}
      alt={alt}
    />
  )
}

export default StyledAvatar
