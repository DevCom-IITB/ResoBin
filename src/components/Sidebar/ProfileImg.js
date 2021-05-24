import React from 'react'
import styled from 'styled-components'

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

const Container = styled.div`
	position: relative;
	width: 32px;
	height: 32px;
	text-align: initial;
`

const ProfileImg = ({ src }) => {
	return (
		<Container>
			<Image src={src} />
			<Border />
		</Container>
	)
}

export default ProfileImg
