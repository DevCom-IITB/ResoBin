import { Descriptions } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { UserAvatar } from 'components/shared'
import { selectUserProfile } from 'store/userSlice'

const Profile = () => {
  const profile = useSelector(selectUserProfile)

  return (
    <FlexVerticalGap>
      <UserAvatar size={72} src={profile?.profilePicture} />

      <UserInfo>
        <h2>{profile.name}</h2>
        <span>({profile.ldapId})</span>
      </UserInfo>

      <StyledDescriptions column={1} layout="vertical">
        <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>

        <Descriptions.Item label="Department">
          {profile.department}
        </Descriptions.Item>
      </StyledDescriptions>

      <StyledDescriptions column={1} layout="vertical">
        <Descriptions.Item label="Favorites courses">
          {profile.favoriteCourses.length
            ? profile.favoriteCourses.join(', ')
            : 'None'}
        </Descriptions.Item>

        <Descriptions.Item label="Resources requested for">
          {profile.resourcesRequested.length
            ? profile.resourcesRequested.join(', ')
            : 'None'}
        </Descriptions.Item>

        <Descriptions.Item label="Reviews requested for">
          {profile.reviewsRequested.length
            ? profile.reviewsRequested.join(', ')
            : 'None'}
        </Descriptions.Item>
      </StyledDescriptions>
    </FlexVerticalGap>
  )
}

export default Profile

const FlexVerticalGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`

const StyledDescriptions = styled(Descriptions)`
  padding: 0.75rem 0.75rem 0;
  background: ${({ theme }) => theme.darksecondary};
  border-radius: ${({ theme }) => theme.borderRadius};

  .ant-descriptions-item {
    padding-bottom: 0.25rem;
  }

  .ant-descriptions-item-label {
    color: ${({ theme }) => theme.primary};
    font-weight: 400;
    font-size: 0.75rem;
  }

  .ant-descriptions-item-content {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.textColor};
  }
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.textColor};

  h2 {
    font-weight: 500;
    font-size: 0.875rem;
  }
`
