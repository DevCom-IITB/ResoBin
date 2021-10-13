import { Helmet } from 'react-helmet-async'
import styled from 'styled-components/macro'

import { ContributeContainer } from 'components/contribute'
import { device } from 'styles/responsive'

const Contribute = () => {
  return (
    <Container>
      <Helmet>
        <title>Contribute - ResoBin</title>
        <meta name="description" content="Upload and share your own notes" />
      </Helmet>

      <ContributeContainer />
    </Container>
  )
}

export default Contribute

const Container = styled.div`
  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }
`
