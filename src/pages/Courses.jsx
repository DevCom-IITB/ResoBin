import { Filter, X } from '@styled-icons/heroicons-outline'
import { CourseList, Filters } from 'components/courses'
import { useLocalStorage } from 'hooks'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  position: fixed;
  right: 2rem;
  bottom: 1.5rem;

  color: white;
  background: ${({ theme }) => theme.logo};
  box-shadow: 0px 0px 0.7rem rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
`

const Courses = () => {
  const [showFilters, setShowFilters] = useLocalStorage('CourseFilter', true)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Container showFilters={showFilters}>
      <Helmet>
        <title>Courses - ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>

      <IconContainer showFilters={showFilters} onClick={handleClick}>
        {showFilters ? <X size="1.5rem" /> : <Filter size="1.5rem" />}
      </IconContainer>

      <CourseList showFilters={showFilters} onClick={handleClick} />

      <Filters showFilters={showFilters} onClick={handleClick} />
    </Container>
  )
}

export default Courses
