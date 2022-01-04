import styled from 'styled-components/macro'

const ResoBinLogo = ({ size }) => (
  <div>
    <Title size={size}>ResoBin</Title>
    <Underline size={size} />
  </div>
)

export default ResoBinLogo

const Title = styled.div`
  color: ${({ theme }) => theme.logo};
  font-weight: 600;
  font-size: ${({ size }) => size};
  font-family: Montserrat, sans-serif;
  line-height: 110%;
`

const Underline = styled.div`
  width: 100%;
  height: calc(${({ size }) => size} / 9);
  margin-bottom: 7px;
  background: ${({ theme }) => theme.logo};
`
