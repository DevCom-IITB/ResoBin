import { Helmet } from 'react-helmet-async'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import NotFoundImg from 'assets/images/NotFound.png'
import { fontSize } from 'styles/responsive'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.secondary};
`

const Subtitle = styled.p`
  font-size: ${fontSize.responsive.xxl};
  font-weight: 300;
  text-align: center;
  color: ${({ theme }) => theme.textColor};
`

const GoBack = styled.button`
  font-size: ${fontSize.responsive.xl};
  font-weight: 400;
  color: inherit;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 1px;
  }
`

const Image = styled.img`
  max-height: 15rem;
`

const NotFound = () => {
  const history = useHistory()

  return (
    <Container>
      <Helmet>
        <title>404 Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>

      <Image src={NotFoundImg} alt="404 Page not found" />

      <Subtitle>
        This page is not available.
        <br />
        <GoBack onClick={history.goBack}>Take me back!</GoBack>
      </Subtitle>
    </Container>
  )
}

export default NotFound
