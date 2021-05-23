import React from 'react'
import styled from 'styled-components';
import Img from '../../assets/images/ProfileImg.jpg'

const Container = styled.div`
	display: flex;
	align-items: center;
`

const Image = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	
	width: 29px;
	pointer-events: none;
	border-radius: 50%;
`

const Border = styled.svg`
	position: absolute;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	border: 1px solid #dfe0eb;
`

const ProfileImg = styled.div`
	position: relative;
	width: 32px;
	height: 32px;
`

const ProfileName = styled.h1`
	font-size: 1rem;
	font-weight: 300;
	color: ${({ theme }) => theme.textColor};
`

const Profile = () => {
	return (
		<Container>
			<ProfileImg>
				<Image src={Img} />
				<Border />
			</ProfileImg>
			<ProfileName>Laxman Desai</ProfileName>
		</Container>
	)
}

export default Profile
