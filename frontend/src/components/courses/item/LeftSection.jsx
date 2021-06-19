import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Bookmark } from '@styled-icons/heroicons-outline'

const Container = styled.div`
  width: 80%;
  margin-right: 1rem;
  /* background: green; */
`

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 0.5rem;
`

const CourseTitle = styled(Link)`
  font-weight: 300;
  font-size: 1.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};

  &:hover {
    text-decoration: underline;
  }
`

const CourseCode = styled.b`
  font-weight: 500;
  font-size: 1.5rem;
  margin-right: 0.5rem;
`

const CourseDescription = styled.p`
  font-weight: 300;
  font-size: 1.1rem;
  line-height: 1.25rem;
  text-align: justify;
  opacity: 80%;
`

const Favourite = styled(Bookmark)`
  position: absolute;
  right: 0;
  width: 1.5rem;
`

const LeftSection = ({ data }) => {
  const coursePage = 'courses/' + data.CourseCode.replace(/\s/g, '')

  return (
    <Container>
      <Header>
        <CourseTitle to={coursePage}>
          <CourseCode>{data.CourseCode}</CourseCode>
          {data.CourseTitle}
        </CourseTitle>
        <Favourite
          onClick={() => {
            alert('clicked')
          }}
        />
      </Header>
      <CourseDescription>{data.CourseDescription}</CourseDescription>
    </Container>
  )
}

export default LeftSection
