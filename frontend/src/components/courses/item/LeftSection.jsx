import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  BookmarkOutline as Bookmark,
  Bookmark as BookmarkFill,
} from '@styled-icons/zondicons'

const Container = styled.div`
  width: 80%;
  padding-right: 2.5rem;
  /* background: green; */
`

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 0.25rem;
`

const CourseTitle = styled(Link)`
  font-weight: 300;
  font-size: 1.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};

  &:hover {
    text-decoration: underline;
    text-underline-offset: 1.5px;
    text-decoration-thickness: 2px;
  }
`

const CourseCode = styled.b`
  font-weight: 500;
  font-size: 1.5rem;
  margin-right: 0.5rem;
`

const SubTitle = styled.h2`
  font-weight: 300;
  font-size: 1.1rem;
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};
`

const CourseDescription = styled.p`
  font-weight: 300;
  font-size: 1.1rem;
  line-height: 1.5rem;
  text-align: justify;
  opacity: 80%;
  margin-top: 1rem;
`

const FavouriteStyles = {
  position: 'absolute',
  right: '0',
  width: '1.5rem',
  cursor: 'pointer',
}

const LeftSection = ({ data }) => {
  const coursePage = 'courses/' + data.CourseCode.replace(/\s/g, '')
  const [favourite, setFavourite] = useState(false)

  const handleClick = (e) => {
    setFavourite(!favourite)
  }

  const FavouriteIcon = favourite ? BookmarkFill : Bookmark

  return (
    <Container>
      <Header>
        <CourseTitle to={coursePage}>
          <CourseCode>{data.CourseCode}</CourseCode>
          {data.CourseTitle}
        </CourseTitle>
        <FavouriteIcon style={FavouriteStyles} onClick={handleClick} />
      </Header>

      <Header>
        <SubTitle style={{ marginRight: '0.5rem' }}>{data.Department}</SubTitle>
        |
        <SubTitle style={{ marginLeft: '0.5rem', fontWeight: 600 }}>
          {data.CourseCredit} credits
        </SubTitle>
      </Header>

      <CourseDescription>{data.CourseDescription}</CourseDescription>
    </Container>
  )
}

export default LeftSection
