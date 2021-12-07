import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import NotFoundImg from 'assets/images/NotFound.png'
import { PageContainer } from 'components/shared'
import { device, fontSize } from 'styles/responsive'

const NotFound = () => {
  const navigate = useNavigate()
  const goHome = () => navigate('/')
  const goBack = () => navigate(-1)

  return (
    <PageContainer disable={['aside']}>
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
    </PageContainer>
  )
}

export default NotFound

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.75rem;
  padding: 1rem;

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
