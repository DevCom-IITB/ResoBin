// import { Checkbox } from 'components/shared'
import { X } from '@styled-icons/heroicons-outline'
import { Checkbox } from 'antd'
import { Fragment } from 'react'
import styled from 'styled-components'

const Title = styled.span`
  font-weight: 600;
  font-size: 1rem;
  line-height: 20px;
  letter-spacing: 0.2px;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.textColor};
`

const Header = styled.div`
  display: flex;
  color: white;
  align-items: baseline;
  justify-content: space-between;
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
