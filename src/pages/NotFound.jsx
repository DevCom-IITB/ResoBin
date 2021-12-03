import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import NotFoundImg from 'assets/images/NotFound.png'
import { device, fontSize } from 'styles/responsive'

const NotFound = () => {
  const navigate = useNavigate()
  const goHome = () => navigate('/')
  const goBack = () => navigate(-1)

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
          <GoBack onClick={goBack}>Return back</GoBack>, or&nbsp;
          <GoBack onClick={goHome}>take me home!</GoBack>
        </Subtitle>
      </Box>
    </Container>
  )
}

export default NotFound

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.secondary};
  inset: 0;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.75rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.darksecondary};
  border-radius: 8px;
  box-shadow: 0 0 1rem 2px rgb(0 0 0 / 20%);

  @media ${device.min.md} {
    padding: 1rem 2rem;
  }
`

const Subtitle = styled.p`
  margin: 1rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 300;
  font-size: ${fontSize.responsive.$2xl};
  text-align: center;
`

const GoBack = styled.button`
  color: inherit;
  font-weight: 400;
  font-size: ${fontSize.responsive.xl};
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
