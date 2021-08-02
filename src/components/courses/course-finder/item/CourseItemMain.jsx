import { Bookmark, BookmarkOutline } from '@styled-icons/zondicons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'

import ParseDescription from 'components/courses/course-finder/ParseDescription'
import { coursePageUrl } from 'paths'
import { selectFavouriteStatus, updateFavourite } from 'store/userSlice'
import { device, fontSize } from 'styles/responsive'

const CourseItemMain = ({ data: courseData }) => {
  const dispatch = useDispatch()

  const favourite = useSelector(selectFavouriteStatus(courseData.Code))

  const favouriteClick = () => {
    dispatch(updateFavourite(courseData.Code))
  }

  return (
    <Container>
      <SubTitle>
        <Department>{courseData.Department}</Department>
        <CreditContainer>{courseData.TotalCredits}</CreditContainer>
        <StyledFavourite
          Icon={favourite ? Bookmark : BookmarkOutline}
          onClick={favouriteClick}
        />
      </SubTitle>

      <Title to={coursePageUrl(courseData.Code, courseData.Title)}>
        <CourseCode>{courseData.Code}</CourseCode>
        <CourseTitle>{courseData.Title}</CourseTitle>
      </Title>

      <CourseDescription>
        <ParseDescription>{courseData.Description}</ParseDescription>
      </CourseDescription>
    </Container>
  )
}

export default CourseItemMain

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
  font-size: ${fontSize.responsive.xl};
  font-weight: 600;

  ${CourseHeader}
`

const CourseTitle = styled.span`
  font-size: ${fontSize.responsive.md};
  font-weight: 400;

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
  font-size: ${fontSize.responsive.xs};
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.primary};

  @media ${device.min.md} {
    font-weight: 500;
  }
`

const CourseDescription = styled.p`
  margin: 0.75rem 0;
  font-size: ${fontSize.static.md};
  font-weight: 300;
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
  font-size: ${fontSize.responsive.sm};
  font-weight: 700;
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
