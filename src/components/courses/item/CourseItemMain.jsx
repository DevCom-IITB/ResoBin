import {
  Bookmark as BookmarkFill,
  BookmarkOutline as Bookmark,
} from '@styled-icons/zondicons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { ReadMore } from 'components/shared'
import { device, fontSize } from 'styles/responsive'

const Container = styled.div`
  width: 100%;

  @media ${device.min.sm} and ${device.max.md}, ${device.min.xl} {
    margin-right: 1rem;
  }
`

const Title = styled(Link)`
  display: inline;
`

const CourseHeader = css`
  display: inline;
  color: ${({ theme }) => theme.textColor};

  ${Title}:hover & {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 1.5px;
  }
`

const CourseCode = styled.span`
  margin-right: 0.375rem;
  font-weight: 600;
  font-size: ${fontSize.responsive.xl};
  ${CourseHeader}
`

const CourseTitle = styled.span`
  font-weight: 400;
  font-size: ${fontSize.responsive.md};
  ${CourseHeader}
`

const SubTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 1.75rem;
  margin-bottom: 0.5rem;
`

const Department = styled.span`
  display: inline-block;
  overflow: hidden;
  width: calc(100% - 3.75rem);
  margin: 0;
  font-weight: 600;
  font-size: ${fontSize.responsive.xs};
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.primary};

  @media ${device.min.md} {
    font-weight: 500;
  }
`

const CourseDescription = styled.p`
  margin: 0.75rem 0;
  font-weight: 300;
  font-size: ${fontSize.static.md};
  font-family: 'Source Sans Pro', sans-serif;
  text-align: justify;
  color: lightgray;
`

const CreditContainer = styled.span`
  position: absolute;
  right: 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  font-weight: 700;
  font-size: ${fontSize.responsive.sm};
  color: ${({ theme }) => theme.darksecondary};
  background: white;
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.6);

  @media ${device.min.md} {
    width: 1.125rem;
    height: 1.125rem;
  }
`

const StyledFavourite = styled(({ Icon, className, ...props }) => {
  return <Icon {...props} className={className} />
})`
  position: absolute;
  right: 0;
  width: 1rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  @media ${device.min.md} {
    width: 1.125rem;
  }
`

const CourseItemMain = ({ data }) => {
  const coursePage = `courses/${data.Code.replace(/\s/g, '')}`
  const [favourite, setFavourite] = useState(false)

  const favouriteClick = () => {
    setFavourite(!favourite)
  }

  return (
    <Container>
      <SubTitle>
        <Department>{data.Department || 'Not available'}</Department>
        <CreditContainer>{data.TotalCredits}</CreditContainer>
        <StyledFavourite
          Icon={favourite ? BookmarkFill : Bookmark}
          onClick={favouriteClick}
        />
      </SubTitle>

      <Title to={coursePage}>
        <CourseCode>{data.Code}</CourseCode>
        <CourseTitle>{data.Title}</CourseTitle>
      </Title>

      <CourseDescription>
        <ReadMore>{data.Description || 'Not available'}</ReadMore>
      </CourseDescription>
    </Container>
  )
}

export default CourseItemMain
