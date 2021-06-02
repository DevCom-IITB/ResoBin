import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Checkbox } from 'components/shared'

const Container = styled.div`
	display: flex;
  align-items: center;
  justify-content: space-between;
`

const ForgetPass = styled(NavLink)`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  text-decoration: none;
  user-select: none;
`

const LoginUtils = () => {
  return (
    <Container>
      <Checkbox label="Remember me" />
      <ForgetPass to="reset">Forgot password?</ForgetPass>
    </Container>
  )
}

export default LoginUtils
