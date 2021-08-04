import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { CourseList } from 'components/courses/course-finder'
import { selectAllFavourites } from 'store/userSlice'

const FavouritesContainer = () => {
  const favouriteCourses = useSelector(selectAllFavourites)

  return (
    <Container>
      <CourseList courseCodes={favouriteCourses} loading={false} />
    </Container>
  )
}

export default FavouritesContainer

const Container = styled.div`
  width: 100%;
`
