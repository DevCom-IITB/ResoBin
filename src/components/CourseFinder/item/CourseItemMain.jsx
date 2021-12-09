import { Bookmark, BookmarkOutline } from '@styled-icons/zondicons'
import { Tag } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'

import { ButtonIcon, toast, Typography } from 'components/shared'
import { API } from 'config/api'
import defaultTags from 'data/tags.json'
import { coursePageUrl } from 'helpers/format'
import { selectDepartments } from 'store/courseSlice'
import { selectFavouriteStatus, updateFavourite } from 'store/userSlice'
import { device, fontSize } from 'styles/responsive'
import { colorPicker } from 'styles/utils'

const creditColorPicker = (credits) => {
  if (credits >= 10) return colorPicker(0)
  if (credits >= 8) return colorPicker(1)
  if (credits >= 6) return colorPicker(2)
  if (credits >= 4) return colorPicker(3)
  if (credits >= 2) return colorPicker(4)
  return colorPicker(5)
}

const tagColorPicker = (tag) =>
  colorPicker(defaultTags.courseTags.findIndex((t) => t === tag))

// TODO: Add highlight for keywords
// const HighlightMatches = ({ content }) => {
//   const location = useLocation()
//   const queryString = new URLSearchParams(location.search)
//   const search = (queryString.get('q') || '').toLowerCase()

//   const re = new RegExp(`(${search})`, 'gi')
//   const parts = content.split(re)

//   return search
//     ? parts.map((part, index) =>
//         part.toLowerCase() === search ? (
//           <mark key={String(index)} mark>
//             {part}
//           </mark>
//         ) : (
//           <span key={String(index)}>{part}</span>
//         )
//       )
//     : content
// }

// {description?.length ? (
//   <HighlightMatches content={description} />
// ) : (
//   <>No description available</>
// )}

const CourseItemMain = ({ courseData }) => {
  const dispatch = useDispatch()
  const { code, credits, department, title, description, tags } = courseData

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
      toast({ status: 'error', content: error })
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
          <TagsContainer>
            {credits > 0 && (
              <StyledTag style={{ color: creditColorPicker(credits) }}>
                {credits} credit{credits > 1 ? 's' : ''}
              </StyledTag>
            )}

            {tags.map((tag) => (
              <StyledTag key={tag} style={{ color: tagColorPicker(tag) }}>
                {tag}
              </StyledTag>
            ))}
          </TagsContainer>

          <ButtonIcon
            tooltip="Add to favorites"
            onClick={favouriteClick}
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

      <Typography.Paragraph
        ellipsis={{ rows: 3, expandable: true, symbol: 'show more' }}
        style={{ marginTop: '0.75rem', marginBottom: 0 }}
      >
        {description?.length ? description : 'No description available'}
      </Typography.Paragraph>
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
  display: flex;
  align-items: center;
  height: 2rem;
  margin-bottom: 0.5rem;

  @media ${device.max.xs}, ${device.min.lg} and ${device.max.xl} {
    height: 3rem;
  }
`

const DepartmentContainer = styled.span`
  width: 100%;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: ${fontSize.responsive.xs};
  opacity: 85%;

  @media ${device.min.md} {
    font-weight: 500;
  }
`

const RightIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  gap: 0.25rem;
  overflow-y: scroll;

  @media ${device.max.xs}, ${device.min.lg} and ${device.max.xl} {
    flex-wrap: wrap;
  }
`

const StyledTag = styled(Tag)`
  height: 1.25rem;
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textColor};
  padding: 0 0.75rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: none;
  background: ${({ theme }) => theme.darksecondary};
`
