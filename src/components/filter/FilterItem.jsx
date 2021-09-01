import { X } from '@styled-icons/heroicons-outline'
import { Checkbox } from 'antd'
import { Fragment } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { ButtonIcon } from 'components/shared'

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
  const currentValues = queryString.get(param)

  const setQueryString = (query) => {
    // ? No change
    if (query === (queryString.get(param) || '')) return

    // ? update query string or clear query string if query is empty
    if (query) queryString.set(param, query)
    else queryString.delete(param)

    // ? reset pagination
    queryString.delete('p')

    history.push({
      pathname: location.pathname,
      search: `?${queryString.toString()}`,
    })
  }

  const onChange = (checkedValues) => setQueryString(checkedValues.sort())
  const clearAllFilters = () => setQueryString('')

  return (
    <>
      <Header>
        <Title>{groupData.FilterTitle}</Title>
        <ButtonIcon
          tooltip="Clear"
          onClick={clearAllFilters}
          icon={<X size="18" />}
          color="red"
          defaultstyle={{ color: '#ff5050' }}
        />
      </Header>

      <StyledCheckboxGroup onChange={onChange} defaultValue={currentValues}>
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
