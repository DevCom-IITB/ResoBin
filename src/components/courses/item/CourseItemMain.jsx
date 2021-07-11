import {
  Bookmark as BookmarkFill,
  BookmarkOutline as Bookmark,
} from '@styled-icons/zondicons'
import { ReadMore } from 'components/shared'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { device, fontSize } from 'styles/responsive'

const Container = styled.div`
  width: 100%;

  @media ${device.min.sm} and ${device.max.md}, ${device.lg} {
    margin-right: 1rem;
  }
`

const Header = styled(Link)`
  display: flex;
  align-items: baseline;
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1.5px;
    text-underline-offset: 1.5px;
    color: ${({ theme }) => theme.primary};
  }
`

const CourseCode = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
  font-weight: 600;
  font-size: ${fontSize.responsive.xl};
`

const CourseTitle = styled.span`
  display: inline-block;
  font-weight: 400;
  font-size: ${fontSize.responsive.md};
`

const SubHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 1.75rem;
  margin-bottom: 0.5rem;
`

const SubTitle = styled.span`
  display: inline-block;
  overflow: hidden;
  width: calc(100% - 3.75rem);
  margin: 0;
  font-weight: 600;
  font-size: clamp(0.875rem, 1.75vw, 1rem);
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.textColor};
`

const CourseDescription = styled.p`
  opacity: 80%;
  margin: 0.75rem 0;
  font-weight: 300;
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-family: 'Source Sans Pro', sans-serif;
  text-align: justify;
  color: ${({ theme }) => theme.textColor};
`

const IconContainer = styled.span`
  position: absolute;
  right: 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.darksecondary};
  background: white;
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.6);
`

const FavouriteStyles = {
  position: 'absolute',
  right: '0',
  width: '1rem',
  cursor: 'pointer',
}

const CourseItemMain = ({ data }) => {
  const coursePage = `courses/${data.CourseCode.replace(/\s/g, '')}`
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

export default CourseItemMain
