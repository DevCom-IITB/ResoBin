import React from 'react'
import styled from 'styled-components';
import ProfileImg from '@app/components/sidebar/ProfileImg'

const Container = styled.div`
	min-height: 4rem;
	width: 100%;
	padding: 0px 0.75rem;

	display: flex;
	align-items: center;

	border-left: 3px solid transparent;
	background-color: ${(props) => props.theme.secondary};
`

const IconContainer = styled.div`
	width: 30%; /* 60px */
	min-height: 100%;

	display: flex;
	align-items: center;
`

const Title = styled.h4`
	font-weight: 200;
	color: ${({ theme }) => theme.textColor};
	width: 70%;

	text-overflow: ellipsis;
	overflow: hidden;
	letter-spacing: 1.5px;
	white-space: nowrap;
`

const ProfileImgItem = ({ title, src }) => {
    return (
		<Container>
			<IconContainer>
				<ProfileImg src={src} />
			</IconContainer>
			<Title>{title}</Title>
		</Container>
	)
}

export default ProfileImgItem
