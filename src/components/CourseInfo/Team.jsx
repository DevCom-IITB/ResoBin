import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import { API } from 'config/api'
import { fontSize } from 'styles/responsive'

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([])

  useEffect(() => {
    API.profile.group
      .list('Temp Mods')
      .then((response) => {
        return response
      })
      .then((data) => {
        const isaaMember = data.find((member) =>
          member.name.includes('Avani Hasmukh')
        )
        const updatedMembers = isaaMember
          ? [
              isaaMember,
              ...data.filter((member) => !member.name.includes('Avani Hasmukh')),
            ]
          : data

        setTeamMembers(updatedMembers)
        return updatedMembers
      })
      .catch((error) => {
        throw error
      })
  }, [])

  return (
    <TeamContainer>
      {teamMembers.map((member, index) => (
        <TeamMember key={member.id}>
          <ProfilePicture
            src={member.profilePicture}
            alt={member.name}
            isFirstImage={index === 0}
          />
          <MemberName>{member.name}</MemberName>
        </TeamMember>
      ))}
    </TeamContainer>
  )
}

export default Team

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const TeamMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  text-align: center;
`

const ProfilePicture = styled.img`
  width: ${(props) =>
    props.isFirstImage
      ? '125px'
      : '100px'}; // Conditionally set width based on isFirstImage prop
  height: ${(props) =>
    props.isFirstImage
      ? '125px'
      : '100px'}; // Conditionally set height based on isFirstImage prop
  object-fit: cover;
  border-radius: 50%;
`

const MemberName = styled.span`
  margin-top: 30px;
  color: ${({ theme }) => theme.textColor};
  font-size: ${fontSize.responsive.md};
`
