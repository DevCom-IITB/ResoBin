import { User } from '@styled-icons/heroicons-outline'
import { Avatar } from 'antd'
import styled from 'styled-components/macro'

const StyledAvatar = styled(Avatar)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ size }) => size};
  min-height: ${({ size }) => size};
  border: 1px solid ${({ theme }) => theme.textColor};

  img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

export const UserAvatar = ({ size = '2rem', src, alt = 'Profile picture' }) => {
  return src ? (
    <StyledAvatar size={size} src={src} alt={alt} />
  ) : (
    <StyledAvatar
      size={size}
      icon={<User size={`calc(${size}/1.5)`} />}
      style={{ backgroundColor: '#87d068' }}
      alt={alt}
    />
  )
}

export default StyledAvatar
