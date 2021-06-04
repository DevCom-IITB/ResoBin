import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  margin: 12rem 0 0 11.5rem;
  text-align: center;
  color: black;
  opacity: 0.7;
`

const Title = styled.h1`
  font-size: 6.2rem;
  font-weight: 200;
  margin-bottom: 4rem;
`

const Subtitle = styled.p`
  font-size: 2.3rem;
  margin-bottom: 1rem;
`

const StyledLink = styled(Link)`
  font-size: 2.3rem;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 2px;
  margin-bottom: 4rem;
  color: black;
`

const NotFound = () => {
  return (
    <Container>
      <Title>404 Not Found</Title>
      <Subtitle>The link you requested does not exist.</Subtitle>
      <StyledLink to="/">Take me home!</StyledLink>
    </Container>
  )
}

export default NotFound
