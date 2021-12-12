import { Bookmark, BookmarkOutline } from '@styled-icons/zondicons'
import { Tag } from 'antd'
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

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

// TODO: Add highlight for description
const HighlightMatches = ({ content }) => {
  const location = useLocation()
  const queryString = new URLSearchParams(location.search)
  const search = (queryString.get('q') || '').toLowerCase()
  const re = new RegExp(`(${search})`, 'gi')

  return content
    .split(re)
    .map((part, index) =>
      part.toLowerCase() === search ? (
        <Mark key={String(index)}>{part}</Mark>
      ) : (
        <span key={String(index)}>{part}</span>
      )
    )
}

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
        <h1>
          <HighlightMatches content={code} />
        </h1>

        <h2>
          <HighlightMatches content={title} />
        </h2>
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
  display: flex;
  align-items: baseline;
  gap: 0.375rem;
  color: ${({ theme }) => theme.textColor};

  h1 {
    font-size: ${fontSize.responsive.xl};
    font-weight: 600;
  }

  h2 {
    font-size: ${fontSize.responsive.md};
    font-weight: 400;
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
    text-decoration: underline;
  }
`

const Mark = styled.mark`
  color: ${({ theme }) => theme.secondary};
  background: ${({ theme }) => theme.primary};
  padding: 0;
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
  flex-direction: row-reverse;
  align-items: center;
  margin-left: 0.5rem;
  gap: 0.25rem;
  overflow-y: scroll;
  height: 3rem;

  @media ${device.max.xs}, ${device.min.lg} and ${device.max.xl} {
    display: block;
    max-width: 6rem;

    > :not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
`

const StyledTag = styled(Tag)`
  height: 1.25rem;
  width: 100%;
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
