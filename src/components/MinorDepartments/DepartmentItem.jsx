import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'


import { CardSplit, Typography } from 'components/shared'
import { MinorDepartmentPageUrl} from 'helpers'
import { fontSize } from 'styles/responsive'

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
        <Fragment key={String(index)}>{part}</Fragment>
      )
    )
}

const DepartmentItemMain = ({ departmentData }) => {

  return (
    <>
      <TitleContainer to={MinorDepartmentPageUrl(departmentData.department.slug, departmentData.id)}>
        
        <h2>
          <HighlightMatches content={departmentData.department.name} />
        </h2>
      </TitleContainer>

      <Typography.Paragraph
        ellipsis={{ rows: 3, expandable: true, symbol: 'show more' }}
        style={{ marginTop: '0.75rem', marginBottom: 0 }}
      >
        {departmentData.description?.length ? departmentData.description : 'No description available'}
      </Typography.Paragraph>
    </>
  )
}

const DepartmentItem = ({ departmentData }) => {
  return (
    <CardSplit
      main={<DepartmentItemMain departmentData={departmentData} />}
      subWidth="13rem"
    />
  )
}

export default DepartmentItem

const TitleContainer = styled(Link)`
  display: flex;
  gap: 0.375rem;
  align-items: baseline;
  color: ${({ theme }) => theme.textColor};

  h1 {
    font-weight: 600;
    font-size: ${fontSize.responsive.xl};
  }

  h2 {
    font-weight: 400;
    font-size: ${fontSize.responsive.md};
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
    text-decoration: underline;
  }
`

const Mark = styled.mark`
  padding: 0;
  color: ${({ theme }) => theme.secondary};
  background: ${({ theme }) => theme.primary};
`

