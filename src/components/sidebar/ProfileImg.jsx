import styled from 'styled-components'

const Image = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	width: 28px;
	pointer-events: none;
	border-radius: 50%;
`

const Border = styled.svg`
  position: absolute;
  width: 34px;
  height: 33.5px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.textColor};
`

const Container = styled.div`
	position: relative;
	width: 34px;
	height: 34px;
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
