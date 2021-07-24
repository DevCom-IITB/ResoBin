import { Helmet } from 'react-helmet-async'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import NotFoundImg from 'assets/images/NotFound.png'
import { device, fontSize } from 'styles/responsive'

const Container = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 0.75rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 1rem 2px rgba(0, 0, 0, 0.2);

  @media ${device.min.md} {
    padding: 1rem 2rem;
  }
`

const Subtitle = styled.p`
  margin: 1rem;
  font-size: ${fontSize.responsive.$2xl};
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
  width: clamp(13rem, 30vw, 20rem);
`

const NotFound = () => {
  const history = useHistory()

  return (
    <Container>
      <Helmet>
        <title>404 Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Box>
        <Image src={NotFoundImg} alt="404 Page not found" />

        <Subtitle>
          This page is not available.
          <br />
          <GoBack onClick={history.goBack}>Take me back!</GoBack>
        </Subtitle>
      </Box>
    </Container>
  )
}

export default NotFound
