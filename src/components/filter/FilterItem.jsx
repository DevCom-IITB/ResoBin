import { X } from '@styled-icons/heroicons-outline'
import { Checkbox } from 'antd'
import { Fragment, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { ButtonIconDanger } from 'components/shared/Buttons'

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

// ! multiple issues in this component, try and fix all asap
const FilterItem = ({ data: groupData }) => {
  const location = useLocation()
  const history = useHistory()
  const param = groupData.id

  const queryString = new URLSearchParams(location.search)

  const [filterValue, setFilterValue] = useState(queryString.get(param))

  const setQueryString = (values) => {
    // ? no change
    if (values === queryString.get(param)) return

    setFilterValue(values)

    // ? remove empty query from url to keep it clean
    if (values?.length) queryString.set(param, values)
    else queryString.delete(param)
    // ? reset pagination
    queryString.delete('p')

    history.push({
      pathname: location.pathname,
      search: `?${queryString.toString()}`,
    })
  }

  const onChange = (checkedValues) => setQueryString(checkedValues.sort())

  return (
    <>
      <Header>
        <Title>{groupData.FilterTitle}</Title>
        <ButtonIconDanger
          tooltip="Clear"
          onClick={() => setQueryString([])}
          icon={<X size="18" />}
        />
      </Header>

      <StyledCheckboxGroup onChange={onChange} value={filterValue}>
        {groupData.Options.map((optionData) => (
          <Checkbox key={optionData.id} value={optionData.id}>
            {optionData.Label}
          </Checkbox>
        ))}
      </StyledCheckboxGroup>
    </>
  )
}

export default FilterItem

const StyledCheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.5rem;
  margin-bottom: 2rem;
  gap: 1rem;

  .ant-checkbox-wrapper {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 400;
    color: ${({ theme }) => theme.textColor};
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      border-color: ${({ theme }) => theme.logo};
      background: ${({ theme }) => theme.logo};
    }
  }
`
