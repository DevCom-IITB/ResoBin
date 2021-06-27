import styled from 'styled-components'
import { useLocalStorage } from 'hooks'
import { CourseList, CourseSearch, Filters } from 'components/courses'

const Container = styled.div`
  display: flex;
  margin: 0rem 0 0 11.5rem;
`

const Favourites = () => {
  const [showFilters, setShowFilters] = useLocalStorage('CourseFilter', true)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Container>
      <CourseSearch showFilters={showFilters} onClick={handleClick} />
      <CourseList showFilters={showFilters} />
      <Filters showFilters={showFilters} onClick={handleClick} />
    </Container>
  )
}

export default Favourites
