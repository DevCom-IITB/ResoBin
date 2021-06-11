import { Link, useLocation, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { InputRounded as Input, ButtonSquare } from 'components/shared'
// import { GoogleAuth } from 'components/login'
import { Checkbox } from 'components/shared'
import { Email } from '@styled-icons/material-outlined'
import { LockPassword } from '@styled-icons/remix-line'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userActions from 'store/actions/userActions'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  padding: 0 2rem;
  > * {
    margin-bottom: 1.5rem;
  }
`

const ContainerSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  text-decoration: none;
  user-select: none;
  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 1px;
  }
`

const initialState = {
  email: '',
  password: '',
}

const nullCheck = (data) => {
  for (const key in data) if (!data[key]) return false
  return true
}

const LoginBody = () => {
  const buttonStyle = { fontSize: '1.25rem', width: '100%' }

  const [user, setUser] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)
  // const loggingin = useSelector((state) => state.login.loggingIn)
  const dispatch = useDispatch()
  // const location = useLocation()
  const history = useHistory()

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((inputs) => ({ ...inputs, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)

    if (nullCheck(user)) {
      dispatch(userActions.login(user.email, user.password))
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        name="email"
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        Icon={Email}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
        Icon={LockPassword}
      />

      <ContainerSpaceBetween>
        <Checkbox label="Remember me" />
        <StyledLink to="/forgot-password">Forgot password?</StyledLink>
      </ContainerSpaceBetween>

      <ButtonSquare type="submit" style={buttonStyle}>
        Login
      </ButtonSquare>
      {/* <GoogleAuth /> */}
    </FormContainer>
  )
}

export default LoginBody
