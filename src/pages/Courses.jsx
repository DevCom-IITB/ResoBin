import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { useLocalStorage } from 'hooks'
import { CourseList, CourseSearch, Filters } from 'components/courses'
import { scrollBar } from 'styles'

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 4rem calc(100vh - 8rem);
  grid-template-columns: 1fr 19rem;
  grid-template-areas:
    'searchbar filter'
    'courselist filter';

  ${({ showFilters }) =>
    showFilters
      ? `
    grid-template-columns: 1fr 19rem;
    grid-template-areas:
      'searchbar filter'
      'courselist filter';
        `
      : `
        grid-template-columns: 1fr;
        grid-template-areas:
          'searchbar'
          'courselist';
        `};
  /* @media (max-width: 992px) {
    grid-template-rows: 4rem calc(100vh - 4rem);
    grid-template-columns: auto;

    grid-template-areas:
      'navbar'
      'content';
  } */
`

const CourseSearchContainer = styled.div`
  grid-area: searchbar;
  background-color: transparent;
`

const CourseListContainer = styled.div`
  grid-area: courselist;
  overflow: auto;
  ${scrollBar}/* @media (max-width: 992px) {
    display: none;
  } */
`

const FiltersContainer = styled.div`
  grid-area: filter;
  overflow: auto;
  display: ${({ showFilters }) => (showFilters ? '' : 'none')};
`

const Test1 = styled.div`
  height: 100vh;
  background: blue;
`

const Test2 = styled.div`
  background: red;
`

const Test3 = styled.div`
  background: green;
`

const Test4 = styled.div`
  background: yellow;
`

const Courses = () => {
  const [showFilters, setShowFilters] = useLocalStorage('CourseFilter', true)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  return (
    <>
      <Helmet>
        <title>Courses - ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>
      <GridContainer showFilters={showFilters}>
        <CourseSearchContainer>
          {/* <Test1>Hello World</Test1> */}
          <CourseSearch showFilters={showFilters} onClick={handleClick} />
        </CourseSearchContainer>

        <CourseListContainer>
          {/* <Test2>Hello World</Test2> */}
          <CourseList showFilters={showFilters} />
        </CourseListContainer>

        <FiltersContainer showFilters={showFilters}>
          {/* <Test3>Hello World</Test3> */}
          <Filters showFilters={showFilters} onClick={handleClick} />
        </FiltersContainer>
      </GridContainer>
    </>
  )
}

export default Courses
