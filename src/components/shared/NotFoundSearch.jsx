import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import NotFoundSearchImg from 'assets/images/NotFoundSearch.png'

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
        <StyledLink to="/contact">Contact us</StyledLink>
      </Content>
    </Container>
  )

export default NotFoundSearch

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #ffffff;
  text-align: center;
`

const Title = styled.h1`
  margin: 1rem 0 0.5rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  font-size: 1.75rem;
`

const Content = styled.p`
  max-width: 22rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
  font-size: 0.875rem;
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
`

const StyledLink = styled(Link)`
  color: inherit;
  font-weight: 500;
  font-size: 0.75rem;

  &:hover {
    color: inherit;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 1px;
  }
`

const Image = styled.img`
  max-width: 12rem;
  margin-top: 2rem;
`
