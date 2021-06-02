import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
  align-items: center;
  justify-content: space-between;
`

const RememberMe = styled.div`
	display: block;
`

const RememberMeCheckbox = styled.input`
  cursor: pointer;
  display: none;
`

const RememberMeLabel = styled.label`
  margin-left: 0.25rem;
  position: relative;
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  text-decoration: none;
  cursor: pointer;
  user-select: none;

  &:before {
    content: '';
    appearance: none;
    border: 2px solid ${({ theme }) => theme.textColor};

    padding: 0.35rem;
    display: inline-block;
    top: 2px;
    left: 0.275rem;
    position: relative;
    margin-right: 1rem;
  }

  ${RememberMeCheckbox}:checked + &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 10px;
    width: 4px;
    height: 9px;
    border: solid ${({ theme }) => theme.textColor};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  /* ${RememberMeCheckbox}:checked ~ &:before {
    background: ${({ theme }) => theme.textColor};
  } */
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
      <RememberMe>
				<RememberMeCheckbox type="checkbox" id="rememberMe" />
				<RememberMeLabel for="rememberMe">Remember me</RememberMeLabel>
      </RememberMe>
			<ForgetPass to="reset">Forgot password?</ForgetPass>
    </Container>
  )
}

export default LoginUtils
