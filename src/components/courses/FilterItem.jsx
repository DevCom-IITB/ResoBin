// import { Checkbox } from 'components/shared'
import { Checkbox } from 'antd'
import { Fragment } from 'react'
import styled from 'styled-components'

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

const FilterItem = ({ data: filterGroupData, index }) => {
  const onChange = (checkedValues) => {
    console.log(checkedValues)
  }

  return (
    <Fragment key={index}>
      <Title>{filterGroupData.FilterTitle}</Title>
      <FilterList className="filters">
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
          {filterGroupData.Options.map((filterOptionData) => (
            <Checkbox key={filterOptionData.id} value={filterOptionData.Label}>
              {filterOptionData.Label}
            </Checkbox>
          ))}
        </Checkbox.Group>
        {/* <Checkbox key={index} label={data.Label} /> */}
      </FilterList>
    </Fragment>
  )
}

export default FilterItem
