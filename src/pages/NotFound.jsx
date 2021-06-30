import { Helmet } from 'react-helmet-async'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textColor};
`

const Title = styled.h1`
  font-size: 6.2rem;
  font-weight: 400;
  margin-bottom: 2rem;
`

const Subtitle = styled.p`
  font-size: 2.4rem;
  font-weight: 200;
  margin-bottom: 1rem;
`

const StyledLink = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  font-size: 2.3rem;
  font-weight: 200;
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 2px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
`

const NotFound = () => {
  let history = useHistory()
  return (
    <Container>
      <Helmet>
        <title>Page Not Found</title>
        <meta
          name="description"
          content="The page you were searching for does not exist"
        />
      </Helmet>

      <Title>404 Not Found</Title>
      <Subtitle>The link you requested does not exist.</Subtitle>
      <StyledLink onClick={history.goBack}>Go back</StyledLink>
    </Container>
  )
}

export default NotFound
