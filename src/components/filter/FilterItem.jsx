// import { Checkbox } from 'components/shared'
import { X } from '@styled-icons/heroicons-outline'
import { Checkbox } from 'antd'
import { Fragment } from 'react'
import styled from 'styled-components/macro'

const Title = styled.span`
  display: inline-block;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.textColor};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: white;
`

const FilterItem = ({ data: groupData, index }) => {
  const onChange = (checkedValues) => {
    console.log(checkedValues)
  }

  return (
    <Fragment key={index}>
      <Header>
        <Title>{groupData.FilterTitle}</Title>
        <X style={{ cursor: 'pointer', width: '1rem' }} />
      </Header>

      <Checkbox.Group onChange={onChange}>
        {groupData.Options.map((optionData) => (
          <Checkbox key={optionData.id} value={optionData.Label}>
            {optionData.Label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Fragment>
  )
}

export default FilterItem
