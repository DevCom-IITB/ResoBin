import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const LogoContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;

  &:enabled {
    cursor: pointer;
  }
`

const Title = styled.div`
  font-size: ${({ size }) => size};
  font-family: Montserrat, sans-serif;
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
  const { isAuthenticated } = useSelector((state) => state.auth)
  const history = useHistory()
  const redirectHome = () => history.push('/')

  return (
    <LogoContainer onClick={redirectHome} disabled={!isAuthenticated}>
      <Title size={size}>ResoBin</Title>
      <Underline size={size} />
    </LogoContainer>
  )
}

export default ResoBinLogo
