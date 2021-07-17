import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: 100ms;

  &:hover {
    transform: scale(1.03);
    transition: 100ms;
  }
`

const Title = styled.div`
  font-size: ${({ size }) => size};
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: 110%;
  color: ${({ theme }) => theme.logo};
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
