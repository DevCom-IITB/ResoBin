import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	&:hover {
		transform: scale(1.03);
		transition-duration: 200ms;
	}
`

const Text = styled.div`
	font-family: Montserrat;
	font-style: normal;
	font-weight: 600;
	font-size: 36px;
	line-height: 110%;
	color: ${({ theme }) => theme.logo};
`

const Underline = styled.div`
	width: 148px;
	height: 4.5px;
	margin-bottom: 7px;
	background: ${({ theme }) => theme.logo};
`

const ResoBinLogo = () => {
    return (
        <Container>
            <Text> ResoBin </Text>
            <Underline/>
        </Container>
    )
}

export default ResoBinLogo
