import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { SignupBody } from 'components/signup'
import Navbar from 'components/navbar'
import { signupAction } from 'store/actions/auth'
import { setLoading } from 'features/loadingSlice'

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
  fullname: '',
  username: '',
  email: '',
  password: '',
  passwordAgain: '',
}

const validCheck = (data) => {
  for (const key in data) if (!data[key]) return false
  if (data.password !== data.passwordAgain) return false
  return true
}

const Signup = () => {
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const history = useHistory()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((user) => ({ ...user, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (validCheck(user)) {
      dispatch(setLoading(true))
      dispatch(signupAction(user))
      history.push('/login')
    }
  }

  if (isAuthenticated) return <Redirect to="/dashboard" />

  return (
    <>
      <Navbar
        button="Login"
        buttonLink="/login"
        shadow="0 0 0.5rem rgba(0, 0, 0, 0.5)"
      />
      <Container>
        <FormBox>
          <TitleHeader>Create an Account</TitleHeader>
          <SignupBody
            onChange={handleChange}
            onSubmit={handleSubmit}
            user={user}
          />
          <StyledLink to="/login">Already have an account? Login!</StyledLink>
        </FormBox>
      </Container>
    </>
  )
}

export default Signup
