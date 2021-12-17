import { ChatAlt, DocumentText } from '@styled-icons/heroicons-outline'
import { Tag } from 'antd'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { CourseContentRequestIcon } from 'components/CoursePage'
import { FavoriteToggle } from 'components/Favourites'
import { Divider, Typography, CardSplit } from 'components/shared'
import { ButtonSquareLink } from 'components/shared/Buttons'
import { TimetableSelector } from 'components/Timetable'
import defaultTags from 'data/tags.json'
import { coursePageUrl } from 'helpers/format'
import { useResponsive } from 'hooks'
import { selectDepartments } from 'store/courseSlice'
import { device, fontSize } from 'styles/responsive'
import { useColorPicker } from 'styles/utils'

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
  const { code, credits, department, title, description, tags } = courseData
  const departmentList = useSelector(selectDepartments)
  const colorPicker = useColorPicker()

  const creditColorPicker = (_credits) => {
    if (_credits >= 10) return colorPicker(0)
    if (_credits >= 8) return colorPicker(1)
    if (_credits >= 6) return colorPicker(2)
    if (_credits >= 4) return colorPicker(3)
    if (_credits >= 2) return colorPicker(4)
    return colorPicker(5)
  }

  const tagColorPicker = (tag) =>
    colorPicker(defaultTags.courseTags.findIndex((t) => t === tag))

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

          <FavoriteToggle code={code} />
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

// TODO: Improve responsiveness
const CourseItemSub = ({ courseData }) => {
  const { isMobile, isMobileS } = useResponsive()

  const { code, title, semester, reviews, resources } = courseData

  const reviewCount = reviews?.length
  const resourceCount = resources?.length

  return (
    <>
      <TimetableSelector semester={semester} />

      {(isMobileS || !isMobile) && <Divider margin="0.75rem 0" />}
      {isMobile && !isMobileS && (
        <Divider style={{ width: '1px' }} type="vertical" />
      )}

      <div>
        <FlexGap style={{ marginBottom: '0.75rem' }}>
          <ButtonSquareLink
            to={`${coursePageUrl(code, title)}#reviews`}
            style={{ width: '100%', borderRadius: '0.5rem 0 0 0.5rem' }}
          >
            <ChatAlt size="16" />
            Reviews {reviewCount > 0 && `(${reviewCount})`}
          </ButtonSquareLink>

          <CourseContentRequestIcon
            code={code}
            type="reviews"
            tooltip="Request reviews"
            style={{ borderRadius: '0 0.5rem 0.5rem 0' }}
          />
        </FlexGap>

        <FlexGap>
          <ButtonSquareLink
            style={{ width: '100%', borderRadius: '0.5rem 0 0 0.5rem' }}
            to={`${coursePageUrl(code, title)}#resources`}
          >
            <DocumentText size="16" />
            Resources {resourceCount > 0 && `(${resourceCount})`}
          </ButtonSquareLink>

          <CourseContentRequestIcon
            code={code}
            type="resources"
            tooltip="Request resources"
            style={{ borderRadius: '0 0.5rem 0.5rem 0' }}
          />
        </FlexGap>
      </div>
    </>
  )
}

const CourseItem = ({ courseData }) => {
  return (
    <CardSplit
      main={<CourseItemMain courseData={courseData} />}
      sub={<CourseItemSub courseData={courseData} />}
      subWidth="13rem"
    />
  )
}

export default CourseItem

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

const FlexGap = styled.div`
  display: flex;
  gap: 0.25rem;
  width: 100%;
`
