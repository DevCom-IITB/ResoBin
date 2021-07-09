import { CourseList, CourseSearch } from 'components/courses'
import { Filters } from 'components/filter'
import { useLocalStorage } from 'hooks'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

const Favourites = () => {
  const [showFilters, setShowFilters] = useLocalStorage('CourseFilter', true)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Container>
      <Helmet>
        <title>Favourites - ResoBin</title>
        <meta name="description" content="Your favourite courses" />
      </Helmet>

      <CourseSearch showFilters={showFilters} onClick={handleClick} />
      <CourseList showFilters={showFilters} />
      <Filters showFilters={showFilters} onClick={handleClick} />
    </Container>
  )
}

export default Favourites
