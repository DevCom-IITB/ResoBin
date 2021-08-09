import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

const LogoContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  font-size: ${({ size }) => size};
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  line-height: 110%;
  color: ${({ theme }) => theme.logo};
`

const Underline = styled.div`
  width: 97%;
  height: calc(${({ size }) => size} / 9);
  margin-bottom: 7px;
  background: ${({ theme }) => theme.logo};
`

const ResoBinLogo = ({ size }) => (
  <LogoContainer to="/">
    <Title size={size}>ResoBin</Title>
    <Underline size={size} />
  </LogoContainer>
)

export default ResoBinLogo
