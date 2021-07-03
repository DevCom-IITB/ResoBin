import {
  Bookmark as BookmarkFill,
  BookmarkOutline as Bookmark,
} from '@styled-icons/zondicons'
import { ReadMore } from 'components/shared'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`

const Header = styled(Link)`
  display: inline;
  align-items: center;
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  font-weight: 400;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 1.5px;
    text-decoration-thickness: 1.5px;
  }
`

const CourseCode = styled.span`
  font-weight: 600;
  font-size: 1.25rem;
  margin-right: 0.5rem;
  text-align: center;
`

const CourseTitle = styled.span`
  grid-area: title;
  font-weight: 400;
  font-size: 1rem;
`

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.textColor};
`

const SubTitle = styled.h4`
  font-weight: 600;
  font-size: 0.75rem;
  width: calc(100% - 3.75rem);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const CourseDescription = styled.p`
  font-weight: 300;
  font-size: 0.8rem;
  line-height: 1rem;
  text-align: justify;
  opacity: 80%;
  margin-top: 1rem;
`

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;

  position: absolute;
  right: 1.75rem;
  font-weight: 700;
  font-size: 1rem;

  color: ${({ theme }) => theme.darksecondary};
  background: white;
  box-shadow: 0px 0px 0.7rem rgba(0, 0, 0, 0.6);
  border-radius: 50%;
`

const FavouriteStyles = {
  position: 'absolute',
  right: '0',
  width: '1rem',
  cursor: 'pointer',
}

const LeftSection = ({ data }) => {
  const coursePage = 'courses/' + data.CourseCode.replace(/\s/g, '')
  const [favourite, setFavourite] = useState(false)

  const favouriteClick = () => {
    setFavourite(!favourite)
  }

  const FavouriteIcon = favourite ? BookmarkFill : Bookmark

  return (
    <Container>
      <SubHeader>
        <SubTitle>{data.Department}</SubTitle>
        <IconContainer>{data.CourseCredit}</IconContainer>
        <FavouriteIcon style={FavouriteStyles} onClick={favouriteClick} />
      </SubHeader>

      <Header to={coursePage}>
        <CourseCode>{data.CourseCode}</CourseCode>
        <CourseTitle>{data.CourseTitle}</CourseTitle>
      </Header>

      <CourseDescription>
        <ReadMore>{data.CourseDescription}</ReadMore>
      </CourseDescription>
    </Container>
  )
}

export default LeftSection
