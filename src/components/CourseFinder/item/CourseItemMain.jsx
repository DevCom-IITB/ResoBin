import { Bookmark, BookmarkOutline } from '@styled-icons/zondicons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'

import { API } from 'api'
import { ButtonIcon } from 'components/shared'
import { toastError } from 'components/toast'
import { coursePageUrl } from 'paths'
import { selectDepartments } from 'store/courseSlice'
import { selectFavouriteStatus, updateFavourite } from 'store/userSlice'
import { device, fontSize } from 'styles/responsive'
import { colorPicker } from 'styles/utils'

import ParseDescription from '../ParseDescription'

const CourseItemMain = ({ courseData }) => {
  const dispatch = useDispatch()
  const { code, credits, department, title, description } = courseData

  const [loading, setLoading] = useState(false)

  const favourite = useSelector(selectFavouriteStatus(code))
  const departmentList = useSelector(selectDepartments)

  const favouriteClick = async () => {
    try {
      setLoading(true)
      if (favourite) {
        await API.courses.favorite.remove({ code })
      } else {
        await API.courses.favorite.add({ code })
      }
      dispatch(updateFavourite(code))
    } catch (error) {
      toastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SubTitle>
        <DepartmentContainer
          style={{
            color: colorPicker(
              departmentList.findIndex(({ name }) => name === department.name)
            ),
          }}
        >
          {department.name}
        </DepartmentContainer>

        <RightIcons>
          <CreditContainer small={credits > 9}>{credits}</CreditContainer>

          <ButtonIcon
            tooltip="Add to favorites"
            onClick={favouriteClick}
            popover={favourite}
            popoverTitle="Remove from favorites?"
            icon={
              favourite ? <Bookmark size="25" /> : <BookmarkOutline size="25" />
            }
            color="white"
            loading={loading}
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
