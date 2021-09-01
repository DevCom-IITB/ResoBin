import { Bookmark, BookmarkOutline } from '@styled-icons/zondicons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'

import { ButtonIcon } from 'components/shared'
import { coursePageUrl } from 'paths'
import { selectFavouriteStatus, updateFavourite } from 'store/userSlice'
import { device, fontSize } from 'styles/responsive'
import { colorPicker } from 'styles/utils'

import ParseDescription from '../ParseDescription'

// ! Fetch from elastic search server
const departmentList = [
  'Aerospace Engineering',
  'Applied Geophysics',
  'Applied Statistics and Informatics',
]

const CourseItemMain = ({ courseData }) => {
  const {
    Code: code,
    TotalCredits: totalCredits,
    Department: department,
    Title: title,
    Description: description,
  } = courseData

  const favourite = useSelector(selectFavouriteStatus(code))

  const dispatch = useDispatch()
  const favouriteClick = () => dispatch(updateFavourite(code))

  return (
    <>
      <SubTitle>
        <DepartmentContainer
          style={{ color: colorPicker(departmentList.indexOf(department)) }}
        >
          {department}
        </DepartmentContainer>

        <RightIcons>
          <CreditContainer small={totalCredits > 9}>
            {totalCredits}
          </CreditContainer>

          <ButtonIcon
            tooltip="Bookmark"
            onClick={favouriteClick}
            size="lg"
            icon={favourite ? <Bookmark /> : <BookmarkOutline />}
            hoverstyle={{ color: 'white' }}
          />
        </RightIcons>
      </SubTitle>

      <TitleContainer to={coursePageUrl(code, title)}>
        <CourseCode>{code}</CourseCode>
        <CourseTitle>{title}</CourseTitle>
      </TitleContainer>

      <CourseDescription>
        <ParseDescription>{description}</ParseDescription>
      </CourseDescription>
    </>
  )
}

export default CourseItemMain

const TitleContainer = styled(Link)`
  display: inline;
`

const CourseHeader = css`
  display: inline;
  color: ${({ theme }) => theme.textColor};

  ${TitleContainer}:hover & {
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

const DepartmentContainer = styled.span`
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

const RightIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const CourseDescription = styled.p`
  margin: 0.75rem 0;
  font-size: ${fontSize.static.md};
  font-weight: 300;
  text-align: justify;
  color: lightgray;
`

const CreditContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 1rem;
  border-radius: 50%;
  font-size: ${({ small }) =>
    small ? fontSize.responsive.xs : fontSize.responsive.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.darksecondary};
  background: white;

  @media ${device.min.md} {
    width: 1.5rem;
    height: 1.5rem;
  }
`
