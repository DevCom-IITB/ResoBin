import { Fragment } from 'react'
import styled from 'styled-components'
import { Checkbox } from 'components/shared'

const Title = styled.h1`
  font-weight: 600;
  font-size: 1rem;
  line-height: 20px;
  letter-spacing: 0.2px;
  margin: 1rem 0 0.75rem;
  color: ${({ theme }) => theme.textColor};
`

const FilterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`

const FilterItem = ({ data, index }) => {
  return (
    <Fragment key={index}>
      <Title>{data.FilterTitle}</Title>
      <FilterList>
        {data.Options.map((data, index) => (
          <Checkbox key={index} label={data.Label} />
        ))}
      </FilterList>
    </Fragment>
  )
}

export default FilterItem
