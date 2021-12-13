import { UserOutlined } from '@ant-design/icons'
import { Descriptions } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { UserAvatar } from 'components/shared'
import { selectUserProfile } from 'store/userSlice'

const Profile = () => {

    const profile = useSelector(selectUserProfile)
    
    return (
        <>
            <AvatarContainer>
                <UserAvatar size={72} src={profile?.profilePicture}/>
            </AvatarContainer>
            
            <StyledDescriptions 
            // title="User Info"
            column={1}
            >
                <Descriptions.Item label="Name">{profile.name}</Descriptions.Item>
                <Descriptions.Item label="Department">{profile.department}</Descriptions.Item>
                <Descriptions.Item label="LDAP ID">{profile.ldapId}</Descriptions.Item>
                <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
            </StyledDescriptions>
        </>
    )
}

export default Profile


const StyledDescriptions = styled(Descriptions)`
    padding-left: 0.5rem;

    .ant-descriptions-title{
        color: ${({ theme }) => theme.textColor};
    }  
    .ant-descriptions-item{
        padding-bottom:0.75rem;
    }
    .ant-descriptions-item-label{
        color: ${({ theme }) => theme.primary};
    }
    .ant-descriptions-item-content{
        color: ${({ theme }) => theme.textColor};
    }
`

const AvatarContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
`

