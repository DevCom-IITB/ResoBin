import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 100ms;
  user-select: none;

  &:hover {
    transform: scale(1.03);
    transition: 100ms;
  }
`

const Title = styled.div`
  color: ${({ theme }) => theme.logo};
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: ${({ size }) => size};
  line-height: 110%;
`

const Underline = styled.div`
  width: 96%;
  height: calc(${({ size }) => size} / 9);
  margin-bottom: 7px;
  background: ${({ theme }) => theme.logo};
`

const ResoBinLogo = ({ size }) => {
  return (
    <Container>
      <Title size={size}>ResoBin</Title>
      <Underline size={size} />
    </Container>
  )
}

export default ResoBinLogo
