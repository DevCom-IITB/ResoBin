import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import NotFoundSearchImg from 'assets/images/NotFoundSearch.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #ffffff;
`

const Title = styled.h1`
  margin: 1rem 0 0.5rem;
  font-size: 1.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.darksecondary};
`

const Content = styled.p`
  max-width: 22rem;
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.secondary};
`

const StyledLink = styled(Link)`
  font-size: 0.75rem;
  font-weight: 500;
  color: inherit;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 1px;
    color: inherit;
  }
`

const Image = styled.img`
  max-width: 12rem;
  margin-top: 2rem;
`

const NotFoundSearch = ({ active }) =>
  active && (
    <Container>
      <Image src={NotFoundSearchImg} alt="No results found" />
      <Title>No results found</Title>

      <Content>
        Try adjusting your search or filter to find what you&rsquo;re looking
        for.
      </Content>

      <Content style={{ fontSize: '0.75rem' }}>
        Think this is an error?&nbsp;
        <StyledLink to="contact">Contact us</StyledLink>
      </Content>
    </Container>
  )

export default NotFoundSearch
