import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition-duration: 50ms;
  &:hover {
    transform: scale(1.03);
    transition-duration: 100ms;
  }
`

const Text = styled.div`
	font-family: Montserrat;
	font-style: normal;
	font-weight: 600;
	font-size: 1.75rem;
	line-height: 110%;
	color: ${({ theme }) => theme.logo};
`

const Underline = styled.div`
	width: 96%;
	height: 0.20rem;
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
