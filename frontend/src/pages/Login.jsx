import { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { LoginBody } from 'components/login'
import Navbar from 'components/navbar'
import { loginAction } from 'store/actions/auth'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 4rem);
  background-color: ${({ theme }) => theme.secondary};
`

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 480px;
  padding: 2.5rem 0;
  background-color: ${({ theme }) => theme.darksecondary};
  border-radius: 8px;
  box-shadow: 0px 0px 0.75rem rgba(0, 0, 0, 0.4);
`

const TitleHeader = styled.h4`
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 4px;
  text-align: center;
  color: ${({ theme }) => theme.textColor};
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  text-decoration: none;
  user-select: none;
  text-align: center;
  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 1px;
  }
`

const initialState = {
  username: '',
  password: '',
}

const validCheck = (data) => {
  for (const key in data) if (!data[key]) return false
  return true
}

const Login = ({ loginAction, isAuthenticated }) => {
  const [user, setUser] = useState(initialState)

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((inputs) => ({ ...inputs, [name]: value }))
  }

  const [temp, setTemp] = useState(false)
  if (temp) return <Redirect to="/dashboard" />

  const handleSubmit = (event) => {
    event.preventDefault()
    setTemp(true)

    if (validCheck(user)) {
      loginAction(user)
    }
  }
  if (isAuthenticated) return <Redirect to="/dashboard" />

  return (
    <>
      <Navbar
        button="Sign up"
        buttonLink="/signup"
        shadow="0 0 0.5rem rgba(0, 0, 0, 0.5)"
      />
      <Container>
        <FormBox>
          <TitleHeader>Login to Your Account</TitleHeader>
          <LoginBody
            onChange={handleChange}
            onSubmit={handleSubmit}
            user={user}
          />
          <StyledLink to="/signup">Don't have an account? Sign up!</StyledLink>
        </FormBox>
      </Container>
    </>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { loginAction })(Login)
