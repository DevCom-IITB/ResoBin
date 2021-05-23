import React from 'react'
import styled from 'styled-components';
import Img from '../../../assets/images/ProfileImg.jpg'

const Container = styled.div`
	height: 3rem;
	width: 100%;
	padding: 0px 0.75rem;
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
	min-width: 32px;
	min-height: 32px;
`

// h4 is default 1 rem (16px)
const ProfileName = styled.h4`
	font-weight: 300;
	color: ${({ theme }) => theme.textColor};
	margin-left: 1rem;

	max-height: 2.5rem;
	/* text-overflow: ellipsis; */
	overflow: hidden;
	/* white-space: nowrap; */
`

const Profile = () => {
	return (
		<Container>
			<ProfileImg>
				<Image src={Img} />
				<Border />
			</ProfileImg>
			<ProfileName>Laxman Uttam Desai</ProfileName>
		</Container>
	)
}

export default Profile
