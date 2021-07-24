import { Filter, X } from '@styled-icons/heroicons-outline'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

import { CourseBody } from 'components/courses/course-finder'
import { useLocalStorage } from 'hooks'
import { device } from 'styles/responsive'

const Container = styled.div`
  display: flex;

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }
`

const IconContainer = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 1.5rem;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  color: white;
  background: ${({ theme }) => theme.logo};
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.6);
  cursor: pointer;
`

const Favourites = () => {
  const [showFilters, setShowFilters] = useLocalStorage('CourseFilter', true)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Container showFilters={showFilters}>
      <Helmet>
        <title>Favourites - ResoBin</title>
        <meta name="description" content="Your favourite courses" />
      </Helmet>

      <IconContainer showFilters={showFilters} onClick={handleClick}>
        {showFilters ? <X size="1.5rem" /> : <Filter size="1.5rem" />}
      </IconContainer>

      <CourseBody showFilters={false} onClick={handleClick} />
    </Container>
  )
}

export default Favourites
